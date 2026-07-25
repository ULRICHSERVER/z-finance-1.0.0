# Z-FINANCE 1.0.0 — Income Security & Data Isolation Guide

## Security Standards

### 1. Multi-Tenant Data Isolation
- Every query automatically enforces `WHERE tenant_id = :tenant_id` via the PDO database wrapper.
- Cross-tenant data leakage is prevented at the database driver layer.

### 2. SQL Injection Prevention
- All database interactions use strict **PDO Prepared Statements** with parameterized inputs.
- Emulated prepares are disabled (`PDO::ATTR_EMULATE_PREPARES = false`).

### 3. CSRF & XSS Shielding
- Form submissions require a cryptographically secure 256-bit token generated via `random_bytes(32)`.
- All output rendering undergoes strict `htmlspecialchars(..., ENT_QUOTES, 'UTF-8')` escaping.

### 4. Secure File Attachments
- Attachment uploads undergo strict MIME-type validation (PDF, PNG, JPG, DOCX).
- Files are assigned random UUID filenames and stored outside the web root or with execution prevention rules (`.htaccess` / Nginx location blocks).

### 5. Role-Based Access Control (RBAC)
- **Super Admin**: Full module access, schema updates, audit logs, soft-delete restoration.
- **Manager / Accountant**: Create/edit income, generate reports, process payments.
- **Standard User**: View allowed transactions, submit receipts.
