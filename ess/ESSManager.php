<?php
/**
 * Z-FINANCE 1.0.0 - Employee Self-Service (ESS) Portal Engine
 */

namespace ZFinance\Modules\ESS;

use PDO;
use Exception;

class ESSManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getEmployeeProfile(int $employeeId): array
    {
        $stmt = $this->db->prepare("SELECT * FROM employees_hr WHERE tenant_id = :tenant_id AND id = :id");
        $stmt->execute(['tenant_id' => $this->tenantId, 'id' => $employeeId]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: [];
    }
}
