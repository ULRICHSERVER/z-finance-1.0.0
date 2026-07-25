<?php
/**
 * Z-FINANCE 1.0.0 - Notification Central Engine
 * Handles In-App, System, Financial, Project, CRM, and Admin Alerts.
 */

class NotificationManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    /**
     * Dispatch New Notification
     */
    public function notify($recipientId, $title, $message, $category = 'system', $type = 'in_app', $linkUrl = null, $tenantId = 1) {
        $stmt = $this->pdo->prepare("
            INSERT INTO notifications (tenant_id, recipient_id, title, message, category, notification_type, link_url)
            VALUES (:tenant_id, :recipient_id, :title, :message, :category, :notification_type, :link_url)
        ");
        $stmt->execute([
            'tenant_id' => $tenantId,
            'recipient_id' => $recipientId,
            'title' => $title,
            'message' => $message,
            'category' => $category,
            'notification_type' => $type,
            'link_url' => $linkUrl
        ]);

        return $this->pdo->lastInsertId();
    }

    /**
     * Get Unread & All Notifications for User
     */
    public function getNotifications($userId, $unreadOnly = false, $tenantId = 1) {
        $sql = "SELECT * FROM notifications WHERE tenant_id = :tenant_id AND recipient_id = :recipient_id";
        if ($unreadOnly) {
            $sql .= " AND is_read = 0";
        }
        $sql .= " ORDER BY id DESC LIMIT 50";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            'tenant_id' => $tenantId,
            'recipient_id' => $userId
        ]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Mark Notification as Read
     */
    public function markAsRead($notificationId, $userId) {
        $stmt = $this->pdo->prepare("
            UPDATE notifications SET is_read = 1 WHERE id = :id AND recipient_id = :recipient_id
        ");
        return $stmt->execute([
            'id' => $notificationId,
            'recipient_id' => $userId
        ]);
    }
}
