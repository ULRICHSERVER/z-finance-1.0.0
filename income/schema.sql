-- ====================================================================
-- Z-FINANCE 1.0.0 - INCOME MANAGEMENT MODULE DATABASE SCHEMA
-- Database: MySQL 8.0+ / MariaDB 10.5+
-- Tables: 10 Core Tables with Foreign Keys, Indexes & Multi-tenant Support
-- ====================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Income Categories Table
CREATE TABLE IF NOT EXISTS `income_categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL DEFAULT 1,
    `category_name` VARCHAR(100) NOT NULL,
    `category_code` VARCHAR(50) UNIQUE NULL,
    `description` TEXT NULL,
    `color_code` VARCHAR(20) DEFAULT '#3B82F6',
    `icon` VARCHAR(50) DEFAULT 'wallet',
    `status` ENUM('active', 'disabled') NOT NULL DEFAULT 'active',
    `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
    `created_by` INT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_tenant_category` (`tenant_id`, `status`, `is_deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Income Sources Table
CREATE TABLE IF NOT EXISTS `income_sources` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL DEFAULT 1,
    `category_id` INT NOT NULL,
    `source_name` VARCHAR(150) NOT NULL,
    `description` TEXT NULL,
    `type` ENUM('service_related', 'customer_related', 'project_related', 'general') NOT NULL DEFAULT 'general',
    `is_recurring` TINYINT(1) NOT NULL DEFAULT 0,
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`category_id`) REFERENCES `income_categories`(`id`) ON DELETE CASCADE,
    INDEX `idx_tenant_source` (`tenant_id`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Main Income Transactions Table
CREATE TABLE IF NOT EXISTS `income` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL DEFAULT 1,
    `reference_no` VARCHAR(50) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `category_id` INT NOT NULL,
    `source_id` INT NOT NULL,
    `customer_id` INT NULL,
    `service_id` INT NULL,
    `project_id` INT NULL,
    `amount` DECIMAL(15, 2) NOT NULL,
    `currency` VARCHAR(10) NOT NULL DEFAULT 'XAF',
    `exchange_rate` DECIMAL(10, 6) NOT NULL DEFAULT 1.000000,
    `base_amount` DECIMAL(15, 2) NOT NULL, -- Amount converted to base currency (XAF)
    `payment_method` VARCHAR(50) NOT NULL,
    `income_date` DATE NOT NULL,
    `status` ENUM('pending', 'received', 'partially_received', 'cancelled', 'refunded', 'completed') NOT NULL DEFAULT 'received',
    `description` TEXT NULL,
    `notes` TEXT NULL,
    `is_recurring` TINYINT(1) DEFAULT 0,
    `recurring_id` INT NULL,
    `offline_synced` TINYINT(1) DEFAULT 1,
    `is_deleted` TINYINT(1) DEFAULT 0,
    `created_by` INT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`category_id`) REFERENCES `income_categories`(`id`),
    FOREIGN KEY (`source_id`) REFERENCES `income_sources`(`id`),
    INDEX `idx_income_tenant_date` (`tenant_id`, `income_date`),
    INDEX `idx_income_customer` (`customer_id`),
    INDEX `idx_income_service` (`service_id`),
    INDEX `idx_income_project` (`project_id`),
    INDEX `idx_income_ref` (`reference_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Income Line Items Table (For itemized invoice / breakdown)
CREATE TABLE IF NOT EXISTS `income_items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `income_id` INT NOT NULL,
    `item_name` VARCHAR(255) NOT NULL,
    `quantity` DECIMAL(10, 2) NOT NULL DEFAULT 1.00,
    `unit_price` DECIMAL(15, 2) NOT NULL,
    `subtotal` DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY (`income_id`) REFERENCES `income`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Income Payments Table (Partial payment history)
CREATE TABLE IF NOT EXISTS `income_payments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `income_id` INT NOT NULL,
    `payment_reference` VARCHAR(100) NOT NULL,
    `amount_paid` DECIMAL(15, 2) NOT NULL,
    `payment_method` VARCHAR(50) NOT NULL,
    `payment_date` DATE NOT NULL,
    `receipt_number` VARCHAR(100) NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`income_id`) REFERENCES `income`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Income Attachments Table
CREATE TABLE IF NOT EXISTS `income_attachments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `income_id` INT NOT NULL,
    `file_name` VARCHAR(255) NOT NULL,
    `file_path` VARCHAR(255) NOT NULL,
    `file_type` VARCHAR(100) NOT NULL,
    `file_size` INT NOT NULL,
    `attachment_type` ENUM('receipt', 'invoice', 'contract', 'proof_of_payment', 'document', 'image', 'other') DEFAULT 'receipt',
    `uploaded_by` INT NOT NULL,
    `is_deleted` TINYINT(1) DEFAULT 0,
    `uploaded_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`income_id`) REFERENCES `income`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Income Tags Table
CREATE TABLE IF NOT EXISTS `income_tags` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `income_id` INT NOT NULL,
    `tag_name` VARCHAR(50) NOT NULL,
    FOREIGN KEY (`income_id`) REFERENCES `income`(`id`) ON DELETE CASCADE,
    INDEX `idx_tag_name` (`tag_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Income Recurring Schedule Table
CREATE TABLE IF NOT EXISTS `income_recurring` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL DEFAULT 1,
    `title` VARCHAR(255) NOT NULL,
    `category_id` INT NOT NULL,
    `source_id` INT NOT NULL,
    `customer_id` INT NULL,
    `service_id` INT NULL,
    `project_id` INT NULL,
    `amount` DECIMAL(15, 2) NOT NULL,
    `currency` VARCHAR(10) DEFAULT 'XAF',
    `frequency` ENUM('daily', 'weekly', 'monthly', 'yearly', 'custom') NOT NULL DEFAULT 'monthly',
    `custom_interval_days` INT DEFAULT 30,
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,
    `next_run_date` DATE NOT NULL,
    `last_run_date` DATE NULL,
    `status` ENUM('active', 'paused', 'completed', 'cancelled') DEFAULT 'active',
    `auto_receive` TINYINT(1) DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`category_id`) REFERENCES `income_categories`(`id`),
    FOREIGN KEY (`source_id`) REFERENCES `income_sources`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Income Aggregated Statistics Cache Table
CREATE TABLE IF NOT EXISTS `income_statistics` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL DEFAULT 1,
    `stat_date` DATE NOT NULL,
    `period_type` ENUM('daily', 'weekly', 'monthly', 'yearly') NOT NULL,
    `total_gross_income` DECIMAL(15, 2) DEFAULT 0.00,
    `total_net_revenue` DECIMAL(15, 2) DEFAULT 0.00,
    `total_transactions` INT DEFAULT 0,
    `highest_source_id` INT NULL,
    `calculated_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `uk_tenant_period_date` (`tenant_id`, `period_type`, `stat_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Saved Income Reports Table
CREATE TABLE IF NOT EXISTS `income_reports` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT NOT NULL DEFAULT 1,
    `report_name` VARCHAR(255) NOT NULL,
    `report_type` VARCHAR(100) NOT NULL,
    `filter_params` JSON NULL,
    `generated_by` INT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- ====================================================================
-- SEED DATA FOR INCOME CATEGORIES & SOURCES
-- ====================================================================
INSERT INTO `income_categories` (`id`, `tenant_id`, `category_name`, `category_code`, `description`, `color_code`, `icon`, `status`) VALUES
(1, 1, 'Service Income', 'CAT-SRV', 'Revenue generated from IT, consulting, and maintenance services', '#3B82F6', 'wrench', 'active'),
(2, 1, 'Product Sales', 'CAT-PRD', 'Direct sales of hardware, software licenses, and physical goods', '#10B981', 'shopping-bag', 'active'),
(3, 1, 'Consulting', 'CAT-CNS', 'Financial, architectural, and business advisory revenue', '#8B5CF6', 'briefcase', 'active'),
(4, 1, 'Training', 'CAT-TRN', 'Corporate workshops, technology bootcamps, and certification fees', '#F59E0B', 'graduation-cap', 'active'),
(5, 1, 'Commission', 'CAT-COM', 'Brokerage, referral fees, and sales commissions', '#EC4899', 'percent', 'active'),
(6, 1, 'Salary', 'CAT-SLR', 'Fixed operational retainer and contract payroll income', '#06B6D4', 'credit-card', 'active'),
(7, 1, 'Investment', 'CAT-INV', 'Dividends, capital gains, and interest yields', '#14B8A6', 'trending-up', 'active'),
(8, 1, 'Rental Income', 'CAT-RNT', 'Equipment lease, office space rental, and server hosting', '#6366F1', 'building', 'active'),
(9, 1, 'Online Income', 'CAT-ONL', 'SaaS subscriptions, API usage fees, and digital downloads', '#3B82F6', 'globe', 'active'),
(10, 1, 'Affiliate Income', 'CAT-AFF', 'Partner referral revenue and marketing commissions', '#84CC16', 'link', 'active'),
(11, 1, 'Donation', 'CAT-DON', 'Sponsorships, grants, and community contributions', '#F43F5E', 'heart', 'active'),
(12, 1, 'Bonus', 'CAT-BNS', 'Performance incentives, quarterly bonuses, and cash awards', '#A855F7', 'award', 'active'),
(13, 1, 'Other Income', 'CAT-OTH', 'Miscellaneous and unclassified incoming revenue', '#64748B', 'plus-circle', 'active');

INSERT INTO `income_sources` (`id`, `tenant_id`, `category_id`, `source_name`, `description`, `type`, `is_recurring`, `status`) VALUES
(1, 1, 1, 'Managed IT Infrastructure', 'Monthly server and network maintenance services', 'service_related', 1, 'active'),
(2, 1, 2, 'Software License Subscriptions', 'Annual enterprise software licenses', 'customer_related', 1, 'active'),
(3, 1, 3, 'Fintech Architecture Advisory', 'Strategic consulting for enterprise banking tools', 'project_related', 0, 'active'),
(4, 1, 4, 'Cybersecurity Bootcamp', '3-Day executive training on cloud compliance', 'customer_related', 0, 'active'),
(5, 1, 8, 'Data Center Rack Lease', 'Co-location space leasing for telecom client', 'customer_related', 1, 'active'),
(6, 1, 9, 'Z-FINANCE API Cloud Usage', 'API token consumption billing', 'service_related', 1, 'active');
