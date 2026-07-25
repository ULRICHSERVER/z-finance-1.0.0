-- =============================================================================
-- Z-FINANCE 1.0.0 - SUPER ADMINISTRATOR CONTROL CENTER SCHEMA
-- Database: MySQL 8.0+ / MariaDB 10.5+
-- Engine: InnoDB | Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. SYSTEM SETTINGS TABLE
CREATE TABLE IF NOT EXISTS `system_settings` (
    `setting_key` VARCHAR(100) PRIMARY KEY,
    `setting_value` LONGTEXT NULL,
    `setting_group` VARCHAR(50) NOT NULL DEFAULT 'general', -- general, security, email, payment, pwa, theme, ai
    `is_encrypted` TINYINT(1) NOT NULL DEFAULT 0,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Default Core Settings
INSERT INTO `system_settings` (`setting_key`, `setting_value`, `setting_group`) VALUES
('app_name', 'Z-FINANCE Enterprise', 'general'),
('company_name', 'Z-FINANCE Global Ltd', 'general'),
('company_email', 'admin@zfinance.com', 'general'),
('company_phone', '+1 (800) 555-ZFIN', 'general'),
('timezone', 'UTC', 'general'),
('default_currency', 'USD', 'general'),
('default_language', 'en', 'general'),
('maintenance_mode', '0', 'general'),
('maintenance_ip_whitelist', '127.0.0.1, 192.168.1.1', 'general'),
('maintenance_message', 'Z-FINANCE is currently undergoing scheduled maintenance. Please check back shortly.', 'general'),
('smtp_host', 'smtp.zfinance.com', 'email'),
('smtp_port', '587', 'email'),
('smtp_user', 'notifications@zfinance.com', 'email'),
('smtp_encryption', 'tls', 'email'),
('pwa_manifest_version', '1.0.4', 'pwa'),
('pwa_force_cache_refresh', '0', 'pwa'),
('ai_assistant_enabled', '1', 'ai'),
('ai_provider', 'gemini', 'ai')
ON DUPLICATE KEY UPDATE `setting_key` = `setting_key`;

-- 2. SYSTEM MODULES REGISTER TABLE
CREATE TABLE IF NOT EXISTS `system_modules` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `module_code` VARCHAR(50) NOT NULL UNIQUE,
    `module_name` VARCHAR(100) NOT NULL,
    `version` VARCHAR(20) NOT NULL DEFAULT '1.0.0',
    `description` TEXT NULL,
    `category` VARCHAR(50) NOT NULL DEFAULT 'core', -- core, finance, security, crm, ad_suite
    `is_enabled` TINYINT(1) NOT NULL DEFAULT 1,
    `is_core` TINYINT(1) NOT NULL DEFAULT 0,
    `dependencies` JSON NULL,
    `installed_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Default Modules
INSERT INTO `system_modules` (`module_code`, `module_name`, `version`, `description`, `category`, `is_enabled`, `is_core`) VALUES
('core_auth', 'Authentication Suite', '1.0.0', 'Enterprise multi-factor auth, session management, and OAuth', 'core', 1, 1),
('core_rbac', 'RBAC Permission Engine', '1.0.0', 'Role hierarchy, permission matrix, and data scopes', 'core', 1, 1),
('user_mgmt', 'User Management System', '1.0.0', 'Central user accounts, profile verification, and document management', 'core', 1, 1),
('super_admin', 'Super Admin Control Center', '1.0.0', 'Central system configuration, backup, and health monitoring', 'core', 1, 1),
('ad_suite', 'Advertisement Suite', '1.0.0', 'Multi-channel targeted ad campaigns and analytics', 'ad_suite', 1, 0),
('income_tracker', 'Income & Revenue Engine', '1.0.0', 'Enterprise income logging, category analytics, and reporting', 'finance', 1, 0)
ON DUPLICATE KEY UPDATE `module_code` = `module_code`;

-- 3. ADVERTISEMENTS TABLE
CREATE TABLE IF NOT EXISTS `advertisements` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(150) NOT NULL,
    `banner_url` VARCHAR(255) NULL,
    `target_url` VARCHAR(255) NOT NULL,
    `placement_location` VARCHAR(50) NOT NULL DEFAULT 'sidebar', -- sidebar, dashboard_top, modal_popup, footer
    `status` ENUM('active', 'paused', 'scheduled', 'completed', 'archived') NOT NULL DEFAULT 'active',
    `impressions_count` BIGINT NOT NULL DEFAULT 0,
    `clicks_count` BIGINT NOT NULL DEFAULT 0,
    `target_roles` JSON NULL, -- e.g. ["standard_user", "employee"]
    `target_plans` JSON NULL, -- e.g. ["free", "basic"]
    `target_countries` JSON NULL,
    `starts_at` DATETIME NULL,
    `ends_at` DATETIME NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. SYSTEM BACKUPS LOG TABLE
CREATE TABLE IF NOT EXISTS `system_backups` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `backup_name` VARCHAR(150) NOT NULL,
    `file_path` VARCHAR(255) NOT NULL,
    `file_size_mb` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `backup_type` ENUM('full_database', 'schema_only', 'system_files', 'complete_archive') NOT NULL DEFAULT 'full_database',
    `status` ENUM('completed', 'in_progress', 'failed') NOT NULL DEFAULT 'completed',
    `created_by` BIGINT NOT NULL DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. PAYMENT GATEWAYS CONFIG TABLE
CREATE TABLE IF NOT EXISTS `payment_gateways` (
    `gateway_code` VARCHAR(50) PRIMARY KEY, -- mtn_momo, orange_money, payunit, flutterwave, paystack, stripe, paypal
    `gateway_name` VARCHAR(100) NOT NULL,
    `is_enabled` TINYINT(1) NOT NULL DEFAULT 0,
    `is_sandbox` TINYINT(1) NOT NULL DEFAULT 1,
    `api_key` TEXT NULL,
    `secret_key` TEXT NULL,
    `webhook_secret` TEXT NULL,
    `supported_currencies` JSON NULL,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Payment Gateways
INSERT INTO `payment_gateways` (`gateway_code`, `gateway_name`, `is_enabled`, `is_sandbox`, `supported_currencies`) VALUES
('mtn_momo', 'MTN Mobile Money', 1, 1, '["XAF", "XOF", "GHS", "UGX"]'),
('orange_money', 'Orange Money', 1, 1, '["XAF", "XOF"]'),
('payunit', 'PayUnit Mobile Aggregator', 1, 1, '["XAF", "USD", "EUR"]'),
('flutterwave', 'Flutterwave', 1, 1, '["USD", "NGN", "GHS", "KES", "XAF"]'),
('paystack', 'Paystack', 1, 1, '["USD", "NGN", "GHS", "ZAR"]'),
('stripe', 'Stripe Payments', 1, 0, '["USD", "EUR", "GBP", "CAD"]')
ON DUPLICATE KEY UPDATE `gateway_code` = `gateway_code`;

SET FOREIGN_KEY_CHECKS = 1;
