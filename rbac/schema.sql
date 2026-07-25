-- =============================================================================
-- Z-FINANCE 1.0.0 - ENTERPRISE ROLE-BASED ACCESS CONTROL (RBAC) SCHEMA
-- Database: MySQL 8.0+ / MariaDB 10.5+
-- Engine: InnoDB | Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. PERMISSION GROUPS TABLE
CREATE TABLE IF NOT EXISTS `permission_groups` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `code` VARCHAR(50) NOT NULL UNIQUE,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `icon` VARCHAR(50) NOT NULL DEFAULT 'bi-grid',
    `display_order` INT NOT NULL DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. PERMISSIONS TABLE
CREATE TABLE IF NOT EXISTS `permissions` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `group_id` INT NOT NULL,
    `code` VARCHAR(100) NOT NULL UNIQUE,
    `name` VARCHAR(150) NOT NULL,
    `action` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,
    `is_system` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`group_id`) REFERENCES `permission_groups`(`id`) ON DELETE CASCADE,
    INDEX `idx_perm_code` (`code`),
    INDEX `idx_perm_action` (`action`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. ROLES TABLE
CREATE TABLE IF NOT EXISTS `roles` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `uuid` CHAR(36) NOT NULL UNIQUE,
    `code` VARCHAR(50) NOT NULL UNIQUE,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `hierarchy_level` INT NOT NULL DEFAULT 10,
    `is_system` TINYINT(1) NOT NULL DEFAULT 0,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
    `data_scope` ENUM('own_records', 'department_records', 'branch_records', 'company_records', 'global_access') NOT NULL DEFAULT 'own_records',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_role_code` (`code`),
    INDEX `idx_hierarchy` (`hierarchy_level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. ROLE PERMISSIONS TABLE
CREATE TABLE IF NOT EXISTS `role_permissions` (
    `role_id` INT NOT NULL,
    `permission_id` BIGINT NOT NULL,
    `granted_by` BIGINT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`role_id`, `permission_id`),
    FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. USER ROLES (Multi-Role Support & Primary Role Indicator)
CREATE TABLE IF NOT EXISTS `user_roles` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `role_id` INT NOT NULL,
    `is_primary` TINYINT(1) NOT NULL DEFAULT 0,
    `assigned_by` BIGINT NULL,
    `assigned_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `uk_user_role` (`user_id`, `role_id`),
    FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. DIRECT USER PERMISSIONS (Overrides Role Permissions)
CREATE TABLE IF NOT EXISTS `user_permissions` (
    `user_id` BIGINT NOT NULL,
    `permission_id` BIGINT NOT NULL,
    `is_granted` TINYINT(1) NOT NULL DEFAULT 1, -- 1 = Explicit Grant, 0 = Explicit Revoke / Deny
    `granted_by` BIGINT NULL,
    `expires_at` DATETIME NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_id`, `permission_id`),
    FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. ROLE HISTORY TABLE
CREATE TABLE IF NOT EXISTS `role_history` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `role_id` INT NOT NULL,
    `action` VARCHAR(50) NOT NULL,
    `performed_by` BIGINT NULL,
    `changes_json` JSON NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. PERMISSION HISTORY TABLE
CREATE TABLE IF NOT EXISTS `permission_history` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `entity_type` ENUM('role', 'user') NOT NULL,
    `entity_id` BIGINT NOT NULL,
    `permission_id` BIGINT NOT NULL,
    `action` ENUM('granted', 'revoked', 'overridden') NOT NULL,
    `performed_by` BIGINT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. RBAC AUDIT LOGS
CREATE TABLE IF NOT EXISTS `rbac_audit_logs` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NULL,
    `action_code` VARCHAR(100) NOT NULL,
    `module_code` VARCHAR(50) NOT NULL,
    `target_type` VARCHAR(50) NULL,
    `target_id` VARCHAR(100) NULL,
    `ip_address` VARCHAR(45) NOT NULL,
    `user_agent` TEXT NULL,
    `details_json` JSON NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_rbac_action` (`action_code`),
    INDEX `idx_rbac_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- SEED DATA SETUP
-- =============================================================================

-- Seed Permission Groups
INSERT INTO `permission_groups` (`id`, `code`, `name`, `description`, `icon`, `display_order`) VALUES
(1, 'dashboard', 'Dashboard Module', 'Executive KPIs and analytics widgets', 'bi-speedometer2', 1),
(2, 'profile', 'User Profile', 'Personal information and preferences', 'bi-person', 2),
(3, 'services', 'Services Management', 'Service catalog and subscriptions', 'bi-briefcase', 3),
(4, 'customers', 'Customer Relationship', 'CRM and customer profiles', 'bi-people', 4),
(5, 'suppliers', 'Suppliers Directory', 'Vendor and supplier management', 'bi-truck', 5),
(6, 'income', 'Income Management', 'Revenue and incoming payments', 'bi-wallet2', 6),
(7, 'expenses', 'Expense Management', 'Outgoings and claims', 'bi-cash-stack', 7),
(8, 'payments', 'Payment Gateways', 'Transaction processing and gateways', 'bi-credit-card', 8),
(9, 'reports', 'Business Reports', 'Financial analysis and exports', 'bi-bar-chart', 9),
(10, 'advertisements', 'AdSuite Marketing', 'Campaigns and promo banners', 'bi-megaphone', 10),
(11, 'users', 'User Administration', 'User accounts and credentials', 'bi-person-badge', 11),
(12, 'roles', 'Role Management', 'System role definitions', 'bi-shield-lock', 12),
(13, 'permissions', 'Permission Matrix', 'Granular access control matrix', 'bi-key', 13),
(14, 'settings', 'System Settings', 'Global configuration parameters', 'bi-gear', 14),
(15, 'system', 'System Health', 'Logs, maintenance, and diagnostics', 'bi-cpu', 15),
(16, 'api', 'API Integration', 'API keys, webhooks, and REST endpoints', 'bi-code-slash', 16),
(17, 'backups', 'Data Backups', 'Database snapshots and restore', 'bi-database-down', 17),
(18, 'notifications', 'Notifications System', 'Alerts and email notifications', 'bi-bell', 18),
(19, 'files', 'File Repository', 'Document management and attachments', 'bi-folder', 19)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- Seed Default Roles (With Hierarchy: Super Admin=100 -> Guest=10)
INSERT INTO `roles` (`id`, `uuid`, `code`, `name`, `description`, `hierarchy_level`, `is_system`, `is_active`, `data_scope`) VALUES
(1, 'role-0000-0000-0000-000000000001', 'super_admin', 'Super Administrator', 'Full unmitigated platform control', 100, 1, 1, 'global_access'),
(2, 'role-0000-0000-0000-000000000002', 'administrator', 'Administrator', 'System administration & user control', 90, 1, 1, 'company_records'),
(3, 'role-0000-0000-0000-000000000003', 'finance_manager', 'Finance Manager', 'Full financial oversight and approvals', 80, 1, 1, 'company_records'),
(4, 'role-0000-0000-0000-000000000004', 'manager', 'Manager', 'Departmental management and reports', 70, 1, 1, 'branch_records'),
(5, 'role-0000-0000-0000-000000000005', 'supervisor', 'Supervisor', 'Team operational supervision', 60, 1, 1, 'department_records'),
(6, 'role-0000-0000-0000-000000000006', 'accountant', 'Accountant', 'Financial data entry and ledger audits', 50, 1, 1, 'company_records'),
(7, 'role-0000-0000-0000-000000000007', 'employee', 'Employee', 'Staff member personal claim submissions', 40, 1, 1, 'own_records'),
(8, 'role-0000-0000-0000-000000000008', 'standard_user', 'Standard User', 'Standard application user account', 30, 1, 1, 'own_records'),
(9, 'role-0000-0000-0000-000000000009', 'guest', 'Guest', 'Read-only trial access', 10, 1, 1, 'own_records')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

SET FOREIGN_KEY_CHECKS = 1;
