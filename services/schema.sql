-- =============================================================================
-- Z-FINANCE 1.0.0 - SERVICE MANAGEMENT SYSTEM SCHEMA
-- Database: MySQL 8.0+ / MariaDB 10.5+
-- Engine: InnoDB | Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. SERVICE CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS `service_categories` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL DEFAULT 1,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(120) NOT NULL UNIQUE,
    `description` TEXT NULL,
    `icon` VARCHAR(50) DEFAULT 'Briefcase',
    `color` VARCHAR(20) DEFAULT '#2563eb',
    `image_url` VARCHAR(255) NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `display_order` INT DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Default Categories
INSERT INTO `service_categories` (`id`, `user_id`, `name`, `slug`, `description`, `icon`, `color`, `is_active`) VALUES
(1, 1, 'Technology & Software', 'technology-software', 'IT infrastructure, web development, cloud solutions', 'Code', '#2563eb', 1),
(2, 1, 'Financial & Accounting', 'financial-accounting', 'Audit, tax advisory, bookkeeping, financial forecasting', 'DollarSign', '#059669', 1),
(3, 1, 'Consulting & Strategy', 'consulting-strategy', 'Management, business expansion, process optimization', 'Briefcase', '#7c3aed', 1),
(4, 1, 'Marketing & Creative', 'marketing-creative', 'Digital advertising, SEO, brand design, content creation', 'Megaphone', '#d97706', 1),
(5, 1, 'Legal & Compliance', 'legal-compliance', 'Corporate law, contract drafting, regulatory filing', 'ShieldCheck', '#dc2626', 1)
ON DUPLICATE KEY UPDATE `id` = `id`;

-- 2. SERVICES TABLE
CREATE TABLE IF NOT EXISTS `services` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL DEFAULT 1,
    `category_id` BIGINT NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `short_name` VARCHAR(50) NULL,
    `reference_code` VARCHAR(50) NOT NULL UNIQUE,
    `slug` VARCHAR(180) NOT NULL UNIQUE,
    `status` ENUM('active', 'inactive', 'draft', 'archived') NOT NULL DEFAULT 'active',
    `visibility` ENUM('public', 'private', 'hidden') NOT NULL DEFAULT 'public',
    `pricing_type` ENUM('fixed', 'hourly', 'daily', 'weekly', 'monthly', 'annual', 'negotiable', 'free', 'subscription', 'quotation_required') NOT NULL DEFAULT 'fixed',
    `base_price` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `currency` VARCHAR(10) NOT NULL DEFAULT 'USD',
    `short_description` VARCHAR(255) NULL,
    `detailed_description` LONGTEXT NULL,
    `featured_image` VARCHAR(255) NULL,
    `color` VARCHAR(20) DEFAULT '#2563eb',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`category_id`) REFERENCES `service_categories`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. SERVICE PACKAGES TABLE
CREATE TABLE IF NOT EXISTS `service_packages` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `service_id` BIGINT NOT NULL,
    `name` VARCHAR(100) NOT NULL, -- e.g. Starter, Professional, Enterprise
    `description` TEXT NULL,
    `price` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `discount_percentage` DECIMAL(5,2) DEFAULT 0.00,
    `duration_unit` ENUM('hour', 'day', 'week', 'month', 'year', 'project') DEFAULT 'month',
    `duration_value` INT DEFAULT 1,
    `max_customers` INT DEFAULT 0, -- 0 for unlimited
    `max_projects` INT DEFAULT 0,
    `max_sessions` INT DEFAULT 0,
    `is_popular` TINYINT(1) DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. SERVICE PACKAGE FEATURES TABLE
CREATE TABLE IF NOT EXISTS `service_package_features` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `package_id` BIGINT NOT NULL,
    `feature_text` VARCHAR(255) NOT NULL,
    `is_included` TINYINT(1) DEFAULT 1,
    FOREIGN KEY (`package_id`) REFERENCES `service_packages`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. SERVICE DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS `service_documents` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `service_id` BIGINT NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `file_path` VARCHAR(255) NOT NULL,
    `file_type` VARCHAR(50) DEFAULT 'pdf', -- pdf, docx, png, mp4
    `file_size_mb` DECIMAL(10,2) DEFAULT 0.00,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. SERVICE GALLERY TABLE
CREATE TABLE IF NOT EXISTS `service_gallery` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `service_id` BIGINT NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `caption` VARCHAR(255) NULL,
    `display_order` INT DEFAULT 0,
    FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. SERVICE TAGS TABLE
CREATE TABLE IF NOT EXISTS `service_tags` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `service_id` BIGINT NOT NULL,
    `tag_name` VARCHAR(50) NOT NULL,
    FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. SERVICE STATISTICS TABLE
CREATE TABLE IF NOT EXISTS `service_statistics` (
    `service_id` BIGINT PRIMARY KEY,
    `total_requests` BIGINT DEFAULT 0,
    `completed_projects` BIGINT DEFAULT 0,
    `total_revenue` DECIMAL(15,2) DEFAULT 0.00,
    `rating_score` DECIMAL(3,2) DEFAULT 5.00,
    `views_count` BIGINT DEFAULT 0,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. SERVICE AVAILABILITY TABLE
CREATE TABLE IF NOT EXISTS `service_availability` (
    `service_id` BIGINT PRIMARY KEY,
    `business_days` JSON NULL, -- ["Mon", "Tue", "Wed", "Thu", "Fri"]
    `working_hours_start` TIME DEFAULT '08:00:00',
    `working_hours_end` TIME DEFAULT '17:00:00',
    `requires_appointment` TINYINT(1) DEFAULT 1,
    `delivery_mode` ENUM('online', 'physical', 'hybrid') DEFAULT 'hybrid',
    FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. SERVICE SEO TABLE
CREATE TABLE IF NOT EXISTS `service_seo` (
    `service_id` BIGINT PRIMARY KEY,
    `seo_title` VARCHAR(150) NULL,
    `meta_description` TEXT NULL,
    `keywords` TEXT NULL,
    `og_image` VARCHAR(255) NULL,
    FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
