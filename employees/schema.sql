-- =============================================================================
-- Z-FINANCE 1.0.0 - EMPLOYEE, TEAM, ROLE & PERMISSION SYSTEM SCHEMA
-- Database: MySQL 8.0+ / MariaDB 10.5+
-- Engine: InnoDB | Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. DEPARTMENTS
CREATE TABLE IF NOT EXISTS `departments` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `department_code` VARCHAR(50) NOT NULL,
    `department_name` VARCHAR(150) NOT NULL,
    `description` TEXT NULL,
    `manager_id` BIGINT NULL,
    `status` ENUM('active', 'inactive') DEFAULT 'active',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. ROLES
CREATE TABLE IF NOT EXISTS `roles` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `role_name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NULL,
    `is_system_role` TINYINT(1) DEFAULT 0,
    `status` ENUM('active', 'inactive') DEFAULT 'active',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. PERMISSIONS
CREATE TABLE IF NOT EXISTS `permissions` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `module_name` VARCHAR(100) NOT NULL,
    `permission_key` VARCHAR(100) NOT NULL UNIQUE,
    `permission_name` VARCHAR(150) NOT NULL,
    `description` VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. ROLE PERMISSIONS
CREATE TABLE IF NOT EXISTS `role_permissions` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `role_id` BIGINT NOT NULL,
    `permission_id` BIGINT NOT NULL,
    FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. TEAMS
CREATE TABLE IF NOT EXISTS `teams` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `team_name` VARCHAR(150) NOT NULL,
    `description` TEXT NULL,
    `department_id` BIGINT NULL,
    `team_lead_id` BIGINT NULL,
    `status` ENUM('active', 'inactive') DEFAULT 'active',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. EMPLOYEES
CREATE TABLE IF NOT EXISTS `employees` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `employee_code` VARCHAR(50) NOT NULL UNIQUE,
    `user_id` BIGINT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `profile_photo` VARCHAR(500) NULL,
    `gender` ENUM('male', 'female', 'other') DEFAULT 'male',
    `dob` DATE NULL,
    `nationality` VARCHAR(100) DEFAULT 'Cameroonian',
    `phone` VARCHAR(50) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `address` TEXT NULL,
    `emergency_contact` VARCHAR(255) NULL,
    `job_title` VARCHAR(150) NOT NULL,
    `department_id` BIGINT NULL,
    `team_id` BIGINT NULL,
    `role_id` BIGINT NULL,
    `manager_id` BIGINT NULL,
    `employment_type` ENUM('full_time', 'part_time', 'contract', 'temporary', 'intern', 'volunteer', 'consultant', 'freelancer') DEFAULT 'full_time',
    `joining_date` DATE NOT NULL,
    `status` ENUM('active', 'inactive', 'on_leave', 'terminated') DEFAULT 'active',
    `biography` TEXT NULL,
    `skills` TEXT NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. TEAM MEMBERS
CREATE TABLE IF NOT EXISTS `team_members` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `team_id` BIGINT NOT NULL,
    `employee_id` BIGINT NOT NULL,
    `assigned_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. EMPLOYEE DOCUMENTS
CREATE TABLE IF NOT EXISTS `employee_documents` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `employee_id` BIGINT NOT NULL,
    `doc_title` VARCHAR(200) NOT NULL,
    `doc_type` ENUM('id_proof', 'contract', 'certificate', 'cv', 'training', 'other') DEFAULT 'other',
    `file_url` VARCHAR(500) NOT NULL,
    `file_size` BIGINT DEFAULT 0,
    `uploaded_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. EMPLOYEE ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS `employee_activity_logs` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `employee_id` BIGINT NOT NULL,
    `action_performed` VARCHAR(200) NOT NULL,
    `module_affected` VARCHAR(100) NOT NULL,
    `ip_address` VARCHAR(50) NULL,
    `logged_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. EMPLOYEE INVITATIONS
CREATE TABLE IF NOT EXISTS `employee_invitations` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `email` VARCHAR(150) NOT NULL,
    `invitation_token` VARCHAR(255) NOT NULL UNIQUE,
    `role_id` BIGINT NULL,
    `department_id` BIGINT NULL,
    `status` ENUM('pending', 'accepted', 'expired', 'cancelled') DEFAULT 'pending',
    `invited_by` BIGINT NOT NULL DEFAULT 1,
    `expires_at` DATETIME NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. ORGANIZATION SETTINGS
CREATE TABLE IF NOT EXISTS `organization_settings` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `org_name` VARCHAR(255) NOT NULL DEFAULT 'Z-FINANCE Enterprise',
    `tax_id` VARCHAR(100) NULL,
    `fiscal_year_start` VARCHAR(20) DEFAULT 'January',
    `max_employee_limit` INT DEFAULT 500,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
