<?php
/**
 * Z-FINANCE 1.0.0 - Messaging Engine
 * Handles Private Conversations, Group Chats, Project & CRM Messages, Attachments, and Offline Sync.
 */

class MessageManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    /**
     * Create or Get Existing Conversation
     */
    public function createConversation($type, $title = null, array $memberIds = [], $tenantId = 1, $userId = 1) {
        $stmt = $this->pdo->prepare("
            INSERT INTO conversations (tenant_id, type, title, created_by)
            VALUES (:tenant_id, :type, :title, :created_by)
        ");
        $stmt->execute([
            'tenant_id' => $tenantId,
            'type' => $type,
            'title' => $title,
            'created_by' => $userId
        ]);

        $convId = $this->pdo->lastInsertId();

        // Add creator as owner
        $this->addMember($convId, $userId, 'owner');

        // Add additional members
        foreach ($memberIds as $mId) {
            if ($mId != $userId) {
                $this->addMember($convId, $mId, 'member');
            }
        }

        return $convId;
    }

    /**
     * Add Member to Conversation
     */
    public function addMember($conversationId, $userId, $role = 'member') {
        $stmt = $this->pdo->prepare("
            INSERT INTO conversation_members (conversation_id, user_id, role)
            VALUES (:conversation_id, :user_id, :role)
        ");
        return $stmt->execute([
            'conversation_id' => $conversationId,
            'user_id' => $userId,
            'role' => $role
        ]);
    }

    /**
     * Send Message
     */
    public function sendMessage($conversationId, $senderId, $text, $type = 'text', $tenantId = 1) {
        $stmt = $this->pdo->prepare("
            INSERT INTO messages (tenant_id, conversation_id, sender_id, message_text, message_type)
            VALUES (:tenant_id, :conversation_id, :sender_id, :message_text, :message_type)
        ");
        $stmt->execute([
            'tenant_id' => $tenantId,
            'conversation_id' => $conversationId,
            'sender_id' => $senderId,
            'message_text' => $text,
            'message_type' => $type
        ]);

        return $this->pdo->lastInsertId();
    }

    /**
     * Get Conversations List for a User
     */
    public function getConversations($userId, $tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT c.*, cm.role, cm.is_muted, cm.is_pinned
            FROM conversations c
            INNER JOIN conversation_members cm ON c.id = cm.conversation_id
            WHERE c.tenant_id = :tenant_id AND cm.user_id = :user_id
            ORDER BY cm.is_pinned DESC, c.updated_at DESC
        ");
        $stmt->execute([
            'tenant_id' => $tenantId,
            'user_id' => $userId
        ]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get Messages in a Conversation
     */
    public function getMessages($conversationId, $tenantId = 1, $limit = 50) {
        $stmt = $this->pdo->prepare("
            SELECT m.*, u.username as sender_name
            FROM messages m
            LEFT JOIN users u ON m.sender_id = u.id
            WHERE m.tenant_id = :tenant_id AND m.conversation_id = :conversation_id
            ORDER BY m.id ASC
            LIMIT :limit
        ");
        $stmt->bindValue(':tenant_id', $tenantId, PDO::PARAM_INT);
        $stmt->bindValue(':conversation_id', $conversationId, PDO::PARAM_INT);
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
