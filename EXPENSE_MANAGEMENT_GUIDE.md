# Z-FINANCE 1.0.0 — Complete Expense Management System Guide

## Overview

The **Expense Management Module** (`/modules/expenses/`) enables personal, SME, and enterprise users to record, categorize, track, approve, analyze, and forecast all business and operational expenditures.

---

## Architecture & File Structure

```
/modules/expenses/
├── api/
│   ├── expenses.php          # REST API for Expense CRUD, Filtering, & Stats
│   ├── categories.php        # REST API for Expense Category Management
│   ├── approvals.php         # REST API for Manager Approval Workflow
│   ├── recurring.php         # REST API for Recurring Bills & Subscriptions
│   └── reports.php           # REST API for Expenditure Aggregations
├── classes/
│   ├── ExpenseManager.php            # Core Business Logic Engine
│   ├── ExpenseCategoryManager.php    # Taxonomy & Visual Styling
│   ├── ExpenseApprovalManager.php    # Multi-Level Approval Audit Trail
│   ├── RecurringExpenseManager.php   # Scheduled Bill Generator
│   ├── ExpenseReportManager.php      # Aggregate Analytics Processor
│   └── ExpenseAttachmentManager.php  # Receipt & Invoice Storage
├── schema.sql              # MySQL 8.0+ / MariaDB Database Schema
└── assets/
    ├── css/expenses.css     # Enterprise UI & Status Badges
    └── js/expenses.js       # Offline Queue Engine (`zfinance_expense_offline_queue`)
```

---

## Core Capabilities

1. **Transaction Lifecycle & Attributes**:
   - Reference Number, Purpose, Category, Supplier/Vendor, Customer link, Service, Project, Workspace.
   - Base Amount, Exchange Rate, Tax, Discounts, Fees, and Net Amount calculation.

2. **Manager Approval Workflow**:
   - Statuses: `draft`, `pending`, `approved`, `rejected`, `cancelled`.
   - Complete audit trail storing approver ID, timestamp, and review notes in `expense_approvals`.

3. **Offline Mode & Synchronization**:
   - Seamless offline transaction queuing via `zfinance_expense_offline_queue`.
   - Automatic background upload on reconnect (`window.addEventListener('online')`).

4. **Security & Data Isolation**:
   - Multi-tenant data segregation (`tenant_id`).
   - Prepared PDO statements preventing SQL Injection.
   - XSS and CSRF protection headers on all endpoints.
