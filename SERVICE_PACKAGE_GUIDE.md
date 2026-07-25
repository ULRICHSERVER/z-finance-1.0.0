# Service Package Guide - Z-FINANCE 1.0.0

## 1. Overview
The **Service Package Engine** (`modules/services/classes/ServicePackageManager.php`) enables multi-tiered offerings (e.g. Starter, Professional, Enterprise) per service.

---

## 2. Package Schema (`service_packages`)

```sql
CREATE TABLE IF NOT EXISTS `service_packages` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `service_id` BIGINT NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `price` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    `discount_percentage` DECIMAL(5,2) DEFAULT 0.00,
    `duration_unit` ENUM('hour', 'day', 'week', 'month', 'year', 'project') DEFAULT 'month',
    `duration_value` INT DEFAULT 1,
    `max_customers` INT DEFAULT 0,
    `max_projects` INT DEFAULT 0,
    `max_sessions` INT DEFAULT 0,
    `is_popular` TINYINT(1) DEFAULT 0
);
```
