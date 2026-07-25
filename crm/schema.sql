-- Z-FINANCE 1.0.0 - Complete CRM, Sales Pipeline, Subscriptions, Memberships, Loyalty, Affiliates, Support & Marketing Schema

CREATE TABLE IF NOT EXISTS lead_sources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    name VARCHAR(100) NOT NULL, -- Website, Social Media, Cold Call, Referral
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    lead_code VARCHAR(50) NOT NULL UNIQUE,
    contact_name VARCHAR(150) NOT NULL,
    company_name VARCHAR(150) DEFAULT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) DEFAULT NULL,
    source_id INT DEFAULT NULL,
    lead_score INT DEFAULT 10,
    status ENUM('new', 'contacted', 'qualified', 'proposal', 'converted', 'lost') DEFAULT 'new',
    assigned_to INT DEFAULT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_tenant (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    customer_code VARCHAR(50) NOT NULL UNIQUE,
    company_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(150) DEFAULT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) DEFAULT NULL,
    website VARCHAR(150) DEFAULT NULL,
    address TEXT,
    country VARCHAR(100) DEFAULT 'Germany',
    tax_number VARCHAR(100) DEFAULT NULL,
    industry VARCHAR(100) DEFAULT 'Enterprise',
    category ENUM('standard', 'vip', 'wholesale', 'partner') DEFAULT 'standard',
    credit_limit DECIMAL(15, 2) DEFAULT 10000.00,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_code (customer_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sales_opportunities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    opportunity_name VARCHAR(255) NOT NULL,
    customer_id INT NOT NULL,
    stage ENUM('lead', 'qualified', 'proposal', 'negotiation', 'won', 'lost', 'cancelled') DEFAULT 'lead',
    amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    probability INT DEFAULT 50, -- Percentage
    expected_close_date DATE NOT NULL,
    assigned_to INT DEFAULT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS subscription_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    billing_cycle ENUM('free', 'trial', 'monthly', 'quarterly', 'semi_annual', 'annual', 'lifetime') DEFAULT 'monthly',
    price DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    features JSON DEFAULT NULL,
    status ENUM('active', 'archived') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    subscription_number VARCHAR(50) NOT NULL UNIQUE,
    customer_id INT NOT NULL,
    plan_id INT NOT NULL,
    start_date DATE NOT NULL,
    next_billing_date DATE NOT NULL,
    status ENUM('active', 'paused', 'cancelled', 'expired') DEFAULT 'active',
    auto_renew TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS membership_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    title VARCHAR(100) NOT NULL, -- Individual, Business, Premium, VIP
    annual_fee DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    perks TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS memberships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    membership_card_code VARCHAR(50) NOT NULL UNIQUE,
    customer_id INT NOT NULL,
    type_id INT NOT NULL,
    expiry_date DATE NOT NULL,
    status ENUM('active', 'expired', 'renewed') DEFAULT 'active',
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES membership_types(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS loyalty_accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    customer_id INT NOT NULL UNIQUE,
    current_points INT DEFAULT 0,
    tier ENUM('bronze', 'silver', 'gold', 'platinum') DEFAULT 'bronze',
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS affiliate_accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    affiliate_code VARCHAR(50) NOT NULL UNIQUE,
    customer_id INT NOT NULL,
    commission_rate DECIMAL(5, 2) DEFAULT 10.00, -- 10%
    total_earnings DECIMAL(15, 2) DEFAULT 0.00,
    payout_details TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS support_tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    ticket_number VARCHAR(50) NOT NULL UNIQUE,
    customer_id INT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    category ENUM('billing', 'technical', 'sales', 'general') DEFAULT 'technical',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
    assigned_agent INT DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS marketing_campaigns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    name VARCHAR(200) NOT NULL,
    type ENUM('email', 'sms', 'push', 'whatsapp') DEFAULT 'email',
    scheduled_at DATETIME DEFAULT NULL,
    status ENUM('draft', 'scheduled', 'running', 'completed') DEFAULT 'draft',
    sent_count INT DEFAULT 0,
    open_rate DECIMAL(5, 2) DEFAULT 0.00,
    click_rate DECIMAL(5, 2) DEFAULT 0.00,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS crm_statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    total_leads INT DEFAULT 0,
    active_customers INT DEFAULT 0,
    pipeline_value DECIMAL(15, 2) DEFAULT 0.00,
    active_subscriptions INT DEFAULT 0,
    open_tickets INT DEFAULT 0,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_tenant (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
