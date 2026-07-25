<?php
/**
 * Z-FINANCE 1.0.0 - Supplier & Vendor Management Engine
 */

namespace ZFinance\Modules\Suppliers;

use PDO;
use Exception;

class SupplierManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getSuppliers(array $filters = []): array
    {
        $query = "
            SELECT 
                s.*,
                COALESCE(p.overall_rating, 100.00) AS rating
            FROM suppliers s
            LEFT JOIN (
                SELECT supplier_id, AVG(overall_rating) AS overall_rating 
                FROM supplier_performance 
                GROUP BY supplier_id
            ) p ON s.id = p.supplier_id
            WHERE s.tenant_id = :tenant_id
        ";

        $params = ['tenant_id' => $this->tenantId];

        if (!empty($filters['status'])) {
            $query .= " AND s.status = :status";
            $params['status'] = $filters['status'];
        }

        if (!empty($filters['search'])) {
            $query .= " AND (s.company_name LIKE :search OR s.supplier_code LIKE :search OR s.tax_number LIKE :search)";
            $params['search'] = '%' . $filters['search'] . '%';
        }

        $query .= " ORDER BY s.company_name ASC";

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function createSupplier(array $data): int
    {
        $code = 'SUP-' . strtoupper(substr(md5(uniqid()), 0, 6));

        $stmt = $this->db->prepare("
            INSERT INTO suppliers 
            (tenant_id, supplier_code, company_name, trade_name, tax_number, registration_number, business_type, industry, address, country, phone, email, payment_terms, credit_limit, risk_level, status)
            VALUES (:tenant_id, :code, :company, :trade, :tax, :reg, :btype, :industry, :address, :country, :phone, :email, :terms, :limit, :risk, :status)
        ");

        $stmt->execute([
            'tenant_id' => $this->tenantId,
            'code' => $code,
            'company' => $data['company_name'],
            'trade' => $data['trade_name'] ?? null,
            'tax' => $data['tax_number'] ?? null,
            'reg' => $data['registration_number'] ?? null,
            'btype' => $data['business_type'] ?? 'corporation',
            'industry' => $data['industry'] ?? 'General Procurement',
            'address' => $data['address'] ?? null,
            'country' => $data['country'] ?? 'Germany',
            'phone' => $data['phone'] ?? null,
            'email' => $data['email'],
            'terms' => $data['payment_terms'] ?? 'Net 30',
            'limit' => $data['credit_limit'] ?? 50000.00,
            'risk' => $data['risk_level'] ?? 'low',
            'status' => $data['status'] ?? 'active'
        ]);

        return (int)$this->db->lastInsertId();
    }
}
