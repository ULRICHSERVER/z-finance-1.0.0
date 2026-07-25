# Z-FINANCE 1.0.0 — Fiscal Year & Period Management Guide

## Overview

The **Fiscal Year Manager** (`fiscal_years` and `fiscal_periods` tables) structures financial accounting into discrete reporting cycles (e.g., FY 2026: Jan 1 - Dec 31).

---

## Period Locking & Reopening

- **Period Closing**: Prevents retroactive journal edits or backdated postings once audited.
- **Reopen Control**: Restricted to Super Administrators with explicit audit trail logging.
