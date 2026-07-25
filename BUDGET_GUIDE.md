# Z-FINANCE 1.0.0 — Complete Budget Planning & Management Guide

## Overview

The **Budget Planning & Monitoring System** (`/modules/budgets/`) provides corporate, SME, and personal financial management capabilities to formulate, monitor, analyze, and forecast budget performance across workspaces, categories, departments, services, projects, customers, and suppliers.

---

## Architecture & Data Schema

### Main Database Tables

1. **`budgets`**: Primary budget register storing allocation parameters, types, currency, and date ranges.
2. **`budget_categories`**: Taxonomy mapping budget streams (e.g. Operating Overhead, CapEx, Marketing, R&D).
3. **`budget_tracking`**: Realized vs planned metrics tracking actual expenses, actual income, remaining allowance, and percentage utilization.
4. **`budget_alerts`**: Event-driven notification store triggered when budgets hit 80%, 90%, or 100%+ thresholds.
5. **`budget_reports`**: Serialized JSON performance snapshots and statement logs.
6. **`budget_statistics`**: High-performance aggregate KPI cache.

---

## Supported Budget Types

- **Personal Budget**: Individual cash flow & expense limits.
- **Business Budget**: Corporate enterprise budget allocation.
- **Project Budget**: Dedicated allocation for client software/construction deliverables.
- **Department Budget**: Functional department funding (e.g., Engineering, Marketing, HR).
- **Service Budget**: Product or service-line delivery budget.
- **Customer Budget**: Account-level cost management.
- **Category Budget**: Category-specific expense capping.
- **Annual / Monthly / Weekly / Daily / Custom Budget**: Flexible time horizon schedules.

---

## REST API Reference

### Get Budgets & Statistics

```http
GET /modules/budgets/api/budgets.php?action=stats
GET /modules/budgets/api/budgets.php?budget_type=monthly&status=active
```

### Create Budget Plan

```http
POST /modules/budgets/api/budgets.php
Content-Type: application/json

{
  "budget_name": "Q3 Cloud Server Hosting & Infrastructure Scale",
  "budget_type": "monthly",
  "budget_amount": 5000.00,
  "category_id": 1,
  "start_date": "2026-07-01",
  "end_date": "2026-09-30",
  "notes": "Allocated for Cloud Run and PostgreSQL compute resources"
}
```

### Update Budget Realized Expenses

```http
PUT /modules/budgets/api/budgets.php
Content-Type: application/json

{
  "budget_id": 1,
  "actual_expenses": 3250.00,
  "actual_income": 0.00
}
```

---

## Offline Synchronization Engine

Budget creations and progress updates queued while disconnected are preserved in `zfinance_budgets_offline_queue` local cache and automatically committed upon network reconnection.
