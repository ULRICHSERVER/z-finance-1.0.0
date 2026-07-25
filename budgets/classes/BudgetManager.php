<?php
/**
 * Z-FINANCE 1.0.0 - Budget Manager Class
 * Handles budget creation, monitoring, planned vs actual variance tracking, and alerts.
 */

class BudgetManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getBudgets($tenantId = 1, $filters = []) {
        $sql = "SELECT b.*, bc.category_name, bt.actual_expenses, bt.actual_income, bt.budget_remaining, bt.budget_used, bt.percentage_used
                FROM budgets b
                LEFT JOIN budget_categories bc ON b.category_id = bc.id
                LEFT JOIN budget_tracking bt ON b.id = bt.budget_id
                WHERE b.tenant_id = :tenant_id AND b.is_deleted = 0";

        $params = ['tenant_id' => $tenantId];

        if (!empty($filters['budget_type'])) {
            $sql .= " AND b.budget_type = :budget_type";
            $params['budget_type'] = $filters['budget_type'];
        }

        if (!empty($filters['status'])) {
            $sql .= " AND b.status = :status";
            $params['status'] = $filters['status'];
        }

        if (!empty($filters['search'])) {
            $sql .= " AND (b.budget_name LIKE :search OR b.reference_no LIKE :search)";
            $params['search'] = '%' . $filters['search'] . '%';
        }

        $sql .= " ORDER BY b.created_at DESC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getBudgetById($id, $tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT b.*, bc.category_name, bt.*
            FROM budgets b
            LEFT JOIN budget_categories bc ON b.category_id = bc.id
            LEFT JOIN budget_tracking bt ON b.id = bt.budget_id
            WHERE b.id = :id AND b.tenant_id = :tenant_id AND b.is_deleted = 0
        ");
        $stmt->execute(['id' => $id, 'tenant_id' => $tenantId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createBudget($data, $tenantId = 1, $userId = 1) {
        $refNo = 'BDG-' . date('Y') . '-' . str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);

        $stmt = $this->pdo->prepare("
            INSERT INTO budgets (tenant_id, reference_no, budget_name, description, budget_type, workspace_id, category_id, service_id, project_id, customer_id, currency, budget_amount, expected_income, expected_expenses, start_date, end_date, status, notes, created_by)
            VALUES (:tenant_id, :reference_no, :budget_name, :description, :budget_type, :workspace_id, :category_id, :service_id, :project_id, :customer_id, :currency, :budget_amount, :expected_income, :expected_expenses, :start_date, :end_date, :status, :notes, :created_by)
        ");

        $stmt->execute([
            'tenant_id' => $tenantId,
            'reference_no' => $refNo,
            'budget_name' => $data['budget_name'],
            'description' => $data['description'] ?? null,
            'budget_type' => $data['budget_type'] ?? 'monthly',
            'workspace_id' => $data['workspace_id'] ?? 1,
            'category_id' => $data['category_id'] ?? null,
            'service_id' => $data['service_id'] ?? null,
            'project_id' => $data['project_id'] ?? null,
            'customer_id' => $data['customer_id'] ?? null,
            'currency' => $data['currency'] ?? 'USD',
            'budget_amount' => (float)$data['budget_amount'],
            'expected_income' => (float)($data['expected_income'] ?? 0.00),
            'expected_expenses' => (float)($data['expected_expenses'] ?? $data['budget_amount']),
            'start_date' => $data['start_date'] ?? date('Y-m-01'),
            'end_date' => $data['end_date'] ?? date('Y-m-t'),
            'status' => $data['status'] ?? 'active',
            'notes' => $data['notes'] ?? null,
            'created_by' => $userId
        ]);

        $budgetId = $this->pdo->lastInsertId();

        // Initialize Budget Tracking Record
        $trackStmt = $this->pdo->prepare("
            INSERT INTO budget_tracking (budget_id, actual_income, actual_expenses, budget_remaining, budget_used, percentage_used, variance)
            VALUES (:budget_id, 0.00, 0.00, :budget_amount, 0.00, 0.00, :budget_amount)
        ");
        $trackStmt->execute([
            'budget_id' => $budgetId,
            'budget_amount' => (float)$data['budget_amount']
        ]);

        return $budgetId;
    }

    public function updateTracking($budgetId, $actualExpenses, $actualIncome = 0.00) {
        $budget = $this->getBudgetById($budgetId);
        if (!$budget) return false;

        $budgetAmount = (float)$budget['budget_amount'];
        $remaining = max(0, $budgetAmount - $actualExpenses);
        $percentage = $budgetAmount > 0 ? min(100, ($actualExpenses / $budgetAmount) * 100) : 0;
        $variance = $budgetAmount - $actualExpenses;

        $stmt = $this->pdo->prepare("
            UPDATE budget_tracking
            SET actual_income = :income, actual_expenses = :expenses, budget_remaining = :remaining, budget_used = :used, percentage_used = :percentage, variance = :variance
            WHERE budget_id = :budget_id
        ");

        $stmt->execute([
            'income' => $actualIncome,
            'expenses' => $actualExpenses,
            'remaining' => $remaining,
            'used' => $actualExpenses,
            'percentage' => $percentage,
            'variance' => $variance,
            'budget_id' => $budgetId
        ]);

        // Auto-check for exceeded threshold
        if ($actualExpenses > $budgetAmount) {
            $this->pdo->prepare("UPDATE budgets SET status = 'exceeded' WHERE id = :id")->execute(['id' => $budgetId]);
            $this->createAlert($budgetId, 'exceeded', "Budget '{$budget['budget_name']}' has exceeded its limit of $" . number_format($budgetAmount, 2));
        }

        return true;
    }

    public function createAlert($budgetId, $type, $message, $tenantId = 1) {
        $stmt = $this->pdo->prepare("
            INSERT INTO budget_alerts (tenant_id, budget_id, alert_type, message)
            VALUES (:tenant_id, :budget_id, :type, :message)
        ");
        return $stmt->execute([
            'tenant_id' => $tenantId,
            'budget_id' => $budgetId,
            'type' => $type,
            'message' => $message
        ]);
    }

    public function getDashboardStats($tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT 
                COUNT(*) as total_budgets,
                SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_budgets,
                SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_budgets,
                SUM(CASE WHEN status = 'exceeded' THEN 1 ELSE 0 END) as exceeded_budgets,
                COALESCE(SUM(budget_amount), 0) as total_allocated
            FROM budgets
            WHERE tenant_id = :tenant_id AND is_deleted = 0
        ");
        $stmt->execute(['tenant_id' => $tenantId]);
        $stats = $stmt->fetch(PDO::FETCH_ASSOC);

        $trackStmt = $this->pdo->prepare("
            SELECT 
                COALESCE(SUM(actual_expenses), 0) as total_spent,
                COALESCE(SUM(budget_remaining), 0) as total_remaining,
                COALESCE(AVG(percentage_used), 0) as avg_utilization
            FROM budget_tracking bt
            JOIN budgets b ON bt.budget_id = b.id
            WHERE b.tenant_id = :tenant_id AND b.is_deleted = 0
        ");
        $trackStmt->execute(['tenant_id' => $tenantId]);
        $trackData = $trackStmt->fetch(PDO::FETCH_ASSOC);

        return array_merge($stats, $trackData);
    }
}
