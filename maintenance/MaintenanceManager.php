<?php
/**
 * Z-FINANCE 1.0.0 - Maintenance & Equipment Service Engine
 */

namespace ZFinance\Modules\Maintenance;

use PDO;
use Exception;

class MaintenanceManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getSchedules(array $filters = []): array
    {
        $query = "
            SELECT 
                m.*,
                a.name AS asset_name,
                a.asset_number
            FROM maintenance_schedules m
            JOIN assets a ON m.asset_id = a.id
            WHERE m.tenant_id = :tenant_id
        ";

        $params = ['tenant_id' => $this->tenantId];

        if (!empty($filters['status'])) {
            $query .= " AND m.status = :status";
            $params['status'] = $filters['status'];
        }

        $query .= " ORDER BY m.next_maintenance_date ASC";

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function scheduleMaintenance(array $data): int
    {
        $stmt = $this->db->prepare("
            INSERT INTO maintenance_schedules 
            (tenant_id, asset_id, title, maintenance_type, frequency_days, next_maintenance_date, assigned_technician, estimated_cost, notes)
            VALUES (:tenant_id, :asset_id, :title, :type, :freq, :next_date, :tech, :cost, :notes)
        ");

        $stmt->execute([
            'tenant_id' => $this->tenantId,
            'asset_id' => $data['asset_id'],
            'title' => $data['title'],
            'type' => $data['maintenance_type'] ?? 'preventive',
            'freq' => $data['frequency_days'] ?? 90,
            'next_date' => $data['next_maintenance_date'],
            'tech' => $data['assigned_technician'] ?? null,
            'cost' => $data['estimated_cost'] ?? 0.00,
            'notes' => $data['notes'] ?? null
        ]);

        return (int)$this->db->lastInsertId();
    }
}
