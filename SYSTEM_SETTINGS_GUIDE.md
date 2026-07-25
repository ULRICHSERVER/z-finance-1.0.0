# System Settings Guide - Z-FINANCE 1.0.0

## 1. Overview
The **System Settings Module** provides Super Administrators with a centralized interface to manage key parameters governing platform branding, regional formatting, security parameters, and maintenance modes.

---

## 2. Setting Categories

### 2.1 General & Branding
- **`app_name`**: The public title displayed in headers and browser tabs.
- **`company_name`**: Legal business name included on generated PDFs and invoices.
- **`company_email`**: Support contact email for system notifications.
- **`company_phone`**: Customer support hotline.

### 2.2 Regional & Formatting
- **`timezone`**: Server and display timezone (Default: `UTC`).
- **`default_currency`**: Base currency code for financial aggregations (e.g., `USD`, `XAF`, `EUR`).
- **`default_language`**: Platform default UI locale (`en`, `fr`).

### 2.3 Maintenance & Security
- **`maintenance_mode`**: Flag (`0` or `1`) putting the platform into maintenance mode.
- **`maintenance_ip_whitelist`**: Comma-separated IP list allowed to bypass maintenance mode.
- **`maintenance_message`**: Custom HTML message displayed to blocked visitors.

---

## 3. Storage Table (`system_settings`)

```sql
CREATE TABLE IF NOT EXISTS `system_settings` (
    `setting_key` VARCHAR(100) PRIMARY KEY,
    `setting_value` LONGTEXT NULL,
    `setting_group` VARCHAR(50) NOT NULL DEFAULT 'general',
    `is_encrypted` TINYINT(1) NOT NULL DEFAULT 0,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
