-- Z-FINANCE 1.0.0 - Enterprise Document Management System (EDMS) Database Schema
-- Modules: documents, storage, filemanager

CREATE TABLE IF NOT EXISTS folders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    parent_id INT DEFAULT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    library_type ENUM('private', 'business', 'workspace', 'shared', 'archive', 'recycle_bin') NOT NULL DEFAULT 'business',
    color VARCHAR(20) DEFAULT '#3b82f6',
    icon VARCHAR(50) DEFAULT 'folder',
    description TEXT,
    created_by INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_parent_tenant (parent_id, tenant_id),
    INDEX idx_library (library_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS document_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    name VARCHAR(100) NOT NULL,
    description TEXT,
    color VARCHAR(20) DEFAULT '#64748b',
    icon VARCHAR(50) DEFAULT 'file-text',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_tenant (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    folder_id INT DEFAULT NULL,
    category_id INT DEFAULT NULL,
    title VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL DEFAULT 0,
    file_type VARCHAR(100) NOT NULL,
    extension VARCHAR(20) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    checksum VARCHAR(64) DEFAULT NULL,
    current_version VARCHAR(20) DEFAULT '1.0.0',
    library_type ENUM('private', 'business', 'workspace', 'shared', 'archive', 'recycle_bin') NOT NULL DEFAULT 'business',
    module_origin VARCHAR(50) DEFAULT 'general',
    owner_id INT NOT NULL,
    created_by INT NOT NULL,
    is_favorite TINYINT(1) DEFAULT 0,
    is_pinned TINYINT(1) DEFAULT 0,
    is_archived TINYINT(1) DEFAULT 0,
    is_deleted TINYINT(1) DEFAULT 0,
    deleted_at DATETIME DEFAULT NULL,
    status ENUM('draft', 'under_review', 'approved', 'rejected', 'archived') DEFAULT 'approved',
    lock_status ENUM('unlocked', 'locked') DEFAULT 'unlocked',
    locked_by INT DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES document_categories(id) ON DELETE SET NULL,
    INDEX idx_search (title, extension, module_origin),
    INDEX idx_status (status, is_deleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS document_versions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    document_id INT NOT NULL,
    version_number VARCHAR(20) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,
    checksum VARCHAR(64) NOT NULL,
    change_summary TEXT,
    created_by INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE,
    INDEX idx_doc_version (document_id, version_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS document_permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    document_id INT DEFAULT NULL,
    folder_id INT DEFAULT NULL,
    entity_type ENUM('user', 'role', 'department', 'team', 'public', 'customer', 'supplier') NOT NULL,
    entity_id INT DEFAULT NULL,
    can_view TINYINT(1) DEFAULT 1,
    can_download TINYINT(1) DEFAULT 1,
    can_edit TINYINT(1) DEFAULT 0,
    can_share TINYINT(1) DEFAULT 0,
    can_delete TINYINT(1) DEFAULT 0,
    can_approve TINYINT(1) DEFAULT 0,
    can_sign TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_doc_perm (document_id, entity_type, entity_id),
    INDEX idx_folder_perm (folder_id, entity_type, entity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS document_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    document_id INT NOT NULL,
    tag_name VARCHAR(50) NOT NULL,
    color VARCHAR(20) DEFAULT '#3b82f6',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE,
    INDEX idx_tag (tag_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS document_metadata (
    id INT AUTO_INCREMENT PRIMARY KEY,
    document_id INT NOT NULL,
    meta_key VARCHAR(100) NOT NULL,
    meta_value TEXT,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE,
    INDEX idx_doc_key (document_id, meta_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS document_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    document_id INT NOT NULL,
    linked_module VARCHAR(50) NOT NULL, -- e.g. customer, supplier, project, task, invoice, receipt, income, expense, budget, employee, service, calendar, message, advertisement
    linked_entity_id INT NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE,
    INDEX idx_link (linked_module, linked_entity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS document_workflows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    document_id INT NOT NULL,
    workflow_name VARCHAR(150) NOT NULL,
    current_step INT DEFAULT 1,
    total_steps INT DEFAULT 1,
    status ENUM('pending', 'approved', 'rejected', 'revision_requested') DEFAULT 'pending',
    assigned_approver_id INT NOT NULL,
    comments TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS document_signatures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    document_id INT NOT NULL,
    signer_name VARCHAR(150) NOT NULL,
    signer_email VARCHAR(150) NOT NULL,
    signature_type ENUM('draw', 'image', 'type', 'certificate') NOT NULL DEFAULT 'draw',
    signature_data LONGTEXT NOT NULL,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT,
    verification_hash VARCHAR(128) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS storage_statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    total_space_bytes BIGINT NOT NULL DEFAULT 10737418240, -- 10 GB
    used_space_bytes BIGINT NOT NULL DEFAULT 0,
    file_count INT NOT NULL DEFAULT 0,
    folder_count INT NOT NULL DEFAULT 0,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_tenant (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS file_shares (
    id INT AUTO_INCREMENT PRIMARY KEY,
    document_id INT NOT NULL,
    share_token VARCHAR(64) NOT NULL UNIQUE,
    access_type ENUM('internal', 'public', 'password_protected') NOT NULL DEFAULT 'internal',
    password_hash VARCHAR(255) DEFAULT NULL,
    max_downloads INT DEFAULT NULL,
    download_count INT DEFAULT 0,
    expires_at DATETIME DEFAULT NULL,
    created_by INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS backup_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    backup_type ENUM('full', 'incremental', 'documents_only') NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    status ENUM('in_progress', 'completed', 'failed') NOT NULL DEFAULT 'completed',
    created_by INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS document_audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    document_id INT DEFAULT NULL,
    user_id INT NOT NULL,
    action VARCHAR(50) NOT NULL, -- e.g. upload, download, view, edit, delete, restore, share, sign, approve
    details TEXT,
    ip_address VARCHAR(45) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_audit_doc (document_id),
    INDEX idx_audit_tenant (tenant_id, action)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
