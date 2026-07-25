<?php
/**
 * Z-FINANCE 1.0.0 - Bank & Account Reconciliation Manager Class
 * Handles bank statement vs book ledger reconciliation, difference detection, and adjustments.
 */

class ReconciliationManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getReconciliations($tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT ar.*, coa.account_name, coa.account_code
            FROM account_reconciliations ar
            JOIN chart_of_accounts coa ON ar.account_id = coa.id
            WHERE ar.tenant_id = :tenant_id
            ORDER BY ar.reconciliation_date DESC
        ");
        $stmt->execute(['tenant_id' => $tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createReconciliation($data, $tenantId = 1, $userId = 1) {
        $accountId = $data['account_id'];
        $stmtBal = (float)$data['statement_balance'];

        // Get book balance
        $stmt = $this->pdo->prepare("SELECT current_balance FROM chart_of_accounts WHERE id = :id");
        $stmt->execute(['id' => $accountId]);
        $acc = $stmt->fetch(PDO::FETCH_ASSOC);
        $bookBal = $acc ? (float)$acc['current_balance'] : 0.00;

        $diff = round($stmtBal - $bookBal, 2);
        $status = ($diff === 0.00) ? 'balanced' : 'unreconciled';

        $insStmt = $this->pdo->prepare("
            INSERT INTO account_reconciliations (tenant_id, account_id, reconciliation_date, statement_balance, book_balance, difference, status, notes, reconciled_by)
            VALUES (:tenant_id, :account_id, :reconciliation_date, :statement_balance, :book_balance, :difference, :status, :notes, :reconciled_by)
        ");

        $insStmt->execute([
            'tenant_id' => $tenantId,
            'account_id' => $accountId,
            'reconciliation_date' => $data['reconciliation_date'] ?? date('Y-m-d'),
            'statement_balance' => $stmtBal,
            'book_balance' => $bookBal,
            'difference' => $diff,
            'status' => $status,
            'notes' => $data['notes'] ?? null,
            'reconciled_by' => $userId
        ]);

        return $this->pdo->lastInsertId();
    }
}
