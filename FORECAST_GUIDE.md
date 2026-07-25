# Z-FINANCE 1.0.0 — Cash Flow & Budget Forecasting Guide

## Overview

The **Cash Flow & Budget Forecast Engine** (`/modules/budgets/classes/ForecastManager.php`) calculates multi-month predictive revenue trajectories, expense disbursement trends, and net cash flow reserves.

---

## Predictive Model & Algorithm

- **Historical Baseline**: Aggregates average monthly revenue and expenditure baselines from historical transaction records.
- **Trajectory Scaling**: Applies growth projection factors to estimate future month-by-month cash flow health.
- **Variance Projections**: Identifies projected budget deficits before expenditures occur.

---

## API Request Example

```http
GET /modules/budgets/api/forecast.php?months=6
```

### JSON Response

```json
{
  "success": true,
  "months": 6,
  "forecast": [
    {
      "month": "Aug 2026",
      "projected_income": 18500.00,
      "projected_expenses": 11200.00,
      "net_cash_flow": 7300.00,
      "cumulative_reserve": 7300.00
    }
  ]
}
```
