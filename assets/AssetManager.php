<?php
/**
 * Z-FINANCE 1.0.0 - Enterprise Asset & Equipment Management Engine
 */

namespace ZFinance\Modules\Assets;

use PDO;
use Exception;

class AssetManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getAssets(array $filters = []): array
    {
        $query = "
            SELECT 
                a.*,
                w.name AS warehouse_name
            FROM assets a
            LEFT JOIN warehouses w ON a.warehouse_id = w.id
            WHERE a.tenant_id = :tenant_id
        ";

        $params = ['tenant_id' => $this->tenantId];

        if (!empty($filters['status'])) {
            $query .= " AND a.status = :status";
            $params['status'] = $filters['status'];
        }

        if (!empty($filters['asset_type'])) {
            $query .= " AND a.asset_type = :asset_type";
            $params['asset_type'] = $filters['asset_type'];
        }

        $query .= " ORDER BY a.id DESC";

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    /**
     * Calculate and post periodic depreciation for straight-line method
     */
    public function postDepreciation(int $assetId, int $year, int $month): array
    {
        $stmt = $this->db->prepare("SELECT * FROM assets WHERE id = :id AND tenant_id = :tenant_id");
        $stmt->execute(['id' => $assetId, 'tenant_id' => $this->tenantId]);
        $asset = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$asset) {
            throw new Exception("Asset not found");
        }

        $usefulLifeMonths = max(1, $asset['useful_life_years'] * 12);
        $depreciableCost = max(0, $asset['purchase_cost'] - $asset['salvage_value']);
        $monthlyDepreciation = round($depreciableCost / $usefulLifeMonths, 2);

        $beginningValue = (float)$asset['current_value'];
        $endingValue = max((float)$asset['salvage_value'], $beginningValue - $monthlyDepreciation);
        $actualDepreciation = $beginningValue - $endingValue;

        $this->db->beginTransaction();

        try {
            // Record depreciation schedule
            $depStmt = $this->db->prepare("
                INSERT INTO asset_depreciation 
                (asset_id, fiscal_year, period_month, beginning_value, depreciation_amount, ending_value)
                VALUES (:asset_id, :year, :month, :beg_val, :dep_amt, :end_val)
            ");
            $depStmt->execute([
                'asset_id' => $assetId,
                'year' => $year,
                'month' => $month,
                'beg_val' => $beginningValue,
                'dep_amt' => $actualDepreciation,
                'end_val' => $endingValue
            ]);

            // Update current asset value
            $updAsset = $this->db->prepare("UPDATE assets SET current_value = :ending WHERE id = :id");
            $updAsset->execute(['ending' => $endingValue, 'id' => $assetId]);

            $this->db->commit();

            return [
                'asset_id' => $assetId,
                'depreciation_posted' => $actualDepreciation,
                'new_current_value' => $endingValue
            ];
        } catch (Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }
}
