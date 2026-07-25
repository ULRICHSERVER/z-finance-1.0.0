# Z-FINANCE 1.0.0 — Complete Double-Entry Accounting System Guide

## Overview

The **Accounting & Double-Entry Bookkeeping System** (`/modules/accounting/`) serves as the foundational financial engine for Z-FINANCE. Every financial event across Income, Expenses, Budgets, CRM, and Services automatically creates balanced double-entry transactions in the Chart of Accounts and General Ledger.

---

## Key System Modules

1. **Chart of Accounts (`/modules/accounting/classes/ChartOfAccountsManager.php`)**: Hierarchy supporting Assets, Liabilities, Equity, Revenue, COGS, and Expenses.
2. **Double-Entry Journal Engine (`/modules/accounting/classes/JournalManager.php`)**: Validates $\sum \text{Debits} = \sum \text{Credits}$ before posting.
3. **General Ledger & Financial Statements (`/modules/accounting/classes/GeneralLedgerManager.php`)**: Generates Trial Balance, Balance Sheet, and Income Statement (P&L).
4. **Bank Reconciliation (`/modules/accounting/classes/ReconciliationManager.php`)**: Statement vs book ledger difference detection.

---

## REST API Reference

### Get Accounts

```http
GET /modules/accounting/api/accounts.php
```

### Post Journal Entry

```http
POST /modules/accounting/api/journals.php
Content-Type: application/json

{
  "description": "Client Service Subscription Revenue Realized",
  "entry_date": "2026-07-23",
  "lines": [
    { "account_id": 1010, "debit": 4500.00, "credit": 0.00, "description": "Cash receipt" },
    { "account_id": 4010, "debit": 0.00, "credit": 4500.00, "description": "Sales revenue" }
  ]
}
```

### Get Financial Statements

```http
GET /modules/accounting/api/reports.php?statement=income_statement
GET /modules/accounting/api/reports.php?statement=balance_sheet
GET /modules/accounting/api/reports.php?statement=trial_balance
```

---

## Offline Synchronization Engine

Unposted draft journals created while offline are queued in `zfinance_accounting_offline_queue` and validated locally for double-entry balance before automatic post-reconnection sync.
