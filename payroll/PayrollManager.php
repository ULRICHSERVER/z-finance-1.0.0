<?php
/**
 * Z-FINANCE 1.0.0 - Enterprise Payroll & General Ledger Integration Engine
 */

namespace ZFinance\Modules\Payroll;

use PDO;
use Exception;

class PayrollManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    /**
     * Process Monthly Bulk Payroll and generate Payslips & Accounting Entries
     */
    public function processBulkPayroll(string $periodCode): array
    {
        $this->db->beginTransaction();

        try {
            // Fetch or create payroll period
            $stmt = $this->db->prepare("SELECT id FROM payroll_periods WHERE tenant_id = :tenant_id AND period_code = :pcode");
            $stmt->execute(['tenant_id' => $this->tenantId, 'pcode' => $periodCode]);
            $periodId = $stmt->fetchColumn();

            if (!$periodId) {
                $insPeriod = $this->db->prepare("
                    INSERT INTO payroll_periods (tenant_id, period_code, start_date, end_date, status)
                    VALUES (:tenant_id, :pcode, :sdate, :edate, 'processing')
                ");
                $insPeriod->execute([
                    'tenant_id' => $this->tenantId,
                    'pcode' => $periodCode,
                    'sdate' => date('Y-m-01'),
                    'edate' => date('Y-m-t')
                ]);
                $periodId = (int)$this->db->lastInsertId();
            }

            // Fetch active employees
            $empStmt = $this->db->prepare("SELECT * FROM employees_hr WHERE tenant_id = :tenant_id AND status = 'active'");
            $empStmt->execute(['tenant_id' => $this->tenantId]);
            $employees = $empStmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

            $totalGross = 0.00;
            $totalTax = 0.00;
            $totalNet = 0.00;

            $payRecordStmt = $this->db->prepare("
                INSERT INTO payroll_records 
                (payroll_period_id, employee_id, basic_salary, total_allowances, total_bonuses, gross_salary, total_taxes, pension_deduction, other_deductions, net_salary, payment_status)
                VALUES (:period_id, :emp_id, :basic, :allowance, :bonus, :gross, :tax, :pension, :other, :net, 'paid')
            ");

            foreach ($employees as $emp) {
                $basic = (float)$emp['basic_salary'];
                $allowances = $basic * 0.15; // 15% housing/transport allowances
                $bonuses = 0.00;
                $gross = $basic + $allowances + $bonuses;

                $tax = $gross * 0.10; // 10% income tax
                $pension = $gross * 0.08; // 8% statutory pension deduction
                $other = 0.00;

                $net = $gross - ($tax + $pension + $other);

                $payRecordStmt->execute([
                    'period_id' => $periodId,
                    'emp_id' => $emp['id'],
                    'basic' => $basic,
                    'allowance' => $allowances,
                    'bonus' => $bonuses,
                    'gross' => $gross,
                    'tax' => $tax,
                    'pension' => $pension,
                    'other' => $other,
                    'net' => $net
                ]);

                $totalGross += $gross;
                $totalTax += $tax;
                $totalNet += $net;
            }

            // Lock payroll period
            $lockStmt = $this->db->prepare("UPDATE payroll_periods SET status = 'locked', processed_at = NOW() WHERE id = :id");
            $lockStmt->execute(['id' => $periodId]);

            $this->db->commit();

            return [
                'status' => 'success',
                'period_code' => $periodCode,
                'employees_processed' => count($employees),
                'total_gross' => $totalGross,
                'total_tax' => $totalTax,
                'total_net' => $totalNet
            ];
        } catch (Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }
}
