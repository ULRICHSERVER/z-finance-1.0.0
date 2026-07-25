# Z-FINANCE 1.0.0 — Recurring Expenses & Bills Guide

## Overview

The **Recurring Expense System** automates predictable operational costs including facility leases, cloud server hosting, internet subscriptions, utilities, and software licensing.

---

## Frequencies & Schedules

- **Daily**: Automated daily operational costs.
- **Weekly**: Weekly logistics or contractor stipends.
- **Monthly**: Standard monthly rent and SaaS subscriptions (Default).
- **Quarterly**: Tax prepayments and quarterly maintenance.
- **Semi-Annual**: Bi-annual insurance premiums.
- **Annual**: Annual domain renewals and corporate licenses.
- **Custom**: Custom day intervals (`custom_interval_days`).

---

## Execution Engine

Run batch recurring generation via worker CLI:

```bash
php /modules/expenses/api/recurring.php --action=process_schedules
```
