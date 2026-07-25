# Z-FINANCE 1.0.0 — Income Import & Export Guide

## Overview

The Import/Export system allows seamless migration of income records, bulk transaction imports, and PDF/Excel financial report generation.

---

## Supported Formats

- **CSV Import / Export**: Standard comma-separated transaction lists.
- **Excel (XLSX)**: Formatted financial spreadsheets with auto-totals.
- **PDF Export**: Executive-ready income statement reports.
- **Print Version**: CSS-optimized high-contrast printable view.

---

## Duplicate Detection & Validation

During import, the system validates:
1. `reference_no` uniqueness against the database.
2. Valid numeric formats for `amount` and `exchange_rate`.
3. Auto-creation of non-existent `categories` and `sources` on the fly.
