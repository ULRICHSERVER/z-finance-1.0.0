-- =============================================================================
-- Z-FINANCE 1.0.0 - CALENDAR, APPOINTMENTS, REMINDERS & SCHEDULING SCHEMA
-- Database: MySQL 8.0+ / MariaDB 10.5+
-- Engine: InnoDB | Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. CALENDARS
CREATE TABLE IF NOT EXISTS `calendars` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `owner_type` ENUM('user', 'team', 'business', 'public') DEFAULT 'user',
    `owner_id` BIGINT NOT NULL DEFAULT 1,
    `calendar_name` VARCHAR(150) NOT NULL,
    `color_hex` VARCHAR(20) DEFAULT '#4f46e5',
    `is_primary` TINYINT(1) DEFAULT 0,
    `is_shared` TINYINT(1) DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. EVENTS
CREATE TABLE IF NOT EXISTS `events` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `calendar_id` BIGINT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `category` ENUM('meeting', 'appointment', 'training', 'conference', 'workshop', 'deadline', 'reminder', 'holiday', 'personal', 'business', 'custom') DEFAULT 'meeting',
    `organizer_id` BIGINT NOT NULL DEFAULT 1,
    `workspace_id` BIGINT NULL,
    `start_date` DATE NOT NULL,
    `start_time` TIME NOT NULL,
    `end_date` DATE NOT NULL,
    `end_time` TIME NOT NULL,
    `location` VARCHAR(255) NULL,
    `online_meeting_link` VARCHAR(500) NULL,
    `priority` ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    `status` ENUM('scheduled', 'in_progress', 'completed', 'cancelled') DEFAULT 'scheduled',
    `reminder_minutes_before` INT DEFAULT 15,
    `is_recurring` TINYINT(1) DEFAULT 0,
    `recurring_rule_id` BIGINT NULL,
    `attachments` TEXT NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`calendar_id`) REFERENCES `calendars`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. EVENT PARTICIPANTS
CREATE TABLE IF NOT EXISTS `event_participants` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `event_id` BIGINT NOT NULL,
    `participant_type` ENUM('employee', 'customer', 'supplier', 'external') DEFAULT 'employee',
    `participant_id` BIGINT NOT NULL,
    `participant_email` VARCHAR(150) NULL,
    `response_status` ENUM('pending', 'accepted', 'declined', 'tentative') DEFAULT 'pending',
    FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. APPOINTMENTS
CREATE TABLE IF NOT EXISTS `appointments` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `appointment_number` VARCHAR(50) NOT NULL UNIQUE,
    `customer_id` BIGINT NULL,
    `customer_name` VARCHAR(150) NOT NULL,
    `customer_email` VARCHAR(150) NULL,
    `customer_phone` VARCHAR(50) NULL,
    `service_id` BIGINT NULL,
    `service_name` VARCHAR(150) NOT NULL,
    `assigned_employee_id` BIGINT NULL,
    `appointment_date` DATE NOT NULL,
    `appointment_time` TIME NOT NULL,
    `duration_minutes` INT DEFAULT 30,
    `location` VARCHAR(255) DEFAULT 'Main Business Hub',
    `status` ENUM('requested', 'pending_approval', 'confirmed', 'completed', 'cancelled', 'rescheduled', 'no_show') DEFAULT 'confirmed',
    `payment_status` ENUM('unpaid', 'partially_paid', 'paid', 'refunded') DEFAULT 'unpaid',
    `notes` TEXT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. APPOINTMENT SERVICES
CREATE TABLE IF NOT EXISTS `appointment_services` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `appointment_id` BIGINT NOT NULL,
    `service_id` BIGINT NOT NULL,
    `service_name` VARCHAR(150) NOT NULL,
    `price` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. APPOINTMENT REMINDERS
CREATE TABLE IF NOT EXISTS `appointment_reminders` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `appointment_id` BIGINT NOT NULL,
    `reminder_type` ENUM('email', 'sms', 'push', 'in_app') DEFAULT 'in_app',
    `send_time` DATETIME NOT NULL,
    `is_sent` TINYINT(1) DEFAULT 0,
    FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. RECURRING EVENTS
CREATE TABLE IF NOT EXISTS `recurring_events` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `frequency` ENUM('daily', 'weekly', 'monthly', 'yearly', 'custom') DEFAULT 'weekly',
    `interval_value` INT DEFAULT 1,
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,
    `status` ENUM('active', 'paused', 'completed') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. CALENDAR PERMISSIONS
CREATE TABLE IF NOT EXISTS `calendar_permissions` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `calendar_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    `permission_level` ENUM('view', 'edit', 'manage') DEFAULT 'view',
    FOREIGN KEY (`calendar_id`) REFERENCES `calendars`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. CALENDAR NOTIFICATIONS
CREATE TABLE IF NOT EXISTS `calendar_notifications` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `recipient_id` BIGINT NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `message` TEXT NOT NULL,
    `channel` ENUM('in_app', 'email', 'sms', 'push') DEFAULT 'in_app',
    `is_read` TINYINT(1) DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. CALENDAR LOGS
CREATE TABLE IF NOT EXISTS `calendar_logs` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `action` VARCHAR(150) NOT NULL,
    `target_type` VARCHAR(50) NOT NULL,
    `target_id` BIGINT NOT NULL,
    `performed_by` BIGINT NOT NULL DEFAULT 1,
    `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
