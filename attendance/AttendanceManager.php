<?php
/**
 * Z-FINANCE 1.0.0 - Biometric, QR & Mobile Attendance Engine
 */

namespace ZFinance\Modules\Attendance;

use PDO;
use Exception;

class AttendanceManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    /**
     * Record Check-In via QR Code, Manual, or Biometric
     */
    public function recordCheckIn(int $employeeId, string $method = 'qr_code'): bool
    {
        $today = date('Y-m-d');
        $checkInTime = date('Y-m-d H:i:s');

        // Check if shift is late (e.g. after 09:15 AM)
        $hour = (int)date('H');
        $minute = (int)date('i');
        $status = ($hour > 9 || ($hour === 9 && $minute > 15)) ? 'late' : 'present';

        $stmt = $this->db->prepare("
            INSERT INTO attendance (tenant_id, employee_id, attendance_date, check_in, check_in_method, status)
            VALUES (:tenant_id, :emp_id, :adate, :cin, :method, :status)
            ON DUPLICATE KEY UPDATE check_in = :cin_upd, status = :status_upd
        ");

        return $stmt->execute([
            'tenant_id' => $this->tenantId,
            'emp_id' => $employeeId,
            'adate' => $today,
            'cin' => $checkInTime,
            'method' => $method,
            'status' => $status,
            'cin_upd' => $checkInTime,
            'status_upd' => $status
        ]);
    }

    /**
     * Record Check-Out and calculate work hours
     */
    public function recordCheckOut(int $employeeId): bool
    {
        $today = date('Y-m-d');
        $checkOutTime = date('Y-m-d H:i:s');

        $stmt = $this->db->prepare("
            UPDATE attendance 
            SET check_out = :cout,
                work_hours = ROUND(TIMESTAMPDIFF(MINUTE, check_in, :cout) / 60.0, 2)
            WHERE tenant_id = :tenant_id AND employee_id = :emp_id AND attendance_date = :adate
        ");

        return $stmt->execute([
            'cout' => $checkOutTime,
            'tenant_id' => $this->tenantId,
            'emp_id' => $employeeId,
            'adate' => $today
        ]);
    }
}
