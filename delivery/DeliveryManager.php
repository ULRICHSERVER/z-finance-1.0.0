<?php
/**
 * Z-FINANCE 1.0.0 - Dispatch & Delivery Fleet Engine
 */

namespace ZFinance\Modules\Delivery;

use PDO;
use Exception;

class DeliveryManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }
}
