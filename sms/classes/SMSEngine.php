<?php
/**
 * Z-FINANCE 1.0.0 - SMS & WhatsApp Engine
 * Integrates MTN SMS, Orange SMS, Twilio, and WhatsApp API.
 */

class SMSEngine {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    /**
     * Queue SMS Message
     */
    public function queueSMS($phoneNumber, $smsBody, $provider = 'MTN_SMS', $tenantId = 1) {
        $stmt = $this->pdo->prepare("
            INSERT INTO sms_queue (tenant_id, phone_number, sms_body, provider, status)
            VALUES (:tenant_id, :phone_number, :sms_body, :provider, 'pending')
        ");
        $stmt->execute([
            'tenant_id' => $tenantId,
            'phone_number' => $phoneNumber,
            'sms_body' => $smsBody,
            'provider' => $provider
        ]);

        return $this->pdo->lastInsertId();
    }

    /**
     * Get SMS Queue & History
     */
    public function getQueue($tenantId = 1) {
        $stmt = $this->pdo->prepare("SELECT * FROM sms_queue WHERE tenant_id = :tenant_id ORDER BY id DESC LIMIT 50");
        $stmt->execute(['tenant_id' => $tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
