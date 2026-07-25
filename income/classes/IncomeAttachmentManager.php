<?php
/**
 * Z-FINANCE 1.0.0 - Income Attachment Manager Class
 * Handles upload, listing, and deletion of income proof, receipts, invoices, and contracts.
 */

class IncomeAttachmentManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function addAttachment($data, $userId = 1) {
        $stmt = $this->pdo->prepare("
            INSERT INTO income_attachments (income_id, file_name, file_path, file_type, file_size, attachment_type, uploaded_by)
            VALUES (:income_id, :file_name, :file_path, :file_type, :file_size, :attachment_type, :uploaded_by)
        ");

        $stmt->execute([
            'income_id' => $data['income_id'],
            'file_name' => $data['file_name'],
            'file_path' => $data['file_path'],
            'file_type' => $data['file_type'] ?? 'application/pdf',
            'file_size' => $data['file_size'] ?? 0,
            'attachment_type' => $data['attachment_type'] ?? 'receipt',
            'uploaded_by' => $userId
        ]);

        return $this->pdo->lastInsertId();
    }

    public function getAttachmentsByIncome($incomeId) {
        $stmt = $this->pdo->prepare("SELECT * FROM income_attachments WHERE income_id = :income_id AND is_deleted = 0 ORDER BY uploaded_at DESC");
        $stmt->execute(['income_id' => $incomeId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
