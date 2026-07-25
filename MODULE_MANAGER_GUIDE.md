# Module Manager Guide - Z-FINANCE 1.0.0

## 1. Overview
The **Module Manager Engine** (`modules/super_admin/classes/ModuleManager.php`) manages the lifecycle of core components and future plugin extensions.

---

## 2. Core vs. Extension Modules

### 2.1 Core System Modules (Protected)
- `core_auth` (Authentication Suite)
- `core_rbac` (RBAC Permission Engine)
- `user_mgmt` (User Management System)
- `super_admin` (Super Admin Control Center)
*Core modules are immutable and cannot be disabled from the administration console.*

### 2.2 Feature Modules (Toggleable)
- `ad_suite` (Advertisement Suite)
- `income_tracker` (Income & Revenue Engine)

---

## 3. Database Table (`system_modules`)

```sql
CREATE TABLE IF NOT EXISTS `system_modules` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `module_code` VARCHAR(50) NOT NULL UNIQUE,
    `module_name` VARCHAR(100) NOT NULL,
    `version` VARCHAR(20) NOT NULL DEFAULT '1.0.0',
    `description` TEXT NULL,
    `category` VARCHAR(50) NOT NULL DEFAULT 'core',
    `is_enabled` TINYINT(1) NOT NULL DEFAULT 1,
    `is_core` TINYINT(1) NOT NULL DEFAULT 0,
    `dependencies` JSON NULL,
    `installed_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
