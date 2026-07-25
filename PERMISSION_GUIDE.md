# 🔑 Z-FINANCE 1.0.0 — Permission & Group Matrix Guide

This document describes permission groups, action types, and dynamic module permission registration.

---

## 🏷️ Standard Permission Action Types

Every permission code follows the format `{group_code}.{action_type}`:

- `view`: Read-only access to module data.
- `create`: Permission to add new records.
- `edit`: Permission to modify existing records.
- `delete`: Permission to delete or archive records.
- `approve`: Permission to approve claims or invoices.
- `reject`: Permission to reject submitted claims.
- `export`: Permission to download CSV/Excel/PDF reports.
- `configure`: Permission to modify module settings.

---

## 🚀 Module Auto-Registration Example

Any future module can register itself in `PermissionRegistrar`:

```php
use ZFinance\Rbac\PermissionRegistrar;

$registrar = new PermissionRegistrar($pdo);
$registrar->registerModule(
    'expenses',                   // Group Code
    'Expense Claims',             // Group Name
    'Employee expense management',// Description
    'bi-cash-stack',              // Icon
    ['view', 'create', 'edit', 'delete', 'approve', 'export'] // Actions
);
```
