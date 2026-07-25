<?php
/**
 * Z-FINANCE 1.0.0 - Marketplace & Multi-Vendor Engine
 */

namespace ZFinance\Modules\Marketplace;

use PDO;
use Exception;

class MarketplaceManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getVendors(): array
    {
        $stmt = $this->db->prepare("SELECT * FROM marketplace_vendors WHERE tenant_id = :tenant_id ORDER BY store_name ASC");
        $stmt->execute(['tenant_id' => $this->tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }
}
