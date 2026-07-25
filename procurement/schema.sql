-- Z-FINANCE 1.0.0 - Complete Procurement, Purchasing & Supplier Contracts Database Schema

CREATE TABLE IF NOT EXISTS suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    supplier_code VARCHAR(50) NOT NULL UNIQUE,
    company_name VARCHAR(255) NOT NULL,
    trade_name VARCHAR(255) DEFAULT NULL,
    tax_number VARCHAR(100) DEFAULT NULL,
    registration_number VARCHAR(100) DEFAULT NULL,
    business_type ENUM('corporation', 'llc', 'partnership', 'sole_proprietorship', 'government') DEFAULT 'corporation',
    industry VARCHAR(100) DEFAULT NULL,
    address TEXT,
    country VARCHAR(100) DEFAULT 'Germany',
    region VARCHAR(100) DEFAULT NULL,
    city VARCHAR(100) DEFAULT NULL,
    phone VARCHAR(50) DEFAULT NULL,
    mobile VARCHAR(50) DEFAULT NULL,
    email VARCHAR(150) NOT NULL,
    website VARCHAR(150) DEFAULT NULL,
    primary_contact_name VARCHAR(150) DEFAULT NULL,
    payment_terms VARCHAR(50) DEFAULT 'Net 30',
    currency VARCHAR(10) DEFAULT 'EUR',
    credit_limit DECIMAL(15, 2) DEFAULT 50000.00,
    risk_level ENUM('low', 'medium', 'high', 'critical') DEFAULT 'low',
    status ENUM('active', 'pending_approval', 'suspended', 'blacklisted') DEFAULT 'active',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_tenant (tenant_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS supplier_contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_id INT NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    job_title VARCHAR(100) DEFAULT NULL,
    email VARCHAR(150) DEFAULT NULL,
    phone VARCHAR(50) DEFAULT NULL,
    is_primary TINYINT(1) DEFAULT 0,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS supplier_bank_accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_id INT NOT NULL,
    bank_name VARCHAR(150) NOT NULL,
    account_name VARCHAR(150) NOT NULL,
    account_number VARCHAR(50) NOT NULL,
    swift_bic VARCHAR(20) DEFAULT NULL,
    iban VARCHAR(50) DEFAULT NULL,
    is_default TINYINT(1) DEFAULT 1,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS supplier_mobile_money (
    id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_id INT NOT NULL,
    provider_name VARCHAR(50) NOT NULL, -- e.g. M-Pesa, Orange Money, MTNMm
    phone_number VARCHAR(50) NOT NULL,
    registered_name VARCHAR(150) NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS purchase_requisitions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    requisition_number VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    requester_id INT NOT NULL,
    department_id INT DEFAULT NULL,
    project_id INT DEFAULT NULL,
    priority ENUM('low', 'medium', 'high', 'urgent', 'critical') DEFAULT 'medium',
    total_estimated_cost DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    status ENUM('draft', 'submitted', 'approved', 'rejected', 'converted_to_po', 'cancelled') DEFAULT 'draft',
    approval_chain TEXT, -- JSON structure
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_req_num (requisition_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS purchase_requisition_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    requisition_id INT NOT NULL,
    product_id INT DEFAULT NULL,
    item_description VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    estimated_unit_cost DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    total_estimated_cost DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (requisition_id) REFERENCES purchase_requisitions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS rfqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    rfq_number VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    requisition_id INT DEFAULT NULL,
    closing_date DATE NOT NULL,
    status ENUM('draft', 'published', 'closed', 'awarded', 'cancelled') DEFAULT 'published',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (requisition_id) REFERENCES purchase_requisitions(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS rfq_suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rfq_id INT NOT NULL,
    supplier_id INT NOT NULL,
    invited_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('invited', 'accepted', 'submitted_quotation', 'declined') DEFAULT 'invited',
    FOREIGN KEY (rfq_id) REFERENCES rfqs(id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS supplier_quotations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    quotation_number VARCHAR(50) NOT NULL UNIQUE,
    rfq_id INT NOT NULL,
    supplier_id INT NOT NULL,
    subtotal DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    tax_amount DECIMAL(15, 2) DEFAULT 0.00,
    shipping_cost DECIMAL(15, 2) DEFAULT 0.00,
    grand_total DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    delivery_lead_time_days INT DEFAULT 7,
    validity_date DATE DEFAULT NULL,
    warranty_terms VARCHAR(255) DEFAULT NULL,
    status ENUM('under_review', 'awarded', 'rejected') DEFAULT 'under_review',
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rfq_id) REFERENCES rfqs(id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS purchase_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    po_number VARCHAR(50) NOT NULL UNIQUE,
    supplier_id INT NOT NULL,
    quotation_id INT DEFAULT NULL,
    requisition_id INT DEFAULT NULL,
    warehouse_id INT DEFAULT NULL,
    delivery_address TEXT,
    subtotal DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    tax_amount DECIMAL(15, 2) DEFAULT 0.00,
    shipping_cost DECIMAL(15, 2) DEFAULT 0.00,
    grand_total DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    expected_delivery_date DATE NOT NULL,
    terms_and_conditions TEXT,
    digital_signature_hash VARCHAR(255) DEFAULT NULL,
    status ENUM('draft', 'pending_approval', 'approved', 'sent', 'accepted', 'partially_received', 'fully_received', 'closed', 'cancelled') DEFAULT 'draft',
    created_by INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE,
    INDEX idx_po_num (po_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS purchase_order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    po_id INT NOT NULL,
    product_id INT DEFAULT NULL,
    item_description VARCHAR(255) NOT NULL,
    ordered_quantity INT NOT NULL,
    received_quantity INT DEFAULT 0,
    unit_price DECIMAL(15, 2) NOT NULL,
    discount_amount DECIMAL(15, 2) DEFAULT 0.00,
    line_total DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY (po_id) REFERENCES purchase_orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS goods_receipts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    grn_number VARCHAR(50) NOT NULL UNIQUE,
    po_id INT NOT NULL,
    warehouse_id INT NOT NULL,
    received_date DATE NOT NULL,
    received_by INT NOT NULL,
    quality_inspection_status ENUM('passed', 'partially_failed', 'rejected') DEFAULT 'passed',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (po_id) REFERENCES purchase_orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS purchase_invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    supplier_id INT NOT NULL,
    po_id INT DEFAULT NULL,
    grn_id INT DEFAULT NULL,
    invoice_date DATE NOT NULL,
    due_date DATE NOT NULL,
    subtotal DECIMAL(15, 2) NOT NULL,
    tax_amount DECIMAL(15, 2) DEFAULT 0.00,
    total_amount DECIMAL(15, 2) NOT NULL,
    matching_status ENUM('3_way_matched', 'discrepancy_detected', 'pending_match') DEFAULT '3_way_matched',
    payment_status ENUM('unpaid', 'partially_paid', 'paid') DEFAULT 'unpaid',
    journal_entry_id INT DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS supplier_contracts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    contract_number VARCHAR(50) NOT NULL UNIQUE,
    supplier_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    contract_type ENUM('framework', 'service', 'maintenance', 'supply') DEFAULT 'framework',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_contract_value DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    auto_renewal TINYINT(1) DEFAULT 0,
    status ENUM('active', 'under_review', 'expired', 'terminated') DEFAULT 'active',
    digital_signature_hash VARCHAR(255) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS supplier_performance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    supplier_id INT NOT NULL,
    evaluation_period VARCHAR(20) NOT NULL, -- e.g. 2026-Q2
    delivery_score DECIMAL(5, 2) DEFAULT 100.00,
    quality_score DECIMAL(5, 2) DEFAULT 100.00,
    response_time_score DECIMAL(5, 2) DEFAULT 100.00,
    price_competitiveness_score DECIMAL(5, 2) DEFAULT 100.00,
    overall_rating DECIMAL(5, 2) DEFAULT 100.00,
    comments TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS procurement_statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    total_suppliers INT DEFAULT 0,
    pending_requisitions INT DEFAULT 0,
    active_pos INT DEFAULT 0,
    total_procurement_spend DECIMAL(15, 2) DEFAULT 0.00,
    procurement_savings DECIMAL(15, 2) DEFAULT 0.00,
    expiring_contracts_count INT DEFAULT 0,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_tenant (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
