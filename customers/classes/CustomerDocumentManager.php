<?php
/**
 * Z-FINANCE 1.0.0 - Customer Document Manager Class
 * Handles contract, identity, invoice, receipt, and certificate uploads and management.
 */

class CustomerDocumentManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function addDocument($data) {
        $stmt = $this->pdo->prepare("
            INSERT INTO customer_documents (customer_id, title, document_type, file_path, file_size_mb)
            VALUES (:customer_id, :title, :document_type, :file_path, :file_size_mb)
        ");
        $stmt->execute([
            'customer_id' => $data['customer_id'],
            'title' => $data['title'],
            'document_type' => $data['document_type'] ?? 'other',
            'file_path' => $data['file_path'],
            'file_size_mb' => $data['file_size_mb'] ?? 0.00
        ]);
        return $this->pdo->lastInsertId();
    }

    public function getDocumentsByCustomer($customerId) {
        $stmt = $this->pdo->prepare("SELECT * FROM customer_documents WHERE customer_id = :customer_id ORDER BY uploaded_at DESC");
        $stmt->execute(['customer_id' => $customerId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function deleteDocument($id) {
        $stmt = $this->pdo->prepare("DELETE FROM customer_documents WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
