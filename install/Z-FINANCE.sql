-- Z-FINANCE 1.0.0 Database Dump & Schema
-- Generated for Universal Installation System
-- UTF-8 Unicode (utf8mb4)

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Table: zf_income_categories
CREATE TABLE IF NOT EXISTS `zf_income_categories` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `category_name` VARCHAR(150) NOT NULL,
  `category_code` VARCHAR(50) NOT NULL UNIQUE,
  `description` TEXT NULL,
  `color_code` VARCHAR(20) DEFAULT '#4F46E5',
  `icon` VARCHAR(50) DEFAULT 'Tag',
  `status` ENUM('active', 'disabled') DEFAULT 'active',
  `is_deleted` TINYINT(1) DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: zf_income_sources
CREATE TABLE IF NOT EXISTS `zf_income_sources` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `category_id` INT UNSIGNED NOT NULL,
  `source_name` VARCHAR(150) NOT NULL,
  `description` TEXT NULL,
  `type` ENUM('service_related', 'customer_related', 'project_related', 'general') DEFAULT 'general',
  `is_recurring` TINYINT(1) DEFAULT 0,
  `status` ENUM('active', 'inactive') DEFAULT 'active',
  `is_deleted` TINYINT(1) DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `zf_income_categories`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: zf_income_records
CREATE TABLE IF NOT EXISTS `zf_income_records` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `reference_no` VARCHAR(50) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  `source_id` INT UNSIGNED NOT NULL,
  `customer_id` INT UNSIGNED NULL,
  `customer_name` VARCHAR(150) NULL,
  `service_id` INT UNSIGNED NULL,
  `service_name` VARCHAR(150) NULL,
  `project_id` INT UNSIGNED NULL,
  `project_name` VARCHAR(150) NULL,
  `amount` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'XAF',
  `exchange_rate` DECIMAL(10,4) NOT NULL DEFAULT 1.0000,
  `base_amount` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `payment_method` VARCHAR(50) NOT NULL DEFAULT 'Cash',
  `income_date` DATE NOT NULL,
  `status` ENUM('pending', 'received', 'partially_received', 'cancelled', 'refunded', 'completed') DEFAULT 'received',
  `description` TEXT NULL,
  `notes` TEXT NULL,
  `tags` JSON NULL,
  `attachments` JSON NULL,
  `is_recurring` TINYINT(1) DEFAULT 0,
  `offline_synced` TINYINT(1) DEFAULT 1,
  `created_by` VARCHAR(100) DEFAULT 'System',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `zf_income_categories`(`id`),
  FOREIGN KEY (`source_id`) REFERENCES `zf_income_sources`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: zf_users
CREATE TABLE IF NOT EXISTS `zf_users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('Super Admin', 'Manager', 'Accountant', 'Standard User') DEFAULT 'Super Admin',
  `status` ENUM('active', 'suspended', 'inactive') DEFAULT 'active',
  `last_login` DATETIME NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: zf_settings
CREATE TABLE IF NOT EXISTS `zf_settings` (
  `setting_key` VARCHAR(100) PRIMARY KEY,
  `setting_value` TEXT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Standard Categories
INSERT INTO `zf_income_categories` (`id`, `category_name`, `category_code`, `description`, `color_code`, `icon`, `status`) VALUES
(1, 'Software & Web Development Services', 'CAT-DEV', 'Custom software, API integration, and web applications', '#4F46E5', 'Code', 'active'),
(2, 'Cloud Hosting & Domain Subscriptions', 'CAT-HOST', 'Monthly/annual server, domain, and VPS hosting fees', '#0284C7', 'Server', 'active'),
(3, 'Corporate Retainers & Maintenance', 'CAT-RET', 'Ongoing monthly technical maintenance and support retainers', '#16A34A', 'ShieldCheck', 'active'),
(4, 'IT Consulting & Technical Advisory', 'CAT-CONS', 'Security audits, architecture review, and advisory fees', '#D97706', 'Briefcase', 'active'),
(5, 'SaaS Product Subscriptions', 'CAT-SAAS', 'Monthly recurring software license fees', '#9333EA', 'Layers', 'active');

-- Seed Standard Sources
INSERT INTO `zf_income_sources` (`id`, `category_id`, `source_name`, `description`, `type`, `is_recurring`, `status`) VALUES
(1, 1, 'Client Web App Development', 'Bespoke web platform development contracts', 'service_related', 0, 'active'),
(2, 2, 'Dedicated Managed Server', 'Dedicated managed VPS hosting plans', 'service_related', 1, 'active'),
(3, 3, 'Annual Enterprise Support Retainer', 'SLA guaranteed 24/7 technical support contract', 'customer_related', 1, 'active'),
(4, 4, 'Fintech Compliance Audit', 'PCI-DSS and regional financial audit consulting', 'general', 0, 'active'),
(5, 5, 'Z-FINANCE POS SaaS Tier', 'Enterprise multi-currency license subscription', 'general', 1, 'active');

COMMIT;
SET FOREIGN_KEY_CHECKS=1;
