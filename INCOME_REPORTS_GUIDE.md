# Z-FINANCE 1.0.0 — Income Reports & Analytics Guide

## Overview

The **Income Reports System** aggregates raw transaction data into actionable financial metrics, revenue trends, and source/customer breakdowns.

---

## Report Types Available

1. **Daily & Weekly Income Statements**: Real-time snapshot of daily liquidity and weekly growth rates.
2. **Monthly & Quarterly Revenue Summaries**: High-level executive overview for quarterly board reviews.
3. **Income by Category**: Distribution of earnings across Service, Product, Consulting, Commission, and Retainer lines.
4. **Income by Source & Service**: Granular breakdown identifying top performing services and revenue channels.
5. **Income by Customer & Project**: Key account profitability analysis.

---

## REST API Integration

Fetch aggregated report data programmatically:

```http
GET /modules/income/api/reports.php?type=category&start_date=2026-01-01&end_date=2026-12-31
```

**Sample JSON Response:**
```json
{
  "success": true,
  "report_type": "category",
  "data": [
    {
      "category_name": "Service Income",
      "color_code": "#3B82F6",
      "total_count": 42,
      "total_revenue": 12500000.00
    },
    {
      "category_name": "Consulting",
      "color_code": "#8B5CF6",
      "total_count": 18,
      "total_revenue": 8400000.00
    }
  ]
}
```
