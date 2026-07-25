<?php
/**
 * Z-FINANCE 1.0.0 - Expense Manager Class
 * Handles expense recording, editing, deletion, filtering, dashboard stats, and status updates.
 */

class ExpenseManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getDashboardStats($tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT 
                COALESCE(SUM(amount), 0) as total_expenses,
                COALESCE(SUM(CASE WHEN expense_date = CURRENT_DATE THEN amount ELSE 0 END), 0) as today_expenses,
                COALESCE(SUM(CASE WHEN expense_date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY) THEN amount ELSE 0 END), 0) as weekly_expenses,
                COALESCE(SUM(CASE WHEN expense_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY) THEN amount ELSE 0 END), 0) as monthly_expenses,
                COALESCE(SUM(CASE WHEN approval_status = 'pending' THEN amount ELSE 0 END), 0) as pending_expenses,
                COALESCE(SUM(CASE WHEN approval_status = 'approved' THEN amount ELSE 0 END), 0) as approved_expenses,
                COALESCE(SUM(CASE WHEN approval_status = 'rejected' THEN amount ELSE 0 END), 0) as rejected_expenses,
                COALESCE(SUM(CASE WHEN is_recurring = 1 THEN amount ELSE 0 END), 0) as recurring_expenses,
                COALESCE(AVG(amount), 0) as avg_expense,
                COUNT(*) as total_transactions
            FROM expenses 
            WHERE tenant_id = :tenant_id AND is_deleted = 0
        ");
        $stmt->execute(['tenant_id' => $tenantId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getExpenseRecords($tenantId = 1, $filters = []) {
        $sql = "SELECT e.*, ec.category_name, ec.color_code
                FROM expenses e
                LEFT JOIN expense_categories ec ON e.category_id = ec.id
                WHERE e.tenant_id = :tenant_id AND e.is_deleted = 0";
        
        $params = ['tenant_id' => $tenantId];

        if (!empty($filters['approval_status'])) {
            $sql .= " AND e.approval_status = :approval_status";
            $params['approval_status'] = $filters['approval_status'];
        }

        if (!empty($filters['payment_status'])) {
            $sql .= " AND e.payment_status = :payment_status";
            $params['payment_status'] = $filters['payment_status'];
        }

        if (!empty($filters['category_id'])) {
            $sql .= " AND e.category_id = :category_id";
            $params['category_id'] = $filters['category_id'];
        }

        if (!empty($filters['supplier_id'])) {
            $sql .= " AND e.supplier_id = :supplier_id";
            $params['supplier_id'] = $filters['supplier_id'];
        }

        if (!empty($filters['search'])) {
            $sql .= " AND (e.title LIKE :search OR e.reference_no LIKE :search OR e.receipt_no LIKE :search OR e.invoice_no LIKE :search OR e.description LIKE :search)";
            $params['search'] = '%' . $filters['search'] . '%';
        }

        $sql .= " ORDER BY e.expense_date DESC, e.id DESC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getExpenseById($id, $tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT e.*, ec.category_name, ec.color_code
            FROM expenses e
            LEFT JOIN expense_categories ec ON e.category_id = ec.id
            WHERE e.id = :id AND e.tenant_id = :tenant_id AND e.is_deleted = 0
        ");
        $stmt->execute(['id' => $id, 'tenant_id' => $tenantId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createExpense($data, $tenantId = 1, $userId = 1) {
        $ref = $data['reference_no'] ?? 'EXP-' . strtoupper(substr(md5(uniqid(rand(), true)), 0, 8));

        $amount = (float)($data['amount'] ?? 0);
        $rate = (float)($data['exchange_rate'] ?? 1.000000);
        $tax = (float)($data['tax_amount'] ?? 0);
        $discount = (float)($data['discount'] ?? 0);
        $fees = (float)($data['fees'] ?? 0);

        $baseAmount = $amount * $rate;
        $netAmount = $baseAmount + $tax + $fees - $discount;

        $stmt = $this->pdo->prepare("
            INSERT INTO expenses (tenant_id, reference_no, title, category_id, supplier_id, customer_id, service_id, project_id, expense_date, amount, currency, exchange_rate, base_amount, tax_amount, discount, fees, net_amount, payment_method, payment_status, approval_status, receipt_no, invoice_no, description, notes, is_recurring, created_by)
            VALUES (:tenant_id, :reference_no, :title, :category_id, :supplier_id, :customer_id, :service_id, :project_id, :expense_date, :amount, :currency, :exchange_rate, :base_amount, :tax_amount, :discount, :fees, :net_amount, :payment_method, :payment_status, :approval_status, :receipt_no, :invoice_no, :description, :notes, :is_recurring, :created_by)
        ");

        $stmt->execute([
            'tenant_id' => $tenantId,
            'reference_no' => $ref,
            'title' => $data['title'],
            'category_id' => $data['category_id'],
            'supplier_id' => $data['supplier_id'] ?? null,
            'customer_id' => $data['customer_id'] ?? null,
            'service_id' => $data['service_id'] ?? null,
            'project_id' => $data['project_id'] ?? null,
            'expense_date' => $data['expense_date'] ?? date('Y-m-d'),
            'amount' => $amount,
            'currency' => $data['currency'] ?? 'USD',
            'exchange_rate' => $rate,
            'base_amount' => $baseAmount,
            'tax_amount' => $tax,
            'discount' => $discount,
            'fees' => $fees,
            'net_amount' => $netAmount,
            'payment_method' => $data['payment_method'] ?? 'Bank Transfer',
            'payment_status' => $data['payment_status'] ?? 'paid',
            'approval_status' => $data['approval_status'] ?? 'pending',
            'receipt_no' => $data['receipt_no'] ?? null,
            'invoice_no' => $data['invoice_no'] ?? null,
            'description' => $data['description'] ?? null,
            'notes' => $data['notes'] ?? null,
            'is_recurring' => isset($data['is_recurring']) ? (int)$data['is_recurring'] : 0,
            'created_by' => $userId
        ]);

        return $this->pdo->lastInsertId();
    }

    public function updateExpense($id, $data, $tenantId = 1) {
        $amount = (float)($data['amount'] ?? 0);
        $rate = (float)($data['exchange_rate'] ?? 1.000000);
        $tax = (float)($data['tax_amount'] ?? 0);
        $discount = (float)($data['discount'] ?? 0);
        $fees = (float)($data['fees'] ?? 0);

        $baseAmount = $amount * $rate;
        $netAmount = $baseAmount + $tax + $fees - $discount;

        $stmt = $this->pdo->prepare("
            UPDATE expenses 
            SET title = :title, category_id = :category_id, supplier_id = :supplier_id, amount = :amount,
                currency = :currency, exchange_rate = :exchange_rate, base_amount = :base_amount, tax_amount = :tax_amount,
                discount = :discount, fees = :fees, net_amount = :net_amount, payment_method = :payment_method,
                payment_status = :payment_status, receipt_no = :receipt_no, invoice_no = :invoice_no, description = :description, notes = :notes
            WHERE id = :id AND tenant_id = :tenant_id
        ");

        return $stmt->execute([
            'id' => $id,
            'tenant_id' => $tenantId,
            'title' => $data['title'],
            'category_id' => $data['category_id'],
            'supplier_id' => $data['supplier_id'] ?? null,
            'amount' => $amount,
            'currency' => $data['currency'] ?? 'USD',
            'exchange_rate' => $rate,
            'base_amount' => $baseAmount,
            'tax_amount' => $tax,
            'discount' => $discount,
            'fees' => $fees,
            'net_amount' => $netAmount,
            'payment_method' => $data['payment_method'] ?? 'Bank Transfer',
            'payment_status' => $data['payment_status'] ?? 'paid',
            'receipt_no' => $data['receipt_no'] ?? null,
            'invoice_no' => $data['invoice_no'] ?? null,
            'description' => $data['description'] ?? null,
            'notes' => $data['notes'] ?? null
        ]);
    }

    public function deleteExpense($id, $tenantId = 1) {
        $stmt = $this->pdo->prepare("UPDATE expenses SET is_deleted = 1 WHERE id = :id AND tenant_id = :tenant_id");
        return $stmt->execute(['id' => $id, 'tenant_id' => $tenantId]);
    }
}
