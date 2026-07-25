-- =============================================================================
-- Z-FINANCE 1.0.0 - ENTERPRISE USER MANAGEMENT SCHEMA
-- Database: MySQL 8.0+ / MariaDB 10.5+
-- Engine: InnoDB | Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. USER DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS `user_documents` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `doc_type` VARCHAR(50) NOT NULL, -- passport, national_id, proof_of_address, tax_form, business_license
    `doc_number` VARCHAR(100) NULL,
    `file_name` VARCHAR(255) NOT NULL,
    `file_path` VARCHAR(255) NOT NULL,
    `file_size` BIGINT NOT NULL DEFAULT 0,
    `mime_type` VARCHAR(100) NOT NULL DEFAULT 'application/pdf',
    `status` ENUM('pending_review', 'approved', 'rejected', 'resubmission_requested') NOT NULL DEFAULT 'pending_review',
    `rejection_reason` TEXT NULL,
    `reviewed_by` BIGINT NULL,
    `reviewed_at` DATETIME NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_user_doc_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. USER DEVICES TABLE
CREATE TABLE IF NOT EXISTS `user_devices` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `device_fingerprint` VARCHAR(128) NOT NULL,
    `device_name` VARCHAR(100) NOT NULL DEFAULT 'Unknown Device',
    `device_type` VARCHAR(50) NOT NULL DEFAULT 'Desktop',
    `os` VARCHAR(50) NOT NULL DEFAULT 'Unknown OS',
    `browser` VARCHAR(50) NOT NULL DEFAULT 'Unknown Browser',
    `last_ip` VARCHAR(45) NOT NULL,
    `is_trusted` TINYINT(1) NOT NULL DEFAULT 1,
    `last_active_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `uk_user_device` (`user_id`, `device_fingerprint`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. USER SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS `user_subscriptions` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL UNIQUE,
    `plan_code` ENUM('free', 'basic', 'professional', 'enterprise', 'custom') NOT NULL DEFAULT 'free',
    `plan_name` VARCHAR(100) NOT NULL DEFAULT 'Free Trial Plan',
    `status` ENUM('active', 'past_due', 'canceled', 'expired', 'trialing') NOT NULL DEFAULT 'active',
    `billing_cycle` ENUM('monthly', 'annual', 'lifetime') NOT NULL DEFAULT 'monthly',
    `price_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `currency` CHAR(3) NOT NULL DEFAULT 'USD',
    `starts_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `expires_at` DATETIME NULL,
    `renewal_date` DATETIME NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. USER NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS `user_notifications` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `sender_id` BIGINT NULL,
    `title` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,
    `channel` ENUM('system', 'email', 'sms', 'push', 'announcement') NOT NULL DEFAULT 'system',
    `priority` ENUM('low', 'normal', 'high', 'urgent') NOT NULL DEFAULT 'normal',
    `is_read` TINYINT(1) NOT NULL DEFAULT 0,
    `read_at` DATETIME NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_user_notif_read` (`user_id`, `is_read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. IMPERSONATION LOGS
CREATE TABLE IF NOT EXISTS `user_impersonations` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `admin_id` BIGINT NOT NULL,
    `target_user_id` BIGINT NOT NULL,
    `impersonation_token` VARCHAR(128) NOT NULL UNIQUE,
    `reason` VARCHAR(255) NOT NULL,
    `ip_address` VARCHAR(45) NOT NULL,
    `started_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `ended_at` DATETIME NULL,
    FOREIGN KEY (`admin_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`target_user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
