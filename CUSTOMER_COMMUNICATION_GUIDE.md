# Customer Communication Guide - Z-FINANCE 1.0.0

## 1. Overview
The **Customer Communication Logging Engine** (`CustomerCommunicationManager.php`) tracks phone calls, emails, in-person meetings, chat messages, and WhatsApp interactions.

---

## 2. Communication Schema (`customer_communications`)

```sql
CREATE TABLE IF NOT EXISTS `customer_communications` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `customer_id` BIGINT NOT NULL,
    `type` ENUM('call', 'email', 'meeting', 'message', 'whatsapp', 'note') NOT NULL DEFAULT 'note',
    `subject` VARCHAR(200) NOT NULL,
    `details` TEXT NULL,
    `follow_up_date` DATETIME NULL,
    `is_resolved` TINYINT(1) DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
