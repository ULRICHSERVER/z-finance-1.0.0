<?php
/**
 * Z-FINANCE 1.0.0 - Core Authentication Engine
 * Handles user registration, login, password resets, email verification, tokens,
 * automatic profile/dashboard/workspace provisioning, and activity logging.
 */

namespace ZFinance\Auth;

class Auth {
    private \PDO $pdo;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
    }

    /**
     * Helper to generate UUID v4
     */
    private function generateUuid(): string {
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }

    /**
     * Log activity event
     */
    public function logActivity(?int $userId, string $eventType, string $severity, array $details = []): void {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
        $ua = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown Agent';

        $stmt = $this->pdo->prepare("
            INSERT INTO activity_logs (user_id, event_type, severity, ip_address, user_agent, details_json, created_at)
            VALUES (:user_id, :event_type, :severity, :ip, :ua, :details, NOW())
        ");
        $stmt->execute([
            'user_id' => $userId,
            'event_type' => $eventType,
            'severity' => $severity,
            'ip' => $ip,
            'ua' => substr($ua, 0, 255),
            'details' => json_encode($details)
        ]);
    }

    /**
     * Register New User
     * Automatically provisions Profile, Preferences, Default Dashboard, and Default Workspace
     */
    public function register(array $data): array {
        $validation = Validator::validateRegistration($data);
        if (!$validation['is_valid']) {
            return ['success' => false, 'errors' => $validation['errors']];
        }

        // Check duplicate email or username
        $check = $this->pdo->prepare("SELECT id, email, username FROM users WHERE email = :email OR username = :username LIMIT 1");
        $check->execute(['email' => $data['email'], 'username' => $data['username']]);
        $existing = $check->fetch(\PDO::FETCH_ASSOC);

        if ($existing) {
            $errors = [];
            if ($existing['email'] === $data['email']) $errors['email'] = 'Email address is already registered.';
            if ($existing['username'] === $data['username']) $errors['username'] = 'Username is already taken.';
            return ['success' => false, 'errors' => $errors];
        }

        $this->pdo->beginTransaction();

        try {
            $userUuid = $this->generateUuid();
            $passwordHash = Security::hashPassword($data['password']);
            $defaultRole = 5; // Standard User

            // 1. Insert User
            $stmt = $this->pdo->prepare("
                INSERT INTO users (uuid, role_id, first_name, last_name, username, email, phone, password_hash, status, language, timezone, currency, created_at)
                VALUES (:uuid, :role_id, :first_name, :last_name, :username, :email, :phone, :password_hash, 'email_verification_pending', :language, :timezone, :currency, NOW())
            ");
            $stmt->execute([
                'uuid' => $userUuid,
                'role_id' => $defaultRole,
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'username' => $data['username'],
                'email' => $data['email'],
                'phone' => !empty($data['phone']) ? $data['phone'] : null,
                'password_hash' => $passwordHash,
                'language' => $data['language'] ?? 'en',
                'timezone' => $data['timezone'] ?? 'UTC',
                'currency' => $data['currency'] ?? 'USD'
            ]);

            $userId = (int)$this->pdo->lastInsertId();

            // 2. Automatically Create User Profile
            $stmtProf = $this->pdo->prepare("INSERT INTO user_profiles (user_id, created_at) VALUES (:user_id, NOW())");
            $stmtProf->execute(['user_id' => $userId]);

            // 3. Automatically Create Default Preferences
            $stmtPref = $this->pdo->prepare("
                INSERT INTO user_preferences (user_id, theme, email_notifications, newsletter_opt_in, created_at)
                VALUES (:user_id, 'auto', 1, :newsletter, NOW())
            ");
            $stmtPref->execute([
                'user_id' => $userId,
                'newsletter' => !empty($data['newsletter']) ? 1 : 0
            ]);

            // 4. Automatically Create Default Executive Dashboard
            $stmtDash = $this->pdo->prepare("
                INSERT INTO user_dashboards (user_id, dashboard_title, default_view, created_at)
                VALUES (:user_id, 'My Executive Financial Overview', 'income_analytics', NOW())
            ");
            $stmtDash->execute(['user_id' => $userId]);

            // 5. Automatically Create Default Workspace
            $wsUuid = $this->generateUuid();
            $stmtWs = $this->pdo->prepare("
                INSERT INTO user_workspaces (uuid, user_id, name, is_default, created_at)
                VALUES (:uuid, :user_id, 'Personal Workspace', 1, NOW())
            ");
            $stmtWs->execute(['uuid' => $wsUuid, 'user_id' => $userId]);

            // 6. Record Password History
            $stmtHist = $this->pdo->prepare("INSERT INTO password_history (user_id, password_hash, created_at) VALUES (:user_id, :hash, NOW())");
            $stmtHist->execute(['user_id' => $userId, 'hash' => $passwordHash]);

            // 7. Generate Email Verification Token
            $verificationToken = bin2hex(random_bytes(32));
            $tokenHash = hash('sha256', $verificationToken);
            $expiresAt = date('Y-m-d H:i:s', strtotime('+24 hours'));

            $stmtTok = $this->pdo->prepare("
                INSERT INTO auth_tokens (user_id, token_hash, token_type, expires_at, created_at)
                VALUES (:user_id, :token_hash, 'email_verify', :expires_at, NOW())
            ");
            $stmtTok->execute([
                'user_id' => $userId,
                'token_hash' => $tokenHash,
                'expires_at' => $expiresAt
            ]);

            // Send Verification Email
            Mailer::sendVerificationEmail($data['email'], $data['first_name'] . ' ' . $data['last_name'], $verificationToken);

            $this->logActivity($userId, 'registration', 'info', ['email' => $data['email'], 'username' => $data['username']]);

            $this->pdo->commit();

            return [
                'success' => true,
                'message' => 'Registration successful! A verification link has been sent to your email address.',
                'user_id' => $userId,
                'verification_token' => $verificationToken // returned for testing/preview
            ];

        } catch (\Exception $e) {
            $this->pdo->rollBack();
            return ['success' => false, 'message' => 'Database registration error: ' . $e->getMessage()];
        }
    }

    /**
     * User Login (Supports Username, Email, Phone)
     */
    public function login(string $identifier, string $password, bool $rememberMe = false): array {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';

        // Check Brute Force Rate Limit
        $rateLimit = Security::isRateLimited($this->pdo, $identifier, $ip);
        if ($rateLimit['is_locked']) {
            $this->logActivity(null, 'failed_login', 'warning', ['identifier' => $identifier, 'reason' => 'Rate limit exceeded']);
            return ['success' => false, 'message' => $rateLimit['message']];
        }

        // Find user by Username, Email, OR Phone
        $stmt = $this->pdo->prepare("
            SELECT u.*, r.code as role_code, r.name as role_name
            FROM users u
            JOIN user_roles r ON u.role_id = r.id
            WHERE u.username = :ident OR u.email = :ident OR u.phone = :ident
            LIMIT 1
        ");
        $stmt->execute(['ident' => $identifier]);
        $user = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$user) {
            Security::recordFailedAttempt($this->pdo, $identifier, $ip);
            $this->logActivity(null, 'failed_login', 'warning', ['identifier' => $identifier, 'reason' => 'User not found']);
            return ['success' => false, 'message' => 'Invalid login credentials.'];
        }

        // Verify Status
        if (in_array($user['status'], ['suspended', 'blocked', 'deleted'])) {
            $this->logActivity((int)$user['id'], 'failed_login', 'critical', ['reason' => 'Account ' . $user['status']]);
            return ['success' => false, 'message' => "Your account is currently {$user['status']}. Please contact system support."];
        }

        // Verify Password
        if (!Security::verifyPassword($password, $user['password_hash'])) {
            Security::recordFailedAttempt($this->pdo, $identifier, $ip);
            $this->logActivity((int)$user['id'], 'failed_login', 'warning', ['reason' => 'Incorrect password']);
            return ['success' => false, 'message' => 'Invalid login credentials.'];
        }

        // Clear failed attempts
        Security::clearFailedAttempts($this->pdo, $identifier, $ip);

        // Session Setup
        SessionManager::startSecureSession();
        SessionManager::regenerateSessionId();

        $_SESSION['user_id'] = (int)$user['id'];
        $_SESSION['uuid'] = $user['uuid'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['role_code'] = $user['role_code'];
        $_SESSION['role_name'] = $user['role_name'];
        $_SESSION['full_name'] = $user['first_name'] . ' ' . $user['last_name'];
        $_SESSION['status'] = $user['status'];
        $_SESSION['logged_in'] = true;

        // Register active session in database
        SessionManager::registerActiveSession($this->pdo, (int)$user['id']);

        // Update last login timestamp & IP
        $updateStmt = $this->pdo->prepare("UPDATE users SET last_login_at = NOW(), last_login_ip = :ip WHERE id = :id");
        $updateStmt->execute(['ip' => $ip, 'id' => $user['id']]);

        // Remember Me Cookie handling
        $rememberToken = null;
        if ($rememberMe) {
            $rememberToken = bin2hex(random_bytes(32));
            $tokenHash = hash('sha256', $rememberToken);
            $expiresAt = date('Y-m-d H:i:s', strtotime('+30 days'));

            $stmtTok = $this->pdo->prepare("
                INSERT INTO auth_tokens (user_id, token_hash, token_type, expires_at, created_at)
                VALUES (:user_id, :token_hash, 'remember_me', :expires_at, NOW())
            ");
            $stmtTok->execute([
                'user_id' => $user['id'],
                'token_hash' => $tokenHash,
                'expires_at' => $expiresAt
            ]);

            setcookie('zfin_remember', $rememberToken, [
                'expires' => time() + (86400 * 30),
                'path' => '/',
                'httponly' => true,
                'samesite' => 'Lax'
            ]);
        }

        $this->logActivity((int)$user['id'], 'login', 'info', ['remember_me' => $rememberMe]);

        return [
            'success' => true,
            'message' => 'Login successful! Welcome back, ' . htmlspecialchars($user['first_name']) . '.',
            'user' => [
                'id' => (int)$user['id'],
                'uuid' => $user['uuid'],
                'username' => $user['username'],
                'email' => $user['email'],
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'role' => $user['role_name'],
                'status' => $user['status'],
                'email_verified' => !empty($user['email_verified_at'])
            ]
        ];
    }

    /**
     * Request Password Reset
     */
    public function requestPasswordReset(string $email): array {
        $stmt = $this->pdo->prepare("SELECT id, first_name, last_name, email FROM users WHERE email = :email LIMIT 1");
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$user) {
            // For security, do not disclose whether email exists
            return ['success' => true, 'message' => 'If your email is registered, you will receive password reset instructions shortly.'];
        }

        $resetToken = bin2hex(random_bytes(32));
        $tokenHash = hash('sha256', $resetToken);
        $expiresAt = date('Y-m-d H:i:s', strtotime('+1 hour'));

        // Invalidate old reset tokens
        $invStmt = $this->pdo->prepare("UPDATE auth_tokens SET used_at = NOW() WHERE user_id = :user_id AND token_type = 'password_reset' AND used_at IS NULL");
        $invStmt->execute(['user_id' => $user['id']]);

        // Insert new reset token
        $tokStmt = $this->pdo->prepare("
            INSERT INTO auth_tokens (user_id, token_hash, token_type, expires_at, created_at)
            VALUES (:user_id, :token_hash, 'password_reset', :expires_at, NOW())
        ");
        $tokStmt->execute([
            'user_id' => $user['id'],
            'token_hash' => $tokenHash,
            'expires_at' => $expiresAt
        ]);

        Mailer::sendPasswordResetEmail($user['email'], $user['first_name'] . ' ' . $user['last_name'], $resetToken);

        $this->logActivity((int)$user['id'], 'password_reset_request', 'info', ['email' => $email]);

        return [
            'success' => true,
            'message' => 'If your email is registered, you will receive password reset instructions shortly.',
            'reset_token' => $resetToken // returned for testing/preview
        ];
    }

    /**
     * Complete Password Reset with Token
     */
    public function resetPassword(string $token, string $newPassword): array {
        $tokenHash = hash('sha256', $token);

        $stmt = $this->pdo->prepare("
            SELECT t.id as token_id, t.user_id, t.expires_at, t.used_at, u.email
            FROM auth_tokens t
            JOIN users u ON t.user_id = u.id
            WHERE t.token_hash = :hash AND t.token_type = 'password_reset'
            LIMIT 1
        ");
        $stmt->execute(['hash' => $tokenHash]);
        $tokenRow = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$tokenRow) {
            return ['success' => false, 'message' => 'Invalid or expired password reset token.'];
        }

        if ($tokenRow['used_at'] !== null) {
            return ['success' => false, 'message' => 'This password reset token has already been used.'];
        }

        if (strtotime($tokenRow['expires_at']) < time()) {
            return ['success' => false, 'message' => 'Password reset token has expired. Please request a new link.'];
        }

        $strength = Security::checkPasswordStrength($newPassword);
        if (!$strength['is_valid']) {
            return ['success' => false, 'message' => 'New password does not meet security requirements.'];
        }

        $newHash = Security::hashPassword($newPassword);

        $this->pdo->beginTransaction();
        try {
            // Update User password
            $updateUser = $this->pdo->prepare("UPDATE users SET password_hash = :hash, updated_at = NOW() WHERE id = :id");
            $updateUser->execute(['hash' => $newHash, 'id' => $tokenRow['user_id']]);

            // Mark Token as used
            $markUsed = $this->pdo->prepare("UPDATE auth_tokens SET used_at = NOW() WHERE id = :id");
            $markUsed->execute(['id' => $tokenRow['token_id']]);

            // Add to Password History
            $hist = $this->pdo->prepare("INSERT INTO password_history (user_id, password_hash, created_at) VALUES (:user_id, :hash, NOW())");
            $hist->execute(['user_id' => $tokenRow['user_id'], 'hash' => $newHash]);

            $this->logActivity((int)$tokenRow['user_id'], 'password_reset_success', 'info', []);

            $this->pdo->commit();

            return ['success' => true, 'message' => 'Your password has been successfully reset! You can now log in with your new password.'];

        } catch (\Exception $e) {
            $this->pdo->rollBack();
            return ['success' => false, 'message' => 'Reset error: ' . $e->getMessage()];
        }
    }

    /**
     * Verify Email Token
     */
    public function verifyEmail(string $token): array {
        $tokenHash = hash('sha256', $token);

        $stmt = $this->pdo->prepare("
            SELECT t.id as token_id, t.user_id, t.expires_at, t.used_at, u.status, u.email
            FROM auth_tokens t
            JOIN users u ON t.user_id = u.id
            WHERE t.token_hash = :hash AND t.token_type = 'email_verify'
            LIMIT 1
        ");
        $stmt->execute(['hash' => $tokenHash]);
        $tokenRow = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$tokenRow) {
            return ['success' => false, 'message' => 'Invalid email verification code or link.'];
        }

        if ($tokenRow['used_at'] !== null) {
            return ['success' => false, 'message' => 'Email address has already been verified.'];
        }

        if (strtotime($tokenRow['expires_at']) < time()) {
            return ['success' => false, 'message' => 'Verification code has expired. Please request a new verification email.'];
        }

        $this->pdo->beginTransaction();
        try {
            // Activate User
            $upd = $this->pdo->prepare("
                UPDATE users 
                SET email_verified_at = NOW(), status = 'active', updated_at = NOW() 
                WHERE id = :id
            ");
            $upd->execute(['id' => $tokenRow['user_id']]);

            // Mark Token as used
            $mark = $this->pdo->prepare("UPDATE auth_tokens SET used_at = NOW() WHERE id = :id");
            $mark->execute(['id' => $tokenRow['token_id']]);

            $this->logActivity((int)$tokenRow['user_id'], 'email_verification', 'info', ['email' => $tokenRow['email']]);

            $this->pdo->commit();

            return ['success' => true, 'message' => 'Email verified successfully! Your account is now active.'];

        } catch (\Exception $e) {
            $this->pdo->rollBack();
            return ['success' => false, 'message' => 'Verification error: ' . $e->getMessage()];
        }
    }

    /**
     * Resend Verification Email
     */
    public function resendVerification(string $email): array {
        $stmt = $this->pdo->prepare("SELECT id, first_name, last_name, email, status FROM users WHERE email = :email LIMIT 1");
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$user) {
            return ['success' => false, 'message' => 'No account found with that email address.'];
        }

        if ($user['status'] === 'active') {
            return ['success' => false, 'message' => 'This email address is already verified.'];
        }

        // Invalidate previous tokens
        $inv = $this->pdo->prepare("UPDATE auth_tokens SET used_at = NOW() WHERE user_id = :user_id AND token_type = 'email_verify' AND used_at IS NULL");
        $inv->execute(['user_id' => $user['id']]);

        // Create new token
        $verificationToken = bin2hex(random_bytes(32));
        $tokenHash = hash('sha256', $verificationToken);
        $expiresAt = date('Y-m-d H:i:s', strtotime('+24 hours'));

        $stmtTok = $this->pdo->prepare("
            INSERT INTO auth_tokens (user_id, token_hash, token_type, expires_at, created_at)
            VALUES (:user_id, :token_hash, 'email_verify', :expires_at, NOW())
        ");
        $stmtTok->execute([
            'user_id' => $user['id'],
            'token_hash' => $tokenHash,
            'expires_at' => $expiresAt
        ]);

        Mailer::sendVerificationEmail($user['email'], $user['first_name'] . ' ' . $user['last_name'], $verificationToken);

        return [
            'success' => true,
            'message' => 'Verification email resent! Please check your inbox.',
            'verification_token' => $verificationToken // returned for testing/preview
        ];
    }
}
