-- Z-FINANCE 1.0.0 - AI & Business Intelligence Database Schema

CREATE TABLE IF NOT EXISTS ai_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    provider VARCHAR(50) NOT NULL DEFAULT 'google_ai', -- google_ai, openai, local_model, custom
    active_model VARCHAR(100) NOT NULL DEFAULT 'gemini-3.6-flash',
    api_key_encrypted TEXT NULL,
    max_tokens INT NOT NULL DEFAULT 4096,
    temperature DECIMAL(3,2) NOT NULL DEFAULT 0.70,
    is_enabled TINYINT(1) NOT NULL DEFAULT 1,
    voice_assistant_enabled TINYINT(1) NOT NULL DEFAULT 1,
    ocr_enabled TINYINT(1) NOT NULL DEFAULT 1,
    auto_insight_frequency VARCHAR(20) NOT NULL DEFAULT 'daily',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_tenant_setting (tenant_id)
);

CREATE TABLE IF NOT EXISTS ai_models (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model_code VARCHAR(100) NOT NULL UNIQUE,
    model_name VARCHAR(150) NOT NULL,
    provider VARCHAR(50) NOT NULL,
    capabilities JSON NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    cost_per_1k_tokens DECIMAL(10,6) NOT NULL DEFAULT 0.000000,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    conversation_uuid VARCHAR(64) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL DEFAULT 'Financial Assistant Chat',
    context_type VARCHAR(50) NOT NULL DEFAULT 'general', -- financial, crm, inventory, hrms, documents
    language VARCHAR(10) NOT NULL DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conversation_id INT NOT NULL,
    sender_type ENUM('user', 'assistant', 'system') NOT NULL,
    message_text TEXT NOT NULL,
    metadata JSON NULL,
    tokens_used INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES ai_conversations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ai_permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    role_id INT NOT NULL,
    can_use_chat TINYINT(1) NOT NULL DEFAULT 1,
    can_access_financial_ai TINYINT(1) NOT NULL DEFAULT 1,
    can_access_hr_ai TINYINT(1) NOT NULL DEFAULT 0,
    can_access_document_ai TINYINT(1) NOT NULL DEFAULT 1,
    daily_token_limit INT NOT NULL DEFAULT 100000,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_usage_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    user_id INT NOT NULL,
    feature_used VARCHAR(50) NOT NULL,
    tokens_consumed INT NOT NULL DEFAULT 0,
    response_time_ms INT NOT NULL DEFAULT 0,
    status_code VARCHAR(20) NOT NULL DEFAULT '200',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_insights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    category VARCHAR(50) NOT NULL, -- sales, expense, cashflow, inventory, employee, project
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    impact_level ENUM('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium',
    action_recommended TEXT NOT NULL,
    is_dismissed TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_predictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    metric_type VARCHAR(50) NOT NULL, -- revenue, expense, cashflow, inventory_demand, customer_growth
    forecast_period VARCHAR(20) NOT NULL, -- 30d, 90d, 1y
    current_value DECIMAL(15,2) NOT NULL,
    predicted_value DECIMAL(15,2) NOT NULL,
    confidence_score DECIMAL(5,2) NOT NULL DEFAULT 85.50,
    factors_json JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_automation_rules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    rule_name VARCHAR(150) NOT NULL,
    trigger_event VARCHAR(100) NOT NULL, -- unusual_expense, low_stock, late_payment, invoice_upload
    action_type VARCHAR(100) NOT NULL, -- generate_report, send_alert, auto_categorize, notify_admin
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_knowledge_base (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    category VARCHAR(50) NOT NULL DEFAULT 'business', -- business, faq, document_template, accounting_rules
    topic VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    vector_embedding_status ENUM('pending', 'indexed', 'failed') DEFAULT 'indexed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL DEFAULT 'default',
    user_id INT NOT NULL,
    action_taken VARCHAR(100) NOT NULL,
    details TEXT NULL,
    ip_address VARCHAR(45) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
