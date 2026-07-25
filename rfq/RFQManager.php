<?php
/**
 * Z-FINANCE 1.0.0 - Request for Quotation (RFQ) Engine
 */

namespace ZFinance\Modules\RFQ;

use PDO;
use Exception;

class RFQManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getRFQs(): array
    {
        $stmt = $this->db->prepare("
            SELECT 
                r.*,
                COUNT(s.id) AS invited_suppliers_count,
                COUNT(q.id) AS submitted_quotations_count
            FROM rfqs r
            LEFT JOIN rfq_suppliers s ON r.id = s.rfq_id
            LEFT JOIN supplier_quotations q ON r.id = q.rfq_id
            WHERE r.tenant_id = :tenant_id
            GROUP BY r.id
            ORDER BY r.id DESC
        ");
        $stmt->execute(['tenant_id' => $this->tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function createRFQ(array $data, array $supplierIds): int
    {
        $rfqNumber = 'RFQ-2026-' . sprintf('%04d', rand(1, 9999));

        $this->db->beginTransaction();

        try {
            $stmt = $this->db->prepare("
                INSERT INTO rfqs (tenant_id, rfq_number, title, closing_date, status, notes)
                VALUES (:tenant_id, :rfq_num, :title, :closing_date, :status, :notes)
            ");

            $stmt->execute([
                'tenant_id' => $this->tenantId,
                'rfq_num' => $rfqNumber,
                'title' => $data['title'],
                'closing_date' => $data['closing_date'],
                'status' => 'published',
                'notes' => $data['notes'] ?? null
            ]);

            $rfqId = (int)$this->db->lastInsertId();

            $supStmt = $this->db->prepare("
                INSERT INTO rfq_suppliers (rfq_id, supplier_id, status)
                VALUES (:rfq_id, :supplier_id, 'invited')
            ");

            foreach ($supplierIds as $sId) {
                $supStmt->execute([
                    'rfq_id' => $rfqId,
                    'supplier_id' => $sId
                ]);
            }

            $this->db->commit();
            return $rfqId;
        } catch (Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }
}
