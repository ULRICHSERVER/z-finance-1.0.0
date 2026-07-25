<?php
/**
 * Z-FINANCE 1.0.0 - Inventory & Product Management Engine
 *
 * Core PHP class handling inventory items, stock movements, FIFO/LIFO valuation,
 * stock adjustments, offline synchronization, and integration with Accounting and EDMS.
 */

namespace ZFinance\Modules\Inventory;

use PDO;
use Exception;

class InventoryManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    /**
     * Get Inventory Overview Summary Metrics
     */
    public function getSummaryMetrics(): array
    {
        $stmt = $this->db->prepare("
            SELECT 
                COUNT(*) AS total_products,
                SUM(current_stock) AS available_stock,
                SUM(CASE WHEN current_stock <= minimum_stock AND current_stock > 0 THEN 1 ELSE 0 END) AS low_stock_items,
                SUM(CASE WHEN current_stock = 0 THEN 1 ELSE 0 END) AS out_of_stock_items,
                SUM(current_stock * cost_price) AS total_inventory_value
            FROM products
            WHERE tenant_id = :tenant_id AND status != 'discontinued'
        ");
        $stmt->execute(['tenant_id' => $this->tenantId]);
        $metrics = $stmt->fetch(PDO::FETCH_ASSOC) ?: [];

        // Count warehouses
        $whStmt = $this->db->prepare("SELECT COUNT(*) FROM warehouses WHERE tenant_id = :tenant_id");
        $whStmt->execute(['tenant_id' => $this->tenantId]);
        $metrics['warehouses_count'] = (int)$whStmt->fetchColumn();

        // Count assets & equipment
        $assetStmt = $this->db->prepare("
            SELECT 
                COUNT(*) AS total_assets,
                SUM(current_value) AS total_assets_value
            FROM assets 
            WHERE tenant_id = :tenant_id AND status != 'disposed'
        ");
        $assetStmt->execute(['tenant_id' => $this->tenantId]);
        $assetMetrics = $assetStmt->fetch(PDO::FETCH_ASSOC) ?: [];

        // Count pending maintenance
        $maintStmt = $this->db->prepare("
            SELECT COUNT(*) FROM maintenance_schedules 
            WHERE tenant_id = :tenant_id AND status IN ('scheduled', 'overdue')
        ");
        $maintStmt->execute(['tenant_id' => $this->tenantId]);
        $metrics['maintenance_due_count'] = (int)$maintStmt->fetchColumn();

        return array_merge($metrics, $assetMetrics);
    }

    /**
     * Get All Products with Filters & Valuation
     */
    public function getProducts(array $filters = []): array
    {
        $query = "
            SELECT 
                p.*,
                c.name AS category_name,
                w.name AS warehouse_name,
                u.abbreviation AS unit_abbr
            FROM products p
            LEFT JOIN product_categories c ON p.category_id = c.id
            LEFT JOIN warehouses w ON p.default_warehouse_id = w.id
            LEFT JOIN product_units u ON p.unit_id = u.id
            WHERE p.tenant_id = :tenant_id
        ";

        $params = ['tenant_id' => $this->tenantId];

        if (!empty($filters['search'])) {
            $query .= " AND (p.name LIKE :search OR p.sku LIKE :search OR p.barcode LIKE :search OR p.product_code LIKE :search)";
            $params['search'] = '%' . $filters['search'] . '%';
        }

        if (!empty($filters['type'])) {
            $query .= " AND p.product_type = :type";
            $params['type'] = $filters['type'];
        }

        if (!empty($filters['warehouse_id'])) {
            $query .= " AND p.default_warehouse_id = :warehouse_id";
            $params['warehouse_id'] = $filters['warehouse_id'];
        }

        $query .= " ORDER BY p.id DESC";

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    /**
     * Record a Stock Movement Transaction
     */
    public function recordStockMovement(array $data): bool
    {
        $this->db->beginTransaction();

        try {
            $productId = (int)$data['product_id'];
            $warehouseId = (int)$data['warehouse_id'];
            $type = $data['transaction_type'];
            $qty = (int)$data['quantity'];
            $cost = (float)($data['unit_cost'] ?? 0.00);

            $stmt = $this->db->prepare("
                INSERT INTO inventory_transactions 
                (tenant_id, product_id, warehouse_id, transaction_type, quantity, unit_cost, total_value, reference_module, reference_id, notes, created_by)
                VALUES (:tenant_id, :product_id, :warehouse_id, :type, :quantity, :cost, :total_val, :ref_mod, :ref_id, :notes, :created_by)
            ");

            $stmt->execute([
                'tenant_id' => $this->tenantId,
                'product_id' => $productId,
                'warehouse_id' => $warehouseId,
                'type' => $type,
                'quantity' => $qty,
                'cost' => $cost,
                'total_val' => $qty * $cost,
                'ref_mod' => $data['reference_module'] ?? 'manual',
                'ref_id' => $data['reference_id'] ?? null,
                'notes' => $data['notes'] ?? '',
                'created_by' => $data['created_by'] ?? 1
            ]);

            // Update Product Current Stock
            $stockChange = match ($type) {
                'stock_in', 'return' => $qty,
                'stock_out', 'damage', 'loss', 'consumption' => -$qty,
                default => 0
            };

            if ($stockChange !== 0) {
                $updStmt = $this->db->prepare("
                    UPDATE products 
                    SET current_stock = GREATEST(0, current_stock + :change)
                    WHERE id = :id AND tenant_id = :tenant_id
                ");
                $updStmt->execute([
                    'change' => $stockChange,
                    'id' => $productId,
                    'tenant_id' => $this->tenantId
                ]);
            }

            $this->db->commit();
            return true;
        } catch (Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }
}
