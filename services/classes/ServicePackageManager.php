<?php
/**
 * Z-FINANCE 1.0.0 - Service Package Manager Class
 * Handles multi-tier pricing package CRUD and package feature items.
 */

class ServicePackageManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getPackagesByService($serviceId) {
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

    public function createPackage($serviceId, $data) {
        $stmt = $this->pdo->prepare("
            INSERT INTO service_packages (service_id, name, description, price, discount_percentage, duration_unit, duration_value, max_customers, max_projects, max_sessions, is_popular)
            VALUES (:service_id, :name, :description, :price, :discount_percentage, :duration_unit, :duration_value, :max_customers, :max_projects, :max_sessions, :is_popular)
        ");
        $stmt->execute([
            'service_id' => $serviceId,
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'price' => $data['price'] ?? 0.00,
            'discount_percentage' => $data['discount_percentage'] ?? 0.00,
            'duration_unit' => $data['duration_unit'] ?? 'month',
            'duration_value' => $data['duration_value'] ?? 1,
            'max_customers' => $data['max_customers'] ?? 0,
            'max_projects' => $data['max_projects'] ?? 0,
            'max_sessions' => $data['max_sessions'] ?? 0,
            'is_popular' => isset($data['is_popular']) ? (int)$data['is_popular'] : 0
        ]);

        $packageId = $this->pdo->lastInsertId();

        if (!empty($data['features']) && is_array($data['features'])) {
            $this->savePackageFeatures($packageId, $data['features']);
        }

        return $packageId;
    }

    public function updatePackage($packageId, $data) {
        $stmt = $this->pdo->prepare("
            UPDATE service_packages 
            SET name = :name, description = :description, price = :price, 
                discount_percentage = :discount_percentage, duration_unit = :duration_unit, 
                duration_value = :duration_value, max_customers = :max_customers, 
                max_projects = :max_projects, max_sessions = :max_sessions, is_popular = :is_popular
            WHERE id = :id
        ");
        $res = $stmt->execute([
            'id' => $packageId,
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'price' => $data['price'] ?? 0.00,
            'discount_percentage' => $data['discount_percentage'] ?? 0.00,
            'duration_unit' => $data['duration_unit'] ?? 'month',
            'duration_value' => $data['duration_value'] ?? 1,
            'max_customers' => $data['max_customers'] ?? 0,
            'max_projects' => $data['max_projects'] ?? 0,
            'max_sessions' => $data['max_sessions'] ?? 0,
            'is_popular' => isset($data['is_popular']) ? (int)$data['is_popular'] : 0
        ]);

        if (isset($data['features']) && is_array($data['features'])) {
            $this->savePackageFeatures($packageId, $data['features']);
        }

        return $res;
    }

    public function deletePackage($packageId) {
        $stmt = $this->pdo->prepare("DELETE FROM service_packages WHERE id = :id");
        return $stmt->execute(['id' => $packageId]);
    }

    public function savePackageFeatures($packageId, array $features) {
        $del = $this->pdo->prepare("DELETE FROM service_package_features WHERE package_id = :package_id");
        $del->execute(['package_id' => $packageId]);

        $ins = $this->pdo->prepare("INSERT INTO service_package_features (package_id, feature_text, is_included) VALUES (:package_id, :feature_text, :is_included)");
        foreach ($features as $feat) {
            $text = is_array($feat) ? $feat['feature_text'] : $feat;
            $included = is_array($feat) ? ($feat['is_included'] ?? 1) : 1;
            if (!empty(trim($text))) {
                $ins->execute([
                    'package_id' => $packageId,
                    'feature_text' => trim($text),
                    'is_included' => $included
                ]);
            }
        }
    }
}
