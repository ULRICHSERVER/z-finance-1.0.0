<?php
/**
 * Z-FINANCE 1.0.0 - Loyalty & Rewards Management Engine
 */

namespace ZFinance\Modules\Loyalty;

use PDO;
use Exception;

class LoyaltyManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getLoyaltyAccounts(): array
    {
        $stmt = $this->db->prepare("
            SELECT l.*, c.company_name AS customer_name
            FROM loyalty_accounts l
            JOIN customers c ON l.customer_id = c.id
            WHERE l.tenant_id = :tenant_id
            ORDER BY l.current_points DESC
        ");
        $stmt->execute(['tenant_id' => $this->tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }
}
