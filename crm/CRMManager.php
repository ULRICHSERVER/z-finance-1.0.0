<?php
/**
 * Z-FINANCE 1.0.0 - Enterprise CRM & Lead Management Engine
 */

namespace ZFinance\Modules\CRM;

use PDO;
use Exception;

class CRMManager
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getSummaryMetrics(): array
    {
        $metrics = [];

        // Leads count
        $leadStmt = $this->db->prepare("SELECT COUNT(*) FROM leads WHERE tenant_id = :tenant_id");
        $leadStmt->execute(['tenant_id' => $this->tenantId]);
        $metrics['total_leads'] = (int)$leadStmt->fetchColumn();

        // Active Customers
        $custStmt = $this->db->prepare("SELECT COUNT(*) FROM customers WHERE tenant_id = :tenant_id AND status = 'active'");
        $custStmt->execute(['tenant_id' => $this->tenantId]);
        $metrics['active_customers'] = (int)$custStmt->fetchColumn();

        // Pipeline Value
        $pipeStmt = $this->db->prepare("SELECT COALESCE(SUM(amount), 0.00) FROM sales_opportunities WHERE tenant_id = :tenant_id AND stage NOT IN ('won', 'lost', 'cancelled')");
        $pipeStmt->execute(['tenant_id' => $this->tenantId]);
        $metrics['pipeline_value'] = (float)$pipeStmt->fetchColumn();

        // Subscriptions
        $subStmt = $this->db->prepare("SELECT COUNT(*) FROM subscriptions WHERE tenant_id = :tenant_id AND status = 'active'");
        $subStmt->execute(['tenant_id' => $this->tenantId]);
        $metrics['active_subscriptions'] = (int)$subStmt->fetchColumn();

        // Support Tickets
        $tickStmt = $this->db->prepare("SELECT COUNT(*) FROM support_tickets WHERE tenant_id = :tenant_id AND status IN ('open', 'in_progress')");
        $tickStmt->execute(['tenant_id' => $this->tenantId]);
        $metrics['open_tickets'] = (int)$tickStmt->fetchColumn();

        return $metrics;
    }

    public function getCustomers(array $filters = []): array
    {
        $query = "SELECT * FROM customers WHERE tenant_id = :tenant_id";
        $params = ['tenant_id' => $this->tenantId];

        if (!empty($filters['search'])) {
            $query .= " AND (company_name LIKE :search OR contact_person LIKE :search OR email LIKE :search OR customer_code LIKE :search)";
            $params['search'] = '%' . $filters['search'] . '%';
        }

        $query .= " ORDER BY company_name ASC";

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function createCustomer(array $data): int
    {
        $code = 'CUST-' . sprintf('%04d', rand(1000, 9999));

        $stmt = $this->db->prepare("
            INSERT INTO customers (tenant_id, customer_code, company_name, contact_person, email, phone, website, address, country, tax_number, industry, category, credit_limit, status)
            VALUES (:tenant_id, :code, :company, :contact, :email, :phone, :web, :addr, :country, :tax, :ind, :cat, :limit, 'active')
        ");

        $stmt->execute([
            'tenant_id' => $this->tenantId,
            'code' => $code,
            'company' => $data['company_name'],
            'contact' => $data['contact_person'] ?? null,
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'web' => $data['website'] ?? null,
            'addr' => $data['address'] ?? null,
            'country' => $data['country'] ?? 'Germany',
            'tax' => $data['tax_number'] ?? null,
            'ind' => $data['industry'] ?? 'Enterprise',
            'cat' => $data['category'] ?? 'standard',
            'limit' => $data['credit_limit'] ?? 10000.00
        ]);

        return (int)$this->db->lastInsertId();
    }
}
