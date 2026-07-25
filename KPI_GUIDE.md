# Z-FINANCE 1.0.0 - Financial Key Performance Indicators (KPI) Guide

## Key Performance Indicators Calculated

Z-FINANCE automatically calculates 10 crucial financial KPIs:

1. **Revenue Growth Rate (%)**: Period-over-period top-line expansion.
2. **Expense Growth Rate (%)**: Overhead trajectory tracking.
3. **Gross Profit Margin (%)**: `(Gross Revenue - Direct Costs) / Gross Revenue`
4. **Net Profit Margin (%)**: `Net Profit / Total Income * 100`
5. **Operating Cost Ratio (%)**: `Total Expenses / Total Income * 100`
6. **Customer Lifetime Value (LTV)**: Average total revenue generated per client.
7. **Average Transaction Value**: Mean value per invoice/income transaction.
8. **Cash Flow Ratio**: Ratio of cash inflows to cash outflows.
9. **Savings Rate (%)**: Percentage of retained net profit allocated to cash reserves.
10. **Budget Utilization Rate (%)**: Actual spend vs budgeted allocations.

---

## API Endpoints

### Fetch Calculated KPIs
`GET /modules/analytics/api/analytics.php?action=kpis`
