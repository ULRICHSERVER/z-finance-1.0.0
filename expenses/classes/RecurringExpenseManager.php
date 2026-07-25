<?php
/**
 * Z-FINANCE 1.0.0 - Recurring Expense Manager Class
 * Handles automated recurring bills, subscriptions, rent, and utility disbursements.
 */

class RecurringExpenseManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getRecurringSchedules($tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT re.*, ec.category_name
            FROM recurring_expenses re
            LEFT JOIN expense_categories ec ON re.category_id = ec.id
            WHERE re.tenant_id = :tenant_id
            ORDER BY re.next_run_date ASC
        ");
        $stmt->execute(['tenant_id' => $tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createRecurringSchedule($data, $tenantId = 1) {
        $stmt = $this->pdo->prepare("
            INSERT INTO recurring_expenses (tenant_id, title, category_id, supplier_id, amount, currency, frequency, custom_interval_days, start_date, expiration_date, next_run_date, status)
            VALUES (:tenant_id, :title, :category_id, :supplier_id, :amount, :currency, :frequency, :custom_interval_days, :start_date, :expiration_date, :next_run_date, :status)
        ");

        $startDate = $data['start_date'] ?? date('Y-m-d');

        $stmt->execute([
            'tenant_id' => $tenantId,
            'title' => $data['title'],
            'category_id' => $data['category_id'],
            'supplier_id' => $data['supplier_id'] ?? null,
            'amount' => (float)$data['amount'],
            'currency' => $data['currency'] ?? 'USD',
            'frequency' => $data['frequency'] ?? 'monthly',
            'custom_interval_days' => $data['custom_interval_days'] ?? 30,
            'start_date' => $startDate,
            'expiration_date' => $data['expiration_date'] ?? null,
            'next_run_date' => $startDate,
            'status' => $data['status'] ?? 'active'
        ]);

        return $this->pdo->lastInsertId();
    }

    public function toggleStatus($id, $status, $tenantId = 1) {
        $stmt = $this->pdo->prepare("UPDATE recurring_expenses SET status = :status WHERE id = :id AND tenant_id = :tenant_id");
        return $stmt->execute(['status' => $status, 'id' => $id, 'tenant_id' => $tenantId]);
    }
}
