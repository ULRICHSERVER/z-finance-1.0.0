<?php
/**
 * Z-FINANCE 1.0.0 - Team Management Engine
 * File: /modules/teams/classes/TeamManager.php
 */

class TeamManager {
    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getTeams(int $tenantId = 1): array {
        $stmt = $this->pdo->prepare("SELECT t.*, d.department_name,
                                    (SELECT COUNT(*) FROM team_members tm WHERE tm.team_id = t.id) AS member_count
                                    FROM teams t
                                    LEFT JOIN departments d ON t.department_id = d.id
                                    WHERE t.tenant_id = :tenant_id
                                    ORDER BY t.id ASC");
        $stmt->execute([':tenant_id' => $tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createTeam(string $name, string $desc = '', ?int $deptId = null, int $tenantId = 1): int {
        $stmt = $this->pdo->prepare("INSERT INTO teams (tenant_id, team_name, description, department_id) VALUES (:tenant_id, :name, :desc, :dept_id)");
        $stmt->execute([
            ':tenant_id' => $tenantId,
            ':name' => $name,
            ':desc' => $desc,
            ':dept_id' => $deptId
        ]);
        return (int) $this->pdo->lastInsertId();
    }
}
