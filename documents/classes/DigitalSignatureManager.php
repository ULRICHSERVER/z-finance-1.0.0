<?php
/**
 * Z-FINANCE 1.0.0 - Enterprise Document Management System (EDMS)
 * Class: DigitalSignatureManager
 */

namespace ZFinance\Modules\Documents;

use PDO;
use Exception;

class DigitalSignatureManager {
    private PDO $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    /**
     * Apply digital signature to document
     */
    public function signDocument(int $docId, string $signerName, string $signerEmail, string $sigType, string $sigData, string $ip = '127.0.0.1'): array {
        $verificationHash = hash('sha256', $docId . $signerEmail . $sigData . microtime());

        $stmt = $this->db->prepare("
            INSERT INTO document_signatures (document_id, signer_name, signer_email, signature_type, signature_data, ip_address, verification_hash)
            VALUES (:doc_id, :name, :email, :type, :data, :ip, :hash)
        ");

        $stmt->execute([
            ':doc_id' => $docId,
            ':name' => $signerName,
            ':email' => $signerEmail,
            ':type' => $sigType,
            ':data' => $sigData,
            ':ip' => $ip,
            ':hash' => $verificationHash
        ]);

        $sigId = (int)$this->db->lastInsertId();

        return [
            'success' => true,
            'signature_id' => $sigId,
            'verification_hash' => $verificationHash,
            'timestamp' => date('Y-m-d H:i:s')
        ];
    }

    /**
     * Get all signatures for a document
     */
    public function getDocumentSignatures(int $docId): array {
        $stmt = $this->db->prepare("
            SELECT id, document_id, signer_name, signer_email, signature_type, verification_hash, timestamp
            FROM document_signatures
            WHERE document_id = :doc_id
            ORDER BY timestamp DESC
        ");
        $stmt->execute([':doc_id' => $docId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }
}
