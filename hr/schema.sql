-- Z-FINANCE 1.0.0 - Complete Human Resources, Payroll, Leave, Attendance, Recruitment & ESS Database Schema

CREATE TABLE IF NOT EXISTS job_positions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    title VARCHAR(150) NOT NULL,
    department VARCHAR(100) NOT NULL,
    description TEXT,
    vacancies INT NOT NULL DEFAULT 1,
    min_salary DECIMAL(15, 2) DEFAULT 0.00,
    max_salary DECIMAL(15, 2) DEFAULT 0.00,
    status ENUM('open', 'closed', 'on_hold') DEFAULT 'open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_tenant (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS job_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    job_position_id INT NOT NULL,
    candidate_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) DEFAULT NULL,
    resume_doc_id INT DEFAULT NULL, -- Link to EDMS
    cover_letter TEXT,
    stage ENUM('applied', 'screening', 'interview_scheduled', 'evaluated', 'offered', 'hired', 'rejected') DEFAULT 'applied',
    rating DECIMAL(3, 1) DEFAULT 0.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_position_id) REFERENCES job_positions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS interviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT NOT NULL,
    interviewer_name VARCHAR(150) NOT NULL,
    scheduled_at DATETIME NOT NULL,
    location_or_link VARCHAR(255) DEFAULT NULL,
    notes TEXT,
    score DECIMAL(3, 1) DEFAULT 0.0,
    status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
    FOREIGN KEY (application_id) REFERENCES job_applications(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS employees_hr (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    employee_code VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(50) DEFAULT NULL,
    department VARCHAR(100) NOT NULL,
    job_title VARCHAR(100) NOT NULL,
    employment_type ENUM('full_time', 'part_time', 'contractor', 'intern') DEFAULT 'full_time',
    joining_date DATE NOT NULL,
    basic_salary DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    bank_account VARCHAR(50) DEFAULT NULL,
    qr_code VARCHAR(100) DEFAULT NULL,
    biometric_id VARCHAR(100) DEFAULT NULL,
    status ENUM('active', 'probation', 'suspended', 'terminated', 'retired') DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_code (employee_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS attendance_shifts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    name VARCHAR(100) NOT NULL, -- e.g. Day Shift, Night Shift
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    grace_period_minutes INT DEFAULT 15
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    employee_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    check_in DATETIME DEFAULT NULL,
    check_out DATETIME DEFAULT NULL,
    check_in_method ENUM('manual', 'qr_code', 'biometric', 'gps_mobile') DEFAULT 'manual',
    status ENUM('present', 'late', 'absent', 'half_day', 'on_leave') DEFAULT 'present',
    work_hours DECIMAL(5, 2) DEFAULT 0.00,
    notes TEXT,
    FOREIGN KEY (employee_id) REFERENCES employees_hr(id) ON DELETE CASCADE,
    UNIQUE KEY uq_emp_date (employee_id, attendance_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS leave_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    name VARCHAR(100) NOT NULL, -- e.g. Annual, Sick, Maternity
    annual_days INT NOT NULL DEFAULT 20,
    is_paid TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS leave_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    employee_id INT NOT NULL,
    leave_type_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_days INT NOT NULL,
    reason TEXT,
    status ENUM('pending', 'approved', 'rejected', 'cancelled') DEFAULT 'pending',
    approved_by INT DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees_hr(id) ON DELETE CASCADE,
    FOREIGN KEY (leave_type_id) REFERENCES leave_types(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS payroll_periods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    period_code VARCHAR(20) NOT NULL, -- e.g. 2026-07
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('draft', 'processing', 'locked', 'paid') DEFAULT 'draft',
    processed_at DATETIME DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS payroll_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    payroll_period_id INT NOT NULL,
    employee_id INT NOT NULL,
    basic_salary DECIMAL(15, 2) NOT NULL,
    total_allowances DECIMAL(15, 2) DEFAULT 0.00,
    total_bonuses DECIMAL(15, 2) DEFAULT 0.00,
    gross_salary DECIMAL(15, 2) NOT NULL,
    total_taxes DECIMAL(15, 2) DEFAULT 0.00,
    pension_deduction DECIMAL(15, 2) DEFAULT 0.00,
    other_deductions DECIMAL(15, 2) DEFAULT 0.00,
    net_salary DECIMAL(15, 2) NOT NULL,
    payslip_pdf_doc_id INT DEFAULT NULL, -- Link to EDMS
    payment_status ENUM('unpaid', 'processing', 'paid') DEFAULT 'unpaid',
    FOREIGN KEY (payroll_period_id) REFERENCES payroll_periods(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees_hr(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS performance_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    employee_id INT NOT NULL,
    reviewer_id INT NOT NULL,
    review_period VARCHAR(50) NOT NULL, -- e.g. 2026-H1
    score DECIMAL(3, 2) NOT NULL DEFAULT 4.00,
    kpi_achievements TEXT,
    comments TEXT,
    status ENUM('draft', 'completed') DEFAULT 'completed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees_hr(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS training_courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    title VARCHAR(200) NOT NULL,
    description TEXT,
    instructor VARCHAR(150) DEFAULT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('upcoming', 'in_progress', 'completed') DEFAULT 'upcoming'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS training_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    employee_id INT NOT NULL,
    completion_status ENUM('enrolled', 'completed', 'failed') DEFAULT 'enrolled',
    score DECIMAL(5, 2) DEFAULT 0.00,
    FOREIGN KEY (course_id) REFERENCES training_courses(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees_hr(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS hr_statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL DEFAULT 'default',
    total_employees INT DEFAULT 0,
    attendance_today_count INT DEFAULT 0,
    leave_requests_count INT DEFAULT 0,
    open_positions_count INT DEFAULT 0,
    monthly_payroll_total DECIMAL(15, 2) DEFAULT 0.00,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_tenant (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
