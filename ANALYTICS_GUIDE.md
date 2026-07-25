# Z-FINANCE 1.0.0 - Financial Analytics Guide

## Overview
The Financial Analytics Engine computes multi-dimensional financial metrics and trend analysis across all tenant transactions:

- **Executive Financial Dashboard**: Real-time aggregated metrics (Total Income, Total Expenses, Net Profit, Liquid Cash, Outstanding Receivables, Financial Health Score).
- **Revenue & Expense Breakdown**: Deep analysis by Category, Top Clients, Top Suppliers, and Service Lines.
- **Monthly/Yearly Comparisons**: Comparative growth trends.

---

## API Endpoints

### Get Executive Dashboard Metrics
`GET /modules/analytics/api/analytics.php?action=dashboard`

### Get Cash Flow Analytics
`GET /modules/analytics/api/analytics.php?action=cash_flow`
