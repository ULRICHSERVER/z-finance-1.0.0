<?php
/**
 * Database connection helper for Z-FINANCE Auth API
 */

function getAuthPdo(): \PDO {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $host = process_env('DB_HOST', 'localhost');
    $db   = process_env('DB_NAME', 'zfinance');
    $user = process_env('DB_USER', 'root');
    $pass = process_env('DB_PASS', '');

    try {
        $dsn = "mysql:host={$host};dbname={$db};charset=utf8mb4";
        $pdo = new \PDO($dsn, $user, $pass, [
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            \PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (\PDOException $e) {
        // Fallback SQLite in-memory database for sandbox / demo execution
        $pdo = new \PDO('sqlite::memory:');
        $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        // Execute schema compatibility for SQLite
        bootstrapSqliteSchema($pdo);
    }

    return $pdo;
}

function process_env($key, $default = '') {
    return $_ENV[$key] ?? getenv($key) ?: $default;
}

function bootstrapSqliteSchema(\PDO $pdo): void {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS user_roles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT UNIQUE,
            name TEXT,
            description TEXT,
            permissions_json TEXT
        );
        INSERT OR IGNORE INTO user_roles (id, code, name, description) VALUES 
        (1, 'super_admin', 'Super Administrator', 'Full system access'),
        (2, 'administrator', 'Administrator', 'Administrative access'),
        (3, 'manager', 'Manager', 'Departmental management'),
        (4, 'employee', 'Employee', 'Staff member'),
        (5, 'standard_user', 'Standard User', 'Standard user'),
        (6, 'guest', 'Guest', 'Guest access');

        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            uuid TEXT UNIQUE,
            role_id INTEGER DEFAULT 5,
            first_name TEXT,
            last_name TEXT,
            username TEXT UNIQUE,
            email TEXT UNIQUE,
            phone TEXT UNIQUE,
            password_hash TEXT,
            status TEXT DEFAULT 'email_verification_pending',
            avatar_url TEXT,
            language TEXT DEFAULT 'en',
            timezone TEXT DEFAULT 'UTC',
            currency TEXT DEFAULT 'USD',
            email_verified_at TEXT,
            phone_verified_at TEXT,
            last_login_at TEXT,
            last_login_ip TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS user_profiles (
            user_id INTEGER PRIMARY KEY,
            bio TEXT, company TEXT, job_title TEXT, address TEXT, city TEXT, country TEXT, postal_code TEXT,
            created_at TEXT, updated_at TEXT
        );

        CREATE TABLE IF NOT EXISTS user_preferences (
            user_id INTEGER PRIMARY KEY,
            theme TEXT DEFAULT 'auto', email_notifications INTEGER DEFAULT 1, sms_notifications INTEGER DEFAULT 0,
            two_factor_enabled INTEGER DEFAULT 0, newsletter_opt_in INTEGER DEFAULT 0,
            created_at TEXT, updated_at TEXT
        );

        CREATE TABLE IF NOT EXISTS user_dashboards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER, dashboard_title TEXT, layout_json TEXT, default_view TEXT,
            created_at TEXT, updated_at TEXT
        );

        CREATE TABLE IF NOT EXISTS user_workspaces (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            uuid TEXT UNIQUE, user_id INTEGER, name TEXT, is_default INTEGER,
            created_at TEXT, updated_at TEXT
        );

        CREATE TABLE IF NOT EXISTS auth_tokens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER, token_hash TEXT UNIQUE, token_type TEXT, expires_at TEXT, used_at TEXT,
            created_at TEXT
        );

        CREATE TABLE IF NOT EXISTS active_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT UNIQUE, user_id INTEGER, ip_address TEXT, user_agent TEXT, device_type TEXT,
            browser TEXT, platform TEXT, last_activity TEXT, created_at TEXT
        );

        CREATE TABLE IF NOT EXISTS login_attempts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            identifier TEXT, ip_address TEXT, attempts_count INTEGER DEFAULT 1, locked_until TEXT,
            last_attempt_at TEXT
        );

        CREATE TABLE IF NOT EXISTS activity_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER, event_type TEXT, severity TEXT, ip_address TEXT, user_agent TEXT,
            details_json TEXT, created_at TEXT
        );

        CREATE TABLE IF NOT EXISTS password_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER, password_hash TEXT, created_at TEXT
        );
    ");
}
