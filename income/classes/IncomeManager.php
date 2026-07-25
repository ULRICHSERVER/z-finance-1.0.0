<?php
/**
 * Z-FINANCE 1.0.0 - Income Manager Class
 * Handles income creation, editing, deletion, search, filtering, and dashboard statistics.
 */

class IncomeManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getDashboardStats($tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT 
                COALESCE(SUM(amount), 0) as total_income,
                COALESCE(SUM(CASE WHEN income_date = CURRENT_DATE THEN amount ELSE 0 END), 0) as today_income,
                COALESCE(SUM(CASE WHEN income_date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY) THEN amount ELSE 0 END), 0) as weekly_income,
                COALESCE(SUM(CASE WHEN income_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY) THEN amount ELSE 0 END), 0) as monthly_income,
                COALESCE(SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END), 0) as pending_income,
                COALESCE(SUM(CASE WHEN is_recurring = 1 THEN amount ELSE 0 END), 0) as recurring_income,
                COALESCE(SUM(CASE WHEN status = 'cancelled' THEN amount ELSE 0 END), 0) as cancelled_income,
                COALESCE(SUM(CASE WHEN status = 'refunded' THEN amount ELSE 0 END), 0) as refunded_income,
                COALESCE(AVG(amount), 0) as avg_income,
                COUNT(*) as total_transactions
            FROM income 
            WHERE tenant_id = :tenant_id AND is_deleted = 0
        ");
        $stmt->execute(['tenant_id' => $tenantId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getIncomeRecords($tenantId = 1, $filters = []) {
        $sql = "SELECT i.*, ic.category_name, ic.color_code, isr.source_name
                FROM income i
                LEFT JOIN income_categories ic ON i.category_id = ic.id
                LEFT JOIN income_sources isr ON i.source_id = isr.id
                WHERE i.tenant_id = :tenant_id AND i.is_deleted = 0";
        
        $params = ['tenant_id' => $tenantId];

        if (!empty($filters['status'])) {
            $sql .= " AND i.status = :status";
            $params['status'] = $filters['status'];
        }

        if (!empty($filters['category_id'])) {
            $sql .= " AND i.category_id = :category_id";
            $params['category_id'] = $filters['category_id'];
        }

        if (!empty($filters['source_id'])) {
            $sql .= " AND i.source_id = :source_id";
            $params['source_id'] = $filters['source_id'];
        }

        if (!empty($filters['customer_id'])) {
            $sql .= " AND i.customer_id = :customer_id";
            $params['customer_id'] = $filters['customer_id'];
        }

        if (!empty($filters['search'])) {
            $sql .= " AND (i.title LIKE :search OR i.reference_no LIKE :search OR i.description LIKE :search)";
            $params['search'] = '%' . $filters['search'] . '%';
        }

        $sql .= " ORDER BY i.income_date DESC, i.id DESC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getIncomeById($id, $tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT i.*, ic.category_name, isr.source_name
            FROM income i
            LEFT JOIN income_categories ic ON i.category_id = ic.id
            LEFT JOIN income_sources isr ON i.source_id = isr.id
            WHERE i.id = :id AND i.tenant_id = :tenant_id AND i.is_deleted = 0
        ");
        $stmt->execute(['id' => $id, 'tenant_id' => $tenantId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createIncome($data, $tenantId = 1, $userId = 1) {
        $ref = $data['reference_no'] ?? 'INC-' . strtoupper(substr(md5(uniqid(rand(), true)), 0, 8));

        $stmt = $this->pdo->prepare("
            INSERT INTO income (tenant_id, reference_no, title, category_id, source_id, customer_id, service_id, project_id, amount, currency, exchange_rate, base_amount, payment_method, income_date, status, description, notes, is_recurring, created_by)
            VALUES (:tenant_id, :reference_no, :title, :category_id, :source_id, :customer_id, :service_id, :project_id, :amount, :currency, :exchange_rate, :base_amount, :payment_method, :income_date, :status, :description, :notes, :is_recurring, :created_by)
        ");

        $amount = (float)($data['amount'] ?? 0);
        $rate = (float)($data['exchange_rate'] ?? 1.000000);
        $baseAmount = $amount * $rate;

        $stmt->execute([
            'tenant_id' => $tenantId,
            'reference_no' => $ref,
            'title' => $data['title'],
            'category_id' => $data['category_id'],
            'source_id' => $data['source_id'],
            'customer_id' => $data['customer_id'] ?? null,
            'service_id' => $data['service_id'] ?? null,
            'project_id' => $data['project_id'] ?? null,
            'amount' => $amount,
            'currency' => $data['currency'] ?? 'USD',
            'exchange_rate' => $rate,
            'base_amount' => $baseAmount,
            'payment_method' => $data['payment_method'] ?? 'Bank Transfer',
            'income_date' => $data['income_date'] ?? date('Y-m-d'),
            'status' => $data['status'] ?? 'received',
            'description' => $data['description'] ?? null,
            'notes' => $data['notes'] ?? null,
            'is_recurring' => isset($data['is_recurring']) ? (int)$data['is_recurring'] : 0,
            'created_by' => $userId
        ]);

        return $this->pdo->lastInsertId();
    }

    public function updateIncome($id, $data, $tenantId = 1) {
        $amount = (float)($data['amount'] ?? 0);
        $rate = (float)($data['exchange_rate'] ?? 1.000000);
        $baseAmount = $amount * $rate;

        $stmt = $this->pdo->prepare("
            UPDATE income 
            SET title = :title, category_id = :category_id, source_id = :source_id, customer_id = :customer_id,
                amount = :amount, currency = :currency, exchange_rate = :exchange_rate, base_amount = :base_amount,
                payment_method = :payment_method, income_date = :income_date, status = :status, description = :description, notes = :notes
            WHERE id = :id AND tenant_id = :tenant_id
        ");

        return $stmt->execute([
            'id' => $id,
            'tenant_id' => $tenantId,
            'title' => $data['title'],
            'category_id' => $data['category_id'],
            'source_id' => $data['source_id'],
            'customer_id' => $data['customer_id'] ?? null,
            'amount' => $amount,
            'currency' => $data['currency'] ?? 'USD',
            'exchange_rate' => $rate,
            'base_amount' => $baseAmount,
            'payment_method' => $data['payment_method'] ?? 'Bank Transfer',
            'income_date' => $data['income_date'] ?? date('Y-m-d'),
            'status' => $data['status'] ?? 'received',
            'description' => $data['description'] ?? null,
            'notes' => $data['notes'] ?? null
        ]);
    }

    public function deleteIncome($id, $tenantId = 1) {
        $stmt = $this->pdo->prepare("UPDATE income SET is_deleted = 1 WHERE id = :id AND tenant_id = :tenant_id");
        return $stmt->execute(['id' => $id, 'tenant_id' => $tenantId]);
    }
}
