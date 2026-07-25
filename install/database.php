<?php
if (!defined('Z_INSTALLER')) die('Direct access not permitted.');

$dbHost = $_POST['db_host'] ?? '127.0.0.1';
$dbPort = $_POST['db_port'] ?? '3306';
$dbName = $_POST['db_name'] ?? 'zfinance_db';
$dbUser = $_POST['db_user'] ?? 'root';
$dbPass = $_POST['db_pass'] ?? '';
$dbPrefix = $_POST['db_prefix'] ?? 'zf_';

$dbConnected = false;
$dbError = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $dsn = "mysql:host=$dbHost;port=$dbPort;charset=utf8mb4";
        $pdo = new PDO($dsn, $dbUser, $dbPass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_TIMEOUT => 5
        ]);

        // Create database if not exists
        $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbName` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        $pdo->exec("USE `$dbName`");

        $dbConnected = true;

        // Save temporary connection info in session or temporary file
        session_start();
        $_SESSION['db_config'] = [
            'host' => $dbHost,
            'port' => $dbPort,
            'database' => $dbName,
            'username' => $dbUser,
            'password' => $dbPass,
            'prefix' => $dbPrefix
        ];

        // Redirect to Step 5
        header("Location: index.php?step=5");
        exit;
    } catch (PDOException $e) {
        $dbError = $e->getMessage();
    }
}
?>

<div>
    <h4 class="fw-bold text-slate-900 mb-2">Step 4: MySQL Database Setup</h4>
    <p class="text-muted small mb-4">Enter your MySQL database connection credentials below. The installer will test the connection and create the database if it doesn't already exist.</p>

    <?php if ($dbError): ?>
        <div class="alert alert-danger bg-rose-50 text-rose-900 border-0 p-3 mb-4 rounded-3 d-flex align-items-center">
            <i class="bi bi-x-circle-fill fs-4 text-rose-600 me-3"></i>
            <div>
                <strong>Database Connection Failed:</strong> <?php echo htmlspecialchars($dbError); ?>
            </div>
        </div>
    <?php endif; ?>

    <form method="POST" action="index.php?step=4" id="dbForm">
        <div class="row g-3">
            <div class="col-md-8">
                <label class="form-label font-bold text-dark small">Database Host</label>
                <input type="text" name="db_host" value="<?php echo htmlspecialchars($dbHost); ?>" class="form-control form-control-lg font-mono text-sm" required placeholder="e.g. localhost or 127.0.0.1">
            </div>

            <div class="col-md-4">
                <label class="form-label font-bold text-dark small">Port</label>
                <input type="text" name="db_port" value="<?php echo htmlspecialchars($dbPort); ?>" class="form-control form-control-lg font-mono text-sm" required placeholder="3306">
            </div>

            <div class="col-md-6">
                <label class="form-label font-bold text-dark small">Database Name</label>
                <input type="text" name="db_name" value="<?php echo htmlspecialchars($dbName); ?>" class="form-control form-control-lg font-mono text-sm" required placeholder="zfinance_db">
            </div>

            <div class="col-md-6">
                <label class="form-label font-bold text-dark small">Table Prefix (Optional)</label>
                <input type="text" name="db_prefix" value="<?php echo htmlspecialchars($dbPrefix); ?>" class="form-control form-control-lg font-mono text-sm" placeholder="zf_">
            </div>

            <div class="col-md-6">
                <label class="form-label font-bold text-dark small">Username</label>
                <input type="text" name="db_user" value="<?php echo htmlspecialchars($dbUser); ?>" class="form-control form-control-lg font-mono text-sm" required placeholder="root">
            </div>

            <div class="col-md-6">
                <label class="form-label font-bold text-dark small">Password</label>
                <input type="password" name="db_pass" value="<?php echo htmlspecialchars($dbPass); ?>" class="form-control form-control-lg font-mono text-sm" placeholder="••••••••">
            </div>
        </div>

        <div class="mt-4 pt-3 border-top d-flex justify-content-between align-items-center">
            <button type="button" id="btnTestConn" class="btn btn-outline-indigo font-semibold">
                <i class="bi bi-lightning-charge me-1"></i> Test Connection
            </button>

            <button type="submit" class="btn btn-indigo px-4 fw-bold">
                Test & Save Database &rarr;
            </button>
        </div>
    </form>
</div>
