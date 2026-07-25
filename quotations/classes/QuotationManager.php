<?php
/**
 * Z-FINANCE 1.0.0 - Quotation & Estimates Manager Class
 * Handles creation, status tracking, signatures, and automatic conversion to Invoices.
 */

require_once __DIR__ . '/../../invoices/classes/InvoiceManager.php';

class QuotationManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getQuotations($tenantId = 1, $filters = []) {
        $sql = "SELECT q.*, (SELECT COUNT(*) FROM quotation_items qi WHERE qi.quotation_id = q.id) as item_count
                FROM quotations q
                WHERE q.tenant_id = :tenant_id";

        $params = ['tenant_id' => $tenantId];

        if (!empty($filters['status'])) {
            $sql .= " AND q.status = :status";
            $params['status'] = $filters['status'];
        }

        if (!empty($filters['search'])) {
            $sql .= " AND (q.reference_no LIKE :search OR q.customer_name LIKE :search)";
            $params['search'] = '%' . $filters['search'] . '%';
        }

        $sql .= " ORDER BY q.id DESC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getQuotationWithItems($id, $tenantId = 1) {
        $stmt = $this->pdo->prepare("SELECT * FROM quotations WHERE id = :id AND tenant_id = :tenant_id");
        $stmt->execute(['id' => $id, 'tenant_id' => $tenantId]);
        $quotation = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$quotation) return null;

        $itemsStmt = $this->pdo->prepare("SELECT * FROM quotation_items WHERE quotation_id = :quotation_id");
        $itemsStmt->execute(['quotation_id' => $id]);
        $quotation['items'] = $itemsStmt->fetchAll(PDO::FETCH_ASSOC);

        return $quotation;
    }

    public function createQuotation($data, $tenantId = 1, $userId = 1) {
        $refNo = 'QTN-' . date('Ymd') . '-' . str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
        $items = $data['items'] ?? [];

        $subtotal = 0.00;
        $taxTotal = 0.00;

        foreach ($items as $item) {
            $qty = (float)($item['quantity'] ?? 1);
            $price = (float)($item['unit_price'] ?? 0);
            $disc = (float)($item['discount'] ?? 0);
            $taxRate = (float)($item['tax_rate'] ?? 0);

            $itemSub = ($qty * $price) - $disc;
            $subtotal += $itemSub;
            $taxTotal += ($itemSub * ($taxRate / 100));
        }

        $total = $subtotal + $taxTotal;

        $this->pdo->beginTransaction();

        try {
            $stmt = $this->pdo->prepare("
                INSERT INTO quotations (tenant_id, reference_no, customer_id, customer_name, customer_email, issue_date, expiry_date, subtotal, tax_amount, discount_amount, total_amount, currency, status, notes, terms, created_by)
                VALUES (:tenant_id, :reference_no, :customer_id, :customer_name, :customer_email, :issue_date, :expiry_date, :subtotal, :tax_amount, :discount_amount, :total_amount, :currency, :status, :notes, :terms, :created_by)
            ");

            $stmt->execute([
                'tenant_id' => $tenantId,
                'reference_no' => $refNo,
                'customer_id' => $data['customer_id'] ?? 1,
                'customer_name' => $data['customer_name'],
                'customer_email' => $data['customer_email'] ?? null,
                'issue_date' => $data['issue_date'] ?? date('Y-m-d'),
                'expiry_date' => $data['expiry_date'] ?? date('Y-m-d', strtotime('+30 days')),
                'subtotal' => $subtotal,
                'tax_amount' => $taxTotal,
                'discount_amount' => (float)($data['discount_amount'] ?? 0.00),
                'total_amount' => $total,
                'currency' => $data['currency'] ?? 'USD',
                'status' => $data['status'] ?? 'draft',
                'notes' => $data['notes'] ?? null,
                'terms' => $data['terms'] ?? 'Valid for 30 days from date of issuance.',
                'created_by' => $userId
            ]);

            $qId = $this->pdo->lastInsertId();

            $itemStmt = $this->pdo->prepare("
                INSERT INTO quotation_items (quotation_id, item_name, description, quantity, unit_price, discount, tax_rate, subtotal)
                VALUES (:quotation_id, :item_name, :description, :quantity, :unit_price, :discount, :tax_rate, :subtotal)
            ");

            foreach ($items as $item) {
                $qty = (float)($item['quantity'] ?? 1);
                $price = (float)($item['unit_price'] ?? 0);
                $disc = (float)($item['discount'] ?? 0);
                $itemSub = ($qty * $price) - $disc;

                $itemStmt->execute([
                    'quotation_id' => $qId,
                    'item_name' => $item['item_name'],
                    'description' => $item['description'] ?? null,
                    'quantity' => $qty,
                    'unit_price' => $price,
                    'discount' => $disc,
                    'tax_rate' => (float)($item['tax_rate'] ?? 0),
                    'subtotal' => $itemSub
                ]);
            }

            $this->pdo->commit();
            return $qId;

        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    public function convertToInvoice($quotationId, $tenantId = 1, $userId = 1) {
        $q = $this->getQuotationWithItems($quotationId, $tenantId);
        if (!$q) throw new Exception("Quotation not found");

        $invManager = new InvoiceManager($this->pdo);

        $invData = [
            'customer_id' => $q['customer_id'],
            'customer_name' => $q['customer_name'],
            'customer_email' => $q['customer_email'],
            'issue_date' => date('Y-m-d'),
            'due_date' => date('Y-m-d', strtotime('+30 days')),
            'currency' => $q['currency'],
            'notes' => 'Converted from Quotation ' . $q['reference_no'],
            'items' => $q['items']
        ];

        $invId = $invManager->createInvoice($invData, $tenantId, $userId);

        // Update quotation status
        $updateStmt = $this->pdo->prepare("UPDATE quotations SET status = 'converted', converted_invoice_id = :inv_id WHERE id = :id");
        $updateStmt->execute(['inv_id' => $invId, 'id' => $quotationId]);

        return $invId;
    }
}
