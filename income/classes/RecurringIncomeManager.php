<?php
/**
 * Z-FINANCE 1.0.0 - Recurring Income Manager Class
 * Handles automated generation schedules for daily, weekly, monthly, quarterly, and annual retainers.
 */

class RecurringIncomeManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getRecurringSchedules($tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT ir.*, ic.category_name, isr.source_name
            FROM income_recurring ir
            LEFT JOIN income_categories ic ON ir.category_id = ic.id
            LEFT JOIN income_sources isr ON ir.source_id = isr.id
            WHERE ir.tenant_id = :tenant_id
            ORDER BY ir.next_run_date ASC
        ");
        $stmt->execute(['tenant_id' => $tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createRecurringSchedule($data, $tenantId = 1) {
        $stmt = $this->pdo->prepare("
            INSERT INTO income_recurring (tenant_id, title, category_id, source_id, customer_id, service_id, project_id, amount, currency, frequency, custom_interval_days, start_date, end_date, next_run_date, status, auto_receive)
            VALUES (:tenant_id, :title, :category_id, :source_id, :customer_id, :service_id, :project_id, :amount, :currency, :frequency, :custom_interval_days, :start_date, :end_date, :next_run_date, :status, :auto_receive)
        ");

        $startDate = $data['start_date'] ?? date('Y-m-d');

        $stmt->execute([
            'tenant_id' => $tenantId,
            'title' => $data['title'],
            'category_id' => $data['category_id'],
            'source_id' => $data['source_id'],
            'customer_id' => $data['customer_id'] ?? null,
            'service_id' => $data['service_id'] ?? null,
            'project_id' => $data['project_id'] ?? null,
            'amount' => (float)$data['amount'],
            'currency' => $data['currency'] ?? 'USD',
            'frequency' => $data['frequency'] ?? 'monthly',
            'custom_interval_days' => $data['custom_interval_days'] ?? 30,
            'start_date' => $startDate,
            'end_date' => $data['end_date'] ?? null,
            'next_run_date' => $startDate,
            'status' => $data['status'] ?? 'active',
            'auto_receive' => isset($data['auto_receive']) ? (int)$data['auto_receive'] : 1
        ]);

        return $this->pdo->lastInsertId();
    }

    public function toggleStatus($id, $status, $tenantId = 1) {
        $stmt = $this->pdo->prepare("UPDATE income_recurring SET status = :status WHERE id = :id AND tenant_id = :tenant_id");
        return $stmt->execute(['status' => $status, 'id' => $id, 'tenant_id' => $tenantId]);
    }
}
