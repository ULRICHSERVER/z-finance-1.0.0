# 🔒 Z-FINANCE 1.0.0 — Authorization Middleware & Enforcer Guide

This guide details page and API endpoint protection using `RbacMiddleware`.

---

## 💻 Authorization Middleware Usage

```php
use ZFinance\Rbac\RbacMiddleware;

$auth = new RbacMiddleware($pdo, $_SESSION['user_id']);

// 1. Single Permission Check
if ($auth->can('income.create')) {
    // Show create button or handle creation
}

// 2. Strict Page or API Endpoint Protection
$auth->enforce('roles.edit'); // Halts execution with HTTP 403 if missing permission

// 3. Any or All Permission Checks
if ($auth->canAny(['income.view', 'reports.view'])) {
    // Render navigation link
}

// 4. Data Ownership Check
if (!$auth->validateOwnership($recordOwnerUserId)) {
    http_response_code(403);
    exit("Access Denied: You do not own this record.");
}
```
