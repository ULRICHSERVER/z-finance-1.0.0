-- Z-FINANCE 1.0.0 - System Optimization, DevOps & Deployment Schema

CREATE TABLE IF NOT EXISTS system_versions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    version_code VARCHAR(50) NOT NULL UNIQUE,
    release_name VARCHAR(150) NOT NULL,
    database_version INT NOT NULL,
    installed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS deployment_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    deploy_uuid VARCHAR(64) NOT NULL UNIQUE,
    environment ENUM('production', 'staging', 'development') DEFAULT 'production',
    deployed_by INT DEFAULT 1,
    status ENUM('success', 'failed', 'rolled_back', 'in_progress') DEFAULT 'success',
    changelog_summary TEXT NULL,
    deployed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS release_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL UNIQUE,
    commit_hash VARCHAR(100) NULL,
    release_notes TEXT NULL,
    is_production_ready TINYINT(1) DEFAULT 1,
    released_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cache_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cache_driver ENUM('file', 'redis', 'memcached') DEFAULT 'file',
    redis_host VARCHAR(100) DEFAULT '127.0.0.1',
    redis_port INT DEFAULT 6379,
    query_cache_ttl INT DEFAULT 3600,
    route_cache_enabled TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS maintenance_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    is_maintenance_active TINYINT(1) DEFAULT 0,
    custom_message TEXT NULL,
    allowed_ips TEXT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS health_checks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    check_type VARCHAR(100) NOT NULL,
    status ENUM('healthy', 'warning', 'critical') DEFAULT 'healthy',
    response_time_ms INT DEFAULT 15,
    details_json JSON NULL,
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS diagnostic_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_uuid VARCHAR(64) NOT NULL UNIQUE,
    slow_queries_count INT DEFAULT 0,
    memory_peak_mb DECIMAL(8,2) DEFAULT 0.00,
    recommendations_json JSON NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS optimization_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action_performed VARCHAR(150) NOT NULL,
    freed_memory_mb DECIMAL(8,2) DEFAULT 0.00,
    executed_by INT DEFAULT 1,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS testing_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    suite_uuid VARCHAR(64) NOT NULL UNIQUE,
    unit_tests_passed INT DEFAULT 0,
    integration_tests_passed INT DEFAULT 0,
    failed_tests INT DEFAULT 0,
    coverage_pct DECIMAL(5,2) DEFAULT 95.50,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ci_cd_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    auto_deploy_enabled TINYINT(1) DEFAULT 1,
    webhook_secret VARCHAR(100) NULL,
    target_branch VARCHAR(50) DEFAULT 'main'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
