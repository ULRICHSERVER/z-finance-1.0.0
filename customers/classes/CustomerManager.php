<?php
/**
 * Z-FINANCE 1.0.0 - Customer Manager Class
 * Handles customer creation, updating, search, filtering, statistics, and financial summaries.
 */

class CustomerManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getDashboardStats($userId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT 
                COUNT(*) as total_customers,
                SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_customers,
                SUM(CASE WHEN status = 'inactive' THEN 1 ELSE 0 END) as inactive_customers,
                SUM(CASE WHEN status = 'lead' THEN 1 ELSE 0 END) as total_leads,
                SUM(CASE WHEN is_vip = 1 THEN 1 ELSE 0 END) as vip_customers,
                SUM(CASE WHEN customer_type IN ('company', 'organization') THEN 1 ELSE 0 END) as corporate_customers
            FROM customers 
            WHERE user_id = :user_id
        ");
        $stmt->execute(['user_id' => $userId]);
        $counts = $stmt->fetch(PDO::FETCH_ASSOC);

        // Calculate total financial aggregates from customer_statistics
        $finStmt = $this->pdo->prepare("
            SELECT 
                SUM(total_income_generated) as total_income,
                SUM(outstanding_balance) as total_outstanding,
                SUM(total_payments_received) as total_payments
            FROM customer_statistics cs
            JOIN customers c ON cs.customer_id = c.id
            WHERE c.user_id = :user_id
        ");
        $finStmt->execute(['user_id' => $userId]);
        $fin = $finStmt->fetch(PDO::FETCH_ASSOC);

        return array_merge($counts, [
            'total_income' => $fin['total_income'] ?? 0.00,
            'total_outstanding' => $fin['total_outstanding'] ?? 0.00,
            'total_payments' => $fin['total_payments'] ?? 0.00
        ]);
    }

    public function getCustomers($userId = 1, $filters = []) {
        $sql = "SELECT c.*, cp.avatar_url, cp.tax_id, cp.industry, cp.credit_limit, cp.payment_terms,
                       cs.total_income_generated, cs.outstanding_balance, cs.total_payments_received
                FROM customers c
                LEFT JOIN customer_profiles cp ON c.id = cp.customer_id
                LEFT JOIN customer_statistics cs ON c.id = cs.customer_id
                WHERE c.user_id = :user_id";
        
        $params = ['user_id' => $userId];

        if (!empty($filters['status'])) {
            $sql .= " AND c.status = :status";
            $params['status'] = $filters['status'];
        }

        if (!empty($filters['customer_type'])) {
            $sql .= " AND c.customer_type = :customer_type";
            $params['customer_type'] = $filters['customer_type'];
        }

        if (!empty($filters['is_vip'])) {
            $sql .= " AND c.is_vip = 1";
        }

        if (!empty($filters['search'])) {
            $sql .= " AND (c.display_name LIKE :search OR c.customer_code LIKE :search OR c.email LIKE :search OR c.phone LIKE :search OR c.company_name LIKE :search)";
            $params['search'] = '%' . $filters['search'] . '%';
        }

        $sql .= " ORDER BY c.id DESC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        $customers = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($customers as &$cust) {
            $cust['groups'] = $this->getCustomerGroups($cust['id']);
            $cust['tags'] = $this->getCustomerTags($cust['id']);
        }

        return $customers;
    }

    public function getCustomerById($id, $userId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT c.*, cp.avatar_url, cp.tax_id, cp.industry, cp.credit_limit, cp.payment_terms, cp.source_channel, cp.social_linkedin, cp.social_twitter, cp.internal_notes,
                   cs.total_income_generated, cs.outstanding_balance, cs.total_payments_received, cs.total_projects_count, cs.services_used_count
            FROM customers c
            LEFT JOIN customer_profiles cp ON c.id = cp.customer_id
            LEFT JOIN customer_statistics cs ON c.id = cs.customer_id
            WHERE c.id = :id AND c.user_id = :user_id
        ");
        $stmt->execute(['id' => $id, 'user_id' => $userId]);
        $customer = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($customer) {
            $customer['groups'] = $this->getCustomerGroups($customer['id']);
            $customer['tags'] = $this->getCustomerTags($customer['id']);
            $customer['communications'] = $this->getCustomerCommunications($customer['id']);
            $customer['documents'] = $this->getCustomerDocuments($customer['id']);
        }

        return $customer;
    }

    public function createCustomer($data, $userId = 1) {
        $code = $data['customer_code'] ?? 'CUST-' . strtoupper(substr(md5(uniqid(rand(), true)), 0, 8));

        $stmt = $this->pdo->prepare("
            INSERT INTO customers (user_id, customer_code, customer_type, first_name, middle_name, last_name, display_name, company_name, business_name, email, alternative_email, phone, alternative_phone, whatsapp, website, gender, date_of_birth, nationality, country, region, city, address, postal_code, occupation, profession, preferred_language, preferred_currency, is_vip, status, visibility)
            VALUES (:user_id, :customer_code, :customer_type, :first_name, :middle_name, :last_name, :display_name, :company_name, :business_name, :email, :alternative_email, :phone, :alternative_phone, :whatsapp, :website, :gender, :date_of_birth, :nationality, :country, :region, :city, :address, :postal_code, :occupation, :profession, :preferred_language, :preferred_currency, :is_vip, :status, :visibility)
        ");
        $stmt->execute([
            'user_id' => $userId,
            'customer_code' => $code,
            'customer_type' => $data['customer_type'] ?? 'individual',
            'first_name' => $data['first_name'] ?? null,
            'middle_name' => $data['middle_name'] ?? null,
            'last_name' => $data['last_name'] ?? null,
            'display_name' => $data['display_name'],
            'company_name' => $data['company_name'] ?? null,
            'business_name' => $data['business_name'] ?? null,
            'email' => $data['email'] ?? null,
            'alternative_email' => $data['alternative_email'] ?? null,
            'phone' => $data['phone'] ?? null,
            'alternative_phone' => $data['alternative_phone'] ?? null,
            'whatsapp' => $data['whatsapp'] ?? null,
            'website' => $data['website'] ?? null,
            'gender' => $data['gender'] ?? 'unspecified',
            'date_of_birth' => $data['date_of_birth'] ?? null,
            'nationality' => $data['nationality'] ?? null,
            'country' => $data['country'] ?? 'United States',
            'region' => $data['region'] ?? null,
            'city' => $data['city'] ?? null,
            'address' => $data['address'] ?? null,
            'postal_code' => $data['postal_code'] ?? null,
            'occupation' => $data['occupation'] ?? null,
            'profession' => $data['profession'] ?? null,
            'preferred_language' => $data['preferred_language'] ?? 'en',
            'preferred_currency' => $data['preferred_currency'] ?? 'USD',
            'is_vip' => isset($data['is_vip']) ? (int)$data['is_vip'] : 0,
            'status' => $data['status'] ?? 'active',
            'visibility' => $data['visibility'] ?? 'private'
        ]);

        $customerId = $this->pdo->lastInsertId();

        // Initialize Customer Profile
        $profStmt = $this->pdo->prepare("
            INSERT INTO customer_profiles (customer_id, avatar_url, tax_id, industry, credit_limit, payment_terms, source_channel, internal_notes)
            VALUES (:id, :avatar_url, :tax_id, :industry, :credit_limit, :payment_terms, :source_channel, :notes)
        ");
        $profStmt->execute([
            'id' => $customerId,
            'avatar_url' => $data['avatar_url'] ?? null,
            'tax_id' => $data['tax_id'] ?? null,
            'industry' => $data['industry'] ?? null,
            'credit_limit' => $data['credit_limit'] ?? 0.00,
            'payment_terms' => $data['payment_terms'] ?? 'Net 30',
            'source_channel' => $data['source_channel'] ?? 'Direct',
            'notes' => $data['internal_notes'] ?? null
        ]);

        // Initialize Statistics
        $statStmt = $this->pdo->prepare("INSERT INTO customer_statistics (customer_id) VALUES (:id)");
        $statStmt->execute(['id' => $customerId]);

        return $customerId;
    }

    public function updateCustomer($id, $data, $userId = 1) {
        $stmt = $this->pdo->prepare("
            UPDATE customers 
            SET customer_type = :customer_type, first_name = :first_name, last_name = :last_name, display_name = :display_name,
                company_name = :company_name, email = :email, phone = :phone, whatsapp = :whatsapp, country = :country, city = :city,
                address = :address, profession = :profession, is_vip = :is_vip, status = :status, visibility = :visibility
            WHERE id = :id AND user_id = :user_id
        ");
        $stmt->execute([
            'id' => $id,
            'user_id' => $userId,
            'customer_type' => $data['customer_type'] ?? 'individual',
            'first_name' => $data['first_name'] ?? null,
            'last_name' => $data['last_name'] ?? null,
            'display_name' => $data['display_name'],
            'company_name' => $data['company_name'] ?? null,
            'email' => $data['email'] ?? null,
            'phone' => $data['phone'] ?? null,
            'whatsapp' => $data['whatsapp'] ?? null,
            'country' => $data['country'] ?? 'United States',
            'city' => $data['city'] ?? null,
            'address' => $data['address'] ?? null,
            'profession' => $data['profession'] ?? null,
            'is_vip' => isset($data['is_vip']) ? (int)$data['is_vip'] : 0,
            'status' => $data['status'] ?? 'active',
            'visibility' => $data['visibility'] ?? 'private'
        ]);

        // Update Profile
        $profStmt = $this->pdo->prepare("
            UPDATE customer_profiles 
            SET tax_id = :tax_id, industry = :industry, credit_limit = :credit_limit, internal_notes = :notes
            WHERE customer_id = :id
        ");
        $profStmt->execute([
            'id' => $id,
            'tax_id' => $data['tax_id'] ?? null,
            'industry' => $data['industry'] ?? null,
            'credit_limit' => $data['credit_limit'] ?? 0.00,
            'notes' => $data['internal_notes'] ?? null
        ]);

        return true;
    }

    public function deleteCustomer($id, $userId = 1) {
        $stmt = $this->pdo->prepare("DELETE FROM customers WHERE id = :id AND user_id = :user_id");
        return $stmt->execute(['id' => $id, 'user_id' => $userId]);
    }

    // --- GROUPS HELPERS ---
    public function getCustomerGroups($customerId) {
        $stmt = $this->pdo->prepare("
            SELECT g.* FROM customer_groups g
            JOIN customer_group_members gm ON g.id = gm.group_id
            WHERE gm.customer_id = :customer_id
        ");
        $stmt->execute(['customer_id' => $customerId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // --- TAGS HELPERS ---
    public function getCustomerTags($customerId) {
        $stmt = $this->pdo->prepare("
            SELECT t.tag_name, t.color FROM customer_tags t
            JOIN customer_tag_assignments ta ON t.id = ta.tag_id
            WHERE ta.customer_id = :customer_id
        ");
        $stmt->execute(['customer_id' => $customerId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // --- COMMUNICATIONS HELPERS ---
    public function getCustomerCommunications($customerId) {
        $stmt = $this->pdo->prepare("SELECT * FROM customer_communications WHERE customer_id = :customer_id ORDER BY created_at DESC");
        $stmt->execute(['customer_id' => $customerId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // --- DOCUMENTS HELPERS ---
    public function getCustomerDocuments($customerId) {
        $stmt = $this->pdo->prepare("SELECT * FROM customer_documents WHERE customer_id = :customer_id ORDER BY uploaded_at DESC");
        $stmt->execute(['customer_id' => $customerId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
