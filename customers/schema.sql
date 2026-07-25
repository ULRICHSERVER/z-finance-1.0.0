-- =============================================================================
-- Z-FINANCE 1.0.0 - CUSTOMER RELATIONSHIP MANAGEMENT (CRM) SCHEMA
-- Database: MySQL 8.0+ / MariaDB 10.5+
-- Engine: InnoDB | Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. CUSTOMERS MAIN TABLE
CREATE TABLE IF NOT EXISTS `customers` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL DEFAULT 1,
    `customer_code` VARCHAR(50) NOT NULL UNIQUE,
    `customer_type` ENUM('individual', 'company', 'organization', 'association', 'school', 'government', 'ngo', 'partner', 'custom') NOT NULL DEFAULT 'individual',
    `first_name` VARCHAR(100) NULL,
    `middle_name` VARCHAR(100) NULL,
    `last_name` VARCHAR(100) NULL,
    `display_name` VARCHAR(200) NOT NULL,
    `company_name` VARCHAR(200) NULL,
    `business_name` VARCHAR(200) NULL,
    `email` VARCHAR(150) NULL,
    `alternative_email` VARCHAR(150) NULL,
    `phone` VARCHAR(50) NULL,
    `alternative_phone` VARCHAR(50) NULL,
    `whatsapp` VARCHAR(50) NULL,
    `website` VARCHAR(255) NULL,
    `gender` ENUM('male', 'female', 'other', 'unspecified') DEFAULT 'unspecified',
    `date_of_birth` DATE NULL,
    `nationality` VARCHAR(100) NULL,
    `country` VARCHAR(100) DEFAULT 'United States',
    `region` VARCHAR(100) NULL,
    `city` VARCHAR(100) NULL,
    `address` TEXT NULL,
    `postal_code` VARCHAR(30) NULL,
    `occupation` VARCHAR(100) NULL,
    `profession` VARCHAR(100) NULL,
    `preferred_language` VARCHAR(10) DEFAULT 'en',
    `preferred_currency` VARCHAR(10) DEFAULT 'USD',
    `is_vip` TINYINT(1) DEFAULT 0,
    `status` ENUM('active', 'inactive', 'lead', 'archived') NOT NULL DEFAULT 'active',
    `visibility` ENUM('private', 'public', 'invitation_only') NOT NULL DEFAULT 'private',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. CUSTOMER PROFILES TABLE
CREATE TABLE IF NOT EXISTS `customer_profiles` (
    `customer_id` BIGINT PRIMARY KEY,
    `avatar_url` VARCHAR(255) NULL,
    `tax_id` VARCHAR(100) NULL,
    `industry` VARCHAR(100) NULL,
    `credit_limit` DECIMAL(15,2) DEFAULT 0.00,
    `payment_terms` VARCHAR(50) DEFAULT 'Net 30',
    `source_channel` VARCHAR(100) DEFAULT 'Direct Referral',
    `social_linkedin` VARCHAR(255) NULL,
    `social_twitter` VARCHAR(255) NULL,
    `internal_notes` LONGTEXT NULL,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. CUSTOMER GROUPS TABLE
CREATE TABLE IF NOT EXISTS `customer_groups` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL DEFAULT 1,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(120) NOT NULL UNIQUE,
    `description` TEXT NULL,
    `color` VARCHAR(20) DEFAULT '#2563eb',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Default Groups
INSERT INTO `customer_groups` (`id`, `user_id`, `name`, `slug`, `description`, `color`) VALUES
(1, 1, 'VIP Clients', 'vip-clients', 'High-value priority accounts', '#7c3aed'),
(2, 1, 'Corporate Accounts', 'corporate-accounts', 'Enterprise level business clients', '#2563eb'),
(3, 1, 'Regular Retail', 'regular-retail', 'Standard individual buyers', '#059669'),
(4, 1, 'Partners & Affiliates', 'partners-affiliates', 'Strategic business partners', '#d97706')
ON DUPLICATE KEY UPDATE `id` = `id`;

-- 4. CUSTOMER GROUP MEMBERS TABLE
CREATE TABLE IF NOT EXISTS `customer_group_members` (
    `customer_id` BIGINT NOT NULL,
    `group_id` BIGINT NOT NULL,
    PRIMARY KEY (`customer_id`, `group_id`),
    FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`group_id`) REFERENCES `customer_groups`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. CUSTOMER TAGS TABLE
CREATE TABLE IF NOT EXISTS `customer_tags` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL DEFAULT 1,
    `tag_name` VARCHAR(50) NOT NULL,
    `color` VARCHAR(20) DEFAULT '#6b7280'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. CUSTOMER TAG ASSIGNMENTS TABLE
CREATE TABLE IF NOT EXISTS `customer_tag_assignments` (
    `customer_id` BIGINT NOT NULL,
    `tag_id` BIGINT NOT NULL,
    PRIMARY KEY (`customer_id`, `tag_id`),
    FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`tag_id`) REFERENCES `customer_tags`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. CUSTOMER DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS `customer_documents` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `customer_id` BIGINT NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `document_type` ENUM('contract', 'identity', 'invoice', 'receipt', 'certificate', 'photo', 'other') DEFAULT 'other',
    `file_path` VARCHAR(255) NOT NULL,
    `file_size_mb` DECIMAL(10,2) DEFAULT 0.00,
    `uploaded_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. CUSTOMER COMMUNICATIONS TABLE
CREATE TABLE IF NOT EXISTS `customer_communications` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `customer_id` BIGINT NOT NULL,
    `type` ENUM('call', 'email', 'meeting', 'message', 'whatsapp', 'note') NOT NULL DEFAULT 'note',
    `subject` VARCHAR(200) NOT NULL,
    `details` TEXT NULL,
    `follow_up_date` DATETIME NULL,
    `is_resolved` TINYINT(1) DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. CUSTOMER NOTES TABLE
CREATE TABLE IF NOT EXISTS `customer_notes` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `customer_id` BIGINT NOT NULL,
    `author_id` BIGINT DEFAULT 1,
    `note_text` TEXT NOT NULL,
    `is_pinned` TINYINT(1) DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. CUSTOMER STATISTICS TABLE
CREATE TABLE IF NOT EXISTS `customer_statistics` (
    `customer_id` BIGINT PRIMARY KEY,
    `total_income_generated` DECIMAL(15,2) DEFAULT 0.00,
    `outstanding_balance` DECIMAL(15,2) DEFAULT 0.00,
    `total_payments_received` DECIMAL(15,2) DEFAULT 0.00,
    `total_projects_count` INT DEFAULT 0,
    `services_used_count` INT DEFAULT 0,
    `last_interaction_date` DATETIME NULL,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. CUSTOMER SERVICES LINK TABLE
CREATE TABLE IF NOT EXISTS `customer_services` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `customer_id` BIGINT NOT NULL,
    `service_id` BIGINT NOT NULL,
    `package_id` BIGINT NULL,
    `status` ENUM('active', 'completed', 'cancelled', 'pending') DEFAULT 'active',
    `assigned_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
