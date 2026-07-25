<?php
/**
 * Z-FINANCE 1.0.0 - Unified Order Management Engine
 */

namespace ZFinance\Modules\Orders;

use PDO;
use Exception;

class OrderManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }
}
