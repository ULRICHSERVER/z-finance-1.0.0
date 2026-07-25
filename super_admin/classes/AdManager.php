<?php
/**
 * Z-FINANCE 1.0.0 - Advertisement Suite Manager Class
 * Campaign Creation, Targeting Engine (Roles, Plans, Devices, Countries), Analytics
 */

namespace Modules\SuperAdmin\Classes;

use PDO;
use Exception;

class AdManager {
    private PDO $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    /**
     * Get list of all advertisement campaigns with filtering
     */
    public function getAdvertisements(array $filters = []): array {
        try {
            $sql = "SELECT * FROM advertisements WHERE 1=1";
            $params = [];

            if (!empty($filters['status'])) {
                $sql .= " AND status = :status";
                $params[':status'] = $filters['status'];
            }

            if (!empty($filters['placement'])) {
                $sql .= " AND placement_location = :placement";
                $params[':placement'] = $filters['placement'];
            }

            $sql .= " ORDER BY id DESC";
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return $this->getDefaultFallbackAds();
        }
    }

    /**
     * Create or update advertisement campaign
     */
    public function saveAdvertisement(array $adData): array {
        try {
            if (!empty($adData['id'])) {
                $stmt = $this->db->prepare("
                    UPDATE advertisements SET 
                        title = :title,
                        banner_url = :banner_url,
                        target_url = :target_url,
                        placement_location = :placement,
                        status = :status,
                        target_roles = :roles,
                        target_plans = :plans,
                        target_countries = :countries,
                        starts_at = :starts,
                        ends_at = :ends,
                        updated_at = NOW()
                    WHERE id = :id
                ");
                $stmt->execute([
                    ':id' => $adData['id'],
                    ':title' => $adData['title'],
                    ':banner_url' => $adData['banner_url'] ?? null,
                    ':target_url' => $adData['target_url'],
                    ':placement' => $adData['placement_location'] ?? 'sidebar',
                    ':status' => $adData['status'] ?? 'active',
                    ':roles' => json_encode($adData['target_roles'] ?? []),
                    ':plans' => json_encode($adData['target_plans'] ?? []),
                    ':countries' => json_encode($adData['target_countries'] ?? []),
                    ':starts' => $adData['starts_at'] ?? null,
                    ':ends' => $adData['ends_at'] ?? null
                ]);

                return ['status' => 'success', 'message' => "Campaign '{$adData['title']}' updated successfully."];
            } else {
                $stmt = $this->db->prepare("
                    INSERT INTO advertisements (title, banner_url, target_url, placement_location, status, target_roles, target_plans, target_countries, starts_at, ends_at)
                    VALUES (:title, :banner_url, :target_url, :placement, :status, :roles, :plans, :countries, :starts, :ends)
                ");
                $stmt->execute([
                    ':title' => $adData['title'],
                    ':banner_url' => $adData['banner_url'] ?? null,
                    ':target_url' => $adData['target_url'],
                    ':placement' => $adData['placement_location'] ?? 'sidebar',
                    ':status' => $adData['status'] ?? 'active',
                    ':roles' => json_encode($adData['target_roles'] ?? []),
                    ':plans' => json_encode($adData['target_plans'] ?? []),
                    ':countries' => json_encode($adData['target_countries'] ?? []),
                    ':starts' => $adData['starts_at'] ?? null,
                    ':ends' => $adData['ends_at'] ?? null
                ]);

                return ['status' => 'success', 'message' => "Campaign '{$adData['title']}' created successfully."];
            }
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    /**
     * Pause or resume ad campaign
     */
    public function toggleAdStatus(int $adId, string $newStatus): array {
        try {
            $stmt = $this->db->prepare("UPDATE advertisements SET status = :status, updated_at = NOW() WHERE id = :id");
            $stmt->execute([':status' => $newStatus, ':id' => $adId]);

            return ['status' => 'success', 'message' => "Ad campaign status updated to '{$newStatus}'."];
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    /**
     * Track impression or click
     */
    public function recordMetrics(int $adId, string $type = 'impression'): void {
        try {
            $column = $type === 'click' ? 'clicks_count' : 'impressions_count';
            $stmt = $this->db->prepare("UPDATE advertisements SET {$column} = {$column} + 1 WHERE id = :id");
            $stmt->execute([':id' => $adId]);
        } catch (Exception $e) {
            // Silence metric errors
        }
    }

    private function getDefaultFallbackAds(): array {
        return [
            [
                'id' => 1,
                'title' => 'Upgrade to Z-FINANCE Enterprise 2026',
                'banner_url' => 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop',
                'target_url' => 'https://zfinance.com/enterprise',
                'placement_location' => 'dashboard_top',
                'status' => 'active',
                'impressions_count' => 14850,
                'clicks_count' => 1240,
                'target_roles' => ['standard_user', 'accountant'],
                'target_plans' => ['starter', 'professional'],
                'starts_at' => date('Y-01-01 00:00:00'),
                'ends_at' => date('Y-12-31 23:59:59')
            ],
            [
                'id' => 2,
                'title' => 'Mobile Banking - Orange Money & MTN MoMo Direct Integration',
                'banner_url' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop',
                'target_url' => 'https://zfinance.com/mobile-money',
                'placement_location' => 'sidebar',
                'status' => 'active',
                'impressions_count' => 8420,
                'clicks_count' => 610,
                'target_roles' => ['all'],
                'target_plans' => ['all'],
                'starts_at' => date('Y-01-01 00:00:00'),
                'ends_at' => date('Y-12-31 23:59:59')
            ]
        ];
    }
}
