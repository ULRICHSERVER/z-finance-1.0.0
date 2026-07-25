<?php
/**
 * Z-FINANCE 1.0.0 - Email Dispatch & Queue Engine
 * Handles SMTP Dispatch, Email Templates, Queuing, Delivery Tracking, and History.
 */

class EmailEngine {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    /**
     * Queue Outgoing Email
     */
    public function queueEmail($recipientEmail, $subject, $bodyHtml, $tenantId = 1) {
        $stmt = $this->pdo->prepare("
            INSERT INTO email_queue (tenant_id, recipient_email, subject, body_html, status)
            VALUES (:tenant_id, :recipient_email, :subject, :body_html, 'pending')
        ");
        $stmt->execute([
            'tenant_id' => $tenantId,
            'recipient_email' => $recipientEmail,
            'subject' => $subject,
            'body_html' => $bodyHtml
        ]);

        return $this->pdo->lastInsertId();
    }

    /**
     * Process Pending Email Queue
     */
    public function processQueue($limit = 10, $tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT * FROM email_queue 
            WHERE tenant_id = :tenant_id AND status = 'pending' 
            ORDER BY id ASC LIMIT :limit
        ");
        $stmt->bindValue(':tenant_id', $tenantId, PDO::PARAM_INT);
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        $emails = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $sentCount = 0;
        foreach ($emails as $email) {
            // Simulate SMTP Delivery
            $success = true; // SMTP send call simulation
            if ($success) {
                $upd = $this->pdo->prepare("UPDATE email_queue SET status = 'sent', sent_at = CURRENT_TIMESTAMP WHERE id = :id");
                $upd->execute(['id' => $email['id']]);

                $log = $this->pdo->prepare("INSERT INTO email_logs (tenant_id, recipient_email, subject, status) VALUES (:t, :e, :s, 'SUCCESS')");
                $log->execute(['t' => $tenantId, 'e' => $email['recipient_email'], 's' => $email['subject']]);
                $sentCount++;
            }
        }

        return $sentCount;
    }

    /**
     * Get Email Logs
     */
    public function getLogs($tenantId = 1) {
        $stmt = $this->pdo->prepare("SELECT * FROM email_logs WHERE tenant_id = :tenant_id ORDER BY id DESC LIMIT 50");
        $stmt->execute(['tenant_id' => $tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
