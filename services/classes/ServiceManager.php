<?php
/**
 * Z-FINANCE 1.0.0 - Service Manager Class
 * Comprehensive Service Lifecycle, Pricing, Documents, SEO, Search, and Analytics.
 */

class ServiceManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getDashboardStats($userId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT 
                COUNT(*) as total_services,
                SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_services,
                SUM(CASE WHEN status = 'inactive' THEN 1 ELSE 0 END) as inactive_services,
                SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft_services,
                SUM(CASE WHEN status = 'archived' THEN 1 ELSE 0 END) as archived_services,
                AVG(base_price) as avg_price
            FROM services 
            WHERE user_id = :user_id
        ");
        $stmt->execute(['user_id' => $userId]);
        $counts = $stmt->fetch(PDO::FETCH_ASSOC);

        $catStmt = $this->pdo->prepare("SELECT COUNT(*) FROM service_categories WHERE user_id = :user_id AND is_active = 1");
        $catStmt->execute(['user_id' => $userId]);
        $counts['total_categories'] = $catStmt->fetchColumn();

        return $counts;
    }

    public function getServices($userId = 1, $filters = []) {
        $sql = "SELECT s.*, c.name as category_name, c.color as category_color, c.icon as category_icon,
                       st.total_requests, st.completed_projects, st.total_revenue, st.rating_score
                FROM services s
                JOIN service_categories c ON s.category_id = c.id
                LEFT JOIN service_statistics st ON s.id = st.service_id
                WHERE s.user_id = :user_id";
        
        $params = ['user_id' => $userId];

        if (!empty($filters['status'])) {
            $sql .= " AND s.status = :status";
            $params['status'] = $filters['status'];
        }

        if (!empty($filters['category_id'])) {
            $sql .= " AND s.category_id = :category_id";
            $params['category_id'] = $filters['category_id'];
        }

        if (!empty($filters['pricing_type'])) {
            $sql .= " AND s.pricing_type = :pricing_type";
            $params['pricing_type'] = $filters['pricing_type'];
        }

        if (!empty($filters['search'])) {
            $sql .= " AND (s.name LIKE :search OR s.reference_code LIKE :search OR s.short_description LIKE :search)";
            $params['search'] = '%' . $filters['search'] . '%';
        }

        if (!empty($filters['visibility'])) {
            $sql .= " AND s.visibility = :visibility";
            $params['visibility'] = $filters['visibility'];
        }

        $sql .= " ORDER BY s.id DESC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        $services = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Attach tags, packages & documents
        foreach ($services as &$srv) {
            $srv['packages'] = $this->getServicePackages($srv['id']);
            $srv['documents'] = $this->getServiceDocuments($srv['id']);
            $srv['availability'] = $this->getServiceAvailability($srv['id']);
            $srv['seo'] = $this->getServiceSEO($srv['id']);
            $srv['tags'] = $this->getServiceTags($srv['id']);
        }

        return $services;
    }

    public function getServiceById($id, $userId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT s.*, c.name as category_name, c.color as category_color 
            FROM services s
            JOIN service_categories c ON s.category_id = c.id
            WHERE s.id = :id AND s.user_id = :user_id
        ");
        $stmt->execute(['id' => $id, 'user_id' => $userId]);
        $service = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($service) {
            $service['packages'] = $this->getServicePackages($service['id']);
            $service['documents'] = $this->getServiceDocuments($service['id']);
            $service['gallery'] = $this->getServiceGallery($service['id']);
            $service['availability'] = $this->getServiceAvailability($service['id']);
            $service['seo'] = $this->getServiceSEO($service['id']);
            $service['tags'] = $this->getServiceTags($service['id']);
        }

        return $service;
    }

    public function createService($data, $userId = 1) {
        $refCode = $data['reference_code'] ?? 'SRV-' . strtoupper(substr(md5(uniqid(rand(), true)), 0, 8));
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $data['name']))) . '-' . time();

        $stmt = $this->pdo->prepare("
            INSERT INTO services (user_id, category_id, name, short_name, reference_code, slug, status, visibility, pricing_type, base_price, currency, short_description, detailed_description, featured_image, color)
            VALUES (:user_id, :category_id, :name, :short_name, :reference_code, :slug, :status, :visibility, :pricing_type, :base_price, :currency, :short_description, :detailed_description, :featured_image, :color)
        ");
        $stmt->execute([
            'user_id' => $userId,
            'category_id' => $data['category_id'],
            'name' => $data['name'],
            'short_name' => $data['short_name'] ?? null,
            'reference_code' => $refCode,
            'slug' => $slug,
            'status' => $data['status'] ?? 'active',
            'visibility' => $data['visibility'] ?? 'public',
            'pricing_type' => $data['pricing_type'] ?? 'fixed',
            'base_price' => $data['base_price'] ?? 0.00,
            'currency' => $data['currency'] ?? 'USD',
            'short_description' => $data['short_description'] ?? null,
            'detailed_description' => $data['detailed_description'] ?? null,
            'featured_image' => $data['featured_image'] ?? null,
            'color' => $data['color'] ?? '#2563eb'
        ]);

        $serviceId = $this->pdo->lastInsertId();

        // Initialize Stats
        $statStmt = $this->pdo->prepare("INSERT INTO service_statistics (service_id) VALUES (:id)");
        $statStmt->execute(['id' => $serviceId]);

        // Save Availability
        if (!empty($data['availability'])) {
            $this->saveServiceAvailability($serviceId, $data['availability']);
        }

        // Save SEO
        if (!empty($data['seo'])) {
            $this->saveServiceSEO($serviceId, $data['seo']);
        }

        // Save Tags
        if (!empty($data['tags']) && is_array($data['tags'])) {
            $this->saveServiceTags($serviceId, $data['tags']);
        }

        return $serviceId;
    }

    public function updateService($id, $data, $userId = 1) {
        $stmt = $this->pdo->prepare("
            UPDATE services 
            SET category_id = :category_id, name = :name, short_name = :short_name, 
                status = :status, visibility = :visibility, pricing_type = :pricing_type, 
                base_price = :base_price, currency = :currency, short_description = :short_description, 
                detailed_description = :detailed_description, featured_image = :featured_image, color = :color
            WHERE id = :id AND user_id = :user_id
        ");
        $result = $stmt->execute([
            'id' => $id,
            'user_id' => $userId,
            'category_id' => $data['category_id'],
            'name' => $data['name'],
            'short_name' => $data['short_name'] ?? null,
            'status' => $data['status'] ?? 'active',
            'visibility' => $data['visibility'] ?? 'public',
            'pricing_type' => $data['pricing_type'] ?? 'fixed',
            'base_price' => $data['base_price'] ?? 0.00,
            'currency' => $data['currency'] ?? 'USD',
            'short_description' => $data['short_description'] ?? null,
            'detailed_description' => $data['detailed_description'] ?? null,
            'featured_image' => $data['featured_image'] ?? null,
            'color' => $data['color'] ?? '#2563eb'
        ]);

        if (!empty($data['availability'])) {
            $this->saveServiceAvailability($id, $data['availability']);
        }

        if (!empty($data['seo'])) {
            $this->saveServiceSEO($id, $data['seo']);
        }

        if (isset($data['tags']) && is_array($data['tags'])) {
            $this->saveServiceTags($id, $data['tags']);
        }

        return $result;
    }

    public function deleteService($id, $userId = 1) {
        $stmt = $this->pdo->prepare("DELETE FROM services WHERE id = :id AND user_id = :user_id");
        return $stmt->execute(['id' => $id, 'user_id' => $userId]);
    }

    // --- PACKAGES SUB-HELPER ---
    public function getServicePackages($serviceId) {
        $stmt = $this->pdo->prepare("SELECT * FROM service_packages WHERE service_id = :service_id ORDER BY price ASC");
        $stmt->execute(['service_id' => $serviceId]);
        $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($packages as &$pkg) {
            $featStmt = $this->pdo->prepare("SELECT * FROM service_package_features WHERE package_id = :package_id");
            $featStmt->execute(['package_id' => $pkg['id']]);
            $pkg['features'] = $featStmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return $packages;
    }

    // --- DOCUMENTS SUB-HELPER ---
    public function getServiceDocuments($serviceId) {
        $stmt = $this->pdo->prepare("SELECT * FROM service_documents WHERE service_id = :service_id");
        $stmt->execute(['service_id' => $serviceId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function addServiceDocument($serviceId, $title, $filePath, $fileType = 'pdf', $fileSize = 0.00) {
        $stmt = $this->pdo->prepare("INSERT INTO service_documents (service_id, title, file_path, file_type, file_size_mb) VALUES (:service_id, :title, :file_path, :file_type, :file_size_mb)");
        return $stmt->execute([
            'service_id' => $serviceId,
            'title' => $title,
            'file_path' => $filePath,
            'file_type' => $fileType,
            'file_size_mb' => $fileSize
        ]);
    }

    // --- GALLERY SUB-HELPER ---
    public function getServiceGallery($serviceId) {
        $stmt = $this->pdo->prepare("SELECT * FROM service_gallery WHERE service_id = :service_id ORDER BY display_order ASC");
        $stmt->execute(['service_id' => $serviceId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // --- AVAILABILITY SUB-HELPER ---
    public function getServiceAvailability($serviceId) {
        $stmt = $this->pdo->prepare("SELECT * FROM service_availability WHERE service_id = :service_id");
        $stmt->execute(['service_id' => $serviceId]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($res && isset($res['business_days'])) {
            $res['business_days'] = json_decode($res['business_days'], true);
        }
        return $res ?: [
            'business_days' => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            'working_hours_start' => '08:00',
            'working_hours_end' => '17:00',
            'requires_appointment' => 1,
            'delivery_mode' => 'hybrid'
        ];
    }

    public function saveServiceAvailability($serviceId, $data) {
        $stmt = $this->pdo->prepare("
            INSERT INTO service_availability (service_id, business_days, working_hours_start, working_hours_end, requires_appointment, delivery_mode)
            VALUES (:service_id, :business_days, :working_hours_start, :working_hours_end, :requires_appointment, :delivery_mode)
            ON DUPLICATE KEY UPDATE 
                business_days = VALUES(business_days),
                working_hours_start = VALUES(working_hours_start),
                working_hours_end = VALUES(working_hours_end),
                requires_appointment = VALUES(requires_appointment),
                delivery_mode = VALUES(delivery_mode)
        ");
        return $stmt->execute([
            'service_id' => $serviceId,
            'business_days' => json_encode($data['business_days'] ?? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']),
            'working_hours_start' => $data['working_hours_start'] ?? '08:00:00',
            'working_hours_end' => $data['working_hours_end'] ?? '17:00:00',
            'requires_appointment' => isset($data['requires_appointment']) ? (int)$data['requires_appointment'] : 1,
            'delivery_mode' => $data['delivery_mode'] ?? 'hybrid'
        ]);
    }

    // --- SEO SUB-HELPER ---
    public function getServiceSEO($serviceId) {
        $stmt = $this->pdo->prepare("SELECT * FROM service_seo WHERE service_id = :service_id");
        $stmt->execute(['service_id' => $serviceId]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: [
            'seo_title' => '',
            'meta_description' => '',
            'keywords' => '',
            'og_image' => ''
        ];
    }

    public function saveServiceSEO($serviceId, $data) {
        $stmt = $this->pdo->prepare("
            INSERT INTO service_seo (service_id, seo_title, meta_description, keywords, og_image)
            VALUES (:service_id, :seo_title, :meta_description, :keywords, :og_image)
            ON DUPLICATE KEY UPDATE 
                seo_title = VALUES(seo_title),
                meta_description = VALUES(meta_description),
                keywords = VALUES(keywords),
                og_image = VALUES(og_image)
        ");
        return $stmt->execute([
            'service_id' => $serviceId,
            'seo_title' => $data['seo_title'] ?? null,
            'meta_description' => $data['meta_description'] ?? null,
            'keywords' => $data['keywords'] ?? null,
            'og_image' => $data['og_image'] ?? null
        ]);
    }

    // --- TAGS SUB-HELPER ---
    public function getServiceTags($serviceId) {
        $stmt = $this->pdo->prepare("SELECT tag_name FROM service_tags WHERE service_id = :service_id");
        $stmt->execute(['service_id' => $serviceId]);
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    public function saveServiceTags($serviceId, array $tags) {
        $del = $this->pdo->prepare("DELETE FROM service_tags WHERE service_id = :service_id");
        $del->execute(['service_id' => $serviceId]);

        $ins = $this->pdo->prepare("INSERT INTO service_tags (service_id, tag_name) VALUES (:service_id, :tag_name)");
        foreach ($tags as $tag) {
            if (!empty(trim($tag))) {
                $ins->execute(['service_id' => $serviceId, 'tag_name' => trim($tag)]);
            }
        }
    }
}
