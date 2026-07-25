<?php
/**
 * Z-FINANCE 1.0.0 - Income Report Manager Class
 * Aggregates revenue data by category, source, customer, project, and period.
 */

class IncomeReportManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getIncomeByCategoryReport($tenantId = 1, $startDate = null, $endDate = null) {
        $sql = "SELECT ic.category_name, ic.color_code, COUNT(i.id) as total_count, COALESCE(SUM(i.amount), 0) as total_revenue
                FROM income_categories ic
                LEFT JOIN income i ON ic.id = i.category_id AND i.is_deleted = 0
                WHERE ic.tenant_id = :tenant_id";
        
        $params = ['tenant_id' => $tenantId];

        if ($startDate && $endDate) {
            $sql .= " AND i.income_date BETWEEN :start_date AND :end_date";
            $params['start_date'] = $startDate;
            $params['end_date'] = $endDate;
        }

        $sql .= " GROUP BY ic.id ORDER BY total_revenue DESC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getMonthlyBreakdown($tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT 
                DATE_FORMAT(income_date, '%Y-%m') as month_year,
                COUNT(*) as transaction_count,
                SUM(amount) as total_amount
            FROM income
            WHERE tenant_id = :tenant_id AND is_deleted = 0
            GROUP BY month_year
            ORDER BY month_year DESC
            LIMIT 12
        ");
        $stmt->execute(['tenant_id' => $tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
