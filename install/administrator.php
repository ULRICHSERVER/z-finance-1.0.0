<?php
if (!defined('Z_INSTALLER')) die('Direct access not permitted.');

session_start();
$dbConfig = $_SESSION['db_config'] ?? null;
$appConfig = $_SESSION['app_config'] ?? null;

if (!$dbConfig || !$appConfig) {
    header("Location: index.php?step=4");
    exit;
}

$adminName = $_POST['admin_name'] ?? 'Super Admin';
$adminUser = $_POST['admin_username'] ?? 'admin';
$adminEmail = $_POST['admin_email'] ?? ($appConfig['app_email'] ?? 'admin@zfinance.io');
$adminError = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = $_POST['admin_password'] ?? '';
    $confirmPass = $_POST['confirm_password'] ?? '';

    if (empty($password) || strlen($password) < 8) {
        $adminError = "Password must be at least 8 characters long.";
    } elseif ($password !== $confirmPass) {
        $adminError = "Passwords do not match.";
    } else {
        try {
            // 1. Connect DB and insert Super Admin
            $dsn = "mysql:host={$dbConfig['host']};port={$dbConfig['port']};dbname={$dbConfig['database']};charset=utf8mb4";
            $pdo = new PDO($dsn, $dbConfig['username'], $dbConfig['password'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]);

            $tableName = !empty($dbConfig['prefix']) ? $dbConfig['prefix'] . 'users' : 'zf_users';
            $passwordHash = password_hash($password, PASSWORD_ARGON2ID) ?: password_hash($password, PASSWORD_BCRYPT);

            $stmt = $pdo->prepare("INSERT INTO `$tableName` (full_name, username, email, password_hash, role, status) VALUES (?, ?, ?, ?, 'Super Admin', 'active') ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)");
            $stmt->execute([$adminName, $adminUser, $adminEmail, $passwordHash]);

            // 2. Generate Security Keys
            $appKey = 'base64:' . base64_encode(random_bytes(32));
            $csrfSecret = bin2hex(random_bytes(16));
            $encryptionKey = bin2hex(random_bytes(32));

            // 3. Generate .env File
            $envContent = "# Z-FINANCE 1.0.0 Environment Configuration\n";
            $envContent .= "APP_NAME=\"" . addslashes($appConfig['app_name']) . "\"\n";
            $envContent .= "APP_ENV=production\n";
            $envContent .= "APP_KEY={$appKey}\n";
            $envContent .= "APP_DEBUG=false\n";
            $envContent .= "APP_URL=\"http://" . ($_SERVER['HTTP_HOST'] ?? 'localhost') . "\"\n";
            $envContent .= "APP_TIMEZONE=\"" . $appConfig['timezone'] . "\"\n";
            $envContent .= "APP_LANG=\"" . $appConfig['default_lang'] . "\"\n";
            $envContent .= "APP_CURRENCY=\"" . $appConfig['default_currency'] . "\"\n\n";

            $envContent .= "# Database Credentials\n";
            $envContent .= "DB_HOST=\"" . $dbConfig['host'] . "\"\n";
            $envContent .= "DB_PORT=" . $dbConfig['port'] . "\n";
            $envContent .= "DB_DATABASE=\"" . $dbConfig['database'] . "\"\n";
            $envContent .= "DB_USERNAME=\"" . $dbConfig['username'] . "\"\n";
            $envContent .= "DB_PASSWORD=\"" . $dbConfig['password'] . "\"\n";
            $envContent .= "DB_PREFIX=\"" . $dbConfig['prefix'] . "\"\n\n";

            $envContent .= "# Security & Session\n";
            $envContent .= "CSRF_SECRET={$csrfSecret}\n";
            $envContent .= "ENCRYPTION_KEY={$encryptionKey}\n";
            $envContent .= "SESSION_DRIVER=file\n";
            $envContent .= "SESSION_LIFETIME=120\n";

            file_put_contents(ROOT_PATH . '/.env', $envContent);

            // 4. Generate Lock File
            file_put_contents(__DIR__ . '/installed.lock', date('Y-m-d H:i:s') . ' - Installed successfully by ' . $adminUser);

            header("Location: finish.php");
            exit;
        } catch (Exception $e) {
            $adminError = "Failed to setup administrator or save config: " . $e->getMessage();
        }
    }
}
?>

<div>
    <h4 class="fw-bold text-slate-900 mb-2">Step 7: Super Administrator Account Setup</h4>
    <p class="text-muted small mb-4">Create the master Super Admin user account. This user will have complete administrative access to Z-FINANCE.</p>

    <?php if ($adminError): ?>
        <div class="alert alert-danger bg-rose-50 text-rose-900 border-0 p-3 mb-4 rounded-3">
            <i class="bi bi-x-circle-fill fs-5 text-rose-600 me-2"></i>
            <strong>Error:</strong> <?php echo htmlspecialchars($adminError); ?>
        </div>
    <?php endif; ?>

    <form method="POST" action="index.php?step=7">
        <div class="row g-3">
            <div class="col-md-6">
                <label class="form-label font-bold text-dark small">Super Admin Full Name</label>
                <input type="text" name="admin_name" value="<?php echo htmlspecialchars($adminName); ?>" class="form-control" required>
            </div>

            <div class="col-md-6">
                <label class="form-label font-bold text-dark small">Username</label>
                <input type="text" name="admin_username" value="<?php echo htmlspecialchars($adminUser); ?>" class="form-control font-mono" required>
            </div>

            <div class="col-12">
                <label class="form-label font-bold text-dark small">Email Address</label>
                <input type="email" name="admin_email" value="<?php echo htmlspecialchars($adminEmail); ?>" class="form-control" required>
            </div>

            <div class="col-md-6">
                <label class="form-label font-bold text-dark small">Password (Min 8 Chars)</label>
                <input type="password" name="admin_password" class="form-control font-mono" required placeholder="••••••••">
            </div>

            <div class="col-md-6">
                <label class="form-label font-bold text-dark small">Confirm Password</label>
                <input type="password" name="confirm_password" class="form-control font-mono" required placeholder="••••••••">
            </div>
        </div>

        <div class="mt-4 pt-3 border-top text-end">
            <button type="submit" class="btn btn-indigo px-5 py-2.5 fw-bold shadow">
                <i class="bi bi-check-circle me-1"></i> Complete Installation & Lock Installer
            </button>
        </div>
    </form>
</div>
