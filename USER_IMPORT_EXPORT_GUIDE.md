# User Import & Export System Guide - Z-FINANCE 1.0.0

## 1. Overview
The **User Import & Export Utility** (`modules/users/classes/UserImporterExporter.php`) allows administrators to perform bulk user provisioning and account auditing using formatted CSV files.

---

## 2. CSV Import Specifications

### 2.1 Supported Fields
| Column Name | Required | Default | Validation / Format |
| :--- | :--- | :--- | :--- |
| `name` | **Yes** | - | String (2-100 chars) |
| `email` | **Yes** | - | Valid RFC 822 Email address |
| `username` | No | Auto-generated from email | Unique alphanumeric string |
| `role` | No | `Standard User` | Must match existing RBAC role |
| `department` | No | `General` | Text string |
| `phone` | No | `N/A` | International phone format |
| `status` | No | `Active` | `Active`, `Pending`, or `Suspended` |
| `subscription_plan`| No | `Starter` | `Starter`, `Professional`, or `Enterprise` |

### 2.2 Pre-Import Validation Engine
1. **Header Validation**: Checks for required columns (`name`, `email`).
2. **Duplicate Email Prevention**: Checks incoming emails against existing user records in MySQL. Duplicate emails are flagged and skipped or logged as errors.
3. **Role Sanitization**: Verifies assigned roles exist in the database; falls back to `Standard User` if invalid.
4. **Batch Processing**: Transactions execute in atomic database batches to prevent partial imports.

---

## 3. CSV Export Specifications

### 3.1 Export Filtering Options
Admins can filter exported datasets by:
- **Role**: Export specific user tiers (e.g. all Financial Controllers).
- **Status**: Export Active users for mailing, or Suspended users for auditing.
- **Date Range**: Filter accounts created within specific billing cycles.

### 3.2 Export Formats
- **Standard CSV**: Comma-separated UTF-8 string, suitable for Excel, Google Sheets, or CRM migrations.
- **Exported Fields**: ID, Full Name, Email, Username, Role, Status, Department, Branch, 2FA Enabled, Created At, Last Login.

---

## 4. REST API Endpoint

`POST /modules/users/api/import_export.php`

### Import Request (Multipart Form Data)
```bash
curl -X POST http://localhost:3000/modules/users/api/import_export.php \
  -F "action=import" \
  -F "file=@users_batch.csv"
```

### Export Request (JSON)
```bash
curl -X POST http://localhost:3000/modules/users/api/import_export.php \
  -H "Content-Type: application/json" \
  -d '{
    "action": "export",
    "status": "Active",
    "role": "Financial Controller"
  }'
```
