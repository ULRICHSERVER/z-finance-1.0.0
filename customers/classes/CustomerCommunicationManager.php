<?php
/**
 * Z-FINANCE 1.0.0 - Customer Communication Manager Class
 * Logs phone calls, emails, meetings, notes, and WhatsApp follow-ups.
 */

class CustomerCommunicationManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function logCommunication($data) {
        $stmt = $this->pdo->prepare("
            INSERT INTO customer_communications (customer_id, type, subject, details, follow_up_date, is_resolved)
            VALUES (:customer_id, :type, :subject, :details, :follow_up_date, :is_resolved)
        ");
        $stmt->execute([
            'customer_id' => $data['customer_id'],
            'type' => $data['type'] ?? 'note',
            'subject' => $data['subject'],
            'details' => $data['details'] ?? null,
            'follow_up_date' => $data['follow_up_date'] ?? null,
            'is_resolved' => isset($data['is_resolved']) ? (int)$data['is_resolved'] : 1
        ]);

        // Update statistics last interaction date
        $statStmt = $this->pdo->prepare("
            UPDATE customer_statistics 
            SET last_interaction_date = CURRENT_TIMESTAMP 
            WHERE customer_id = :customer_id
        ");
        $statStmt->execute(['customer_id' => $data['customer_id']]);

        return $this->pdo->lastInsertId();
    }

    public function getCommunications($customerId) {
        $stmt = $this->pdo->prepare("SELECT * FROM customer_communications WHERE customer_id = :customer_id ORDER BY created_at DESC");
        $stmt->execute(['customer_id' => $customerId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
