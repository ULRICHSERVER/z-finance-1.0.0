# 🔑 Z-FINANCE 1.0.0 — Enterprise Role-Based Access Control (RBAC) Guide

The **Central RBAC System** of Z-FINANCE 1.0.0 provides enterprise-grade, highly granular, modular, and scalable authorization services for all existing and future modules.

---

## 🌟 Architectural Features

1. **Hierarchy-Aware Inheritance**: Roles possess explicit hierarchy levels (Super Administrator = 100 down to Guest = 10). Higher-level roles inherit lower capabilities unless explicitly denied.
2. **Visual Permission Matrix**: A multi-role x multi-capability interactive matrix enabling Super Administrators to check or uncheck individual capabilities across roles or bulk-toggle entire permission groups.
3. **Direct User Permission Overrides**: Grants capability to assign explicit grants or explicit denials to specific users (`user_permissions`).
   - **Precedence Rule**: `Direct User Override > Role Permission`.
4. **Data Access Control Scopes**: Each role defines a default record boundary:
   - `own_records`: Access limited to user's created records.
   - `department_records`: Access limited to user's assigned department.
   - `branch_records`: Access limited to user's branch.
   - `company_records`: Access across entire company tenant.
   - `global_access`: Unmitigated system-wide access.
5. **Super Admin Immutability**: Role ID `1` (Super Administrator) and User ID `1` (Primary Super Admin) cannot be deleted, deactivated, or stripped of Super Administrator permissions.
6. **Future Module Auto-Registration**: `PermissionRegistrar` allows any future module (CRM, Expenses, Invoicing) to register its permission groups and actions dynamically without editing core code.

---

## 📂 File Directory Structure

```
/modules/rbac/
├── schema.sql                      # Complete MySQL 8.0+ schema for RBAC (9 tables)
├── classes/
│   ├── RbacManager.php            # Core RBAC management engine
│   ├── PermissionRegistrar.php    # Dynamic module permission registrar
│   └── RbacMiddleware.php         # Authorization middleware & checks
└── api/
    ├── roles.php                  # AJAX Role CRUD, cloning, search & restore
    ├── permissions.php            # AJAX Permission groups & matrix data
    ├── user_access.php            # AJAX Role assignment & direct overrides
    └── audit_logs.php             # Security audit logs
```
