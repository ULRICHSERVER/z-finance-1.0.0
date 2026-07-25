<?php
/**
 * Z-FINANCE 1.0.0 - Sales Pipeline & Opportunity Management Engine
 */

namespace ZFinance\Modules\Sales;

use PDO;
use Exception;

class SalesPipelineManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getOpportunities(): array
    {
        $stmt = $this->db->prepare("
            SELECT o.*, c.company_name AS customer_name
            FROM sales_opportunities o
            JOIN customers c ON o.customer_id = c.id
            WHERE o.tenant_id = :tenant_id
            ORDER BY o.amount DESC
        ");
        $stmt->execute(['tenant_id' => $this->tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }
}
