-- =============================================================================
-- Z-FINANCE 1.0.0 - ENTERPRISE AUTHENTICATION SCHEMA
-- Database: MySQL 8.0+ / MariaDB 10.5+
-- Engine: InnoDB | Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. USER ROLES TABLE
CREATE TABLE IF NOT EXISTS `user_roles` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `code` VARCHAR(50) NOT NULL UNIQUE,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `permissions_json` LONGTEXT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default system roles
INSERT INTO `user_roles` (`id`, `code`, `name`, `description`, `permissions_json`) VALUES
(1, 'super_admin', 'Super Administrator', 'Full system access, system configuration, multi-tenant setup', '{"all": true}'),
(2, 'administrator', 'Administrator', 'Administrative access to system settings, user management', '{"users.manage": true, "finance.manage": true}'),
(3, 'manager', 'Manager', 'Departmental and team management, financial approval', '{"reports.view": true, "finance.edit": true}'),
(4, 'employee', 'Employee', 'Standard staff member, entry of personal finance and claims', '{"finance.entry": true}'),
(5, 'standard_user', 'Standard User', 'Standard application account user', '{"dashboard.access": true}'),
(6, 'guest', 'Guest', 'Read-only trial or guest access', '{"view_only": true}')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- 2. MAIN USERS TABLE
CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `uuid` CHAR(36) NOT NULL UNIQUE,
    `role_id` INT NOT NULL DEFAULT 5,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `username` VARCHAR(60) NOT NULL UNIQUE,
    `email` VARCHAR(191) NOT NULL UNIQUE,
    `phone` VARCHAR(30) NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `status` ENUM('pending', 'email_verification_pending', 'active', 'inactive', 'suspended', 'blocked', 'deleted') NOT NULL DEFAULT 'email_verification_pending',
    `avatar_url` VARCHAR(255) NULL,
    `language` VARCHAR(10) NOT NULL DEFAULT 'en',
    `timezone` VARCHAR(50) NOT NULL DEFAULT 'UTC',
    `currency` VARCHAR(10) NOT NULL DEFAULT 'USD',
    `email_verified_at` DATETIME NULL,
    `phone_verified_at` DATETIME NULL,
    `last_login_at` DATETIME NULL,
    `last_login_ip` VARCHAR(45) NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`role_id`) REFERENCES `user_roles`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. USER PROFILES TABLE
CREATE TABLE IF NOT EXISTS `user_profiles` (
    `user_id` BIGINT PRIMARY KEY,
    `bio` TEXT NULL,
    `company` VARCHAR(150) NULL,
    `job_title` VARCHAR(100) NULL,
    `address` VARCHAR(255) NULL,
    `city` VARCHAR(100) NULL,
    `country` VARCHAR(100) NULL,
    `postal_code` VARCHAR(20) NULL,
    `social_links_json` JSON NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. USER PREFERENCES TABLE
CREATE TABLE IF NOT EXISTS `user_preferences` (
    `user_id` BIGINT PRIMARY KEY,
    `theme` ENUM('light', 'dark', 'auto') NOT NULL DEFAULT 'auto',
    `email_notifications` TINYINT(1) NOT NULL DEFAULT 1,
    `sms_notifications` TINYINT(1) NOT NULL DEFAULT 0,
    `two_factor_enabled` TINYINT(1) NOT NULL DEFAULT 0,
    `newsletter_opt_in` TINYINT(1) NOT NULL DEFAULT 0,
    `date_format` VARCHAR(20) NOT NULL DEFAULT 'Y-m-d',
    `time_format` VARCHAR(20) NOT NULL DEFAULT 'H:i:s',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. USER DASHBOARDS TABLE
CREATE TABLE IF NOT EXISTS `user_dashboards` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `dashboard_title` VARCHAR(100) NOT NULL DEFAULT 'My Executive Financial Overview',
    `layout_json` JSON NULL,
    `default_view` VARCHAR(50) NOT NULL DEFAULT 'income_analytics',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. USER WORKSPACES TABLE
CREATE TABLE IF NOT EXISTS `user_workspaces` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `uuid` CHAR(36) NOT NULL UNIQUE,
    `user_id` BIGINT NOT NULL,
    `name` VARCHAR(150) NOT NULL DEFAULT 'Personal Workspace',
    `is_default` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. AUTH TOKENS (Email Verify, Password Reset, Remember Me)
CREATE TABLE IF NOT EXISTS `auth_tokens` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `token_hash` VARCHAR(64) NOT NULL UNIQUE,
    `token_type` ENUM('email_verify', 'password_reset', 'remember_me', 'phone_verify') NOT NULL,
    `expires_at` DATETIME NOT NULL,
    `used_at` DATETIME NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_token_hash` (`token_hash`),
    INDEX `idx_type_expires` (`token_type`, `expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. ACTIVE SESSIONS TABLE
CREATE TABLE IF NOT EXISTS `active_sessions` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `session_id` VARCHAR(128) NOT NULL UNIQUE,
    `user_id` BIGINT NOT NULL,
    `ip_address` VARCHAR(45) NOT NULL,
    `user_agent` TEXT NOT NULL,
    `device_type` VARCHAR(50) NOT NULL DEFAULT 'Desktop',
    `browser` VARCHAR(50) NOT NULL DEFAULT 'Unknown',
    `platform` VARCHAR(50) NOT NULL DEFAULT 'Unknown',
    `last_activity` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_user_session` (`user_id`, `session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. LOGIN ATTEMPTS / RATE LIMITING
CREATE TABLE IF NOT EXISTS `login_attempts` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `identifier` VARCHAR(191) NOT NULL,
    `ip_address` VARCHAR(45) NOT NULL,
    `attempts_count` INT NOT NULL DEFAULT 1,
    `locked_until` DATETIME NULL,
    `last_attempt_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_identifier_ip` (`identifier`, `ip_address`),
    INDEX `idx_locked_until` (`locked_until`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. SECURITY ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS `activity_logs` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NULL,
    `event_type` ENUM('registration', 'login', 'logout', 'failed_login', 'password_reset_request', 'password_reset_success', 'email_verification', 'phone_verification', 'session_revoked', 'account_locked') NOT NULL,
    `severity` ENUM('info', 'warning', 'critical') NOT NULL DEFAULT 'info',
    `ip_address` VARCHAR(45) NOT NULL,
    `user_agent` TEXT NULL,
    `details_json` JSON NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,
    INDEX `idx_user_event` (`user_id`, `event_type`),
    INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. PASSWORD HISTORY TABLE
CREATE TABLE IF NOT EXISTS `password_history` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_user_pass_hist` (`user_id`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
