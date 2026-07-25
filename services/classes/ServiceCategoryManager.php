<?php
/**
 * Z-FINANCE 1.0.0 - Service Category Manager Class
 * Handles category creation, editing, status toggles, and deletion.
 */

class ServiceCategoryManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getCategories($userId = 1, $activeOnly = false) {
        $sql = "SELECT c.*, COUNT(s.id) as service_count 
                FROM service_categories c 
                LEFT JOIN services s ON c.id = s.category_id AND s.status != 'archived'
                WHERE c.user_id = :user_id";
        if ($activeOnly) {
            $sql .= " AND c.is_active = 1";
        }
        $sql .= " GROUP BY c.id ORDER BY c.display_order ASC, c.name ASC";
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['user_id' => $userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getCategoryById($id, $userId = 1) {
        $stmt = $this->pdo->prepare("SELECT * FROM service_categories WHERE id = :id AND user_id = :user_id");
        $stmt->execute(['id' => $id, 'user_id' => $userId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createCategory($data, $userId = 1) {
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $data['name'])));
        $stmt = $this->pdo->prepare("
            INSERT INTO service_categories (user_id, name, slug, description, icon, color, image_url, is_active, display_order)
            VALUES (:user_id, :name, :slug, :description, :icon, :color, :image_url, :is_active, :display_order)
        ");
        $stmt->execute([
            'user_id' => $userId,
            'name' => $data['name'],
            'slug' => $slug . '-' . time(),
            'description' => $data['description'] ?? null,
            'icon' => $data['icon'] ?? 'Briefcase',
            'color' => $data['color'] ?? '#2563eb',
            'image_url' => $data['image_url'] ?? null,
            'is_active' => isset($data['is_active']) ? (int)$data['is_active'] : 1,
            'display_order' => (int)($data['display_order'] ?? 0)
        ]);
        return $this->pdo->lastInsertId();
    }

    public function updateCategory($id, $data, $userId = 1) {
        $stmt = $this->pdo->prepare("
            UPDATE service_categories 
            SET name = :name, description = :description, icon = :icon, color = :color, 
                image_url = :image_url, is_active = :is_active, display_order = :display_order
            WHERE id = :id AND user_id = :user_id
        ");
        return $stmt->execute([
            'id' => $id,
            'user_id' => $userId,
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'icon' => $data['icon'] ?? 'Briefcase',
            'color' => $data['color'] ?? '#2563eb',
            'image_url' => $data['image_url'] ?? null,
            'is_active' => isset($data['is_active']) ? (int)$data['is_active'] : 1,
            'display_order' => (int)($data['display_order'] ?? 0)
        ]);
    }

    public function toggleCategoryStatus($id, $userId = 1) {
        $stmt = $this->pdo->prepare("
            UPDATE service_categories 
            SET is_active = CASE WHEN is_active = 1 THEN 0 ELSE 1 END
            WHERE id = :id AND user_id = :user_id
        ");
        return $stmt->execute(['id' => $id, 'user_id' => $userId]);
    }

    public function deleteCategory($id, $userId = 1) {
        $stmt = $this->pdo->prepare("DELETE FROM service_categories WHERE id = :id AND user_id = :user_id");
        return $stmt->execute(['id' => $id, 'user_id' => $userId]);
    }
}
