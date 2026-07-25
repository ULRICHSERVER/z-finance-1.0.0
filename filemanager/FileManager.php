<?php
/**
 * Z-FINANCE 1.0.0 - File & Folder Operations Engine
 */

namespace ZFinance\Modules\FileManager;

use PDO;
use Exception;

class FileManager {
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default') {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    /**
     * Create folder
     */
    public function createFolder(string $name, ?int $parentId, string $libraryType, int $userId, string $color = '#3b82f6'): array {
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name)));

        $stmt = $this->db->prepare("
            INSERT INTO folders (tenant_id, parent_id, name, slug, library_type, color, created_by)
            VALUES (:tenant_id, :parent_id, :name, :slug, :library_type, :color, :created_by)
        ");
        $stmt->execute([
            ':tenant_id' => $this->tenantId,
            ':parent_id' => $parentId,
            ':name' => $name,
            ':slug' => $slug,
            ':library_type' => $libraryType,
            ':color' => $color,
            ':created_by' => $userId
        ]);

        return [
            'success' => true,
            'folder_id' => (int)$this->db->lastInsertId(),
            'name' => $name,
            'library_type' => $libraryType
        ];
    }

    /**
     * Get folder tree structure
     */
    public function getFolderTree(string $libraryType = 'business'): array {
        $stmt = $this->db->prepare("
            SELECT * FROM folders
            WHERE tenant_id = :tenant_id AND library_type = :library_type
            ORDER BY parent_id ASC, name ASC
        ");
        $stmt->execute([':tenant_id' => $this->tenantId, ':library_type' => $libraryType]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }
}
