# 📱 Z-FINANCE 1.0.0 — Session Management Guide

This guide details session lifecycle management, multi-device tracking, and session revocation in Z-FINANCE.

---

## ⚙️ Session Architecture (`SessionManager.php`)

### 1. Secure Session Initialization
`SessionManager::startSecureSession()` configures PHP sessions with the following settings before initiating `session_start()`:
- `session.cookie_httponly = 1`
- `session.use_only_cookies = 1`
- `session.cookie_samesite = Lax`
- `session.gc_maxlifetime = 86400` (24 Hours)

### 2. Inactivity Timeout
Active sessions automatically expire after 30 minutes of user inactivity (`$_SESSION['last_activity']`). Upon timeout, the session is destroyed and cookies are cleared.

### 3. Session Fixation Defense
Upon successful user login or privilege escalation, `SessionManager::regenerateSessionId()` triggers `session_regenerate_id(true)` to generate a new session identifier and delete the old session file.

---

## 💻 Multi-Device Session Tracking (`active_sessions`)

Every authenticated login registers an entry in the `active_sessions` database table:

```sql
CREATE TABLE active_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(128) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT NOT NULL,
    device_type VARCHAR(50) NOT NULL DEFAULT 'Desktop',
    browser VARCHAR(50) NOT NULL DEFAULT 'Unknown',
    platform VARCHAR(50) NOT NULL DEFAULT 'Unknown',
    last_activity DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Remote Device Session Termination
Users can view all active signed-in devices (e.g. Workstation, Mobile Safari, Windows laptop) and click **"Revoke Other Sessions"** to log out all other remote devices while maintaining their current session.

```php
// Terminate all other sessions for current user
SessionManager::logoutOtherSessions($pdo, $userId);
```
