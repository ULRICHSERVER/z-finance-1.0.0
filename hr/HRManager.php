<?php
/**
 * Z-FINANCE 1.0.0 - Enterprise Human Resources Management System (HRMS) Engine
 */

namespace ZFinance\Modules\HR;

use PDO;
use Exception;

class HRManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    /**
     * Get HR Dashboard KPI Summary Metrics
     */
    public function getHRDashboardSummary(): array
    {
        $metrics = [];

        // Total Active Employees
        $empStmt = $this->db->prepare("SELECT COUNT(*) FROM employees_hr WHERE tenant_id = :tenant_id AND status = 'active'");
        $empStmt->execute(['tenant_id' => $this->tenantId]);
        $metrics['total_employees'] = (int)$empStmt->fetchColumn();

        // Attendance Today
        $today = date('Y-m-d');
        $attStmt = $this->db->prepare("SELECT COUNT(*) FROM attendance WHERE tenant_id = :tenant_id AND attendance_date = :today AND status IN ('present', 'late')");
        $attStmt->execute(['tenant_id' => $this->tenantId, 'today' => $today]);
        $metrics['attendance_today'] = (int)$attStmt->fetchColumn();

        // Absent Today
        $absStmt = $this->db->prepare("SELECT COUNT(*) FROM attendance WHERE tenant_id = :tenant_id AND attendance_date = :today AND status = 'absent'");
        $absStmt->execute(['tenant_id' => $this->tenantId, 'today' => $today]);
        $metrics['absent_today'] = (int)$absStmt->fetchColumn();

        // Pending Leave Requests
        $leaveStmt = $this->db->prepare("SELECT COUNT(*) FROM leave_requests WHERE tenant_id = :tenant_id AND status = 'pending'");
        $leaveStmt->execute(['tenant_id' => $this->tenantId]);
        $metrics['pending_leave_requests'] = (int)$leaveStmt->fetchColumn();

        // Open Job Vacancies
        $jobStmt = $this->db->prepare("SELECT COALESCE(SUM(vacancies), 0) FROM job_positions WHERE tenant_id = :tenant_id AND status = 'open'");
        $jobStmt->execute(['tenant_id' => $this->tenantId]);
        $metrics['open_positions'] = (int)$jobStmt->fetchColumn();

        // Total Monthly Payroll (Current Period estimate)
        $payStmt = $this->db->prepare("SELECT COALESCE(SUM(basic_salary), 0.00) FROM employees_hr WHERE tenant_id = :tenant_id AND status = 'active'");
        $payStmt->execute(['tenant_id' => $this->tenantId]);
        $metrics['monthly_payroll_spend'] = (float)$payStmt->fetchColumn();

        return $metrics;
    }

    /**
     * Fetch list of employees with search and department filtering
     */
    public function getEmployees(array $filters = []): array
    {
        $query = "SELECT * FROM employees_hr WHERE tenant_id = :tenant_id";
        $params = ['tenant_id' => $this->tenantId];

        if (!empty($filters['department'])) {
            $query .= " AND department = :department";
            $params['department'] = $filters['department'];
        }

        if (!empty($filters['status'])) {
            $query .= " AND status = :status";
            $params['status'] = $filters['status'];
        }

        if (!empty($filters['search'])) {
            $query .= " AND (first_name LIKE :search OR last_name LIKE :search OR employee_code LIKE :search OR email LIKE :search)";
            $params['search'] = '%' . $filters['search'] . '%';
        }

        $query .= " ORDER BY first_name ASC";

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    /**
     * Register or Hire a new Employee
     */
    public function createEmployee(array $data): int
    {
        $empCode = 'EMP-' . sprintf('%04d', rand(1000, 9999));
        $qrCode = 'QR-EMP-' . hash('crc32', $empCode . time());

        $stmt = $this->db->prepare("
            INSERT INTO employees_hr 
            (tenant_id, employee_code, first_name, last_name, email, phone, department, job_title, employment_type, joining_date, basic_salary, bank_account, qr_code, status)
            VALUES (:tenant_id, :code, :fname, :lname, :email, :phone, :dept, :title, :type, :joining_date, :salary, :bank, :qr, :status)
        ");

        $stmt->execute([
            'tenant_id' => $this->tenantId,
            'code' => $empCode,
            'fname' => $data['first_name'],
            'lname' => $data['last_name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'dept' => $data['department'],
            'title' => $data['job_title'],
            'type' => $data['employment_type'] ?? 'full_time',
            'joining_date' => $data['joining_date'] ?? date('Y-m-d'),
            'salary' => $data['basic_salary'] ?? 0.00,
            'bank' => $data['bank_account'] ?? null,
            'qr' => $qrCode,
            'status' => 'active'
        ]);

        return (int)$this->db->lastInsertId();
    }
}
