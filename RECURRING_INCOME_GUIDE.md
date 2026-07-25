# Z-FINANCE 1.0.0 — Recurring Income & Subscription Guide

## Overview

The **Recurring Income System** automates predictable revenue streams such as monthly IT retainers, annual software licenses, quarterly maintenance agreements, and membership fees.

---

## Frequency Options

- **Daily**: Auto-generates revenue daily.
- **Weekly**: Recurring weekly retainer cycle.
- **Monthly**: Monthly subscription model (Default).
- **Quarterly**: Every 3 months.
- **Semi-Annual**: Every 6 months.
- **Annual**: Year-on-year enterprise contracts.
- **Custom Frequency**: Custom interval defined in days (`custom_interval_days`).

---

## Automated Execution Engine

To run auto-generation via CRON or CLI worker:

```bash
php /modules/income/api/recurring.php --action=process_schedules
```

The system checks for schedules where `next_run_date <= CURRENT_DATE` and `status = 'active'`, creates a new entry in `income`, and increments `next_run_date`.
