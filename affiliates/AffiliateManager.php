<?php
/**
 * Z-FINANCE 1.0.0 - Affiliate & Referral Tracking Engine
 */

namespace ZFinance\Modules\Affiliates;

use PDO;
use Exception;

class AffiliateManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getAffiliates(): array
    {
        $stmt = $this->db->prepare("
            SELECT a.*, c.company_name AS partner_name, c.email
            FROM affiliate_accounts a
            JOIN customers c ON a.customer_id = c.id
            WHERE a.tenant_id = :tenant_id
            ORDER BY a.total_earnings DESC
        ");
        $stmt->execute(['tenant_id' => $this->tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }
}
