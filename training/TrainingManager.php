<?php
/**
 * Z-FINANCE 1.0.0 - Employee Training & Skills Matrix Engine
 */

namespace ZFinance\Modules\Training;

use PDO;
use Exception;

class TrainingManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getCourses(): array
    {
        $stmt = $this->db->prepare("
            SELECT c.*, COUNT(r.id) AS enrolled_count
            FROM training_courses c
            LEFT JOIN training_records r ON c.id = r.course_id
            WHERE c.tenant_id = :tenant_id
            GROUP BY c.id
            ORDER BY c.start_date DESC
        ");
        $stmt->execute(['tenant_id' => $this->tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }
}
