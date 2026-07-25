<?php
/**
 * Z-FINANCE 1.0.0 - Warehouse & Location Management Engine
 */

namespace ZFinance\Modules\Warehouses;

use PDO;
use Exception;

class WarehouseManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getWarehouses(): array
    {
        $stmt = $this->db->prepare("
            SELECT 
                w.*,
                COUNT(l.id) AS total_locations
            FROM warehouses w
            LEFT JOIN warehouse_locations l ON w.id = l.warehouse_id
            WHERE w.tenant_id = :tenant_id
            GROUP BY w.id
            ORDER BY w.id ASC
        ");
        $stmt->execute(['tenant_id' => $this->tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function createWarehouse(array $data): int
    {
        $stmt = $this->db->prepare("
            INSERT INTO warehouses (tenant_id, code, name, address, city, country, capacity_sqm, status)
            VALUES (:tenant_id, :code, :name, :address, :city, :country, :capacity_sqm, :status)
        ");
        $stmt->execute([
            'tenant_id' => $this->tenantId,
            'code' => $data['code'],
            'name' => $data['name'],
            'address' => $data['address'] ?? null,
            'city' => $data['city'] ?? null,
            'country' => $data['country'] ?? null,
            'capacity_sqm' => $data['capacity_sqm'] ?? 100.00,
            'status' => $data['status'] ?? 'active'
        ]);

        return (int)$this->db->lastInsertId();
    }
}
