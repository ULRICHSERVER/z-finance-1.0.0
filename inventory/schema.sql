-- Z-FINANCE 1.0.0 - Complete Inventory, Asset, Warehouse & Maintenance Database Schema

CREATE TABLE IF NOT EXISTS product_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    name VARCHAR(100) NOT NULL,
    description TEXT,
    code VARCHAR(50) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_tenant (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS product_units (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    name VARCHAR(50) NOT NULL, -- e.g. Pieces, Box, Kg, Liters, Hours
    abbreviation VARCHAR(10) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS warehouses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    address TEXT,
    city VARCHAR(100) DEFAULT NULL,
    country VARCHAR(100) DEFAULT NULL,
    manager_id INT DEFAULT NULL,
    capacity_sqm DECIMAL(12, 2) DEFAULT 0.00,
    status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_tenant (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS warehouse_locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    warehouse_id INT NOT NULL,
    aisle VARCHAR(20) DEFAULT NULL,
    shelf VARCHAR(20) DEFAULT NULL,
    bin VARCHAR(20) DEFAULT NULL,
    code VARCHAR(50) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id) ON DELETE CASCADE,
    INDEX idx_wh_loc (warehouse_id, code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    product_code VARCHAR(50) NOT NULL UNIQUE,
    sku VARCHAR(100) NOT NULL UNIQUE,
    barcode VARCHAR(100) DEFAULT NULL,
    qr_code VARCHAR(100) DEFAULT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT DEFAULT NULL,
    product_type ENUM('inventory_item', 'service_item', 'asset', 'equipment', 'tool', 'vehicle', 'consumable', 'rental', 'digital_asset') NOT NULL DEFAULT 'inventory_item',
    brand VARCHAR(100) DEFAULT NULL,
    model VARCHAR(100) DEFAULT NULL,
    serial_number VARCHAR(100) DEFAULT NULL,
    unit_id INT DEFAULT NULL,
    supplier_id INT DEFAULT NULL,
    default_warehouse_id INT DEFAULT NULL,
    cost_price DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    selling_price DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    minimum_stock INT NOT NULL DEFAULT 10,
    maximum_stock INT NOT NULL DEFAULT 1000,
    current_stock INT NOT NULL DEFAULT 0,
    tax_rate DECIMAL(5, 2) DEFAULT 0.00,
    valuation_method ENUM('FIFO', 'LIFO', 'WEIGHTED_AVERAGE', 'STANDARD_COST') DEFAULT 'FIFO',
    status ENUM('active', 'discontinued', 'out_of_stock') DEFAULT 'active',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES product_categories(id) ON DELETE SET NULL,
    FOREIGN KEY (default_warehouse_id) REFERENCES warehouses(id) ON DELETE SET NULL,
    INDEX idx_sku_barcode (sku, barcode),
    INDEX idx_type_status (product_type, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS inventory_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    product_id INT NOT NULL,
    warehouse_id INT NOT NULL,
    transaction_type ENUM('stock_in', 'stock_out', 'transfer', 'adjustment', 'return', 'damage', 'loss', 'consumption', 'reservation') NOT NULL,
    quantity INT NOT NULL,
    unit_cost DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    total_value DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    reference_module VARCHAR(50) DEFAULT 'manual', -- e.g. expense, project, task, invoice
    reference_id INT DEFAULT NULL,
    notes TEXT,
    created_by INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id) ON DELETE CASCADE,
    INDEX idx_prod_wh (product_id, warehouse_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS inventory_adjustments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    adjustment_number VARCHAR(50) NOT NULL UNIQUE,
    warehouse_id INT NOT NULL,
    reason_code VARCHAR(100) NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    notes TEXT,
    approved_by INT DEFAULT NULL,
    created_by INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    asset_number VARCHAR(50) NOT NULL UNIQUE,
    product_id INT DEFAULT NULL,
    name VARCHAR(255) NOT NULL,
    asset_type ENUM('office_equipment', 'it_equipment', 'machines', 'furniture', 'vehicle', 'laboratory', 'training', 'other') NOT NULL DEFAULT 'it_equipment',
    purchase_date DATE NOT NULL,
    purchase_cost DECIMAL(15, 2) NOT NULL,
    current_value DECIMAL(15, 2) NOT NULL,
    salvage_value DECIMAL(15, 2) DEFAULT 0.00,
    useful_life_years INT NOT NULL DEFAULT 5,
    depreciation_method ENUM('straight_line', 'declining_balance', 'units_of_production', 'custom') DEFAULT 'straight_line',
    assigned_employee_id INT DEFAULT NULL,
    assigned_project_id INT DEFAULT NULL,
    assigned_department_id INT DEFAULT NULL,
    warehouse_id INT DEFAULT NULL,
    condition_status ENUM('excellent', 'good', 'fair', 'needs_repair', 'scrapped') DEFAULT 'good',
    warranty_expiry DATE DEFAULT NULL,
    status ENUM('in_use', 'available', 'under_maintenance', 'disposed', 'written_off') DEFAULT 'available',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_asset_status (status, asset_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS asset_depreciation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_id INT NOT NULL,
    fiscal_year INT NOT NULL,
    period_month INT NOT NULL,
    beginning_value DECIMAL(15, 2) NOT NULL,
    depreciation_amount DECIMAL(15, 2) NOT NULL,
    ending_value DECIMAL(15, 2) NOT NULL,
    journal_entry_id INT DEFAULT NULL, -- Link to Accounting module
    posted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS maintenance_schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    asset_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    maintenance_type ENUM('preventive', 'corrective', 'inspection', 'repair', 'calibration') NOT NULL DEFAULT 'preventive',
    frequency_days INT DEFAULT 90,
    last_maintenance_date DATE DEFAULT NULL,
    next_maintenance_date DATE NOT NULL,
    assigned_technician VARCHAR(150) DEFAULT NULL,
    estimated_cost DECIMAL(15, 2) DEFAULT 0.00,
    status ENUM('scheduled', 'in_progress', 'completed', 'overdue', 'cancelled') DEFAULT 'scheduled',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE,
    INDEX idx_maint_date (next_maintenance_date, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS barcode_labels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT DEFAULT NULL,
    asset_id INT DEFAULT NULL,
    label_type ENUM('barcode_128', 'qr_code', 'datamatrix') NOT NULL DEFAULT 'qr_code',
    code_value VARCHAR(255) NOT NULL UNIQUE,
    print_count INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS inventory_statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    total_products INT DEFAULT 0,
    total_stock_count INT DEFAULT 0,
    total_inventory_value DECIMAL(15, 2) DEFAULT 0.00,
    total_assets_value DECIMAL(15, 2) DEFAULT 0.00,
    low_stock_count INT DEFAULT 0,
    out_of_stock_count INT DEFAULT 0,
    maintenance_due_count INT DEFAULT 0,
    last_calculated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_tenant (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
