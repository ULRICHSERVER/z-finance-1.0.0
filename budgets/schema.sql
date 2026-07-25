-- =============================================================================
-- Z-FINANCE 1.0.0 - BUDGET PLANNING, GOALS & SAVINGS MANAGEMENT SCHEMA
-- Database: MySQL 8.0+ / MariaDB 10.5+
-- Engine: InnoDB | Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. BUDGET CATEGORIES
CREATE TABLE IF NOT EXISTS `budget_categories` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `category_name` VARCHAR(100) NOT NULL,
    `category_code` VARCHAR(50) NOT NULL UNIQUE,
    `description` TEXT NULL,
    `color_code` VARCHAR(20) DEFAULT '#3B82F6',
    `icon` VARCHAR(50) DEFAULT 'wallet',
    `status` ENUM('active', 'inactive') DEFAULT 'active',
    `is_deleted` TINYINT(1) DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Default Categories
INSERT INTO `budget_categories` (`id`, `tenant_id`, `category_name`, `category_code`, `description`, `color_code`, `icon`) VALUES
(1, 1, 'Operating Overhead', 'BDG-OPS', 'Day-to-day administrative & office budget', '#3B82F6', 'building-office'),
(2, 1, 'Marketing & Growth', 'BDG-MKT', 'Ad campaigns, PR, SEO, and promotional events', '#EC4899', 'megaphone'),
(3, 1, 'Capital Expenditure (CapEx)', 'BDG-CAPEX', 'Equipment, hardware, property, and tech upgrades', '#10B981', 'cpu-chip'),
(4, 1, 'Research & Development', 'BDG-RND', 'Software engineering, AI models, and innovation', '#8B5CF6', 'beaker')
ON DUPLICATE KEY UPDATE `id` = `id`;

-- 2. BUDGETS TABLE
CREATE TABLE IF NOT EXISTS `budgets` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `reference_no` VARCHAR(50) NOT NULL UNIQUE,
    `budget_name` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `budget_type` ENUM('personal', 'business', 'project', 'department', 'service', 'customer', 'category', 'annual', 'monthly', 'weekly', 'daily', 'custom') DEFAULT 'monthly',
    `workspace_id` BIGINT DEFAULT 1,
    `category_id` BIGINT NULL,
    `service_id` BIGINT NULL,
    `project_id` BIGINT NULL,
    `customer_id` BIGINT NULL,
    `currency` VARCHAR(10) DEFAULT 'USD',
    `budget_amount` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `expected_income` DECIMAL(15,2) DEFAULT 0.00,
    `expected_expenses` DECIMAL(15,2) DEFAULT 0.00,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `status` ENUM('draft', 'active', 'completed', 'exceeded', 'cancelled') DEFAULT 'active',
    `notes` TEXT NULL,
    `is_deleted` TINYINT(1) DEFAULT 0,
    `created_by` BIGINT DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`category_id`) REFERENCES `budget_categories`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. BUDGET TRACKING TABLE (Live Realized Metrics)
CREATE TABLE IF NOT EXISTS `budget_tracking` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `budget_id` BIGINT NOT NULL UNIQUE,
    `actual_income` DECIMAL(15,2) DEFAULT 0.00,
    `actual_expenses` DECIMAL(15,2) DEFAULT 0.00,
    `budget_remaining` DECIMAL(15,2) DEFAULT 0.00,
    `budget_used` DECIMAL(15,2) DEFAULT 0.00,
    `percentage_used` DECIMAL(5,2) DEFAULT 0.00,
    `variance` DECIMAL(15,2) DEFAULT 0.00,
    `forecast_balance` DECIMAL(15,2) DEFAULT 0.00,
    `last_calculated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`budget_id`) REFERENCES `budgets`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. BUDGET ALERTS TABLE
CREATE TABLE IF NOT EXISTS `budget_alerts` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `budget_id` BIGINT NOT NULL,
    `alert_type` ENUM('threshold_80', 'threshold_90', 'exceeded', 'expiring_soon', 'goal_achieved') NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    `is_read` TINYINT(1) DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`budget_id`) REFERENCES `budgets`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. FINANCIAL GOALS TABLE
CREATE TABLE IF NOT EXISTS `financial_goals` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `reference_no` VARCHAR(50) NOT NULL UNIQUE,
    `goal_name` VARCHAR(200) NOT NULL,
    `goal_type` ENUM('emergency_fund', 'expansion', 'equipment', 'training', 'vacation', 'investment', 'debt_reduction', 'custom') DEFAULT 'custom',
    `target_amount` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `current_amount` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `currency` VARCHAR(10) DEFAULT 'USD',
    `start_date` DATE NOT NULL,
    `deadline` DATE NOT NULL,
    `priority` ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    `status` ENUM('in_progress', 'achieved', 'behind', 'cancelled') DEFAULT 'in_progress',
    `description` TEXT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. GOAL PROGRESS LOG
CREATE TABLE IF NOT EXISTS `goal_progress` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `goal_id` BIGINT NOT NULL,
    `contribution_amount` DECIMAL(15,2) NOT NULL,
    `notes` VARCHAR(255) NULL,
    `contributed_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`goal_id`) REFERENCES `financial_goals`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. SAVINGS ACCOUNTS TABLE
CREATE TABLE IF NOT EXISTS `savings_accounts` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `account_name` VARCHAR(150) NOT NULL,
    `account_number` VARCHAR(50) NOT NULL UNIQUE,
    `bank_institution` VARCHAR(100) DEFAULT 'Internal Vault',
    `currency` VARCHAR(10) DEFAULT 'USD',
    `current_balance` DECIMAL(15,2) DEFAULT 0.00,
    `target_balance` DECIMAL(15,2) DEFAULT 0.00,
    `interest_rate` DECIMAL(5,2) DEFAULT 0.00,
    `status` ENUM('active', 'frozen', 'closed') DEFAULT 'active',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. SAVINGS TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS `savings_transactions` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `account_id` BIGINT NOT NULL,
    `transaction_type` ENUM('deposit', 'withdrawal', 'interest_yield') NOT NULL,
    `amount` DECIMAL(15,2) NOT NULL,
    `reference_no` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,
    `transaction_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`account_id`) REFERENCES `savings_accounts`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. BUDGET REPORTS TABLE
CREATE TABLE IF NOT EXISTS `budget_reports` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `report_name` VARCHAR(150) NOT NULL,
    `period_type` ENUM('monthly', 'quarterly', 'annual') DEFAULT 'monthly',
    `generated_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `report_json` JSON NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. BUDGET STATISTICS SUMMARY TABLE
CREATE TABLE IF NOT EXISTS `budget_statistics` (
    `tenant_id` BIGINT PRIMARY KEY,
    `total_budgets` INT DEFAULT 0,
    `active_budgets` INT DEFAULT 0,
    `exceeded_budgets` INT DEFAULT 0,
    `total_allocated` DECIMAL(15,2) DEFAULT 0.00,
    `total_spent` DECIMAL(15,2) DEFAULT 0.00,
    `total_remaining` DECIMAL(15,2) DEFAULT 0.00,
    `avg_utilization` DECIMAL(5,2) DEFAULT 0.00,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
