<?php
/**
 * Z-FINANCE 1.0.0 - Employee Management Engine
 * File: /modules/employees/classes/EmployeeManager.php
 */

class EmployeeManager {
    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getEmployees(int $tenantId = 1, ?string $search = null, ?int $deptId = null, ?int $teamId = null): array {
        $sql = "SELECT e.*, d.department_name, t.team_name, r.role_name 
                FROM employees e
                LEFT JOIN departments d ON e.department_id = d.id
                LEFT JOIN teams t ON e.team_id = t.id
                LEFT JOIN roles r ON e.role_id = r.id
                WHERE e.tenant_id = :tenant_id";
        
        $params = [':tenant_id' => $tenantId];

        if ($search) {
            $sql .= " AND (e.first_name LIKE :search OR e.last_name LIKE :search OR e.email LIKE :search OR e.employee_code LIKE :search)";
            $params[':search'] = "%{$search}%";
        }

        if ($deptId) {
            $sql .= " AND e.department_id = :dept_id";
            $params[':dept_id'] = $deptId;
        }

        if ($teamId) {
            $sql .= " AND e.team_id = :team_id";
            $params[':team_id'] = $teamId;
        }

        $sql .= " ORDER BY e.id DESC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getEmployeeById(int $id, int $tenantId = 1): ?array {
        $stmt = $this->pdo->prepare("SELECT e.*, d.department_name, t.team_name, r.role_name 
                                    FROM employees e
                                    LEFT JOIN departments d ON e.department_id = d.id
                                    LEFT JOIN teams t ON e.team_id = t.id
                                    LEFT JOIN roles r ON e.role_id = r.id
                                    WHERE e.id = :id AND e.tenant_id = :tenant_id");
        $stmt->execute([':id' => $id, ':tenant_id' => $tenantId]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        return $res ?: null;
    }

    public function createEmployee(array $data, int $tenantId = 1): int {
        $stmt = $this->pdo->prepare("INSERT INTO employees (
            tenant_id, employee_code, first_name, last_name, phone, email, 
            job_title, department_id, team_id, role_id, employment_type, joining_date, status, biography, skills
        ) VALUES (
            :tenant_id, :employee_code, :first_name, :last_name, :phone, :email,
            :job_title, :department_id, :team_id, :role_id, :employment_type, :joining_date, :status, :biography, :skills
        )");

        $stmt->execute([
            ':tenant_id' => $tenantId,
            ':employee_code' => $data['employee_code'] ?? 'EMP-' . rand(1000, 9999),
            ':first_name' => $data['first_name'],
            ':last_name' => $data['last_name'],
            ':phone' => $data['phone'] ?? '',
            ':email' => $data['email'],
            ':job_title' => $data['job_title'] ?? 'Staff Member',
            ':department_id' => $data['department_id'] ?? null,
            ':team_id' => $data['team_id'] ?? null,
            ':role_id' => $data['role_id'] ?? null,
            ':employment_type' => $data['employment_type'] ?? 'full_time',
            ':joining_date' => $data['joining_date'] ?? date('Y-m-d'),
            ':status' => $data['status'] ?? 'active',
            ':biography' => $data['biography'] ?? '',
            ':skills' => $data['skills'] ?? ''
        ]);

        return (int) $this->pdo->lastInsertId();
    }

    public function updateEmployeeStatus(int $id, string $status, int $tenantId = 1): bool {
        $stmt = $this->pdo->prepare("UPDATE employees SET status = :status WHERE id = :id AND tenant_id = :tenant_id");
        return $stmt->execute([':status' => $status, ':id' => $id, ':tenant_id' => $tenantId]);
    }

    public function logActivity(int $empId, string $action, string $module, int $tenantId = 1): bool {
        $stmt = $this->pdo->prepare("INSERT INTO employee_activity_logs (tenant_id, employee_id, action_performed, module_affected, ip_address) VALUES (:tenant_id, :employee_id, :action_performed, :module_affected, :ip)");
        return $stmt->execute([
            ':tenant_id' => $tenantId,
            ':employee_id' => $empId,
            ':action_performed' => $action,
            ':module_affected' => $module,
            ':ip' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'
        ]);
    }
}
