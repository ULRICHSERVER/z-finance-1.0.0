<?php
/**
 * Z-FINANCE 1.0.0 - Chart of Accounts Manager Class
 * Manages standard and custom account hierarchy, classification, and balances.
 */

class ChartOfAccountsManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getAccounts($tenantId = 1, $filters = []) {
        $sql = "SELECT coa.*, parent.account_name as parent_account_name
                FROM chart_of_accounts coa
                LEFT JOIN chart_of_accounts parent ON coa.parent_id = parent.id
                WHERE coa.tenant_id = :tenant_id AND coa.is_deleted = 0";

        $params = ['tenant_id' => $tenantId];

        if (!empty($filters['account_type'])) {
            $sql .= " AND coa.account_type = :account_type";
            $params['account_type'] = $filters['account_type'];
        }

        if (!empty($filters['search'])) {
            $sql .= " AND (coa.account_code LIKE :search OR coa.account_name LIKE :search)";
            $params['search'] = '%' . $filters['search'] . '%';
        }

        $sql .= " ORDER BY coa.account_code ASC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAccountById($id, $tenantId = 1) {
        $stmt = $this->pdo->prepare("SELECT * FROM chart_of_accounts WHERE id = :id AND tenant_id = :tenant_id AND is_deleted = 0");
        $stmt->execute(['id' => $id, 'tenant_id' => $tenantId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createAccount($data, $tenantId = 1) {
        $stmt = $this->pdo->prepare("
            INSERT INTO chart_of_accounts (tenant_id, account_code, account_name, parent_id, account_type, currency, opening_balance, current_balance, description)
            VALUES (:tenant_id, :account_code, :account_name, :parent_id, :account_type, :currency, :opening_balance, :opening_balance, :description)
        ");

        $stmt->execute([
            'tenant_id' => $tenantId,
            'account_code' => $data['account_code'],
            'account_name' => $data['account_name'],
            'parent_id' => !empty($data['parent_id']) ? $data['parent_id'] : null,
            'account_type' => $data['account_type'],
            'currency' => $data['currency'] ?? 'USD',
            'opening_balance' => (float)($data['opening_balance'] ?? 0.00),
            'description' => $data['description'] ?? null
        ]);

        return $this->pdo->lastInsertId();
    }

    public function updateBalance($accountId, $amount, $isDebit = true) {
        $account = $this->getAccountById($accountId);
        if (!$account) return false;

        $type = $account['account_type'];
        
        // Debit increases Assets & Expenses, Credit increases Liabilities, Equity & Revenue
        $increaseOnDebit = in_array($type, ['asset', 'current_asset', 'fixed_asset', 'cogs', 'operating_expense', 'other_expense']);

        if (($isDebit && $increaseOnDebit) || (!$isDebit && !$increaseOnDebit)) {
            $sql = "UPDATE chart_of_accounts SET current_balance = current_balance + :amount WHERE id = :id";
        } else {
            $sql = "UPDATE chart_of_accounts SET current_balance = current_balance - :amount WHERE id = :id";
        }

        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute(['amount' => abs($amount), 'id' => $accountId]);
    }
}
