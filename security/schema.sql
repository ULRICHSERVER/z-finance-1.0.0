-- Z-FINANCE 1.0.0 - Advanced Security Center, Compliance & System Health Schema

CREATE TABLE IF NOT EXISTS security_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    event_uuid VARCHAR(64) NOT NULL UNIQUE,
    event_type VARCHAR(100) NOT NULL, -- brute_force, suspicious_login, impossible_travel, privilege_escalation
    severity ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    description TEXT NOT NULL,
    ip_address VARCHAR(45) NULL,
    user_id INT NULL,
    device_id VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS security_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    threat_level ENUM('normal', 'elevated', 'high', 'lockdown') DEFAULT 'normal',
    mfa_enforced TINYINT(1) DEFAULT 1,
    ip_whitelisting_enabled TINYINT(1) DEFAULT 0,
    max_login_attempts INT DEFAULT 5,
    lockout_duration_minutes INT DEFAULT 15,
    session_timeout_minutes INT DEFAULT 30,
    aes_encryption_active TINYINT(1) DEFAULT 1,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_tenant_sec (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS mfa_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    totp_secret VARCHAR(100) NULL,
    is_mfa_enabled TINYINT(1) DEFAULT 0,
    recovery_codes_json JSON NULL,
    last_verified_at DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS trusted_devices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    device_fingerprint VARCHAR(100) NOT NULL,
    device_name VARCHAR(150) NOT NULL,
    ip_address VARCHAR(45) NULL,
    is_trusted TINYINT(1) DEFAULT 1,
    last_used_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(128) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT NULL,
    status ENUM('active', 'expired', 'revoked') DEFAULT 'active',
    last_activity DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    user_id INT NOT NULL DEFAULT 1,
    action_code VARCHAR(100) NOT NULL, -- record_creation, modification, deletion, approval, export
    module_code VARCHAR(50) NOT NULL,
    target_resource VARCHAR(150) NULL,
    ip_address VARCHAR(45) NULL,
    details_json JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS forensic_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    log_uuid VARCHAR(64) NOT NULL UNIQUE,
    risk_score INT DEFAULT 0,
    anomaly_flag VARCHAR(100) NULL,
    payload_dump TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blocked_ips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL UNIQUE,
    reason VARCHAR(255) NOT NULL,
    blocked_by INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blocked_devices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    device_fingerprint VARCHAR(100) NOT NULL UNIQUE,
    reason VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS password_policies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    min_length INT DEFAULT 12,
    require_uppercase TINYINT(1) DEFAULT 1,
    require_numeric TINYINT(1) DEFAULT 1,
    require_special TINYINT(1) DEFAULT 1,
    max_age_days INT DEFAULT 90,
    UNIQUE KEY uq_tenant_pwd (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS compliance_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    gdpr_enabled TINYINT(1) DEFAULT 1,
    data_retention_years INT DEFAULT 7,
    auto_anonymization TINYINT(1) DEFAULT 1,
    consent_management_active TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS consent_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    consent_type VARCHAR(100) NOT NULL,
    granted TINYINT(1) DEFAULT 1,
    granted_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS backup_jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_uuid VARCHAR(64) NOT NULL UNIQUE,
    backup_type ENUM('full', 'incremental', 'differential') DEFAULT 'full',
    file_path VARCHAR(255) NOT NULL,
    file_size_bytes BIGINT DEFAULT 0,
    encryption_key_fingerprint VARCHAR(100) NULL,
    status ENUM('completed', 'failed', 'in_progress') DEFAULT 'completed',
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS restore_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    backup_job_id INT NOT NULL,
    restored_by INT NOT NULL,
    restore_status ENUM('success', 'failed') DEFAULT 'success',
    performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (backup_job_id) REFERENCES backup_jobs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS system_health (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cpu_usage_pct DECIMAL(5,2) DEFAULT 0.00,
    memory_usage_pct DECIMAL(5,2) DEFAULT 0.00,
    disk_usage_pct DECIMAL(5,2) DEFAULT 0.00,
    db_connections_active INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
