<?php
/**
 * Z-FINANCE 1.0.0 - Storage Quotas & Usage Engine
 */

namespace ZFinance\Modules\Storage;

use PDO;

class StorageQuotaManager {
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default') {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    /**
     * Get storage quota stats
     */
    public function getStorageUsage(): array {
        $stmt = $this->db->prepare("SELECT * FROM storage_statistics WHERE tenant_id = :tenant_id");
        $stmt->execute([':tenant_id' => $this->tenantId]);
        $stats = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$stats) {
            return [
                'total_space_bytes' => 10737418240, // 10 GB
                'used_space_bytes' => 0,
                'free_space_bytes' => 10737418240,
                'file_count' => 0,
                'usage_percentage' => 0.0
            ];
        }

        $total = (int)$stats['total_space_bytes'];
        $used = (int)$stats['used_space_bytes'];
        $free = max(0, $total - $used);
        $percentage = $total > 0 ? round(($used / $total) * 100, 2) : 0.0;

        return [
            'total_space_bytes' => $total,
            'used_space_bytes'  => $used,
            'free_space_bytes'  => $free,
            'file_count'        => (int)$stats['file_count'],
            'usage_percentage'  => $percentage
        ];
    }
}
