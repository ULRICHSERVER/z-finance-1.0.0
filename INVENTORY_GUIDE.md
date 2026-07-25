# Z-FINANCE 1.0.0 - Enterprise Inventory & Stock Control Guide

## Overview
The Enterprise Inventory Management System provides complete end-to-end stock control, product cataloging, stock movement tracking, and automatic valuation across warehouses.

## Supported Product Types
- **Inventory Item**: Physical stock tracked with min/max levels.
- **Service Item**: Non-physical billable work.
- **Asset / Equipment / Tool / Vehicle**: Physical fixed assets tracked for depreciation & maintenance.
- **Consumable**: Office & operational supply items.
- **Rental Item / Digital Asset**: Software licenses & digital assets.

## Stock Movements
- **Stock In**: Purchase receipts & manufacturing runs.
- **Stock Out**: Customer sales & project consumption.
- **Transfer**: Inter-warehouse transfers.
- **Adjustment**: Manual physical stock counts & audit write-offs.
- **Damage / Loss / Return**: Scrapped, stolen, or returned goods.

## REST API Endpoint
`GET /modules/inventory/api/inventory.php?action=get_summary`
