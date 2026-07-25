<?php
/**
 * Z-FINANCE 1.0.0 - Membership & VIP Portal Engine
 */

namespace ZFinance\Modules\Memberships;

use PDO;
use Exception;

class MembershipManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getMemberships(): array
    {
        $stmt = $this->db->prepare("
            SELECT m.*, c.company_name AS customer_name, t.title AS membership_title, t.annual_fee
            FROM memberships m
            JOIN customers c ON m.customer_id = c.id
            JOIN membership_types t ON m.type_id = t.id
            WHERE m.tenant_id = :tenant_id
            ORDER BY m.expiry_date ASC
        ");
        $stmt->execute(['tenant_id' => $this->tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }
}
