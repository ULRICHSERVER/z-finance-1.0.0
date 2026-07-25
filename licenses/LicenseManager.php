<?php
/**
 * Z-FINANCE 1.0.0 - License Key & Device Verification Manager
 */

namespace ZFinance\Modules\Licenses;

use PDO;
use Exception;

class LicenseManager
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function generateCommercialLicense(string $tenantId, string $planCode): array
    {
        $licenseKey = 'ZF-' . strtoupper(bin2hex(random_bytes(4))) . '-' . strtoupper(bin2hex(random_bytes(4))) . '-' . strtoupper(bin2hex(random_bytes(4)));
        $offlineSignature = hash('sha256', $licenseKey . 'ZFINANCE_OFFLINE_SALT_2026');

        return [
            'status' => 'success',
            'license_key' => $licenseKey,
            'tenant_id' => $tenantId,
            'plan_code' => $planCode,
            'type' => 'commercial',
            'offline_signature' => $offlineSignature,
            'expires_at' => date('Y-m-d H:i:s', strtotime('+1 year'))
        ];
    }
}
