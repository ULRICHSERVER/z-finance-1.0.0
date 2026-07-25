<?php
/**
 * Z-FINANCE 1.0.0 - Marketing Automation Engine
 */

namespace ZFinance\Modules\Marketing;

use PDO;
use Exception;

class MarketingManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getCampaigns(): array
    {
        $stmt = $this->db->prepare("
            SELECT * FROM marketing_campaigns
            WHERE tenant_id = :tenant_id
            ORDER BY id DESC
        ");
        $stmt->execute(['tenant_id' => $this->tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }
}
