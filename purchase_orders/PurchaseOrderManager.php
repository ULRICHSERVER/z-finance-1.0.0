<?php
/**
 * Z-FINANCE 1.0.0 - Purchase Order & Goods Receipt Management Engine
 */

namespace ZFinance\Modules\PurchaseOrders;

use PDO;
use Exception;

class PurchaseOrderManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getPurchaseOrders(array $filters = []): array
    {
        $query = "
            SELECT 
                po.*,
                s.company_name AS supplier_name,
                s.supplier_code
            FROM purchase_orders po
            JOIN suppliers s ON po.supplier_id = s.id
            WHERE po.tenant_id = :tenant_id
        ";

        $params = ['tenant_id' => $this->tenantId];

        if (!empty($filters['status'])) {
            $query .= " AND po.status = :status";
            $params['status'] = $filters['status'];
        }

        $query .= " ORDER BY po.id DESC";

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    /**
     * Create a Purchase Order with digital signature hash
     */
    public function createPurchaseOrder(array $data, array $items): int
    {
        $poNumber = 'PO-2026-' . sprintf('%04d', rand(1, 9999));
        $signatureHash = hash('sha256', $poNumber . '|' . time() . '|' . $this->tenantId);

        $this->db->beginTransaction();

        try {
            $stmt = $this->db->prepare("
                INSERT INTO purchase_orders 
                (tenant_id, po_number, supplier_id, subtotal, tax_amount, shipping_cost, grand_total, expected_delivery_date, terms_and_conditions, digital_signature_hash, status, created_by)
                VALUES (:tenant_id, :po_num, :supplier_id, :subtotal, :tax, :shipping, :grand_total, :delivery_date, :terms, :hash, :status, :created_by)
            ");

            $stmt->execute([
                'tenant_id' => $this->tenantId,
                'po_num' => $poNumber,
                'supplier_id' => $data['supplier_id'],
                'subtotal' => $data['subtotal'],
                'tax' => $data['tax_amount'] ?? 0.00,
                'shipping' => $data['shipping_cost'] ?? 0.00,
                'grand_total' => $data['grand_total'],
                'delivery_date' => $data['expected_delivery_date'],
                'terms' => $data['terms_and_conditions'] ?? 'Standard Enterprise Delivery Terms',
                'hash' => $signatureHash,
                'status' => $data['status'] ?? 'pending_approval',
                'created_by' => $data['created_by'] ?? 1
            ]);

            $poId = (int)$this->db->lastInsertId();

            $itemStmt = $this->db->prepare("
                INSERT INTO purchase_order_items 
                (po_id, product_id, item_description, ordered_quantity, unit_price, line_total)
                VALUES (:po_id, :product_id, :desc, :qty, :price, :total)
            ");

            foreach ($items as $item) {
                $itemStmt->execute([
                    'po_id' => $poId,
                    'product_id' => $item['product_id'] ?? null,
                    'desc' => $item['item_description'],
                    'qty' => $item['ordered_quantity'],
                    'price' => $item['unit_price'],
                    'total' => $item['ordered_quantity'] * $item['unit_price']
                ]);
            }

            $this->db->commit();
            return $poId;
        } catch (Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }
}
