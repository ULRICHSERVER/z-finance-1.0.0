# Customer Import & Export Guide - Z-FINANCE 1.0.0

## 1. Overview
Z-FINANCE CRM supports batch import and export of customer records via CSV, Excel, PDF, and JSON formats.

---

## 2. Import Validation Rules
1. **Duplicate Detection**: Validates `email`, `phone`, and `customer_code` against existing records.
2. **Required Fields**: `display_name` is mandatory.
3. **Data Mapping**: Automatic mapping of standard columns (`First Name`, `Last Name`, `Company`, `Email`, `Phone`, `Country`).
