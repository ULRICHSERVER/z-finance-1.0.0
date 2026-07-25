# Z-FINANCE 1.0.0 - Financial Reports Guide

## Overview
The Financial Reports module is the core financial statement generator of Z-FINANCE 1.0.0. It generates GAAP & IFRS compliant reports:

1. **Profit & Loss Statement (Income Statement)**: Calculates Gross Revenue, Operating Expenses, Net Operating Profit, and Net Profit Margin.
2. **Balance Sheet (Statement of Financial Position)**: Summarizes Assets (Cash, Bank, Accounts Receivable), Liabilities (Accounts Payable), and Retained Equity.
3. **Cash Flow Statement**: Tracks Operating Inflows, Operating Outflows, and Net Cash Position.
4. **Trial Balance & General Ledger Activity**: Detailed double-entry account ledger reporting.
5. **Custom Report Builder**: Drag-and-drop / selector tool allowing users to build custom report snapshots with custom date ranges, filters, and visualization types.

---

## API Endpoints

### Generate Profit & Loss Statement
`GET /modules/reports/api/reports.php?type=profit_and_loss&start_date=2026-01-01&end_date=2026-12-31`

### Generate Balance Sheet
`GET /modules/reports/api/reports.php?type=balance_sheet&end_date=2026-12-31`
