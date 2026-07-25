<?php
/**
 * Z-FINANCE 1.0.0 - Supplier Contract Management Engine
 */

namespace ZFinance\Modules\Contracts;

use PDO;
use Exception;

class ContractManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getContracts(): array
    {
        $stmt = $this->db->prepare("
            SELECT 
                c.*,
                s.company_name AS supplier_name
            FROM supplier_contracts c
            JOIN suppliers s ON c.supplier_id = s.id
            WHERE c.tenant_id = :tenant_id
            ORDER BY c.end_date ASC
        ");
        $stmt->execute(['tenant_id' => $this->tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function createContract(array $data): int
    {
        $contractNum = 'CTR-2026-' . sprintf('%04d', rand(1, 9999));
        $sigHash = hash('sha256', $contractNum . '|' . $data['title'] . '|' . time());

        $stmt = $this->db->prepare("
            INSERT INTO supplier_contracts 
            (tenant_id, contract_number, supplier_id, title, contract_type, start_date, end_date, total_contract_value, auto_renewal, status, digital_signature_hash)
            VALUES (:tenant_id, :c_num, :supplier_id, :title, :type, :start_date, :end_date, :val, :renewal, :status, :hash)
        ");

        $stmt->execute([
            'tenant_id' => $this->tenantId,
            'c_num' => $contractNum,
            'supplier_id' => $data['supplier_id'],
            'title' => $data['title'],
            'type' => $data['contract_type'] ?? 'framework',
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'val' => $data['total_contract_value'] ?? 0.00,
            'renewal' => $data['auto_renewal'] ?? 0,
            'status' => 'active',
            'hash' => $sigHash
        ]);

        return (int)$this->db->lastInsertId();
    }
}
