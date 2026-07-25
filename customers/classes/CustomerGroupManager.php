<?php
/**
 * Z-FINANCE 1.0.0 - Customer Group Manager Class
 * Manages customer groups, segmentations, and tagging assignments.
 */

class CustomerGroupManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getAllGroups($userId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT g.*, COUNT(gm.customer_id) as member_count
            FROM customer_groups g
            LEFT JOIN customer_group_members gm ON g.id = gm.group_id
            WHERE g.user_id = :user_id
            GROUP BY g.id
            ORDER BY g.name ASC
        ");
        $stmt->execute(['user_id' => $userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createGroup($data, $userId = 1) {
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $data['name'])));
        $stmt = $this->pdo->prepare("
            INSERT INTO customer_groups (user_id, name, slug, description, color)
            VALUES (:user_id, :name, :slug, :description, :color)
        ");
        $stmt->execute([
            'user_id' => $userId,
            'name' => $data['name'],
            'slug' => $slug,
            'description' => $data['description'] ?? null,
            'color' => $data['color'] ?? '#2563eb'
        ]);
        return $this->pdo->lastInsertId();
    }

    public function assignCustomerToGroup($customerId, $groupId) {
        $stmt = $this->pdo->prepare("INSERT IGNORE INTO customer_group_members (customer_id, group_id) VALUES (:customer_id, :group_id)");
        return $stmt->execute(['customer_id' => $customerId, 'group_id' => $groupId]);
    }

    public function removeCustomerFromGroup($customerId, $groupId) {
        $stmt = $this->pdo->prepare("DELETE FROM customer_group_members WHERE customer_id = :customer_id AND group_id = :group_id");
        return $stmt->execute(['customer_id' => $customerId, 'group_id' => $groupId]);
    }
}
