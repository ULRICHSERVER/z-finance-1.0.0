<?php
/**
 * Z-FINANCE 1.0.0 - Expense Attachment Manager Class
 * Handles upload, listing, and deletion of expense receipts, bills, contracts, and proof of payment.
 */

class ExpenseAttachmentManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function addAttachment($data, $userId = 1) {
        $stmt = $this->pdo->prepare("
            INSERT INTO expense_attachments (expense_id, file_name, file_path, file_type, file_size, attachment_type, uploaded_by)
            VALUES (:expense_id, :file_name, :file_path, :file_type, :file_size, :attachment_type, :uploaded_by)
        ");

        $stmt->execute([
            'expense_id' => $data['expense_id'],
            'file_name' => $data['file_name'],
            'file_path' => $data['file_path'],
            'file_type' => $data['file_type'] ?? 'application/pdf',
            'file_size' => $data['file_size'] ?? 0,
            'attachment_type' => $data['attachment_type'] ?? 'receipt',
            'uploaded_by' => $userId
        ]);

        return $this->pdo->lastInsertId();
    }

    public function getAttachmentsByExpense($expenseId) {
        $stmt = $this->pdo->prepare("SELECT * FROM expense_attachments WHERE expense_id = :expense_id AND is_deleted = 0 ORDER BY uploaded_at DESC");
        $stmt->execute(['expense_id' => $expenseId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
