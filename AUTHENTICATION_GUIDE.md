# 🛡️ Z-FINANCE 1.0.0 — Enterprise Authentication Guide

The **Authentication Foundation** of Z-FINANCE 1.0.0 is a complete, enterprise-grade, modular, responsive, offline-aware, and multilingual authentication system built using **PHP 8+**, **PDO**, **MySQL**, **Bootstrap 5**, and **AJAX**.

---

## 🌟 Architecture Principles

1. **Bootstrap Modals (No Page Redirects)**: All authentication flows (login, registration, forgot password, reset password, email verification, phone verification, and resend verification) operate inside responsive Bootstrap 5 modal windows. Users never leave their current context.
2. **Full AJAX Asynchronous Communication**: Form submissions are handled asynchronously via JavaScript (`assets/js/auth.js`) using JSON payloads to PHP API endpoints (`/modules/auth/api/*.php`).
3. **Automatic Provisioning**: Successful user registration automatically provisions:
   - **User Profile** (`user_profiles`)
   - **Default Preferences** (`user_preferences`)
   - **Executive Dashboard** (`user_dashboards`)
   - **Default Workspace** (`user_workspaces`)
   - **Initial Password History** (`password_history`)
   - **Verification Token** (`auth_tokens`)
4. **Offline Awareness**: When the network connection is lost (`navigator.onLine === false`), the authentication engine intercepts form submissions, alerts the user that authentication requires an active internet connection, and queues non-sensitive actions.

---

## 📂 Module File Directory Structure

```
/modules/auth/
├── schema.sql                      # Complete MySQL 8.0+ / MariaDB table schema
├── classes/
│   ├── Security.php                # CSRF, XSS, rate limiting, password hashing & password strength
│   ├── Validator.php               # Data validation rules
│   ├── SessionManager.php          # Session security, multi-device tracking, session revocation
│   ├── Auth.php                    # Core authentication engine (register, login, reset, verify)
│   └── Mailer.php                  # Verification & password reset email dispatch engine
├── api/
│   ├── db_connect.php              # PDO Database connection helper with SQLite memory fallback
│   ├── login.php                   # AJAX Login endpoint
│   ├── register.php                # AJAX Registration endpoint
│   ├── forgot_password.php         # AJAX Forgot password token endpoint
│   ├── reset_password.php          # AJAX Reset password endpoint
│   ├── verify_email.php            # AJAX Email token verification endpoint
│   ├── resend_verification.php     # AJAX Resend verification endpoint
│   ├── verify_phone.php            # AJAX Phone SMS verification endpoint
│   ├── sessions.php                # AJAX Active session listing & device termination endpoint
│   ├── status.php                  # AJAX Session status & authenticated user data
│   └── logout.php                  # AJAX Session termination & cookie cleanup endpoint
├── views/
│   └── modals.php                  # Bootstrap 5 HTML Modals for all auth flows
└── emails/
    ├── email_verification.html     # HTML email template for verification
    └── password_reset.html        # HTML email template for password resets

/assets/
├── css/
│   └── auth.css                    # Custom styles for auth modals, password strength meter, device session cards
└── js/
    └── auth.js                     # Client-side JavaScript auth engine (network detection, AJAX, modal handlers)
```

---

## 🔑 Authentication Endpoints & Usage

### 1. AJAX Login (`POST /modules/auth/api/login.php`)
Supports sign in using **Username**, **Email Address**, or **Phone Number**.
```json
// Request Body
{
  "login_identifier": "alex_vance",
  "password": "SecurePassword123!",
  "remember_me": true,
  "csrf_token": "a1b2c3d4..."
}

// Response
{
  "success": true,
  "message": "Login successful! Welcome back, Alexander.",
  "user": {
    "id": 1,
    "uuid": "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
    "username": "alex_vance",
    "email": "a.vance@zfinance.com",
    "role": "Super Administrator",
    "status": "active"
  }
}
```

### 2. AJAX Registration (`POST /modules/auth/api/register.php`)
```json
// Request Body
{
  "first_name": "John",
  "last_name": "Doe",
  "username": "johndoe88",
  "email": "john.doe@company.com",
  "phone": "+15551234567",
  "password": "StrongPassword123!",
  "confirm_password": "StrongPassword123!",
  "language": "en",
  "timezone": "UTC",
  "currency": "USD",
  "accept_terms": true,
  "newsletter": true
}
```

### 3. Verification & Password Resets
- `POST /modules/auth/api/forgot_password.php`: Dispatches a 1-hour expiration token.
- `POST /modules/auth/api/reset_password.php`: Validates token & updates password.
- `GET/POST /modules/auth/api/verify_email.php`: Upgrades user status from `email_verification_pending` to `active`.
- `POST /modules/auth/api/resend_verification.php`: Invalidates stale tokens & generates a new 24-hour verification token.

---

## 👥 Prepared User Roles

| Role ID | Role Code | Role Name | Scope & Permissions |
|---|---|---|---|
| 1 | `super_admin` | Super Administrator | Full system access & multi-tenant configuration |
| 2 | `administrator` | Administrator | User management & financial system administration |
| 3 | `manager` | Manager | Departmental management & approval workflows |
| 4 | `employee` | Employee | Expense claims & staff financial entry |
| 5 | `standard_user` | Standard User | Default personal financial dashboard access |
| 6 | `guest` | Guest | Read-only trial access |

---

## 🚦 Account Status Lifecycle

1. `pending`: Initial creation pending administrative review.
2. `email_verification_pending`: Awaiting email verification link click or code entry.
3. `active`: Full account functionality enabled.
4. `inactive`: Account temporarily disabled by user or admin.
5. `suspended`: Account suspended due to policy or security violation.
6. `blocked`: Account permanently blocked due to repeated brute force or malicious activity.
7. `deleted`: Soft-deleted account awaiting purge.
