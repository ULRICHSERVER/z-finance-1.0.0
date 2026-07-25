<?php
/**
 * Z-FINANCE 1.0.0 - Expense Category Manager Class
 * Manages expense taxonomy, icons, colors, and status states.
 */

class ExpenseCategoryManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getCategories($tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT ec.*, COUNT(e.id) as transaction_count, COALESCE(SUM(e.amount), 0) as total_spent
            FROM expense_categories ec
            LEFT JOIN expenses e ON ec.id = e.category_id AND e.is_deleted = 0
            WHERE ec.tenant_id = :tenant_id AND ec.is_deleted = 0
            GROUP BY ec.id
            ORDER BY ec.category_name ASC
        ");
        $stmt->execute(['tenant_id' => $tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createCategory($data, $tenantId = 1, $userId = 1) {
        $code = $data['category_code'] ?? 'EXP-' . strtoupper(substr(md5(uniqid(rand(), true)), 0, 6));

        $stmt = $this->pdo->prepare("
            INSERT INTO expense_categories (tenant_id, category_name, category_code, description, color_code, icon, status, created_by)
            VALUES (:tenant_id, :category_name, :category_code, :description, :color_code, :icon, :status, :created_by)
        ");

        $stmt->execute([
            'tenant_id' => $tenantId,
            'category_name' => $data['category_name'],
            'category_code' => $code,
            'description' => $data['description'] ?? null,
            'color_code' => $data['color_code'] ?? '#EF4444',
            'icon' => $data['icon'] ?? 'receipt',
            'status' => $data['status'] ?? 'active',
            'created_by' => $userId
        ]);

        return $this->pdo->lastInsertId();
    }

    public function updateCategory($id, $data, $tenantId = 1) {
        $stmt = $this->pdo->prepare("
            UPDATE expense_categories 
            SET category_name = :category_name, description = :description, color_code = :color_code, icon = :icon, status = :status
            WHERE id = :id AND tenant_id = :tenant_id
        ");

        return $stmt->execute([
            'id' => $id,
            'tenant_id' => $tenantId,
            'category_name' => $data['category_name'],
            'description' => $data['description'] ?? null,
            'color_code' => $data['color_code'] ?? '#EF4444',
            'icon' => $data['icon'] ?? 'receipt',
            'status' => $data['status'] ?? 'active'
        ]);
    }

    public function deleteCategory($id, $tenantId = 1) {
        $stmt = $this->pdo->prepare("UPDATE expense_categories SET is_deleted = 1 WHERE id = :id AND tenant_id = :tenant_id");
        return $stmt->execute(['id' => $id, 'tenant_id' => $tenantId]);
    }
}
