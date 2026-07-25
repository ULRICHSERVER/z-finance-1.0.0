<?php
/**
 * Z-FINANCE 1.0.0 - Central Procurement System Engine
 */

namespace ZFinance\Modules\Procurement;

use PDO;
use Exception;

class ProcurementManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getSummaryMetrics(): array
    {
        $metrics = [];

        // Count pending requisitions
        $reqStmt = $this->db->prepare("SELECT COUNT(*) FROM purchase_requisitions WHERE tenant_id = :tenant_id AND status = 'submitted'");
        $reqStmt->execute(['tenant_id' => $this->tenantId]);
        $metrics['pending_requisitions'] = (int)$reqStmt->fetchColumn();

        // Active POs & Spend
        $poStmt = $this->db->prepare("
            SELECT 
                COUNT(*) AS active_pos,
                SUM(grand_total) AS total_procurement_spend
            FROM purchase_orders 
            WHERE tenant_id = :tenant_id AND status IN ('approved', 'sent', 'accepted', 'partially_received')
        ");
        $poStmt->execute(['tenant_id' => $this->tenantId]);
        $poMetrics = $poStmt->fetch(PDO::FETCH_ASSOC) ?: [];

        // Count total suppliers
        $supStmt = $this->db->prepare("SELECT COUNT(*) FROM suppliers WHERE tenant_id = :tenant_id AND status = 'active'");
        $supStmt->execute(['tenant_id' => $this->tenantId]);
        $metrics['total_suppliers'] = (int)$supStmt->fetchColumn();

        // Expiring contracts within 30 days
        $ctrStmt = $this->db->prepare("
            SELECT COUNT(*) FROM supplier_contracts 
            WHERE tenant_id = :tenant_id AND status = 'active' AND end_date <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)
        ");
        $ctrStmt->execute(['tenant_id' => $this->tenantId]);
        $metrics['expiring_contracts_count'] = (int)$ctrStmt->fetchColumn();

        return array_merge($metrics, $poMetrics);
    }
}
