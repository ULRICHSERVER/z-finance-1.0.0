-- =============================================================================
-- Z-FINANCE 1.0.0 - DOUBLE-ENTRY ACCOUNTING & GENERAL LEDGER SCHEMA
-- Database: MySQL 8.0+ / MariaDB 10.5+
-- Engine: InnoDB | Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. CHART OF ACCOUNTS
CREATE TABLE IF NOT EXISTS `chart_of_accounts` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `account_code` VARCHAR(50) NOT NULL UNIQUE,
    `account_name` VARCHAR(150) NOT NULL,
    `parent_id` BIGINT NULL,
    `account_type` ENUM('asset', 'current_asset', 'fixed_asset', 'liability', 'current_liability', 'long_term_liability', 'equity', 'revenue', 'cogs', 'operating_expense', 'other_income', 'other_expense') NOT NULL,
    `currency` VARCHAR(10) DEFAULT 'USD',
    `opening_balance` DECIMAL(15,2) DEFAULT 0.00,
    `current_balance` DECIMAL(15,2) DEFAULT 0.00,
    `status` ENUM('active', 'inactive', 'archived') DEFAULT 'active',
    `description` TEXT NULL,
    `is_deleted` TINYINT(1) DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`parent_id`) REFERENCES `chart_of_accounts`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Default Standard Chart of Accounts
INSERT INTO `chart_of_accounts` (`id`, `tenant_id`, `account_code`, `account_name`, `account_type`, `opening_balance`, `current_balance`) VALUES
(1000, 1, '1010', 'Operating Bank Account (Ecobank)', 'current_asset', 50000.00, 50000.00),
(1010, 1, '1020', 'Petty Cash Vault', 'current_asset', 2500.00, 2500.00),
(1020, 1, '1100', 'Accounts Receivable (Trade Debtors)', 'current_asset', 12500.00, 12500.00),
(1500, 1, '1500', 'Computer & IT Hardware Equipment', 'fixed_asset', 18000.00, 18000.00),
(2000, 1, '2010', 'Accounts Payable (Trade Creditors)', 'current_liability', 0.00, 4200.00),
(2100, 1, '2100', 'Sales Tax Payable', 'current_liability', 0.00, 850.00),
(3000, 1, '3010', 'Owner Equity / Share Capital', 'equity', 70000.00, 70000.00),
(3100, 1, '3020', 'Retained Earnings', 'equity', 13000.00, 13000.00),
(4000, 1, '4010', 'Service & Subscription Sales Revenue', 'revenue', 0.00, 24500.00),
(5000, 1, '5010', 'Hosting & Direct Delivery Cost (COGS)', 'cogs', 0.00, 3200.00),
(6000, 1, '6010', 'Office Rent & Lease Expense', 'operating_expense', 0.00, 4200.00),
(6100, 1, '6020', 'Software & SaaS Licensing', 'operating_expense', 0.00, 1450.00)
ON DUPLICATE KEY UPDATE `id` = `id`;

-- 2. JOURNAL ENTRIES TABLE
CREATE TABLE IF NOT EXISTS `journal_entries` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `reference_no` VARCHAR(50) NOT NULL UNIQUE,
    `entry_date` DATE NOT NULL,
    `posting_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `description` TEXT NOT NULL,
    `workspace_id` BIGINT DEFAULT 1,
    `source_module` ENUM('manual', 'income', 'expenses', 'budgets', 'payroll', 'transfers') DEFAULT 'manual',
    `source_reference` VARCHAR(50) NULL,
    `currency` VARCHAR(10) DEFAULT 'USD',
    `total_debit` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `total_credit` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `status` ENUM('draft', 'posted', 'reversed', 'cancelled') DEFAULT 'posted',
    `created_by` BIGINT DEFAULT 1,
    `approved_by` BIGINT DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. JOURNAL ENTRY LINES TABLE
CREATE TABLE IF NOT EXISTS `journal_entry_lines` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `journal_entry_id` BIGINT NOT NULL,
    `account_id` BIGINT NOT NULL,
    `description` VARCHAR(255) NULL,
    `debit` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `credit` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (`journal_entry_id`) REFERENCES `journal_entries`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`account_id`) REFERENCES `chart_of_accounts`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. GENERAL LEDGER TABLE
CREATE TABLE IF NOT EXISTS `general_ledger` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `account_id` BIGINT NOT NULL,
    `journal_entry_id` BIGINT NOT NULL,
    `line_id` BIGINT NOT NULL,
    `entry_date` DATE NOT NULL,
    `description` VARCHAR(255) NULL,
    `debit` DECIMAL(15,2) DEFAULT 0.00,
    `credit` DECIMAL(15,2) DEFAULT 0.00,
    `running_balance` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`account_id`) REFERENCES `chart_of_accounts`(`id`),
    FOREIGN KEY (`journal_entry_id`) REFERENCES `journal_entries`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. FISCAL YEARS TABLE
CREATE TABLE IF NOT EXISTS `fiscal_years` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `year_name` VARCHAR(50) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `is_closed` TINYINT(1) DEFAULT 0,
    `closed_at` DATETIME NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `fiscal_years` (`id`, `tenant_id`, `year_name`, `start_date`, `end_date`, `is_closed`) VALUES
(1, 1, 'FY 2026', '2026-01-01', '2026-12-31', 0)
ON DUPLICATE KEY UPDATE `id` = `id`;

-- 6. BANK & CASH ACCOUNTS TABLE
CREATE TABLE IF NOT EXISTS `bank_accounts` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `account_name` VARCHAR(150) NOT NULL,
    `bank_name` VARCHAR(100) NOT NULL,
    `account_number` VARCHAR(50) NOT NULL,
    `swift_code` VARCHAR(20) NULL,
    `currency` VARCHAR(10) DEFAULT 'USD',
    `opening_balance` DECIMAL(15,2) DEFAULT 0.00,
    `current_balance` DECIMAL(15,2) DEFAULT 0.00,
    `status` ENUM('active', 'inactive') DEFAULT 'active',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. ACCOUNT RECONCILIATIONS TABLE
CREATE TABLE IF NOT EXISTS `account_reconciliations` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `account_id` BIGINT NOT NULL,
    `reconciliation_date` DATE NOT NULL,
    `statement_balance` DECIMAL(15,2) NOT NULL,
    `book_balance` DECIMAL(15,2) NOT NULL,
    `difference` DECIMAL(15,2) DEFAULT 0.00,
    `status` ENUM('balanced', 'unreconciled', 'adjusted') DEFAULT 'balanced',
    `notes` TEXT NULL,
    `reconciled_by` BIGINT DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`account_id`) REFERENCES `chart_of_accounts`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. ACCOUNTING STATISTICS CACHE TABLE
CREATE TABLE IF NOT EXISTS `accounting_statistics` (
    `tenant_id` BIGINT PRIMARY KEY,
    `total_assets` DECIMAL(15,2) DEFAULT 0.00,
    `total_liabilities` DECIMAL(15,2) DEFAULT 0.00,
    `total_equity` DECIMAL(15,2) DEFAULT 0.00,
    `total_revenue` DECIMAL(15,2) DEFAULT 0.00,
    `total_expenses` DECIMAL(15,2) DEFAULT 0.00,
    `net_profit` DECIMAL(15,2) DEFAULT 0.00,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
