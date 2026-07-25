# Z-FINANCE 1.0.0 — Enterprise Financial Management Suite

Z-FINANCE 1.0.0 is an enterprise-grade financial management platform engineered for PHP 8.2+, MySQL, Bootstrap 5, and modern web environments.

---

## 🌐 Module: Multi-Tenant SaaS Platform, White Label, Licensing & Subscription Infrastructure (`/modules/saas/`, `/modules/tenants/`, `/modules/white_label/`, `/modules/licenses/`, `/modules/subscriptions/`)

A commercial SaaS platform serving unlimited independent organizations with complete tenant isolation, white-label branding, and cryptographic licensing.

### Key SaaS Platform Features
- **Multi-Tenant Data Isolation**: Row-level tenant ID, workspace, and branch data partitioning.
- **White-Label Customization**: Custom subdomains, vanity domains, primary/secondary brand colors, custom CSS, and branded invoice headers.
- **Subscription Billing Engine**: Starter, Professional, and Enterprise Unlimited tiers with monthly, annual, and lifetime billing.
- **Cryptographic License Verification**: SHA-256 HMAC license key generation for online and offline hybrid desktop/mobile deployments.
- **Usage Quotas & Feature Flags**: Feature access toggles and quota limits by plan tier.
- **SaaS Analytics**: MRR, ARR, Churn Rate, and Retention Rate telemetry dashboard.

---

## 🛡️ Module: Security Operations Center, Compliance, Backup & Health Platform (`/modules/security/`, `/modules/backups/`, `/modules/compliance/`, `/modules/system_health/`, `/modules/audit/`)

An enterprise-grade Security Operations Center (SOC) protecting financial data, users, sessions, APIs, AI models, and infrastructure.

### Key Security & SOC Features
- **SOC Threat Governance**: Real-time security score dashboard, dynamic threat level switching, and IP blacklisting.
- **Session & Device Controls**: Device fingerprinting with instant remote session revocation.
- **AES-256 Field Encryption**: Application-level cryptographic vault for sensitive user data.
- **Encrypted Backups & Disaster Recovery**: On-demand and scheduled full/incremental database backups with point-in-time recovery.
- **GDPR & Compliance Framework**: Right to be forgotten, automated data retention, and consent management.
- **Real-Time Telemetry**: Live CPU, Memory, Disk, and connection pool health monitoring.

---

## 🔌 Module: REST API, Webhooks, SDK & Third-Party Integration Platform (`/api/`, `/modules/api/`, `/modules/webhooks/`, `/modules/integrations/`, `/modules/developer/`, `/modules/plugins/`)

An enterprise integration platform enabling secure RESTful communication with mobile apps, websites, payment gateways, banks, mobile money providers, and ERP systems.

### Key Integration Platform Features
- **REST API Gateway (`/api/v1/`)**: Versioned JSON API with JWT Bearer authentication, API Key secret hashing, and IP rate limiting.
- **OpenAPI 3.1 & Interactive Swagger**: Auto-generated OpenAPI JSON specification with live interactive testing.
- **Webhook Dispatch Engine**: Asynchronous HMAC-SHA256 event dispatching for invoice payments, disbursements, and inventory triggers.
- **Pre-Built Gateways**: Native connectors for MTN Mobile Money, Orange Money, PayUnit, Flutterwave, Stripe, PayPal, Twilio, and AWS S3.
- **Client SDKs**: Pre-packaged client libraries for PHP, TypeScript, Python, Android Kotlin, Flutter, and React Native.
- **Plugin Registry**: Sandboxed extension marketplace for custom tax calculators and corporate crypto treasury sync.

---

## 🔄 Module: Workflow Automation, Rules Engine & Scheduler (`/modules/workflows/`, `/modules/automation/`, `/modules/rules_engine/`, `/modules/scheduler/`)

An enterprise process orchestration system supporting drag-and-drop visual workflow building, conditional decision evaluation, multi-level approvals, cron scheduling, and dead-letter queue management.

### Key Workflow & Automation Features
- **Visual Diagram Builder**: Drag-and-drop visual workflow canvas supporting triggers, conditions, actions, and approvals.
- **Triggers & Rules Engine**: Event-driven execution on Invoice creation, Stock threshold breach, Expense logs, Payroll cycles, and Custom Webhooks.
- **Multi-Level Approval Inbox**: Hierarchical approval routing (Department Head -> Finance -> Executive Director) with timeout escalations.
- **Cron Scheduler & Queue Workers**: Flexible job schedule management (Hourly, Daily, Weekly, Custom Cron) backed by dead-letter queues.
- **Super Admin Governance**: Queue worker concurrency tuning, offline action synchronization, and advertisement banner placement management.

---

## 🤖 Module: AI Assistant, Business Intelligence & Smart Automation (`/modules/ai/`, `/modules/business_intelligence/`, `/modules/automation/`)

An integrated Artificial Intelligence and Business Intelligence platform powered by Google Gemini AI (gemini-3.6-flash / gemini-3.1-pro) providing context-aware financial assistance, machine learning forecasting, Document AI OCR, smart alert rules, and Super Admin AI governance.

### Key AI & BI Features
- **AI Chat Assistant**: Context-aware queries across General Ledger, Invoices, CRM Pipelines, HR Workforce Data, and Inventory with Web Speech voice support.
- **Predictive Machine Learning**: 30-day/90-day/1-year forecasting models for Revenue, Expenses, Cash Flow, Inventory Demand, and Customer Growth.
- **Document AI & OCR**: Optical character recognition for automatic invoice, receipt, and contract data extraction and General Ledger account matching.
- **Smart Event Automation**: Trigger-action rules for unusual expense detection, low stock reorder alerts, and scheduled PDF report delivery.
- **Super Admin Governance**: Multi-provider configuration (Google AI, OpenAI, Local Models), token quotas, role permissions, and advertisement banner placement management.

---

## 🛒 Module: Unified Point of Sale, Multi-Store, eCommerce & Multi-Vendor Marketplace (`/modules/pos/`, `/modules/ecommerce/`, `/modules/marketplace/`, `/modules/orders/`, `/modules/delivery/`)

A unified commerce suite supporting physical POS terminals, online store checkout, service booking, delivery fleet dispatch, and multi-vendor marketplace management fully integrated with Inventory, Billing, Accounting, CRM, EDMS, and AI Assistant.

### Key Commerce Features
- **Touchscreen & Barcode POS**: Touch cashier interface, fast barcode/QR scanning, split payments, and offline sale queueing.
- **Cash Register & Shift Management**: Cash drawer opening/closing counts, float tracking, and shift reconciliation.
- **Multi-Store & Branch Network**: Multi-branch stock management, inter-store stock transfer requests, and store manager overrides.
- **eCommerce & Service Bookings**: Web storefront catalog with live stock sync and online appointment booking.
- **Delivery Fleet & Marketplace**: Delivery zone dispatch, driver assignment, and multi-vendor platform commission processing.

---

## 🤝 Module: Complete CRM, Sales Pipeline, Subscriptions, Memberships, Loyalty, Affiliates, Support & Marketing Automation (`/modules/crm/`, `/modules/sales/`, `/modules/subscriptions/`, `/modules/memberships/`, `/modules/loyalty/`, `/modules/affiliates/`, `/modules/support/`, `/modules/marketing/`)

An enterprise CRM ecosystem managing the entire customer journey from lead capture to long-term retention, fully integrated with Billing, Accounting, HRMS, Projects, Communication, EDMS, Analytics, and AI Assistant.

### Key CRM Features
- **Lead Prospecting & AI Scoring**: Automated lead capture, score generation, and lead-to-opportunity conversion.
- **Customer 360° Management**: Complete directory, multi-contact management, credit limit tracking, and customer category rules.
- **Visual Sales Pipeline**: Deal stage tracking (Lead -> Qualified -> Proposal -> Negotiation -> Won/Lost) with win probability forecasting.
- **Recurring Subscriptions**: Support for Free, Trial, Monthly, Annual, and Lifetime SaaS plans with automated billing.
- **VIP Memberships & Loyalty**: Digital membership cards, tier levels (Bronze to Platinum), and points redemption vouchers.
- **Affiliate Program & Support Helpdesk**: Partner commission tracking and SLA-backed support ticket handling.

---

## 👥 Module: Complete Human Resources, Payroll, Leave, Attendance, Recruitment & Employee Self-Service System (`/modules/hr/`, `/modules/payroll/`, `/modules/attendance/`, `/modules/recruitment/`, `/modules/training/`, `/modules/leave/`, `/modules/ess/`)

An enterprise HRMS, payroll calculation, QR/Biometric attendance tracking, recruitment applicant tracking, leave management, and Employee Self-Service system fully integrated with Accounting, Projects, Communication, Calendar, EDMS, Procurement, Analytics and AI Assistant.

### Key HRMS & Payroll Features
- **Employee Lifecycle Management**: End-to-end management from recruitment, onboarding, probation, promotion, transfer, to offboarding and exit interviews.
- **Recruitment ATS & Vacancies**: Candidate pipeline tracking, interview scoring, and offer letter generation.
- **QR & Biometric Attendance**: Scan-to-check-in, work shift rotas, late arrival logging, and offline attendance queuing.
- **Leave Management & Workflows**: Multi-tier approval workflows, leave balances, and auto-sync with master calendar.
- **Bulk Payroll & General Ledger Integration**: Automated gross-to-net salary calculation, statutory tax & pension deductions, automated General Ledger journal posting, and PDF payslips.
- **Employee Self-Service (ESS)**: Portal for employees to download payslips, request leave, and access personal attendance QR codes.

---

## 🛍️ Module: Complete Procurement, Purchasing, Supplier Contracts & Vendor Management System (`/modules/procurement/`, `/modules/suppliers/`, `/modules/purchase_orders/`, `/modules/rfq/`, `/modules/contracts/`)

An enterprise procurement, competitive bidding, purchase order, 3-way invoice matching, and supplier SLA contract management system fully integrated with Inventory, Accounting, Expenses, Projects, Services, and EDMS.

### Key Procurement Features
- **Supplier & Vendor Management**: Full vendor registration, qualification, tax ID verification, risk scoring (Low/Medium/High), and performance ratings.
- **Purchase Requisitions (PR)**: Departmental purchase requests with multi-tier approval chains and offline local caching.
- **Requests for Quotation (RFQ)**: Multi-vendor competitive bidding, sealed supplier quotes, and automated weighted evaluation matrix scoring.
- **Purchase Orders (PO)**: Digital purchase orders with cryptographic SHA-256 digital signature hashes and PDF exporting.
- **Goods Receipt Notes (GRN) & 3-Way Matching**: Item-level receipt verification and automated reconciliation between PO, GRN, and Supplier Invoice with zero-discrepancy General Ledger posting.
- **Supplier Contracts & Framework SLAs**: Digital contract repository with expiration warnings (60/30/15 days) and maximum spend limit tracking.

---

## 📦 Module: Complete Inventory, Assets, Warehouses & Maintenance System (`/modules/inventory/`, `/modules/assets/`, `/modules/warehouses/`, `/modules/maintenance/`)

An enterprise stock control, fixed asset, multi-warehouse logistics, barcode labeling, and equipment maintenance system fully integrated with Accounting, Projects, Expenses, and EDMS.

### Key Inventory & Asset Features
- **Product Cataloging**: Support for Inventory Items, Service Items, Assets, Equipment, Tools, Vehicles, Consumables, and Digital Assets.
- **Multi-Warehouse & Storage Locations**: Unlimited warehouses with capacity tracking, aisle/shelf/bin locations, and stock transfers.
- **Stock Movement Tracking**: Log Stock In, Stock Out, Transfers, Adjustments, Damage, Loss, Consumption, and Offline Sync.
- **Asset Depreciation Engine**: Straight-Line, Declining Balance, and Units of Production methods with automated General Ledger postings.
- **Maintenance & Servicing**: Preventive and corrective maintenance schedules, technician assignments, and cost logs.
- **Barcode & QR Tag Labels**: Printable QR code and Code 128 barcode tags.

---

## 📁 Module: Enterprise File, Document & Digital Asset Management System (EDMS) (`/modules/documents/`, `/modules/storage/`, `/modules/filemanager/`)

An enterprise document management and asset repository providing centralized storage, SemVer version control, digital signatures, approval workflows, and cross-module document linking across all Z-FINANCE operations.

### Key EDMS Features
- **Global Repositories**: Private, Business, Workspace, Shared Libraries, Archive, and Recycle Bin with folder trees.
- **Cross-Module Asset Linking**: Direct document connections to CRM Customers, Suppliers, Projects, Tasks, Accounting Invoices, Expenses, Employees, and Calendar Events.
- **SemVer Versioning**: Automatic semver versioning (`v1.0.0`, `v1.2.0`), version history logs, and rollback capabilities.
- **Digital Signatures**: Cryptographic drawn/typed signatures with SHA256 verification hash, IP tracking, and approval workflow chains.
- **Storage & Backup Engine**: Real-time quota metering (10 GB default), storage gauge, automated DB backups, and audit trail logs.

---

## 📅 Module: Complete Calendar, Appointment, Reminder & Scheduling System (`/modules/calendar/`, `/modules/appointments/`, `/modules/reminders/`)

An enterprise time management and scheduling platform providing full control over Events, Customer Appointments, Service Bookings, Team Schedules, and Automated Multi-Channel Reminders.

### Key Calendar & Scheduling Features
- **Multi-View Calendar Hub**: Month, Week, Day, Agenda, Appointments, Team Availability, and Reminders views.
- **Event Lifecycle Management**: Categorized tracking across Meetings, Appointments, Workshops, Deadlines, and Training with location, Google Meet integration, priority, and notes.
- **Customer & Service Appointments**: Appointment numbering (`APT-YYYYMMDD-XXXX`), staff assignments, service durations, and payment status tracking.
- **Automated Reminders**: Personal, payment, invoice due, and meeting alerts delivered via In-App, Push, Email, and SMS.

---

## 👥 Module: Complete Employee, Team, Role & Permission Management System (`/modules/employees/`, `/modules/departments/`, `/modules/teams/`, `/modules/roles/`, `/modules/permissions/`)

An enterprise organizational management system providing full control over Employees, Departments, Teams, Roles, RBAC Permissions, Staff Invitations, and Activity Audit Logs.

### Key Organizational Features
- **Employee Directory**: Detailed profiles covering 8 employment types (Full Time, Part Time, Contract, Temporary, Intern, Volunteer, Consultant, Freelancer) with skills and bio records.
- **Department & Team Hierarchy**: Unlimited department and operational squad creation with manager and team lead assignments.
- **Role-Based Access Control (RBAC)**: Granular matrix permissions across View, Create, Edit, Delete, Approve, and Export permissions for all modules.
- **Staff Invitations & Audit Logs**: Token-based email invitations and complete activity history tracking.

---

## 💬 Module: Complete Communication & Notification Center System (`/modules/messages/`, `/modules/notifications/`, `/modules/email/`, `/modules/sms/`, `/modules/announcements/`)

A complete communication ecosystem supporting internal chat, customer CRM messages, supplier interactions, central notifications, email queues, SMS gateways, and global broadcast announcements.

### Key Communication Features
- **Internal & External Messaging**: One-to-one, group, team, project, CRM customer, and supplier portal chat feeds.
- **Notification Central**: Centralized alert hub classifying system, financial, project, customer, supplier, security, and admin notifications.
- **Email Engine**: Transports SMTP transactional emails with async background queues, HTML templates, and delivery logs.
- **SMS & WhatsApp Gateway**: Multi-provider support (MTN SMS, Orange SMS, Twilio, WhatsApp Business Cloud API).
- **Global Broadcasts**: Super Admin system announcements, emergency alerts, and maintenance notices.

---

## 📁 Module: Complete Project & Task Management System (`/modules/projects/`, `/modules/tasks/`)

A comprehensive Project & Task Management Suite seamlessly integrated with Customers, Services, Income, Expenses, Accounting, Reports, and Analytics.

### Key Project Management Features
- **Project Lifecycle Management**: Projects CRUD with custom Project Types (Personal, Business, Client, IT, Construction, Research, etc.), Priorities, and Statuses (Draft, Planning, Active, On Hold, Completed, Cancelled).
- **Task Management**: Unlimited tasks per project with task numbers, assigned users, priority levels (Low to Critical), start/deadline dates, and completion status.
- **Project Profitability Engine**: Calculates actual project revenue vs direct costs, net project profit, profit margin %, and budget cost variances.
- **Time Tracking**: Live timer widget and manual time logger for tracking employee billable hours and productivity.
- **Team Collaboration**: Roles, permissions, task discussion comments, mentions, activity logs, and document attachments.

---

## 📈 Module: Complete Financial Reports, Analytics Dashboard & AI Financial Insights (`/modules/reports/`, `/modules/analytics/`, `/modules/ai_finance/`)

A complete enterprise Financial Intelligence Platform transforming accounting records into financial reports, executive dashboards, KPIs, predictive forecasts, and automated AI recommendations.

### Key Financial Intelligence Features
- **Executive Financial Dashboard**: Real-time summary of Total Income, Total Expenses, Net Operating Profit, Liquid Cash Reserves, Outstanding Receivables/Payables, Profitability Score, and Overall Financial Health Score.
- **Financial Statements Suite**: Fully formatted GAAP/IFRS Profit & Loss Statement (Income Statement), Balance Sheet (Assets, Liabilities, Equity), Cash Flow Statement (Operating, Investing, Financing), and Trial Balance.
- **Financial KPI Engine**: Automated computation of 10 key metrics: Revenue Growth Rate, Expense Growth Rate, Gross/Net Profit Margins, Operating Cost Ratio, Customer Lifetime Value (LTV), Average Transaction Value, Cash Flow Ratio, Savings Rate, and Budget Utilization.
- **AI Financial Intelligence Engine**: Real-time recommendation generator delivering actionable cost reduction advice, revenue upsell opportunities, cash warning alerts, and profit re-investment strategies.
- **6-Month AI Predictive Forecast**: Multi-month statistical projections for projected revenue, expenses, net profit, and confidence score ratings.
- **Custom Report Builder**: Flexible selector tool for building custom snapshot reports with custom date range filters, data source bindings, and chart type selection (Bar, Trend Line, Pie Chart).
- **Export & Print Triggers**: Export generated reports to CSV, Excel-ready datasets, printable PDF formats, or shareable snapshot links.

---

## 📚 Module: Complete Accounting & Double-Entry Bookkeeping System (`/modules/accounting/`)

An enterprise-grade double-entry accounting engine ensuring traceable, auditable, and balanced financial transactions across the enterprise.

### Key Accounting Features
- **Chart of Accounts Hierarchy**: Standardized and custom account numbering across Assets (1000s), Liabilities (2000s), Equity (3000s), Revenue (4000s), Cost of Goods Sold (5000s), and Operating Expenses (6000s).
- **Double-Entry Journal Engine**: Validates $\sum \text{Debits} = \sum \text{Credits}$ before posting. Automatically records transactions from Income, Expense, and Budget modules.
- **General Ledger & Audit Trail**: Complete debit/credit line items logging with running balance calculations per account code.
- **Financial Statements Suite**: Real-time generation of Trial Balance, Balance Sheet, Income Statement (Profit & Loss), and Cash Flow Statements.
- **Bank & Account Reconciliation**: Automated bank statement vs book balance verification with difference detection.
- **Fiscal Year & Period Controls**: Accounting period locking to prevent retroactive transaction modification.
- **Offline Journal Engine**: Queue draft entries via `zfinance_accounting_offline_queue` for automatic reconnection sync.

---

## 📊 Module: Complete Budget Planning, Financial Goals & Savings Management System (`/modules/budgets/`, `/modules/goals/`, `/modules/savings/`)

A complete enterprise Budget Planning and Savings Management System enabling users to create, monitor, analyze, forecast, and manage budgets, capital goals, and reserve vaults.

### Key Budget & Savings Features
- **Budget Dashboard & Utilization Engine**: Real-time KPIs displaying Total Allocated Budgets, Active/Completed/Exceeded Budgets, Total Spent, Remaining Allowance, and Utilization Percentage.
- **Multi-Scope Budget Taxonomy**: Support for Personal, Business, Project, Department, Service, Customer, Category, Annual, Monthly, Weekly, Daily, and Custom budget schedules.
- **Financial Goals Engine**: Define unlimited capital goals (Emergency Fund, Business Expansion, Equipment Purchase, Training, Vacation, Investment, Debt Reduction) with milestone countdowns and progress tracking.
- **High-Yield Savings & Vaults**: Manage dedicated reserve accounts, commercial bank deposits, yield rates, and double-entry transaction ledgers.
- **Predictive Cash Flow & Budget Forecast**: Multi-month predictive trajectory calculating anticipated revenue vs expected expense disbursements.
- **Automated Threshold Alerts**: Configurable alerts for 80%, 90%, exceeded budget limits, and financial goal deadlines.
- **Offline Synchronization Engine**: Local transaction queuing via `zfinance_budgets_offline_queue` for seamless disconnected operation and automatic background sync.

---

## 💸 Module: Complete Expense Management System (`/modules/expenses/`)

A complete enterprise Expense Management System enabling users to record, categorize, approve, analyze, forecast, and monitor every expense related to their business, services, projects, customers, suppliers, and organizations.

### Key Expense Management Features
- **Expense Dashboard & Cost Analytics**: Real-time KPIs displaying Total Expenses, Today/Weekly/Monthly/Quarterly/Yearly Expenses, Pending Approval Amount, Approved/Rejected Totals, Recurring Costs, Average Expense Value, and Top Categories/Suppliers.
- **Unlimited Expense Taxonomy & Categories**: Default categories including Office & Supplies, Rent & Lease, Utilities & Power, Internet & Telecom, Software & Subscriptions, Marketing & Advertising, Travel & Transport, with support for unlimited custom categories with assigned hex colors and icons.
- **Configurable Approval Workflow Engine**: Built-in approval statuses (`draft`, `pending`, `approved`, `rejected`, `cancelled`) with manager verification, comments, and full audit logging in `expense_approvals`.
- **Automated Recurring Expense Schedules**: Automated generation of recurring bills, lease payments, SaaS subscriptions, and utility disbursements supporting Daily, Weekly, Monthly, Quarterly, Semi-Annual, Annual, and Custom Day intervals.
- **Regional & Global Payment Method Support**: Cash, Bank Transfer, Cheque, Credit/Debit Cards, MTN Mobile Money, Orange Money, Express Union Mobile Money, PayUnit, Flutterwave, Stripe, PayPal, and Paystack.
- **Receipt & Attachment Management**: Securely attach invoices, receipts, contracts, payment proofs, and warranty documents to expense entries.
- **Import/Export Engine**: CSV, Excel (XLSX), PDF, and Print exports with duplicate detection (`reference_no`, `receipt_no`, `invoice_no`) and pre-import field validation.
- **Offline Synchronization Engine**: Automatic offline queuing via `zfinance_expense_offline_queue` for local entry and background sync upon connection restoration.

---

## 💰 Module: Complete Income Management System (`/modules/income/`)

A complete enterprise Income Management System allowing users to record, organize, track, analyze, and forecast incoming revenue from unlimited sources, customers, services, and projects.

### Key Income Management Features
- **Income Dashboard & Revenue Analytics**: Real-time KPIs tracking Total Gross Income, Today/Weekly/Monthly/Quarterly/Yearly Income, Pending Payments, Recurring Revenue, Cancelled/Refunded Income, and Average Transaction Values.
- **Unlimited Income Sources & Categories**: Support for Service Sales, Consulting, Training, Education, Repairs, Commissions, Subscriptions, Rent, Investments, Interest, Dividends, Grants, Royalties, Digital Products, Marketplace Sales, and Custom Sources.
- **Automated Recurring Schedules**: Subscription and retainer billing supporting Daily, Weekly, Monthly, Quarterly, Semi-Annual, Annual, and Custom Day intervals.
- **Multi-Payment Gateway Support**: Cash, Bank Transfer, Cheque, Credit/Debit Cards, MTN Mobile Money, Orange Money, Express Union Mobile Money, PayUnit, Stripe, PayPal, Flutterwave, and Paystack.
- **Secure File Attachments**: Attach invoices, receipts, contracts, proof of payment, and supporting documents directly to income records.
- **Import/Export Engine**: Full CSV, Excel (XLSX), PDF, and Print export capabilities with duplicate detection and pre-import validation.
- **Offline Synchronization Engine**: Automatic localStorage action queueing (`zfinance_income_offline_queue`) for seamless offline income entry and background sync upon reconnect.

---

## 👥 Module: Customer Relationship Management (CRM) System (`/modules/customers/`)

A complete enterprise CRM enabling individuals, freelancers, SMEs, NGOs, and enterprise organizations to manage unlimited customers, clients, students, members, organizations, institutions, and partners.

### Key CRM Features
- **CRM Dashboard & Analytics**: Real-time KPIs tracking total customers, VIP accounts, leads, active/inactive breakdown, total income generated, and outstanding balances.
- **Versatile Customer Taxonomy**: Full support for Individuals, Companies, Organizations, Associations, Schools, Government Institutions, NGOs, Partners, and Custom Types.
- **Detailed Customer Profiles**: Contact details, social profiles, tax IDs, credit limits, payment terms, internal notes, and activity histories.
- **Groups & Segmentation Engine**: Unlimited customer groups with custom color badges and member count metrics.
- **Communication Logging**: Log phone calls, emails, in-person meetings, messages, and WhatsApp interactions.
- **Document Repository**: Securely upload, categorize, and download contracts, identity documents, receipts, and certificates.
- **Public Directory & Ad Integration**: Optional public business directory with advertisement placeholders managed by the Super Administrator.
- **Offline Sync Engine**: Automatic localStorage action queueing (`zfinance_customers_offline_queue`) for offline operation and background synchronization.

---

## 💼 Module: Enterprise Service Management System (`/modules/services/`)

A complete enterprise Service Management System allowing individuals, freelancers, SMEs, NGOs, and enterprise organizations to define, categorize, price, package, market, and analyze unlimited business services.

### Key Service Management Features
- **Service Dashboard & Metrics**: Real-time KPIs tracking total services, active/inactive/draft/archived breakdown, total service categories, and average pricing.
- **Unlimited Category Taxonomy**: Industry categories with custom icons, color indicators, display orders, and status toggles.
- **Versatile Pricing Models**: Supports 10 pricing structures including Fixed, Hourly, Daily, Weekly, Monthly, Annual, Negotiable, Free, Subscription, and Quotation Required.
- **Multi-Tier Package Manager**: Create custom packages (Starter, Professional, Enterprise) with feature lists, discounts, duration units, and max customer limits.
- **Service Availability & SEO**: Configure business operating days, working hours, delivery mode (online/physical/hybrid), appointment rules, and meta SEO parameters.
- **Public Service Directory**: Customer-facing marketplace view with public, private, and hidden service visibility levels.
- **Offline Sync & Queueing**: Automatic localStorage action queueing during network outages with seamless online synchronization.

---

## 🛡️ Module: Super Administrator Control Center (`/modules/super_admin/`)

The ultimate central command node for platform governance, infrastructure configuration, module lifecycle management, security monitoring, and payment gateway configuration.

### Key Control Center Features
- **System Health & Server Monitoring**: Real-time gauges for Uptime (99.98%), Database Size (14.5 MB), Active Sessions (28), Memory & CPU Load, PHP 8.2 and MySQL 8.0 server environment details.
- **Global Platform Configuration**: Application branding (Name, Logo, Favicon, Company Info), timezones, default base currencies, and global maintenance mode toggle with IP whitelist.
- **Dynamic Module Manager**: Lifecycle management for core and extension modules with immutable protection for core modules (Auth, RBAC, User Management, Super Admin).
- **Targeted Advertisement Suite**: Campaign manager with role-based, plan-based, country-based, and device-based targeting, along with impression and click tracking.
- **Payment Gateway Matrix**: Configurations for MTN Mobile Money, Orange Money, PayUnit, Flutterwave, Paystack, Stripe, and PayPal with sandbox/live mode toggles.
- **Disaster Recovery & Backups**: On-demand MySQL database dumps, schema exports, and one-click snapshot restorations.
- **Security & System Diagnostics**: Centralized audit, security, database, and system error log viewers.

---

## 👥 Module: Enterprise User Management System (`/modules/users/`)

A comprehensive, enterprise-grade user management and administrative control module supporting unlimited user accounts, multi-attribute searching, device tracking, verification document approvals, subscription plans, and secure administrative impersonation.

### Key User Management Features
- **Centralized User Dashboard**: Real-time metrics for total accounts, active users, pending verification queue, suspended profiles, 2FA adoption rate, and multi-tenant plan distribution.
- **Advanced Directory & Filters**: Multi-criteria search by keyword (name, email, phone, username), role, account status, two-factor compliance, department, and branch.
- **Super Administrator Protection**: Immutable protection for User ID #1 preventing deletion, lockout, suspension, or impersonation.
- **Device & Session Monitoring**: Tracks active user devices (`user_devices`), IP addresses, user agents, and provides one-click remote session revocation.
- **Document & Identity Verification**: Integrated verification workflow (`user_documents`) for reviewing national IDs, passports, and tax certificates with approval/rejection actions.
- **Audit-Logged Impersonation**: Secure session switching (`user_impersonations`) allowing Super Admins to view the platform as another user with audit logging and single-click session exit.
- **Bulk CSV Import & Export**: High-performance importer/exporter (`UserImporterExporter.php`) with duplicate email checks, role sanitization, and filtered CSV downloads.
- **Subscription & Seat Allocation**: Multi-tier plan manager (`user_subscriptions`) tracking seat usage, renewal dates, and account tiers (Starter, Professional, Enterprise).

---

## 🔑 Module: Enterprise Role-Based Access Control (RBAC) (`/modules/rbac/`)

A centralized, enterprise-grade authorization engine supporting unlimited custom roles, visual permission matrix, multi-role assignments, direct user overrides, data scopes, menu access control, and audit logs.

### Key RBAC Features
- **Visual Permission Matrix**: Interactive checkbox grid for roles x capabilities across 19 permission groups with group auto-registration support.
- **Default Prepared Roles**: Super Administrator (Lvl 100), Administrator (Lvl 90), Finance Manager (Lvl 80), Manager (Lvl 70), Supervisor (Lvl 60), Accountant (Lvl 50), Employee (Lvl 40), Standard User (Lvl 30), Guest (Lvl 10).
- **Direct User Overrides**: Grant or revoke explicit permissions directly on a user level (`user_permissions`) with precedence rule `Direct User Override > Role Permission`.
- **Data Access Scopes**: Boundaries for `own_records`, `department_records`, `branch_records`, `company_records`, and `global_access`.
- **Super Admin Protection**: Permanent immutability protection for Role ID 1 and User ID 1.
- **Module Auto-Registrar**: `PermissionRegistrar` enables future business modules to dynamically register permission groups and actions without core modifications.
- **Audit Logging**: Complete event recording in `rbac_audit_logs`.

---

## 🛡️ Module: Enterprise Authentication Foundation (`/modules/auth/`)

A complete, enterprise-grade, modular, responsive, offline-aware, and multilingual authentication system built using **PHP 8+**, **PDO**, **MySQL**, **Bootstrap 5**, and **AJAX**.

### Key Authentication Features
- **Bootstrap 5 Modals (No Page Redirects)**: Responsive modal windows for Login, Registration, Forgot Password, Reset Password, Email Verification, Phone Verification, and Resend Verification.
- **Flexible Sign In**: Login using Username, Email Address, or Phone Number.
- **Full Registration Pipeline**: Captures Name, Username, Email, Phone, Password, Language, Timezone, Currency, Terms Acceptance, and Newsletter preferences.
- **Automatic Account Provisioning**: Auto-creates User Profile, Preferences, Executive Dashboard, Default Workspace, Password History, and Verification Token upon registration.
- **Password Security**: Hashes passwords using `Argon2id` / `BCRYPT`, validates password strength in real-time, and enforces password history rules.
- **Email & Token Verification**: Cryptographic token generation (`random_bytes(32)`), SHA-256 hash lookup, 24-hour expiration, and HTML email dispatch.
- **Multi-Device Session Engine**: Tracks active device sessions (`active_sessions`), IP addresses, user agents, device types, and permits one-click remote session revocation.
- **Brute Force & Rate Limiting**: Tracks failed login attempts (`login_attempts`) and automatically locks accounts for 15 minutes after 5 consecutive failures.
- **Offline Awareness**: Intercepts auth actions when offline, informs users that authentication requires an internet connection, and queues non-sensitive actions.

---

## 🌐 Module: Complete Public Website Suite (`/website/`)

A modern, responsive, SEO-optimized, multi-lingual, and PWA-ready public marketing portal and documentation suite.

### Key Public Website Features
- **Comprehensive Public Pages**: Home, About Us, Features, Solutions, Pricing, FAQ, Blog, Documentation, Download Center, Contact, Privacy Policy, Terms & Conditions, Cookie Policy, 404, 500, Maintenance, and Offline PWA Standby pages.
- **Multilingual Support**: Stateful language switcher for **English (EN)** and **French (FR)**.
- **Theme Switcher**: Instant switching between **Light Mode**, **Dark Mode**, and **Auto-System** detection.
- **Progressive Web App (PWA)**: Manifest configuration (`/public/manifest.json`), service worker caching (`/sw.js`), and interactive PWA installation prompt buttons.
- **SEO & Schema.org Framework**: Dynamic Open Graph meta tags, Twitter Cards, Canonical URLs, XML Sitemap (`sitemap.xml`), Robots (`robots.txt`), and JSON-LD structured data.
- **Advertisement Zones**: Pre-configured ad zones for Header, Hero, Sidebar, Content, Footer, and Popup integrated with the future Advertising Suite.

---

## 🚀 Module: Universal Installation Wizard & Environment Configuration (`/install/`)

A self-contained installation suite allowing deployment on Localhost, XAMPP, Laragon, WAMP, cPanel, Shared Hosting, VPS, and Cloud Hosting without manual file editing.

### Key Installation Features
- **Auto System Requirements Audit**: PHP 8.1+ version check, required extensions (PDO, MySQL, JSON, OpenSSL, Mbstring, FileInfo, GD, ZIP, cURL), Apache/Nginx compatibility, and disk space checks.
- **Directory Permissions Audit**: Validates write access for `config/`, `uploads/`, `storage/`, `cache/`, `logs/`, `backups/`, and `offline/`.
- **Database Configuration & Connection Test**: PDO driver test for Host, Port, Database Name, Username, Password, and custom Prefix.
- **Automated SQL Migration Engine**: Imports `install/Z-FINANCE.sql` with transactional safety, progress feedback, and error reporting.
- **Environment Generator**: Generates production `.env` files with secure `APP_SECRET_KEY`, `CSRF_SECRET`, database credentials, currency, timezone, and debug modes.
- **Super Admin Provisioning**: Hashes administrator passwords using `PASSWORD_ARGON2ID` / `PASSWORD_BCRYPT` with full strength validation.
- **Installer Lock Protection**: Generates `install/installed.lock` to prevent unauthorized re-installation attempts.

---

## 💰 Module: Income Management System (`/modules/income/`)

The complete **Income Management System** module located in `modules/income/`.

### Features
- **Dashboard & Analytics**: Total Income, Net Revenue, Income Growth (+14.2%), Category Distributions, Trend line charts.
- **Categories & Sources**: Full CRUD for 13 standard income categories & unlimited sources with type classification.
- **Transaction Entry**: Multi-currency (XAF, USD, EUR, GBP, NGN) with dynamic exchange rates, payment methods (Cash, Bank, Mobile Money, Cards, Gateways), and file attachments.
- **Module Connections**: Direct integration with Customer CRM, Service Management, and Project Revenue/Profit tracking.
- **Recurring Income Engine**: Automated daily, weekly, monthly, and yearly income schedule generator.
- **Offline Mode**: Local caching and seamless auto-synchronization.
- **Reports & Security**: Multi-format exports (PDF, Excel, CSV, Print), multi-tenant isolation, CSRF protection, and prepared statements.

---

## 📁 Core Directory Structure
```
/website/
├── index.php             # Main homepage
├── header.php            # Modular header & navbar with EN/FR & Light/Dark switcher
├── footer.php            # Modular footer & quick links
├── about.php             # About Us & company mission
├── features.php          # Detailed features breakdown
├── solutions.php         # Industry solutions (SMEs, Enterprise, Agencies)
├── pricing.php           # Subscription plans & comparison
├── faq.php               # Categorized FAQ & search
├── blog.php              # Blog module with categories & articles
├── documentation.php     # User & developer guides
├── download.php          # PWA & Server ZIP downloads
├── contact.php           # AJAX Contact form & office locations
├── privacy.php           # GDPR Privacy Policy
├── terms.php             # Terms & Conditions
├── cookies.php           # Cookie Policy
├── 404.php               # Page Not Found error view
├── 500.php               # Internal Server error view
├── maintenance.php       # System maintenance standby
├── offline.php           # PWA offline fallback page
└── seo.php               # Dynamic SEO meta tags & Schema.org JSON-LD

/install/
├── index.php             # Main installer step router
├── requirements.php      # System requirements auditor
├── permissions.php       # Directory permissions auditor
├── database.php          # Database setup & connection tester
├── import.php            # SQL schema & seed importer
├── configuration.php     # Application settings setup
├── administrator.php     # Super Admin setup & .env generator
├── finish.php           # Post-installation lock screen
├── Z-FINANCE.sql        # Core database migration schema
├── installer.css         # Bootstrap 5 theme extension
└── installer.js          # Installer step AJAX engine

/modules/auth/
├── schema.sql            # MySQL 8.0+ migration schema (11 tables)
├── classes/
│   ├── Security.php      # CSRF, XSS, rate limiter, password hash & strength
│   ├── Validator.php     # Input validation rules
│   ├── SessionManager.php# Session security & multi-device tracking
│   ├── Auth.php          # Core auth engine & automatic account provisioning
│   └── Mailer.php        # HTML verification & password reset mailer
├── api/
│   ├── db_connect.php    # PDO connection helper with SQLite fallback
│   ├── login.php         # AJAX Login endpoint
│   ├── register.php      # AJAX Registration endpoint
│   ├── forgot_password.php # AJAX Forgot password request
│   ├── reset_password.php  # AJAX Reset password endpoint
│   ├── verify_email.php    # AJAX Email verification endpoint
│   ├── resend_verification.php # AJAX Resend verification endpoint
│   ├── verify_phone.php    # AJAX Phone SMS verification
│   ├── sessions.php        # AJAX Active device session manager
│   ├── status.php          # AJAX Session status checker
│   └── logout.php          # AJAX Logout & session destruction
├── views/
│   └── modals.php        # Responsive Bootstrap 5 HTML Modals
└── emails/
    ├── email_verification.html # Verification email template
    └── password_reset.html     # Password reset email template

/modules/income/
├── index.php             # Main router & layout template
├── income_dashboard.php  # Dashboard view & KPI cards
├── income_list.php       # Filterable income transaction table
├── add_income.php        # Transaction creation & editing form
├── income_categories.php # Category management CRUD
├── income_sources.php    # Income sources directory
├── recurring_income.php  # Automation schedule engine
├── income_reports.php   # Export & report generation
├── income_analytics.php # Growth & forecast analytics
├── api.php               # PHP PDO REST API endpoint
├── db.php                # PDO connection & security wrapper
└── schema.sql            # MySQL schema migration file (10 tables)
```

---

## 📘 Documentation Guides
- `RBAC_GUIDE.md` — Enterprise Role-Based Access Control architecture & specs
- `ROLE_MANAGEMENT_GUIDE.md` — Role hierarchy, creation, cloning & data scopes
- `PERMISSION_GUIDE.md` — Permission groups, action codes & module auto-registration
- `AUTHORIZATION_GUIDE.md` — RbacMiddleware usage, `can()`, `enforce()`, and ownership guards
- `SECURITY_MODEL.md` — Super Admin immutability protection & audit trail rules
- `AUTHENTICATION_GUIDE.md` — Enterprise Authentication Suite architecture & API specs
- `SECURITY_GUIDE.md` — Password hashing, rate limiting, CSRF & activity logging
- `SESSION_GUIDE.md` — Session lifecycle, multi-device tracking & remote revocation
- `EMAIL_VERIFICATION_GUIDE.md` — Email verification tokens & password reset workflows
- `PUBLIC_WEBSITE_GUIDE.md` — Complete Public Website architecture & page specs
- `SEO_GUIDE.md` — SEO framework, meta tags, Schema.org & sitemap instructions
- `PWA_GUIDE.md` — Service worker caching, IndexedDB & offline PWA setup
- `THEME_GUIDE.md` — Light, Dark & Auto theme engine guidelines
- `INSTALLATION_GUIDE.md` — Universal Installation Wizard documentation
- `HOSTING_GUIDE.md` — Deployment guidelines for XAMPP, Laragon, cPanel, VPS, Docker
- `ENVIRONMENT_GUIDE.md` — `.env` structure, security keys, and parameter references
- `FIRST_SETUP_GUIDE.md` — Post-installation checklist & initial setup workflow
- `INCOME_MANAGEMENT_GUIDE.md` — Income system architecture & features
- `REVENUE_TRACKING_GUIDE.md` — Revenue streams, currency handling & recurrence
- `INCOME_REPORTS_GUIDE.md` — Export formats & reporting parameters
- `INCOME_SECURITY_GUIDE.md` — Security guidelines & prepared statement standards

