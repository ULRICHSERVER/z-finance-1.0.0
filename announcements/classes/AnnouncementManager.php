<?php
/**
 * Z-FINANCE 1.0.0 - Global Announcements Engine
 * Manages Global, Group, Emergency, and Maintenance Broadcasts.
 */

class AnnouncementManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    /**
     * Create Announcement
     */
    public function createAnnouncement($title, $content, $type = 'global', $priority = 'medium', $tenantId = 1, $userId = 1) {
        $stmt = $this->pdo->prepare("
            INSERT INTO announcements (tenant_id, title, content, announcement_type, priority, created_by)
            VALUES (:tenant_id, :title, :content, :announcement_type, :priority, :created_by)
        ");
        $stmt->execute([
            'tenant_id' => $tenantId,
            'title' => $title,
            'content' => $content,
            'announcement_type' => $type,
            'priority' => $priority,
            'created_by' => $userId
        ]);

        return $this->pdo->lastInsertId();
    }

    /**
     * Get Published Announcements
     */
    public function getAnnouncements($tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT * FROM announcements 
            WHERE tenant_id = :tenant_id AND is_published = 1 
            ORDER BY id DESC
        ");
        $stmt->execute(['tenant_id' => $tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
