<?php
/**
 * Z-FINANCE 1.0.0 - Department Management Engine
 * File: /modules/departments/classes/DepartmentManager.php
 */

class DepartmentManager {
    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getDepartments(int $tenantId = 1): array {
        $stmt = $this->pdo->prepare("SELECT d.*, 
                                    (SELECT COUNT(*) FROM employees e WHERE e.department_id = d.id) AS member_count
                                    FROM departments d
                                    WHERE d.tenant_id = :tenant_id
                                    ORDER BY d.id ASC");
        $stmt->execute([':tenant_id' => $tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createDepartment(string $code, string $name, string $desc = '', int $tenantId = 1): int {
        $stmt = $this->pdo->prepare("INSERT INTO departments (tenant_id, department_code, department_name, description) VALUES (:tenant_id, :code, :name, :desc)");
        $stmt->execute([
            ':tenant_id' => $tenantId,
            ':code' => $code,
            ':name' => $name,
            ':desc' => $desc
        ]);
        return (int) $this->pdo->lastInsertId();
    }
}
