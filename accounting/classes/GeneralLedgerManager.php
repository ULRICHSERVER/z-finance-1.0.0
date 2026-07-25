<?php
/**
 * Z-FINANCE 1.0.0 - General Ledger & Financial Statements Manager Class
 * Handles general ledger reporting, trial balance calculations, and financial statements generation.
 */

class GeneralLedgerManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getLedgerEntries($accountId = null, $tenantId = 1, $startDate = null, $endDate = null) {
        $sql = "SELECT gl.*, coa.account_code, coa.account_name, je.reference_no, je.source_module
                FROM general_ledger gl
                JOIN chart_of_accounts coa ON gl.account_id = coa.id
                JOIN journal_entries je ON gl.journal_entry_id = je.id
                WHERE gl.tenant_id = :tenant_id";

        $params = ['tenant_id' => $tenantId];

        if ($accountId) {
            $sql .= " AND gl.account_id = :account_id";
            $params['account_id'] = $accountId;
        }

        if ($startDate) {
            $sql .= " AND gl.entry_date >= :start_date";
            $params['start_date'] = $startDate;
        }

        if ($endDate) {
            $sql .= " AND gl.entry_date <= :end_date";
            $params['end_date'] = $endDate;
        }

        $sql .= " ORDER BY gl.entry_date ASC, gl.id ASC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getTrialBalance($tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT coa.id, coa.account_code, coa.account_name, coa.account_type,
                   COALESCE(SUM(gl.debit), 0.00) as total_debit,
                   COALESCE(SUM(gl.credit), 0.00) as total_credit,
                   coa.current_balance
            FROM chart_of_accounts coa
            LEFT JOIN general_ledger gl ON coa.id = gl.account_id
            WHERE coa.tenant_id = :tenant_id AND coa.is_deleted = 0
            GROUP BY coa.id
            ORDER BY coa.account_code ASC
        ");
        $stmt->execute(['tenant_id' => $tenantId]);
        $accounts = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $totalDebit = 0;
        $totalCredit = 0;

        foreach ($accounts as &$acc) {
            $type = $acc['account_type'];
            // Debit-nature accounts vs Credit-nature accounts
            if (in_array($type, ['asset', 'current_asset', 'fixed_asset', 'cogs', 'operating_expense', 'other_expense'])) {
                $acc['trial_debit'] = (float)$acc['current_balance'];
                $acc['trial_credit'] = 0.00;
            } else {
                $acc['trial_debit'] = 0.00;
                $acc['trial_credit'] = (float)$acc['current_balance'];
            }

            $totalDebit += $acc['trial_debit'];
            $totalCredit += $acc['trial_credit'];
        }

        return [
            'accounts' => $accounts,
            'total_debit' => round($totalDebit, 2),
            'total_credit' => round($totalCredit, 2),
            'is_balanced' => round($totalDebit, 2) === round($totalCredit, 2)
        ];
    }

    public function getBalanceSheet($tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT account_code, account_name, account_type, current_balance
            FROM chart_of_accounts
            WHERE tenant_id = :tenant_id AND is_deleted = 0 AND account_type IN ('asset', 'current_asset', 'fixed_asset', 'liability', 'current_liability', 'long_term_liability', 'equity')
            ORDER BY account_code ASC
        ");
        $stmt->execute(['tenant_id' => $tenantId]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $assets = [];
        $liabilities = [];
        $equity = [];

        $totalAssets = 0;
        $totalLiabilities = 0;
        $totalEquity = 0;

        foreach ($rows as $row) {
            $type = $row['account_type'];
            $bal = (float)$row['current_balance'];

            if (strpos($type, 'asset') !== false) {
                $assets[] = $row;
                $totalAssets += $bal;
            } elseif (strpos($type, 'liability') !== false) {
                $liabilities[] = $row;
                $totalLiabilities += $bal;
            } else {
                $equity[] = $row;
                $totalEquity += $bal;
            }
        }

        return [
            'assets' => $assets,
            'total_assets' => $totalAssets,
            'liabilities' => $liabilities,
            'total_liabilities' => $totalLiabilities,
            'equity' => $equity,
            'total_equity' => $totalEquity,
            'is_balanced' => round($totalAssets, 2) === round($totalLiabilities + $totalEquity, 2)
        ];
    }

    public function getIncomeStatement($tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT account_code, account_name, account_type, current_balance
            FROM chart_of_accounts
            WHERE tenant_id = :tenant_id AND is_deleted = 0 AND account_type IN ('revenue', 'cogs', 'operating_expense', 'other_income', 'other_expense')
            ORDER BY account_code ASC
        ");
        $stmt->execute(['tenant_id' => $tenantId]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $revenues = [];
        $cogs = [];
        $expenses = [];

        $totalRevenue = 0;
        $totalCogs = 0;
        $totalExpenses = 0;

        foreach ($rows as $row) {
            $type = $row['account_type'];
            $bal = (float)$row['current_balance'];

            if ($type === 'revenue' || $type === 'other_income') {
                $revenues[] = $row;
                $totalRevenue += $bal;
            } elseif ($type === 'cogs') {
                $cogs[] = $row;
                $totalCogs += $bal;
            } else {
                $expenses[] = $row;
                $totalExpenses += $bal;
            }
        }

        $grossProfit = $totalRevenue - $totalCogs;
        $netProfit = $grossProfit - $totalExpenses;

        return [
            'revenues' => $revenues,
            'total_revenue' => $totalRevenue,
            'cogs' => $cogs,
            'total_cogs' => $totalCogs,
            'gross_profit' => $grossProfit,
            'expenses' => $expenses,
            'total_expenses' => $totalExpenses,
            'net_profit' => $netProfit
        ];
    }
}
