# Customer Management Guide - Z-FINANCE 1.0.0

## 1. Overview
The **Customer Management Engine** allows users to maintain rich profile metadata, groups, tags, and financial links.

---

## 2. Customer Schema (`customers`)

```sql
CREATE TABLE IF NOT EXISTS `customers` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL DEFAULT 1,
    `customer_code` VARCHAR(50) NOT NULL UNIQUE,
    `customer_type` ENUM('individual', 'company', 'organization', 'association', 'school', 'government', 'ngo', 'partner', 'custom') NOT NULL DEFAULT 'individual',
    `display_name` VARCHAR(200) NOT NULL,
    `company_name` VARCHAR(200) NULL,
    `email` VARCHAR(150) NULL,
    `phone` VARCHAR(50) NULL,
    `whatsapp` VARCHAR(50) NULL,
    `country` VARCHAR(100) DEFAULT 'United States',
    `city` VARCHAR(100) NULL,
    `is_vip` TINYINT(1) DEFAULT 0,
    `status` ENUM('active', 'inactive', 'lead', 'archived') NOT NULL DEFAULT 'active',
    `visibility` ENUM('private', 'public', 'invitation_only') NOT NULL DEFAULT 'private'
);
```

---

## 3. Customer Groups & Segmentation
Default seeded groups include:
- **VIP Clients** (`#7c3aed`)
- **Corporate Accounts** (`#2563eb`)
- **Regular Retail** (`#059669`)
- **Partners & Affiliates** (`#d97706`)
