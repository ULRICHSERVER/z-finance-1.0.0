<?php
/**
 * Z-FINANCE 1.0.0 - Recruitment & Applicant Tracking System (ATS) Engine
 */

namespace ZFinance\Modules\Recruitment;

use PDO;
use Exception;

class RecruitmentManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getJobPositions(): array
    {
        $stmt = $this->db->prepare("
            SELECT j.*, COUNT(a.id) AS applicants_count
            FROM job_positions j
            LEFT JOIN job_applications a ON j.id = a.job_position_id
            WHERE j.tenant_id = :tenant_id
            GROUP BY j.id
            ORDER BY j.id DESC
        ");
        $stmt->execute(['tenant_id' => $this->tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function createJobPosition(array $data): int
    {
        $stmt = $this->db->prepare("
            INSERT INTO job_positions (tenant_id, title, department, description, vacancies, min_salary, max_salary, status)
            VALUES (:tenant_id, :title, :dept, :desc, :vacancies, :min_sal, :max_sal, 'open')
        ");

        $stmt->execute([
            'tenant_id' => $this->tenantId,
            'title' => $data['title'],
            'dept' => $data['department'],
            'desc' => $data['description'] ?? null,
            'vacancies' => $data['vacancies'] ?? 1,
            'min_sal' => $data['min_salary'] ?? 0.00,
            'max_sal' => $data['max_salary'] ?? 0.00
        ]);

        return (int)$this->db->lastInsertId();
    }
}
