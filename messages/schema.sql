-- =============================================================================
-- Z-FINANCE 1.0.0 - COMMUNICATION & NOTIFICATION CENTER SCHEMA
-- Database: MySQL 8.0+ / MariaDB 10.5+
-- Engine: InnoDB | Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. CONVERSATIONS
CREATE TABLE IF NOT EXISTS `conversations` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `type` ENUM('direct', 'group', 'team', 'project', 'customer', 'supplier', 'announcement') DEFAULT 'direct',
    `title` VARCHAR(200) NULL,
    `created_by` BIGINT NOT NULL DEFAULT 1,
    `is_archived` TINYINT(1) DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. CONVERSATION MEMBERS
CREATE TABLE IF NOT EXISTS `conversation_members` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `conversation_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    `role` ENUM('owner', 'admin', 'member') DEFAULT 'member',
    `is_muted` TINYINT(1) DEFAULT 0,
    `is_pinned` TINYINT(1) DEFAULT 0,
    `joined_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. MESSAGES
CREATE TABLE IF NOT EXISTS `messages` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `conversation_id` BIGINT NOT NULL,
    `sender_id` BIGINT NOT NULL,
    `message_text` TEXT NOT NULL,
    `message_type` ENUM('text', 'image', 'document', 'voice', 'system') DEFAULT 'text',
    `is_read` TINYINT(1) DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. MESSAGE ATTACHMENTS
CREATE TABLE IF NOT EXISTS `message_attachments` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `message_id` BIGINT NOT NULL,
    `file_name` VARCHAR(255) NOT NULL,
    `file_url` VARCHAR(500) NOT NULL,
    `file_size` BIGINT DEFAULT 0,
    `file_type` VARCHAR(100) NULL,
    `uploaded_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`message_id`) REFERENCES `messages`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS `notifications` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `recipient_id` BIGINT NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `message` TEXT NOT NULL,
    `category` ENUM('system', 'financial', 'project', 'customer', 'supplier', 'security', 'admin') DEFAULT 'system',
    `notification_type` ENUM('in_app', 'email', 'sms', 'push') DEFAULT 'in_app',
    `is_read` TINYINT(1) DEFAULT 0,
    `link_url` VARCHAR(500) NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. NOTIFICATION TEMPLATES
CREATE TABLE IF NOT EXISTS `notification_templates` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `template_key` VARCHAR(100) NOT NULL,
    `template_name` VARCHAR(200) NOT NULL,
    `subject` VARCHAR(255) NULL,
    `body_template` TEXT NOT NULL,
    `channel` ENUM('email', 'sms', 'push', 'in_app') DEFAULT 'email',
    `is_active` TINYINT(1) DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. EMAIL QUEUE & LOGS
CREATE TABLE IF NOT EXISTS `email_queue` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `recipient_email` VARCHAR(255) NOT NULL,
    `subject` VARCHAR(255) NOT NULL,
    `body_html` TEXT NOT NULL,
    `status` ENUM('pending', 'sending', 'sent', 'failed') DEFAULT 'pending',
    `attempts` INT DEFAULT 0,
    `scheduled_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `sent_at` DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `email_logs` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `recipient_email` VARCHAR(255) NOT NULL,
    `subject` VARCHAR(255) NOT NULL,
    `status` VARCHAR(50) NOT NULL,
    `error_message` TEXT NULL,
    `logged_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. SMS QUEUE & LOGS
CREATE TABLE IF NOT EXISTS `sms_queue` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `phone_number` VARCHAR(50) NOT NULL,
    `sms_body` TEXT NOT NULL,
    `provider` VARCHAR(50) DEFAULT 'MTN_SMS',
    `status` ENUM('pending', 'sending', 'sent', 'failed') DEFAULT 'pending',
    `scheduled_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `sent_at` DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `sms_logs` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `phone_number` VARCHAR(50) NOT NULL,
    `provider` VARCHAR(50) NOT NULL,
    `status` VARCHAR(50) NOT NULL,
    `logged_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS `announcements` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `title` VARCHAR(250) NOT NULL,
    `content` TEXT NOT NULL,
    `announcement_type` ENUM('global', 'user_group', 'business', 'emergency', 'maintenance') DEFAULT 'global',
    `priority` ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    `created_by` BIGINT NOT NULL DEFAULT 1,
    `is_published` TINYINT(1) DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. COMMUNICATION SETTINGS & LOGS
CREATE TABLE IF NOT EXISTS `communication_settings` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `smtp_host` VARCHAR(200) NULL,
    `smtp_port` INT DEFAULT 587,
    `smtp_user` VARCHAR(200) NULL,
    `sms_provider` VARCHAR(50) DEFAULT 'MTN_SMS',
    `whatsapp_api_enabled` TINYINT(1) DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `communication_logs` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `action` VARCHAR(100) NOT NULL,
    `details` TEXT NULL,
    `logged_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
