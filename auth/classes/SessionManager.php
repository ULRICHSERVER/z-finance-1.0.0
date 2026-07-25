<?php
/**
 * Z-FINANCE 1.0.0 - Session Manager Class
 * Enterprise session management, multi-device tracking, session regeneration, and revocation.
 */

namespace ZFinance\Auth;

class SessionManager {
    
    private static int $sessionLifetime = 86400; // 24 hours

    /**
     * Start Secure PHP Session
     */
    public static function startSecureSession(): void {
        if (session_status() === PHP_SESSION_NONE) {
            ini_set('session.cookie_httponly', '1');
            ini_set('session.use_only_cookies', '1');
            ini_set('session.cookie_samesite', 'Lax');
            ini_set('session.gc_maxlifetime', (string)self::$sessionLifetime);
            
            if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
                ini_set('session.cookie_secure', '1');
            }

            session_start();
        }

        // Check for session timeout (inactivity > 30 mins)
        if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > 1800)) {
            self::destroySession();
            return;
        }

        $_SESSION['last_activity'] = time();
    }

    /**
     * Regenerate Session ID upon login / privilege change
     */
    public static function regenerateSessionId(): void {
        if (session_status() === PHP_SESSION_ACTIVE) {
            session_regenerate_id(true);
        }
    }

    /**
     * Track Active Device Session in Database
     */
    public static function registerActiveSession(\PDO $pdo, int $userId): void {
        self::startSecureSession();
        $sessionId = session_id();
        $ipAddress = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown Agent';

        // Detect device & browser simplified
        $deviceType = 'Desktop';
        if (preg_match('/(android|bb\d+|meego).+mobile|mobi|palm|phone|ip(hone|od)|tablet/i', $userAgent)) {
            $deviceType = 'Mobile / Tablet';
        }

        $browser = 'Browser';
        if (str_istr($userAgent, 'Firefox')) $browser = 'Firefox';
        elseif (str_istr($userAgent, 'Chrome')) $browser = 'Chrome';
        elseif (str_istr($userAgent, 'Safari')) $browser = 'Safari';
        elseif (str_istr($userAgent, 'Edge')) $browser = 'Edge';

        $platform = 'OS';
        if (str_istr($userAgent, 'Windows')) $platform = 'Windows';
        elseif (str_istr($userAgent, 'Macintosh')) $platform = 'macOS';
        elseif (str_istr($userAgent, 'Linux')) $platform = 'Linux';
        elseif (str_istr($userAgent, 'iPhone') || str_istr($userAgent, 'iPad')) $platform = 'iOS';
        elseif (str_istr($userAgent, 'Android')) $platform = 'Android';

        $stmt = $pdo->prepare("
            INSERT INTO active_sessions (session_id, user_id, ip_address, user_agent, device_type, browser, platform, last_activity)
            VALUES (:session_id, :user_id, :ip, :ua, :device, :browser, :platform, NOW())
            ON DUPLICATE KEY UPDATE 
                last_activity = NOW(),
                ip_address = VALUES(ip_address),
                user_agent = VALUES(user_agent)
        ");

        $stmt->execute([
            'session_id' => $sessionId,
            'user_id' => $userId,
            'ip' => $ipAddress,
            'ua' => substr($userAgent, 0, 255),
            'device' => $deviceType,
            'browser' => $browser,
            'platform' => $platform
        ]);
    }

    /**
     * Get All Active Sessions for User
     */
    public static function getUserActiveSessions(\PDO $pdo, int $userId): array {
        $stmt = $pdo->prepare("
            SELECT id, session_id, ip_address, device_type, browser, platform, last_activity, created_at
            FROM active_sessions
            WHERE user_id = :user_id
            ORDER BY last_activity DESC
        ");
        $stmt->execute(['user_id' => $userId]);
        $currentSessionId = session_id();

        $sessions = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($sessions as &$s) {
            $s['is_current'] = ($s['session_id'] === $currentSessionId);
        }
        return $sessions;
    }

    /**
     * Logout / Invalidate Current Device Session
     */
    public static function logoutCurrentSession(\PDO $pdo, int $userId): void {
        self::startSecureSession();
        $sessionId = session_id();

        $stmt = $pdo->prepare("DELETE FROM active_sessions WHERE session_id = :session_id AND user_id = :user_id");
        $stmt->execute(['session_id' => $sessionId, 'user_id' => $userId]);

        self::destroySession();
    }

    /**
     * Logout All Other Device Sessions
     */
    public static function logoutOtherSessions(\PDO $pdo, int $userId): int {
        self::startSecureSession();
        $currentSessionId = session_id();

        $stmt = $pdo->prepare("DELETE FROM active_sessions WHERE user_id = :user_id AND session_id != :session_id");
        $stmt->execute(['user_id' => $userId, 'session_id' => $currentSessionId]);

        return $stmt->rowCount();
    }

    /**
     * Destroy PHP Session Completely
     */
    public static function destroySession(): void {
        if (session_status() === PHP_SESSION_ACTIVE) {
            $_SESSION = [];
            if (ini_get("session.use_cookies")) {
                $params = session_get_cookie_params();
                setcookie(session_name(), '', time() - 42000,
                    $params["path"], $params["domain"],
                    $params["secure"], $params["httponly"]
                );
            }
            session_destroy();
        }
    }
}

// Helper polyfill function for string check
if (!function_exists('ZFinance\Auth\str_istr')) {
    function str_istr(string $haystack, string $needle): bool {
        return stripos($haystack, $needle) !== false;
    }
}
