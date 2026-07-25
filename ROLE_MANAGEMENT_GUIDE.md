# 🛡️ Z-FINANCE 1.0.0 — Role Management Guide

This guide details role creation, hierarchy configuration, cloning, soft deletion, and data scope boundaries in Z-FINANCE.

---

## 👥 Default Prepared System Roles

| Role Code | Role Name | Hierarchy Level | Data Scope | Description |
|---|---|---|---|---|
| `super_admin` | Super Administrator | 100 | `global_access` | Unmitigated system control |
| `administrator` | Administrator | 90 | `company_records` | System & user administration |
| `finance_manager` | Finance Manager | 80 | `company_records` | Financial oversight & approvals |
| `manager` | Manager | 70 | `branch_records` | Departmental management |
| `supervisor` | Supervisor | 60 | `department_records` | Team operational management |
| `accountant` | Accountant | 50 | `company_records` | Ledger entry & audit |
| `employee` | Employee | 40 | `own_records` | Staff expense claims |
| `standard_user` | Standard User | 30 | `own_records` | Standard user access |
| `guest` | Guest | 10 | `own_records` | Read-only trial access |

---

## 🔄 Role Management Operations

1. **Create Role**: Super Administrators can define custom roles with custom hierarchy levels and data scopes via `RbacManager::createRole()`.
2. **Clone / Duplicate Role**: `RbacManager::cloneRole()` copies all granted permissions from an existing role into a new custom role template.
3. **Soft Delete & Restore**: Deleting custom roles soft-deletes them (`is_deleted = 1`). System-protected roles (`is_system = 1`) cannot be deleted.
