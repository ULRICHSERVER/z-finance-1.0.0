-- Z-FINANCE 1.0.0 - Multi-Tenant SaaS Platform, White Label & Subscriptions Schema

CREATE TABLE IF NOT EXISTS tenants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_uuid VARCHAR(64) NOT NULL UNIQUE,
    org_name VARCHAR(150) NOT NULL,
    legal_name VARCHAR(200) NULL,
    registration_number VARCHAR(100) NULL,
    tax_number VARCHAR(100) NULL,
    owner_email VARCHAR(150) NOT NULL,
    status ENUM('active', 'suspended', 'trial', 'cancelled') DEFAULT 'active',
    country VARCHAR(100) DEFAULT 'Cameroon',
    region VARCHAR(100) DEFAULT 'CEMAC',
    timezone VARCHAR(50) DEFAULT 'Africa/Douala',
    currency VARCHAR(10) DEFAULT 'XAF',
    subdomain VARCHAR(100) NOT NULL UNIQUE,
    custom_domain VARCHAR(150) NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tenant_domains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id INT NOT NULL,
    domain_name VARCHAR(150) NOT NULL UNIQUE,
    is_verified TINYINT(1) DEFAULT 0,
    ssl_status ENUM('active', 'pending', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tenant_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id INT NOT NULL UNIQUE,
    logo_url VARCHAR(255) NULL,
    favicon_url VARCHAR(255) NULL,
    primary_color VARCHAR(10) DEFAULT '#2563eb',
    secondary_color VARCHAR(10) DEFAULT '#4f46e5',
    custom_css TEXT NULL,
    login_headline VARCHAR(255) DEFAULT 'Z-FINANCE Enterprise Portal',
    invoice_header_text TEXT NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS subscription_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plan_code VARCHAR(50) NOT NULL UNIQUE,
    plan_name VARCHAR(100) NOT NULL,
    monthly_price DECIMAL(12,2) DEFAULT 0.00,
    annual_price DECIMAL(12,2) DEFAULT 0.00,
    max_users INT DEFAULT 5,
    max_branches INT DEFAULT 1,
    max_storage_mb INT DEFAULT 5000,
    max_api_req_per_min INT DEFAULT 1000,
    features_json JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tenant_subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id INT NOT NULL UNIQUE,
    plan_id INT NOT NULL,
    billing_cycle ENUM('monthly', 'quarterly', 'annual', 'lifetime') DEFAULT 'monthly',
    status ENUM('active', 'trialing', 'past_due', 'cancelled') DEFAULT 'active',
    trial_ends_at DATETIME NULL,
    renews_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS licenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id INT NOT NULL,
    license_key VARCHAR(100) NOT NULL UNIQUE,
    type ENUM('commercial', 'trial', 'offline_desktop', 'lifetime') DEFAULT 'commercial',
    status ENUM('active', 'expired', 'revoked') DEFAULT 'active',
    offline_signature VARCHAR(255) NULL,
    expires_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS license_devices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    license_id INT NOT NULL,
    device_fingerprint VARCHAR(100) NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (license_id) REFERENCES licenses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS usage_quotas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id INT NOT NULL UNIQUE,
    current_users INT DEFAULT 1,
    current_branches INT DEFAULT 1,
    current_storage_mb DECIMAL(10,2) DEFAULT 0.00,
    current_monthly_invoices INT DEFAULT 0,
    current_monthly_api_calls INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS feature_flags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id INT NOT NULL,
    feature_key VARCHAR(100) NOT NULL,
    is_enabled TINYINT(1) DEFAULT 1,
    UNIQUE KEY uq_tenant_feat (tenant_id, feature_key),
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tenant_statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id INT NOT NULL,
    metric_date DATE NOT NULL,
    mrr_usd DECIMAL(12,2) DEFAULT 0.00,
    active_users INT DEFAULT 0,
    api_requests INT DEFAULT 0,
    UNIQUE KEY uq_tenant_stat (tenant_id, metric_date),
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tenant_backups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id INT NOT NULL,
    backup_uuid VARCHAR(64) NOT NULL UNIQUE,
    file_size_bytes BIGINT DEFAULT 0,
    file_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tenant_migrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id INT NOT NULL,
    target_region VARCHAR(100) NOT NULL,
    migration_status ENUM('pending', 'in_progress', 'completed', 'failed') DEFAULT 'pending',
    started_at DATETIME NULL,
    completed_at DATETIME NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS billing_cycles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id INT NOT NULL,
    invoice_number VARCHAR(100) NOT NULL UNIQUE,
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    payment_status ENUM('paid', 'pending', 'failed') DEFAULT 'paid',
    issued_date DATE NOT NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS saas_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS saas_statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    metric_date DATE NOT NULL UNIQUE,
    total_mrr DECIMAL(14,2) DEFAULT 0.00,
    total_arr DECIMAL(14,2) DEFAULT 0.00,
    active_tenants INT DEFAULT 0,
    churn_rate_pct DECIMAL(5,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
