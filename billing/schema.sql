-- =============================================================================
-- Z-FINANCE 1.0.0 - BILLING, INVOICING, QUOTATIONS & DIGITAL SIGNATURES SCHEMA
-- Database: MySQL 8.0+ / MariaDB 10.5+
-- Engine: InnoDB | Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. DOCUMENT TEMPLATES
CREATE TABLE IF NOT EXISTS `document_templates` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `template_name` VARCHAR(150) NOT NULL,
    `template_type` ENUM('invoice', 'quotation', 'estimate', 'receipt', 'credit_note', 'proforma') NOT NULL,
    `header_html` TEXT NULL,
    `footer_html` TEXT NULL,
    `primary_color` VARCHAR(20) DEFAULT '#2563eb',
    `secondary_color` VARCHAR(20) DEFAULT '#1e293b',
    `logo_url` VARCHAR(255) NULL,
    `watermark_text` VARCHAR(100) NULL,
    `terms_conditions` TEXT NULL,
    `is_default` TINYINT(1) DEFAULT 0,
    `is_active` TINYINT(1) DEFAULT 1,
    `created_by` BIGINT DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `document_templates` (`id`, `tenant_id`, `template_name`, `template_type`, `primary_color`, `watermark_text`, `is_default`, `is_active`) VALUES
(1, 1, 'Standard Corporate Blue Invoice', 'invoice', '#2563eb', 'ORIGINAL COPY', 1, 1),
(2, 1, 'Enterprise Quotation Modern', 'quotation', '#059669', 'CONFIDENTIAL PROPOSAL', 1, 1),
(3, 1, 'Official Payment Receipt Gold', 'receipt', '#d97706', 'PAID IN FULL', 1, 1)
ON DUPLICATE KEY UPDATE `id` = `id`;

-- 2. DIGITAL SIGNATURES
CREATE TABLE IF NOT EXISTS `document_signatures` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `signer_name` VARCHAR(150) NOT NULL,
    `signer_title` VARCHAR(100) NULL,
    `signer_type` ENUM('super_admin', 'company', 'customer', 'user', 'manager', 'authorized') NOT NULL,
    `signature_format` ENUM('draw', 'upload', 'electronic') NOT NULL,
    `signature_data` LONGTEXT NOT NULL,
    `verification_hash` VARCHAR(255) NOT NULL,
    `ip_address` VARCHAR(45) DEFAULT '127.0.0.1',
    `signed_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `is_active` TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. QUOTATIONS & ESTIMATES
CREATE TABLE IF NOT EXISTS `quotations` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `reference_no` VARCHAR(50) NOT NULL UNIQUE,
    `customer_id` BIGINT NOT NULL,
    `customer_name` VARCHAR(150) NOT NULL,
    `customer_email` VARCHAR(150) NULL,
    `issue_date` DATE NOT NULL,
    `expiry_date` DATE NOT NULL,
    `subtotal` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `tax_amount` DECIMAL(15,2) DEFAULT 0.00,
    `discount_amount` DECIMAL(15,2) DEFAULT 0.00,
    `total_amount` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `currency` VARCHAR(10) DEFAULT 'USD',
    `status` ENUM('draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired', 'converted', 'cancelled') DEFAULT 'draft',
    `converted_invoice_id` BIGINT NULL,
    `signature_id` BIGINT NULL,
    `notes` TEXT NULL,
    `terms` TEXT NULL,
    `created_by` BIGINT DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`signature_id`) REFERENCES `document_signatures`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. QUOTATION ITEMS
CREATE TABLE IF NOT EXISTS `quotation_items` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `quotation_id` BIGINT NOT NULL,
    `item_name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `quantity` DECIMAL(10,2) NOT NULL DEFAULT 1.00,
    `unit_price` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `discount` DECIMAL(15,2) DEFAULT 0.00,
    `tax_rate` DECIMAL(5,2) DEFAULT 0.00,
    `subtotal` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (`quotation_id`) REFERENCES `quotations`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. INVOICES
CREATE TABLE IF NOT EXISTS `invoices` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `invoice_number` VARCHAR(50) NOT NULL UNIQUE,
    `customer_id` BIGINT NOT NULL,
    `customer_name` VARCHAR(150) NOT NULL,
    `customer_email` VARCHAR(150) NULL,
    `issue_date` DATE NOT NULL,
    `due_date` DATE NOT NULL,
    `subtotal` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `tax_amount` DECIMAL(15,2) DEFAULT 0.00,
    `discount_amount` DECIMAL(15,2) DEFAULT 0.00,
    `total_amount` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `paid_amount` DECIMAL(15,2) DEFAULT 0.00,
    `currency` VARCHAR(10) DEFAULT 'USD',
    `status` ENUM('draft', 'sent', 'viewed', 'partially_paid', 'paid', 'overdue', 'cancelled', 'refunded') DEFAULT 'draft',
    `signature_id` BIGINT NULL,
    `recurring_id` BIGINT NULL,
    `notes` TEXT NULL,
    `created_by` BIGINT DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`signature_id`) REFERENCES `document_signatures`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. INVOICE ITEMS
CREATE TABLE IF NOT EXISTS `invoice_items` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `invoice_id` BIGINT NOT NULL,
    `item_name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `quantity` DECIMAL(10,2) NOT NULL DEFAULT 1.00,
    `unit_price` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `discount` DECIMAL(15,2) DEFAULT 0.00,
    `tax_rate` DECIMAL(5,2) DEFAULT 0.00,
    `subtotal` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. RECURRING INVOICE SCHEDULES
CREATE TABLE IF NOT EXISTS `recurring_invoices` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `customer_id` BIGINT NOT NULL,
    `customer_name` VARCHAR(150) NOT NULL,
    `frequency` ENUM('daily', 'weekly', 'monthly', 'quarterly', 'annual') DEFAULT 'monthly',
    `next_issue_date` DATE NOT NULL,
    `total_amount` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `currency` VARCHAR(10) DEFAULT 'USD',
    `status` ENUM('active', 'paused', 'expired') DEFAULT 'active',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. RECEIPTS
CREATE TABLE IF NOT EXISTS `receipts` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `receipt_number` VARCHAR(50) NOT NULL UNIQUE,
    `invoice_id` BIGINT NOT NULL,
    `customer_id` BIGINT NOT NULL,
    `customer_name` VARCHAR(150) NOT NULL,
    `payment_amount` DECIMAL(15,2) NOT NULL,
    `payment_method` VARCHAR(50) DEFAULT 'Bank Transfer',
    `payment_date` DATE NOT NULL,
    `signature_id` BIGINT NULL,
    `qr_code_hash` VARCHAR(255) NOT NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`),
    FOREIGN KEY (`signature_id`) REFERENCES `document_signatures`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. CREDIT & DEBIT NOTES
CREATE TABLE IF NOT EXISTS `credit_notes` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `note_number` VARCHAR(50) NOT NULL UNIQUE,
    `invoice_id` BIGINT NOT NULL,
    `customer_id` BIGINT NOT NULL,
    `amount` DECIMAL(15,2) NOT NULL,
    `reason` TEXT NOT NULL,
    `issue_date` DATE NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. DOCUMENT AUDIT LOGS
CREATE TABLE IF NOT EXISTS `document_logs` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `document_type` VARCHAR(50) NOT NULL,
    `document_id` BIGINT NOT NULL,
    `action` VARCHAR(50) NOT NULL,
    `performed_by` BIGINT DEFAULT 1,
    `ip_address` VARCHAR(45) DEFAULT '127.0.0.1',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
