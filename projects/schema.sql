-- =============================================================================
-- Z-FINANCE 1.0.0 - PROJECT & TASK MANAGEMENT SCHEMA
-- Database: MySQL 8.0+ / MariaDB 10.5+
-- Engine: InnoDB | Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. PROJECT TYPES
CREATE TABLE IF NOT EXISTS `project_types` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `type_name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NULL,
    `is_active` TINYINT(1) DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. PROJECTS
CREATE TABLE IF NOT EXISTS `projects` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `project_ref` VARCHAR(50) NOT NULL,
    `project_name` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `project_type_id` BIGINT NULL,
    `customer_id` BIGINT NULL,
    `service_id` BIGINT NULL,
    `project_manager_id` BIGINT DEFAULT 1,
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,
    `deadline` DATE NOT NULL,
    `priority` ENUM('low', 'medium', 'high', 'urgent', 'critical') DEFAULT 'medium',
    `status` ENUM('draft', 'planning', 'active', 'on_hold', 'completed', 'cancelled', 'archived') DEFAULT 'active',
    `budget` DECIMAL(15,2) DEFAULT 0.00,
    `estimated_cost` DECIMAL(15,2) DEFAULT 0.00,
    `estimated_revenue` DECIMAL(15,2) DEFAULT 0.00,
    `actual_cost` DECIMAL(15,2) DEFAULT 0.00,
    `actual_revenue` DECIMAL(15,2) DEFAULT 0.00,
    `progress_percent` DECIMAL(5,2) DEFAULT 0.00,
    `notes` TEXT NULL,
    `created_by` BIGINT DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `ref_tenant` (`tenant_id`, `project_ref`),
    FOREIGN KEY (`project_type_id`) REFERENCES `project_types`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. PROJECT MEMBERS / TEAM ASSIGNMENTS
CREATE TABLE IF NOT EXISTS `project_members` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `project_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    `role` VARCHAR(100) DEFAULT 'Team Member',
    `hourly_rate` DECIMAL(10,2) DEFAULT 0.00,
    `joined_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. PROJECT TASKS
CREATE TABLE IF NOT EXISTS `project_tasks` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `project_id` BIGINT NOT NULL,
    `task_number` VARCHAR(50) NOT NULL,
    `task_title` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `assigned_to` BIGINT NULL,
    `priority` ENUM('low', 'medium', 'high', 'urgent', 'critical') DEFAULT 'medium',
    `start_date` DATE NULL,
    `deadline` DATE NULL,
    `status` ENUM('new', 'assigned', 'in_progress', 'waiting', 'review', 'completed', 'cancelled') DEFAULT 'new',
    `progress_percent` DECIMAL(5,2) DEFAULT 0.00,
    `estimated_hours` DECIMAL(8,2) DEFAULT 0.00,
    `actual_hours` DECIMAL(8,2) DEFAULT 0.00,
    `created_by` BIGINT DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. TASK COMMENTS & MENTIONS
CREATE TABLE IF NOT EXISTS `task_comments` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `task_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    `comment_text` TEXT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`task_id`) REFERENCES `project_tasks`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. TASK ATTACHMENTS
CREATE TABLE IF NOT EXISTS `task_attachments` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `task_id` BIGINT NOT NULL,
    `file_name` VARCHAR(255) NOT NULL,
    `file_path` VARCHAR(500) NOT NULL,
    `file_size` BIGINT DEFAULT 0,
    `uploaded_by` BIGINT DEFAULT 1,
    `uploaded_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`task_id`) REFERENCES `project_tasks`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. PROJECT MILESTONES
CREATE TABLE IF NOT EXISTS `project_milestones` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `project_id` BIGINT NOT NULL,
    `milestone_title` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `due_date` DATE NOT NULL,
    `status` ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
    `completed_at` DATETIME NULL,
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. PROJECT TIME TRACKING
CREATE TABLE IF NOT EXISTS `project_time_tracking` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `project_id` BIGINT NOT NULL,
    `task_id` BIGINT NULL,
    `user_id` BIGINT NOT NULL,
    `start_time` DATETIME NOT NULL,
    `end_time` DATETIME NULL,
    `duration_minutes` INT DEFAULT 0,
    `billable_rate` DECIMAL(10,2) DEFAULT 0.00,
    `is_billable` TINYINT(1) DEFAULT 1,
    `notes` TEXT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`task_id`) REFERENCES `project_tasks`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. PROJECT DOCUMENTS
CREATE TABLE IF NOT EXISTS `project_documents` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `project_id` BIGINT NOT NULL,
    `doc_title` VARCHAR(200) NOT NULL,
    `doc_type` VARCHAR(50) DEFAULT 'general',
    `file_url` VARCHAR(500) NOT NULL,
    `file_size` BIGINT DEFAULT 0,
    `uploaded_by` BIGINT DEFAULT 1,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. PROJECT STATISTICS / AGGREGATES
CREATE TABLE IF NOT EXISTS `project_statistics` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` BIGINT NOT NULL DEFAULT 1,
    `project_id` BIGINT NOT NULL,
    `total_tasks` INT DEFAULT 0,
    `completed_tasks` INT DEFAULT 0,
    `total_logged_hours` DECIMAL(10,2) DEFAULT 0.00,
    `profit_margin_percent` DECIMAL(5,2) DEFAULT 0.00,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
