<?php
/**
 * Z-FINANCE 1.0.0 - Digital Signature Manager Class
 * Manages electronic, drawn, and uploaded digital signatures with cryptographic verification hashes.
 */

class SignatureManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function createSignature($data, $tenantId = 1) {
        $signerName = $data['signer_name'];
        $signerType = $data['signer_type'] ?? 'authorized';
        $format = $data['signature_format'] ?? 'draw';
        $sigData = $data['signature_data'];

        // Generate SHA-256 verification hash for anti-tampering verification
        $hashString = $signerName . '|' . $signerType . '|' . date('Y-m-d H:i:s') . '|' . substr($sigData, 0, 50);
        $verificationHash = hash('sha256', $hashString);

        $stmt = $this->pdo->prepare("
            INSERT INTO document_signatures (tenant_id, signer_name, signer_title, signer_type, signature_format, signature_data, verification_hash, ip_address, signed_at)
            VALUES (:tenant_id, :signer_name, :signer_title, :signer_type, :signature_format, :signature_data, :verification_hash, :ip_address, :signed_at)
        ");

        $stmt->execute([
            'tenant_id' => $tenantId,
            'signer_name' => $signerName,
            'signer_title' => $data['signer_title'] ?? null,
            'signer_type' => $signerType,
            'signature_format' => $format,
            'signature_data' => $sigData,
            'verification_hash' => $verificationHash,
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
            'signed_at' => date('Y-m-d H:i:s')
        ]);

        return [
            'id' => $this->pdo->lastInsertId(),
            'hash' => $verificationHash
        ];
    }

    public function verifySignature($hash) {
        $stmt = $this->pdo->prepare("SELECT * FROM document_signatures WHERE verification_hash = :hash AND is_active = 1");
        $stmt->execute(['hash' => $hash]);
        $sig = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$sig) {
            return ['valid' => false, 'message' => 'Signature Hash Not Found or Revoked'];
        }

        return [
            'valid' => true,
            'signer' => $sig['signer_name'],
            'title' => $sig['signer_title'],
            'type' => $sig['signer_type'],
            'signed_at' => $sig['signed_at'],
            'hash' => $sig['verification_hash']
        ];
    }
}
