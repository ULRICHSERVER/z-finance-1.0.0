<?php
/**
 * Z-FINANCE 1.0.0 - Customer Support & Helpdesk Engine
 */

namespace ZFinance\Modules\Support;

use PDO;
use Exception;

class SupportManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getTickets(): array
    {
        $stmt = $this->db->prepare("
            SELECT t.*, c.company_name AS customer_name
            FROM support_tickets t
            JOIN customers c ON t.customer_id = c.id
            WHERE t.tenant_id = :tenant_id
            ORDER BY t.id DESC
        ");
        $stmt->execute(['tenant_id' => $this->tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }
}
