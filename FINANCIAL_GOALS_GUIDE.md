# Z-FINANCE 1.0.0 — Financial Goals Management Guide

## Overview

The **Financial Goals System** (`/modules/goals/`) empowers users to set, track, log contributions towards, and achieve long-term capital goals, emergency reserves, equipment upgrades, and business expansion milestones.

---

## Supported Goal Types

- **Emergency Fund**: Liquidity cushion for unexpected operating disruptions.
- **Business Expansion**: Regional office expansion and market entry capital.
- **Equipment Purchase**: Hardware, machinery, laptops, and server hardware.
- **Training**: Staff certification and technical upskilling grants.
- **Vacation**: Employee wellness and retreat funding.
- **Investment**: Treasury yields, bond allocations, and equity investments.
- **Debt Reduction**: Loan principal amortization reserves.
- **Custom Goals**: User-defined targeted capital reserves.

---

## Database Tables

1. **`financial_goals`**: Master goal record with target amount, current amount, priority, and deadline.
2. **`goal_progress`**: Contribution log recording individual deposits and notes.

---

## REST API Reference

### Get All Financial Goals

```http
GET /modules/goals/api/goals.php
```

### Log Goal Contribution

```http
POST /modules/goals/api/goals.php
Content-Type: application/json

{
  "action": "contribute",
  "goal_id": 1,
  "amount": 2500.00,
  "notes": "July operating profit allocation to emergency fund"
}
```
