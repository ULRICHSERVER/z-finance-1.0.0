# Z-FINANCE 1.0.0 — Expense Import & Export Guide

## Overview

The Import/Export system allows seamless migration of expense records, bulk supplier bill imports, and printable financial audit statements.

---

## Supported Formats

- **CSV Import / Export**: Standard comma-separated transaction records.
- **Excel (XLSX)**: Formatted financial cost sheets.
- **PDF Export**: Executive-ready expense statement documents.
- **Print Version**: High-contrast printable audit format.

---

## Validation & Duplicate Prevention

During import:
1. `reference_no` and `receipt_no` are validated against duplicate records.
2. Unmatched categories are automatically registered in `expense_categories`.
