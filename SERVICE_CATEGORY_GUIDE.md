# Service Category Guide - Z-FINANCE 1.0.0

## 1. Overview
The **Service Category Engine** (`modules/services/classes/ServiceCategoryManager.php`) structures services into logical industry groupings.

---

## 2. Default Seeded Categories
- Technology & Software (`technology-software`)
- Financial & Accounting (`financial-accounting`)
- Consulting & Strategy (`consulting-strategy`)
- Marketing & Creative (`marketing-creative`)
- Legal & Compliance (`legal-compliance`)

---

## 3. Database Table (`service_categories`)

```sql
CREATE TABLE IF NOT EXISTS `service_categories` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL DEFAULT 1,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(120) NOT NULL UNIQUE,
    `description` TEXT NULL,
    `icon` VARCHAR(50) DEFAULT 'Briefcase',
    `color` VARCHAR(20) DEFAULT '#2563eb',
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `display_order` INT DEFAULT 0
);
```
