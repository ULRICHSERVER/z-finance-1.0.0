-- Z-FINANCE 1.0.0 - REST API, Webhooks, SDK & Integration Platform Schema

CREATE TABLE IF NOT EXISTS api_keys (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    key_uuid VARCHAR(64) NOT NULL UNIQUE,
    key_name VARCHAR(100) NOT NULL,
    api_key_hash VARCHAR(255) NOT NULL,
    secret_hash VARCHAR(255) NOT NULL,
    environment ENUM('sandbox', 'production') DEFAULT 'sandbox',
    status ENUM('active', 'revoked', 'expired') DEFAULT 'active',
    rate_limit_per_min INT DEFAULT 1000,
    created_by INT NOT NULL DEFAULT 1,
    expires_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS api_clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    client_id VARCHAR(100) NOT NULL UNIQUE,
    client_secret_hash VARCHAR(255) NOT NULL,
    app_name VARCHAR(150) NOT NULL,
    redirect_uris JSON NULL,
    grant_types JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS api_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    access_token VARCHAR(255) NOT NULL UNIQUE,
    refresh_token VARCHAR(255) NULL UNIQUE,
    scopes JSON NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS api_permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_code VARCHAR(50) NOT NULL,
    endpoint_pattern VARCHAR(150) NOT NULL,
    http_method VARCHAR(10) NOT NULL DEFAULT 'GET',
    is_allowed TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS api_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    api_key_id INT NULL,
    endpoint VARCHAR(255) NOT NULL,
    http_method VARCHAR(10) NOT NULL,
    status_code INT NOT NULL,
    latency_ms INT NOT NULL DEFAULT 0,
    request_ip VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS api_rate_limits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    identifier VARCHAR(100) NOT NULL UNIQUE,
    request_count INT DEFAULT 1,
    window_start DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS webhooks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    webhook_uuid VARCHAR(64) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    target_url VARCHAR(255) NOT NULL,
    secret_token VARCHAR(100) NOT NULL,
    subscribed_events JSON NOT NULL,
    status ENUM('active', 'disabled', 'failed') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS webhook_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_code VARCHAR(100) NOT NULL UNIQUE,
    event_name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS webhook_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    webhook_id INT NOT NULL,
    event_code VARCHAR(100) NOT NULL,
    response_code INT DEFAULT 0,
    request_payload JSON NULL,
    response_body TEXT NULL,
    latency_ms INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (webhook_id) REFERENCES webhooks(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sdk_versions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    language VARCHAR(50) NOT NULL,
    version VARCHAR(20) NOT NULL,
    download_url VARCHAR(255) NOT NULL,
    documentation_url VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS plugin_registry (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plugin_code VARCHAR(100) NOT NULL UNIQUE,
    plugin_name VARCHAR(150) NOT NULL,
    version VARCHAR(20) NOT NULL,
    author VARCHAR(100) NOT NULL,
    status ENUM('installed', 'active', 'disabled') DEFAULT 'installed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS plugin_dependencies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plugin_id INT NOT NULL,
    dependency_code VARCHAR(100) NOT NULL,
    min_version VARCHAR(20) NOT NULL,
    FOREIGN KEY (plugin_id) REFERENCES plugin_registry(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS integration_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    integration_code VARCHAR(50) NOT NULL UNIQUE, -- mtn_momo, orange_money, stripe, flutterwave, mailgun, twilio, s3
    credentials_encrypted JSON NOT NULL,
    is_enabled TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS api_statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    metric_date DATE NOT NULL,
    total_requests INT DEFAULT 0,
    total_errors INT DEFAULT 0,
    avg_latency_ms DECIMAL(8,2) DEFAULT 0.00,
    bandwidth_mb DECIMAL(10,2) DEFAULT 0.00,
    UNIQUE KEY uq_tenant_date (tenant_id, metric_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
