<?php
/**
 * Z-FINANCE 1.0.0 - Enterprise Document Management System (EDMS)
 * Class: DocumentManager
 */

namespace ZFinance\Modules\Documents;

use PDO;
use Exception;

class DocumentManager {
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default') {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    /**
     * Upload / Register new document
     */
    public function createDocument(array $data, int $userId): array {
        $stmt = $this->db->prepare("
            INSERT INTO documents (
                tenant_id, folder_id, category_id, title, file_name, original_name,
                file_path, file_size, file_type, extension, mime_type, checksum,
                current_version, library_type, module_origin, owner_id, created_by, status
            ) VALUES (
                :tenant_id, :folder_id, :category_id, :title, :file_name, :original_name,
                :file_path, :file_size, :file_type, :extension, :mime_type, :checksum,
                :current_version, :library_type, :module_origin, :owner_id, :created_by, :status
            )
        ");

        $version = $data['current_version'] ?? '1.0.0';
        $checksum = $data['checksum'] ?? hash('sha256', $data['file_path'] ?? uniqid());

        $stmt->execute([
            ':tenant_id'       => $this->tenantId,
            ':folder_id'        => $data['folder_id'] ?? null,
            ':category_id'      => $data['category_id'] ?? null,
            ':title'            => $data['title'] ?? 'Untitled Document',
            ':file_name'        => $data['file_name'] ?? 'file_' . time(),
            ':original_name'    => $data['original_name'] ?? 'document.pdf',
            ':file_path'        => $data['file_path'] ?? '/uploads/documents/' . time() . '.pdf',
            ':file_size'        => $data['file_size'] ?? 1024,
            ':file_type'        => $data['file_type'] ?? 'document',
            ':extension'        => strtolower($data['extension'] ?? 'pdf'),
            ':mime_type'        => $data['mime_type'] ?? 'application/pdf',
            ':checksum'         => $checksum,
            ':current_version'  => $version,
            ':library_type'     => $data['library_type'] ?? 'business',
            ':module_origin'    => $data['module_origin'] ?? 'general',
            ':owner_id'         => $userId,
            ':created_by'       => $userId,
            ':status'           => $data['status'] ?? 'approved'
        ]);

        $docId = (int)$this->db->lastInsertId();

        // Register initial version in document_versions
        $this->addVersionRecord($docId, $version, $data['file_path'] ?? '', $data['file_size'] ?? 1024, $checksum, 'Initial upload', $userId);

        // Record Audit log
        $this->logAudit($docId, $userId, 'upload', "Uploaded document ID {$docId}: " . ($data['title'] ?? ''));

        // Update Storage statistics
        $this->updateStorageStats($data['file_size'] ?? 1024, 1);

        return ['success' => true, 'document_id' => $docId, 'version' => $version];
    }

    /**
     * Add a new version to existing document
     */
    public function addVersion(int $documentId, string $filePath, int $fileSize, string $changeSummary, int $userId): array {
        $doc = $this->getDocumentById($documentId);
        if (!$doc) {
            throw new Exception("Document not found");
        }

        // Calculate next semver version
        $parts = explode('.', $doc['current_version']);
        $major = (int)($parts[0] ?? 1);
        $minor = (int)($parts[1] ?? 0);
        $patch = (int)($parts[2] ?? 0) + 1;
        $newVersion = "{$major}.{$minor}.{$patch}";
        $checksum = hash('sha256', $filePath . time());

        // Update main document
        $stmt = $this->db->prepare("
            UPDATE documents 
            SET current_version = :ver, file_path = :path, file_size = :size, checksum = :cs, updated_at = NOW()
            WHERE id = :id AND tenant_id = :tenant_id
        ");
        $stmt->execute([
            ':ver' => $newVersion,
            ':path' => $filePath,
            ':size' => $fileSize,
            ':cs' => $checksum,
            ':id' => $documentId,
            ':tenant_id' => $this->tenantId
        ]);

        $this->addVersionRecord($documentId, $newVersion, $filePath, $fileSize, $checksum, $changeSummary, $userId);
        $this->logAudit($documentId, $userId, 'version_add', "Updated document {$documentId} to version {$newVersion}");

        return ['success' => true, 'version' => $newVersion];
    }

    /**
     * Helper to insert version record
     */
    private function addVersionRecord(int $docId, string $version, string $path, int $size, string $checksum, string $summary, int $userId): void {
        $stmt = $this->db->prepare("
            INSERT INTO document_versions (document_id, version_number, file_path, file_size, checksum, change_summary, created_by)
            VALUES (:doc_id, :ver, :path, :size, :cs, :summary, :user_id)
        ");
        $stmt->execute([
            ':doc_id' => $docId,
            ':ver' => $version,
            ':path' => $path,
            ':size' => $size,
            ':cs' => $checksum,
            ':summary' => $summary,
            ':user_id' => $userId
        ]);
    }

    /**
     * Get document by ID
     */
    public function getDocumentById(int $documentId): ?array {
        $stmt = $this->db->prepare("
            SELECT d.*, c.name as category_name, f.name as folder_name
            FROM documents d
            LEFT JOIN document_categories c ON d.category_id = c.id
            LEFT JOIN folders f ON d.folder_id = f.id
            WHERE d.id = :id AND d.tenant_id = :tenant_id AND d.is_deleted = 0
        ");
        $stmt->execute([':id' => $documentId, ':tenant_id' => $this->tenantId]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        return $res ?: null;
    }

    /**
     * Link document to module entity (CRM, Supplier, Project, Expense, etc.)
     */
    public function linkDocument(int $docId, string $module, int $entityId, string $desc = ''): bool {
        $stmt = $this->db->prepare("
            INSERT INTO document_links (document_id, linked_module, linked_entity_id, description)
            VALUES (:doc_id, :module, :entity_id, :desc)
        ");
        return $stmt->execute([
            ':doc_id' => $docId,
            ':module' => $module,
            ':entity_id' => $entityId,
            ':desc' => $desc
        ]);
    }

    /**
     * Audit log recorder
     */
    public function logAudit(?int $docId, int $userId, string $action, string $details = ''): void {
        $stmt = $this->db->prepare("
            INSERT INTO document_audit_logs (tenant_id, document_id, user_id, action, details)
            VALUES (:tenant_id, :doc_id, :user_id, :action, :details)
        ");
        $stmt->execute([
            ':tenant_id' => $this->tenantId,
            ':doc_id' => $docId,
            ':user_id' => $userId,
            ':action' => $action,
            ':details' => $details
        ]);
    }

    /**
     * Update storage stats
     */
    private function updateStorageStats(int $sizeDelta, int $countDelta): void {
        $stmt = $this->db->prepare("
            INSERT INTO storage_statistics (tenant_id, used_space_bytes, file_count)
            VALUES (:tenant_id, :used, :cnt)
            ON DUPLICATE KEY UPDATE 
                used_space_bytes = GREATEST(0, used_space_bytes + :used),
                file_count = GREATEST(0, file_count + :cnt)
        ");
        $stmt->execute([
            ':tenant_id' => $this->tenantId,
            ':used' => $sizeDelta,
            ':cnt' => $countDelta
        ]);
    }
}
