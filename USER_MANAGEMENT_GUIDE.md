# Enterprise User Management System Guide - Z-FINANCE 1.0.0

## 1. Overview
The **Z-FINANCE Enterprise User Management System** provides a centralized, secure interface for Super Administrators to oversee every user account across the platform. Built on raw PHP 8+, PDO MySQL, and Bootstrap 5 AJAX architecture, it supports unlimited accounts, advanced multi-attribute searching, activity monitoring, and multi-tenant expansion readiness.

---

## 2. Core Architecture
- **Backend Class**: `modules/users/classes/UserManager.php`
- **Import/Export Class**: `modules/users/classes/UserImporterExporter.php`
- **Database Schema**: `modules/users/schema.sql`
- **REST Endpoints**: `modules/users/api/`
- **Frontend Hub**: `src/components/UserModule.tsx`, `assets/js/users.js`
- **Styles**: `assets/css/users.css`

---

## 3. Key Capabilities & Features

### 3.1 Super Administrator Protection (User ID #1)
- **Immutable Status**: Account ID #1 (Primary Super Admin) is protected against deletion, suspension, demotion, force logout, or impersonation.
- **Enforcement**: Guard checks inside `UserManager::checkSuperAdminProtection($userId)` automatically intercept and abort unauthorized mutations.

### 3.2 Comprehensive User Directory
- **Multi-Filter Engine**: Filter by keyword (Name, Email, Phone, Username), Role (Super Admin, Financial Controller, Auditor, Standard User), Status (Active, Suspended, Pending Verification, Locked), Two-Factor Status, and Department/Branch.
- **Dynamic Sorting**: Instant pagination and sorting by Creation Date, Last Login, Name, or Account Balance.

### 3.3 Account Security & Lifecycle Operations
- **Account Actions**:
  - **Create User**: Custom avatar selection, role assignment, initial password setup, mandatory 2FA option, subscription plan allocation.
  - **Edit Details**: Update contact details, role, department, branch, status, and subscription parameters.
  - **Suspend / Reactivate**: Immediate session invalidation upon suspension.
  - **Force Logout**: Clears active sessions and device tokens for the user.
  - **Password Reset**: Generates secure reset tokens or forces password change on next login.
  - **Toggle 2FA**: Admin override to enable or reset 2FA settings.

### 3.4 Multi-Device & Session Management
- **Device Tracking**: Monitored table `user_devices` captures browser user agent, IP address, device type, last active timestamp, and active session tokens.
- **Remote Revocation**: Admins can revoke individual device tokens or terminate all active user sessions with one click.

### 3.5 Document & Identity Verification
- **User Verification**: Managed table `user_documents` logs official identity documents (ID Card, Passport, Proof of Address, Tax Certificate).
- **Status Workflow**: Tracks `Pending`, `Approved`, or `Rejected` verification statuses with reviewer feedback notes.

### 3.6 Secure Administrative Impersonation
- **Audit-Logged Impersonation**: Super Administrators can safely inspect the platform as another user without knowing their password.
- **Session Bridge**: Creates an entry in `user_impersonations` recording the admin ID, target user ID, reason, start timestamp, and end timestamp.
- **Instant Exit**: A persistent banner allows the admin to switch back to their primary admin account at any time.

---

## 4. API Reference

| Endpoint | Method | Action |
| :--- | :--- | :--- |
| `modules/users/api/users.php?action=list` | `GET` | Paginated search and filtering |
| `modules/users/api/users.php?action=stats` | `GET` | User dashboard statistics |
| `modules/users/api/users.php?action=create` | `POST` | Create a new user account |
| `modules/users/api/users.php?action=update` | `PUT` | Update user details |
| `modules/users/api/users.php?action=delete` | `DELETE` | Delete or archive user account |
| `modules/users/api/users.php?action=status` | `POST` | Update user account status |
| `modules/users/api/impersonate.php` | `POST` | Start or stop impersonation session |
| `modules/users/api/documents.php` | `POST/GET`| Upload, approve, or reject user verification docs |

---

## 5. Audit & Compliance
Every user management transaction is logged into the audit ledger with:
- Admin User ID
- Affected Target User ID
- Exact Action Name (e.g., `USER_SUSPENDED`, `IMPERSONATION_STARTED`)
- IP Address & User Agent
- JSON Diff payload showing modified fields
