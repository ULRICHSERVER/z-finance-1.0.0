# Z-FINANCE 1.0.0 — Complete Income Management System Guide

## Overview

The **Income Management Module** (`/modules/income/`) serves as the central financial revenue processor for Z-FINANCE 1.0.0. It empowers enterprises to record, organize, track, analyze, and forecast incoming revenue across unlimited business channels, customer groups, projects, and services.

---

## Core System Architecture

```
/modules/income/
├── api/
│   ├── income.php            # REST API for Income CRUD and Stats
│   ├── categories.php        # REST API for Income Category Taxonomies
│   ├── sources.php           # REST API for Income Source Channels
│   ├── recurring.php         # REST API for Automated Subscriptions & Retainers
│   └── reports.php           # REST API for Revenue Analytics & Aggregations
├── classes/
│   ├── IncomeManager.php             # Core Income Business Logic Engine
│   ├── IncomeCategoryManager.php     # Taxonomy & Color/Icon Handler
│   ├── IncomeSourceManager.php       # Channel Source Directory Handler
│   ├── RecurringIncomeManager.php    # Automated Schedule Generator
│   ├── IncomeReportManager.php       # Aggregate Reporting Engine
│   └── IncomeAttachmentManager.php   # Secure File Attachment Processor
├── schema.sql                # Production MySQL 8.0+ / MariaDB Database Schema
└── assets/
    ├── css/income.css        # Enterprise UI & Status Styling
    └── js/income.js          # Offline Queue Sync & Local Storage Cache (`zfinance_income_offline_queue`)
```

---

## Technical Features & Capabilities

1. **Multi-Currency & Exchange Rate Conversion**:
   - Supports global currencies (XAF, USD, EUR, GBP, NGN, etc.).
   - Converts all incoming records to base currency (`base_amount`) automatically.

2. **Categorization & Source Tagging**:
   - Unlimited custom categories with assigned HEX colors and icons.
   - Dedicated sources (Service Sales, Consulting, Subscriptions, Rent, Investments, Marketplace, Mobile Money).

3. **Offline Mode & Resilient Synchronization**:
   - Real-time offline transaction queuing via `zfinance_income_offline_queue`.
   - Automatic background upload on network restoration (`window.addEventListener('online')`).

4. **Security & Data Isolation**:
   - Built-in multi-tenant isolation (`tenant_id`).
   - Prepared PDO statements protecting against SQL Injection.
   - Strict XSS and CSRF validation headers.
