# 🔒 Z-FINANCE 1.0.0 — Security Guide

This document outlines the security architecture, threat mitigations, and data protection mechanisms implemented in the Z-FINANCE Authentication System.

---

## 🛡️ Security Mitigations & Standards

### 1. SQL Injection (SQLi) Protection
- **PDO Prepared Statements**: All database operations in `Auth.php`, `Security.php`, and `SessionManager.php` use strict PDO parameterized queries with bound variables. Direct string concatenation in SQL queries is strictly forbidden.
- **SQLite Fallback**: Sandbox environments automatically fall back to an in-memory SQLite schema using identical PDO parameters.

### 2. Cross-Site Scripting (XSS) Mitigation
- **UTF-8 HTML Sanitization**: All user inputs undergo sanitization via `Security::sanitize()` using `htmlspecialchars($data, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')`.
- **JSON Encoding**: API endpoints return strict `application/json; charset=utf-8` responses.

### 3. Cross-Site Request Forgery (CSRF) Protection
- **Session Tokens**: Every authentication form includes a hidden `csrf_token` field generated via `random_bytes(32)`.
- **Constant-Time Comparison**: Tokens are validated using `hash_equals()` to prevent timing attacks.

### 4. Brute Force Protection & Temporary Lockout
- **Rate Limiter (`login_attempts`)**: Tracks consecutive failed login attempts by account identifier and IP address.
- **Threshold**: After 5 failed attempts within 15 minutes, the account identifier is locked out for 900 seconds (15 minutes).
- **Log Events**: Triggering rate limit thresholds logs a `critical` severity event in `activity_logs`.

### 5. Password Security & Hashing
- **Argon2id / BCRYPT**: Passwords are hashed using `password_hash()` with `PASSWORD_ARGON2ID` (or `PASSWORD_BCRYPT` with cost 12 fallback).
- **Verification**: Evaluated using `password_verify()`. Plaintext passwords are never stored or logged.
- **Password Strength Analysis**: Client-side (`auth.js`) and server-side (`Security.php`) enforce minimum 8 characters, uppercase, lowercase, numbers, and special symbols with visual progress meter.
- **Password History (`password_history`)**: Tracks previous password hashes to prevent immediate reuse.

### 6. Secure Cookie Directives
- `HttpOnly`: Prevents JavaScript access to authentication cookies.
- `SameSite=Lax`: Protects against cross-site request forgery.
- `Secure`: Flags enforced automatically when running over HTTPS.

---

## 📊 Activity Logging Schema (`activity_logs`)

All security events are recorded in the `activity_logs` table:

```sql
CREATE TABLE activity_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NULL,
    event_type ENUM('registration', 'login', 'logout', 'failed_login', 'password_reset_request', 'password_reset_success', 'email_verification', 'phone_verification', 'session_revoked', 'account_locked'),
    severity ENUM('info', 'warning', 'critical'),
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT NULL,
    details_json JSON NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
