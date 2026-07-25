<?php
/**
 * Z-FINANCE 1.0.0 - Leave Management Engine
 */

namespace ZFinance\Modules\Leave;

use PDO;
use Exception;

class LeaveManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getLeaveRequests(): array
    {
        $stmt = $this->db->prepare("
            SELECT 
                r.*,
                CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
                e.department,
                t.name AS leave_type_name
            FROM leave_requests r
            JOIN employees_hr e ON r.employee_id = e.id
            JOIN leave_types t ON r.leave_type_id = t.id
            WHERE r.tenant_id = :tenant_id
            ORDER BY r.id DESC
        ");
        $stmt->execute(['tenant_id' => $this->tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function submitLeaveRequest(array $data): int
    {
        $stmt = $this->db->prepare("
            INSERT INTO leave_requests (tenant_id, employee_id, leave_type_id, start_date, end_date, total_days, reason, status)
            VALUES (:tenant_id, :emp_id, :type_id, :sdate, :edate, :days, :reason, 'pending')
        ");

        $stmt->execute([
            'tenant_id' => $this->tenantId,
            'emp_id' => $data['employee_id'],
            'type_id' => $data['leave_type_id'],
            'sdate' => $data['start_date'],
            'edate' => $data['end_date'],
            'days' => $data['total_days'],
            'reason' => $data['reason'] ?? null
        ]);

        return (int)$this->db->lastInsertId();
    }
}
