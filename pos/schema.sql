-- Z-FINANCE 1.0.0 - Enterprise POS, Multi-Store, eCommerce & Marketplace Schema

CREATE TABLE IF NOT EXISTS stores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    store_code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    address TEXT,
    phone VARCHAR(50) DEFAULT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_tenant (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS branches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id INT NOT NULL,
    branch_name VARCHAR(150) NOT NULL,
    city VARCHAR(100) DEFAULT 'Berlin',
    is_main TINYINT(1) DEFAULT 0,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cash_registers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT NOT NULL,
    register_code VARCHAR(50) NOT NULL UNIQUE,
    register_name VARCHAR(100) NOT NULL,
    status ENUM('open', 'closed') DEFAULT 'closed',
    FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cash_register_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    register_id INT NOT NULL,
    cashier_id INT NOT NULL,
    opening_time DATETIME NOT NULL,
    closing_time DATETIME DEFAULT NULL,
    opening_balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    closing_balance DECIMAL(15, 2) DEFAULT 0.00,
    status ENUM('open', 'closed') DEFAULT 'open',
    FOREIGN KEY (register_id) REFERENCES cash_registers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    sale_number VARCHAR(50) NOT NULL UNIQUE,
    store_id INT NOT NULL,
    register_session_id INT DEFAULT NULL,
    customer_id INT DEFAULT NULL,
    total_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    tax_amount DECIMAL(15, 2) DEFAULT 0.00,
    discount_amount DECIMAL(15, 2) DEFAULT 0.00,
    net_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    payment_status ENUM('paid', 'partial', 'pending', 'refunded') DEFAULT 'paid',
    sale_type ENUM('pos', 'online', 'marketplace') DEFAULT 'pos',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sale_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sale_id INT NOT NULL,
    item_type ENUM('product', 'service') DEFAULT 'product',
    item_id INT NOT NULL,
    item_name VARCHAR(200) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    total_price DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sale_payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sale_id INT NOT NULL,
    payment_method ENUM('cash', 'card', 'mobile_money', 'bank_transfer', 'stripe', 'paypal') DEFAULT 'cash',
    amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    transaction_ref VARCHAR(100) DEFAULT NULL,
    paid_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS marketplace_vendors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    vendor_code VARCHAR(50) NOT NULL UNIQUE,
    store_name VARCHAR(200) NOT NULL,
    commission_rate DECIMAL(5, 2) DEFAULT 15.00, -- 15%
    total_payout DECIMAL(15, 2) DEFAULT 0.00,
    status ENUM('active', 'pending', 'suspended') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS commerce_statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    today_pos_sales DECIMAL(15, 2) DEFAULT 0.00,
    today_online_sales DECIMAL(15, 2) DEFAULT 0.00,
    active_stores_count INT DEFAULT 1,
    total_orders_count INT DEFAULT 0,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_tenant (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
