<?php
/**
 * Z-FINANCE 1.0.0 - Journal Manager Class
 * Handles double-entry journal creation, balancing validation, posting, and reversals.
 */

require_once __DIR__ . '/ChartOfAccountsManager.php';

class JournalManager {
    private $pdo;
    private $coaManager;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
        $this->coaManager = new ChartOfAccountsManager($pdo);
    }

    public function getJournals($tenantId = 1, $filters = []) {
        $sql = "SELECT je.*, 
                       (SELECT COUNT(*) FROM journal_entry_lines jel WHERE jel.journal_entry_id = je.id) as line_count
                FROM journal_entries je
                WHERE je.tenant_id = :tenant_id";

        $params = ['tenant_id' => $tenantId];

        if (!empty($filters['status'])) {
            $sql .= " AND je.status = :status";
            $params['status'] = $filters['status'];
        }

        if (!empty($filters['search'])) {
            $sql .= " AND (je.reference_no LIKE :search OR je.description LIKE :search)";
            $params['search'] = '%' . $filters['search'] . '%';
        }

        $sql .= " ORDER BY je.entry_date DESC, je.id DESC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getJournalWithLines($id, $tenantId = 1) {
        $stmt = $this->pdo->prepare("SELECT * FROM journal_entries WHERE id = :id AND tenant_id = :tenant_id");
        $stmt->execute(['id' => $id, 'tenant_id' => $tenantId]);
        $entry = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$entry) return null;

        $linesStmt = $this->pdo->prepare("
            SELECT jel.*, coa.account_code, coa.account_name, coa.account_type
            FROM journal_entry_lines jel
            JOIN chart_of_accounts coa ON jel.account_id = coa.id
            WHERE jel.journal_entry_id = :journal_id
        ");
        $linesStmt->execute(['journal_id' => $id]);
        $entry['lines'] = $linesStmt->fetchAll(PDO::FETCH_ASSOC);

        return $entry;
    }

    public function createJournalEntry($data, $tenantId = 1, $userId = 1) {
        // Validate double-entry equality
        $lines = $data['lines'] ?? [];
        $totalDebit = 0.00;
        $totalCredit = 0.00;

        foreach ($lines as $line) {
            $totalDebit += (float)($line['debit'] ?? 0);
            $totalCredit += (float)($line['credit'] ?? 0);
        }

        if (round($totalDebit, 2) !== round($totalCredit, 2)) {
            throw new Exception("Double-entry violation: Total debits ($" . number_format($totalDebit, 2) . ") must equal total credits ($" . number_format($totalCredit, 2) . ")");
        }

        $refNo = 'JRN-' . date('Ymd') . '-' . str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);

        $this->pdo->beginTransaction();

        try {
            $stmt = $this->pdo->prepare("
                INSERT INTO journal_entries (tenant_id, reference_no, entry_date, description, source_module, source_reference, currency, total_debit, total_credit, status, created_by, approved_by)
                VALUES (:tenant_id, :reference_no, :entry_date, :description, :source_module, :source_reference, :currency, :total_debit, :total_credit, :status, :created_by, :approved_by)
            ");

            $status = $data['status'] ?? 'posted';

            $stmt->execute([
                'tenant_id' => $tenantId,
                'reference_no' => $refNo,
                'entry_date' => $data['entry_date'] ?? date('Y-m-d'),
                'description' => $data['description'],
                'source_module' => $data['source_module'] ?? 'manual',
                'source_reference' => $data['source_reference'] ?? null,
                'currency' => $data['currency'] ?? 'USD',
                'total_debit' => $totalDebit,
                'total_credit' => $totalCredit,
                'status' => $status,
                'created_by' => $userId,
                'approved_by' => $userId
            ]);

            $journalId = $this->pdo->lastInsertId();

            $lineStmt = $this->pdo->prepare("
                INSERT INTO journal_entry_lines (journal_entry_id, account_id, description, debit, credit)
                VALUES (:journal_id, :account_id, :description, :debit, :credit)
            ");

            $glStmt = $this->pdo->prepare("
                INSERT INTO general_ledger (tenant_id, account_id, journal_entry_id, line_id, entry_date, description, debit, credit, running_balance)
                VALUES (:tenant_id, :account_id, :journal_id, :line_id, :entry_date, :description, :debit, :credit, :running_balance)
            ");

            foreach ($lines as $line) {
                $debit = (float)($line['debit'] ?? 0);
                $credit = (float)($line['credit'] ?? 0);

                $lineStmt->execute([
                    'journal_id' => $journalId,
                    'account_id' => $line['account_id'],
                    'description' => $line['description'] ?? $data['description'],
                    'debit' => $debit,
                    'credit' => $credit
                ]);

                $lineId = $this->pdo->lastInsertId();

                if ($status === 'posted') {
                    // Update Chart of Accounts balances
                    if ($debit > 0) {
                        $this->coaManager->updateBalance($line['account_id'], $debit, true);
                    }
                    if ($credit > 0) {
                        $this->coaManager->updateBalance($line['account_id'], $credit, false);
                    }

                    // Log into General Ledger
                    $acc = $this->coaManager->getAccountById($line['account_id']);
                    $runningBal = $acc ? $acc['current_balance'] : 0.00;

                    $glStmt->execute([
                        'tenant_id' => $tenantId,
                        'account_id' => $line['account_id'],
                        'journal_id' => $journalId,
                        'line_id' => $lineId,
                        'entry_date' => $data['entry_date'] ?? date('Y-m-d'),
                        'description' => $line['description'] ?? $data['description'],
                        'debit' => $debit,
                        'credit' => $credit,
                        'running_balance' => $runningBal
                    ]);
                }
            }

            $this->pdo->commit();
            return $journalId;

        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }
}
