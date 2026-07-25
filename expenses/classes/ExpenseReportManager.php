<?php
/**
 * Z-FINANCE 1.0.0 - Expense Report Manager Class
 * Aggregates expenditure data by category, supplier, project, workspace, and period.
 */

class ExpenseReportManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getExpenseByCategoryReport($tenantId = 1, $startDate = null, $endDate = null) {
        $sql = "SELECT ec.category_name, ec.color_code, COUNT(e.id) as total_count, COALESCE(SUM(e.amount), 0) as total_spent
                FROM expense_categories ec
                LEFT JOIN expenses e ON ec.id = e.category_id AND e.is_deleted = 0
                WHERE ec.tenant_id = :tenant_id";
        
        $params = ['tenant_id' => $tenantId];

        if ($startDate && $endDate) {
            $sql .= " AND e.expense_date BETWEEN :start_date AND :end_date";
            $params['start_date'] = $startDate;
            $params['end_date'] = $endDate;
        }

        $sql .= " GROUP BY ec.id ORDER BY total_spent DESC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getMonthlyBreakdown($tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT 
                DATE_FORMAT(expense_date, '%Y-%m') as month_year,
                COUNT(*) as transaction_count,
                SUM(amount) as total_amount
            FROM expenses
            WHERE tenant_id = :tenant_id AND is_deleted = 0
            GROUP BY month_year
            ORDER BY month_year DESC
            LIMIT 12
        ");
        $stmt->execute(['tenant_id' => $tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
