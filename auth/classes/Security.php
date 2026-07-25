<?php
/**
 * Z-FINANCE 1.0.0 - Enterprise Security Class
 * Handles CSRF Protection, XSS Sanitization, SQLi Prevention, Brute Force Rate Limiting,
 * and Password Security Analysis.
 */

namespace ZFinance\Auth;

class Security {
    
    /**
     * Generate CSRF Token for session
     */
    public static function generateCsrfToken(): string {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }

    /**
     * Verify CSRF Token
     */
    public static function verifyCsrfToken(?string $token): bool {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if (empty($_SESSION['csrf_token']) || empty($token)) {
            return false;
        }
        return hash_equals($_SESSION['csrf_token'], $token);
    }

    /**
     * Sanitize HTML / XSS prevention
     */
    public static function sanitize(string $data): string {
        return htmlspecialchars(trim($data), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }

    /**
     * Sanitize input array recursively
     */
    public static function sanitizeArray(array $array): array {
        $clean = [];
        foreach ($array as $key => $value) {
            $cleanKey = self::sanitize($key);
            if (is_array($value)) {
                $clean[$cleanKey] = self::sanitizeArray($value);
            } else if (is_string($value)) {
                $clean[$cleanKey] = self::sanitize($value);
            } else {
                $clean[$cleanKey] = $value;
            }
        }
        return $clean;
    }

    /**
     * Hash password using Argon2id or BCRYPT
     */
    public static function hashPassword(string $password): string {
        $algo = defined('PASSWORD_ARGON2ID') ? PASSWORD_ARGON2ID : PASSWORD_BCRYPT;
        return password_hash($password, $algo, ['cost' => 12]);
    }

    /**
     * Verify password hash
     */
    public static function verifyPassword(string $password, string $hash): bool {
        return password_verify($password, $hash);
    }

    /**
     * Calculate Password Strength Score (0 to 100) & Feedback
     */
    public static function checkPasswordStrength(string $password): array {
        $score = 0;
        $feedback = [];

        $length = strlen($password);
        if ($length >= 8) $score += 20;
        if ($length >= 12) $score += 20;
        if ($length >= 16) $score += 10;

        if (preg_match('/[a-z]/', $password)) $score += 10;
        if (preg_match('/[A-Z]/', $password)) $score += 15;
        if (preg_match('/[0-9]/', $password)) $score += 15;
        if (preg_match('/[^a-zA-Z0-9]/', $password)) $score += 10;

        // Feedback messages
        if ($length < 8) {
            $feedback[] = 'Minimum 8 characters required.';
        }
        if (!preg_match('/[A-Z]/', $password)) {
            $feedback[] = 'Include at least one uppercase letter.';
        }
        if (!preg_match('/[0-9]/', $password)) {
            $feedback[] = 'Include at least one number.';
        }
        if (!preg_match('/[^a-zA-Z0-9]/', $password)) {
            $feedback[] = 'Include at least one special character.';
        }

        $label = 'Weak';
        $color = '#dc3545';
        if ($score >= 80) {
            $label = 'Very Strong';
            $color = '#198754';
        } else if ($score >= 60) {
            $label = 'Strong';
            $color = '#20c997';
        } else if ($score >= 40) {
            $label = 'Fair';
            $color = '#ffc107';
        }

        return [
            'score' => min(100, $score),
            'label' => $label,
            'color' => $color,
            'feedback' => $feedback,
            'is_valid' => ($length >= 8 && preg_match('/[A-Z]/', $password) && preg_match('/[0-9]/', $password))
        ];
    }

    /**
     * Check Brute Force Rate Limit
     */
    public static function isRateLimited(\PDO $pdo, string $identifier, string $ipAddress, int $maxAttempts = 5, int $lockoutSeconds = 900): array {
        $stmt = $pdo->prepare("
            SELECT attempts_count, locked_until 
            FROM login_attempts 
            WHERE identifier = :identifier AND ip_address = :ip
            LIMIT 1
        ");
        $stmt->execute(['identifier' => $identifier, 'ip' => $ipAddress]);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);

        if ($row) {
            if ($row['locked_until'] !== null) {
                $lockedUntil = strtotime($row['locked_until']);
                if ($lockedUntil > time()) {
                    $remaining = $lockedUntil - time();
                    return [
                        'is_locked' => true,
                        'remaining_seconds' => $remaining,
                        'message' => "Account temporarily locked due to multiple failed attempts. Try again in " . ceil($remaining / 60) . " minutes."
                    ];
                }
            }
        }

        return [
            'is_locked' => false,
            'remaining_seconds' => 0,
            'attempts' => $row['attempts_count'] ?? 0
        ];
    }

    /**
     * Record Failed Login Attempt
     */
    public static function recordFailedAttempt(\PDO $pdo, string $identifier, string $ipAddress, int $maxAttempts = 5, int $lockoutSeconds = 900): void {
        $stmt = $pdo->prepare("
            SELECT id, attempts_count 
            FROM login_attempts 
            WHERE identifier = :identifier AND ip_address = :ip
            LIMIT 1
        ");
        $stmt->execute(['identifier' => $identifier, 'ip' => $ipAddress]);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);

        if ($row) {
            $newAttempts = $row['attempts_count'] + 1;
            $lockedUntil = null;
            if ($newAttempts >= $maxAttempts) {
                $lockedUntil = date('Y-m-d H:i:s', time() + $lockoutSeconds);
            }
            $update = $pdo->prepare("
                UPDATE login_attempts 
                SET attempts_count = :attempts, locked_until = :locked_until, last_attempt_at = NOW() 
                WHERE id = :id
            ");
            $update->execute([
                'attempts' => $newAttempts,
                'locked_until' => $lockedUntil,
                'id' => $row['id']
            ]);
        } else {
            $insert = $pdo->prepare("
                INSERT INTO login_attempts (identifier, ip_address, attempts_count, last_attempt_at) 
                VALUES (:identifier, :ip, 1, NOW())
            ");
            $insert->execute(['identifier' => $identifier, 'ip' => $ipAddress]);
        }
    }

    /**
     * Clear Failed Login Attempts on successful authentication
     */
    public static function clearFailedAttempts(\PDO $pdo, string $identifier, string $ipAddress): void {
        $stmt = $pdo->prepare("DELETE FROM login_attempts WHERE identifier = :identifier OR ip_address = :ip");
        $stmt->execute(['identifier' => $identifier, 'ip' => $ipAddress]);
    }
}
