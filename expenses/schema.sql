-- =============================================================================
-- Z-FINANCE 1.0.0 - EXPENSE MANAGEMENT SYSTEM SCHEMA
-- Database: MySQL 8.0+ / MariaDB 10.5+
-- Engine: InnoDB | Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. EXPENSE CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS `expense_categories` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `category_name` VARCHAR(100) NOT NULL,
    `category_code` VARCHAR(50) NOT NULL UNIQUE,
    `description` TEXT NULL,
    `color_code` VARCHAR(20) DEFAULT '#EF4444',
    `icon` VARCHAR(50) DEFAULT 'receipt',
    `status` ENUM('active', 'inactive') DEFAULT 'active',
    `is_deleted` TINYINT(1) DEFAULT 0,
    `created_by` BIGINT DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Default Expense Categories
INSERT INTO `expense_categories` (`id`, `tenant_id`, `category_name`, `category_code`, `description`, `color_code`, `icon`) VALUES
(1, 1, 'Office & Supplies', 'EXP-OFFICE', 'Stationery, furniture, and office inventory', '#EF4444', 'building-storefront'),
(2, 1, 'Rent & Lease', 'EXP-RENT', 'Facility rent, leasing costs, and property fees', '#F59E0B', 'home'),
(3, 1, 'Utilities & Power', 'EXP-UTILITIES', 'Electricity, water, gas, and waste disposal', '#10B981', 'bolt'),
(4, 1, 'Internet & Telecom', 'EXP-TELECOM', 'ISP subscription, mobile phone airtime, and data', '#3B82F6', 'wifi'),
(5, 1, 'Software & Subscriptions', 'EXP-SOFTWARE', 'SaaS subscriptions, cloud hosting, and licenses', '#8B5CF6', 'cloud'),
(6, 1, 'Marketing & Advertising', 'EXP-MARKETING', 'Google Ads, Facebook campaigns, and PR', '#EC4899', 'megaphone'),
(7, 1, 'Travel & Transport', 'EXP-TRAVEL', 'Flight tickets, hotels, fuel, and taxis', '#6366F1', 'truck')
ON DUPLICATE KEY UPDATE `id` = `id`;

-- 2. EXPENSES TABLE
CREATE TABLE IF NOT EXISTS `expenses` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `reference_no` VARCHAR(50) NOT NULL UNIQUE,
    `title` VARCHAR(255) NOT NULL,
    `category_id` BIGINT NOT NULL,
    `supplier_id` BIGINT NULL,
    `customer_id` BIGINT NULL,
    `service_id` BIGINT NULL,
    `project_id` BIGINT NULL,
    `workspace_id` BIGINT DEFAULT 1,
    `expense_date` DATE NOT NULL,
    `expense_time` TIME DEFAULT '12:00:00',
    `amount` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `currency` VARCHAR(10) DEFAULT 'USD',
    `exchange_rate` DECIMAL(10,6) DEFAULT 1.000000,
    `base_amount` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `tax_amount` DECIMAL(15,2) DEFAULT 0.00,
    `discount` DECIMAL(15,2) DEFAULT 0.00,
    `fees` DECIMAL(15,2) DEFAULT 0.00,
    `net_amount` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `payment_method` ENUM('Cash', 'Bank Transfer', 'Cheque', 'Credit Card', 'Debit Card', 'MTN Mobile Money', 'Orange Money', 'Express Union Mobile Money', 'PayUnit', 'Flutterwave', 'Stripe', 'PayPal', 'Paystack', 'Custom') DEFAULT 'Bank Transfer',
    `payment_status` ENUM('unpaid', 'partially_paid', 'paid', 'reimbursed') DEFAULT 'unpaid',
    `approval_status` ENUM('draft', 'pending', 'approved', 'rejected', 'cancelled') DEFAULT 'pending',
    `receipt_no` VARCHAR(100) NULL,
    `invoice_no` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `notes` TEXT NULL,
    `is_recurring` TINYINT(1) DEFAULT 0,
    `is_deleted` TINYINT(1) DEFAULT 0,
    `created_by` BIGINT DEFAULT 1,
    `approved_by` BIGINT NULL,
    `approved_at` DATETIME NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`category_id`) REFERENCES `expense_categories`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. EXPENSE TAGS TABLE
CREATE TABLE IF NOT EXISTS `expense_tags` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `tag_name` VARCHAR(50) NOT NULL,
    `color_code` VARCHAR(20) DEFAULT '#6B7280'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. EXPENSE TAG ASSIGNMENTS
CREATE TABLE IF NOT EXISTS `expense_tag_assignments` (
    `expense_id` BIGINT NOT NULL,
    `tag_id` BIGINT NOT NULL,
    PRIMARY KEY (`expense_id`, `tag_id`),
    FOREIGN KEY (`expense_id`) REFERENCES `expenses`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`tag_id`) REFERENCES `expense_tags`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. EXPENSE ATTACHMENTS TABLE
CREATE TABLE IF NOT EXISTS `expense_attachments` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `expense_id` BIGINT NOT NULL,
    `file_name` VARCHAR(255) NOT NULL,
    `file_path` VARCHAR(255) NOT NULL,
    `file_type` VARCHAR(100) DEFAULT 'application/pdf',
    `file_size` INT DEFAULT 0,
    `attachment_type` ENUM('invoice', 'receipt', 'contract', 'proof', 'warranty', 'other') DEFAULT 'receipt',
    `uploaded_by` BIGINT DEFAULT 1,
    `is_deleted` TINYINT(1) DEFAULT 0,
    `uploaded_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`expense_id`) REFERENCES `expenses`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. RECURRING EXPENSES TABLE
CREATE TABLE IF NOT EXISTS `recurring_expenses` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `title` VARCHAR(200) NOT NULL,
    `category_id` BIGINT NOT NULL,
    `supplier_id` BIGINT NULL,
    `amount` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `currency` VARCHAR(10) DEFAULT 'USD',
    `frequency` ENUM('daily', 'weekly', 'monthly', 'quarterly', 'semi_annual', 'annual', 'custom') DEFAULT 'monthly',
    `custom_interval_days` INT DEFAULT 30,
    `start_date` DATE NOT NULL,
    `expiration_date` DATE NULL,
    `next_run_date` DATE NOT NULL,
    `status` ENUM('active', 'paused', 'completed', 'cancelled') DEFAULT 'active',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`category_id`) REFERENCES `expense_categories`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. EXPENSE APPROVALS AUDIT TABLE
CREATE TABLE IF NOT EXISTS `expense_approvals` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `expense_id` BIGINT NOT NULL,
    `approver_id` BIGINT NOT NULL,
    `action` ENUM('requested', 'approved', 'rejected', 'revision_requested', 'cancelled') NOT NULL,
    `comments` TEXT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`expense_id`) REFERENCES `expenses`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. EXPENSE STATISTICS SUMMARY TABLE
CREATE TABLE IF NOT EXISTS `expense_statistics` (
    `tenant_id` BIGINT PRIMARY KEY,
    `total_expenses` DECIMAL(15,2) DEFAULT 0.00,
    `today_expenses` DECIMAL(15,2) DEFAULT 0.00,
    `weekly_expenses` DECIMAL(15,2) DEFAULT 0.00,
    `monthly_expenses` DECIMAL(15,2) DEFAULT 0.00,
    `pending_approval_amount` DECIMAL(15,2) DEFAULT 0.00,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
