<?php
if (!defined('Z_INSTALLER')) die('Direct access not permitted.');

session_start();
$dbConfig = $_SESSION['db_config'] ?? null;

if (!$dbConfig) {
    header("Location: index.php?step=4");
    exit;
}

$importSuccess = false;
$importError = null;
$tableCount = 0;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'import_sql') {
    try {
        $dsn = "mysql:host={$dbConfig['host']};port={$dbConfig['port']};dbname={$dbConfig['database']};charset=utf8mb4";
        $pdo = new PDO($dsn, $dbConfig['username'], $dbConfig['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);

        $sqlFile = __DIR__ . '/Z-FINANCE.sql';
        if (!file_exists($sqlFile)) {
            throw new Exception("SQL import file Z-FINANCE.sql not found.");
        }

        $sqlContent = file_get_contents($sqlFile);
        
        // Handle prefix replacement if defined
        if (!empty($dbConfig['prefix']) && $dbConfig['prefix'] !== 'zf_') {
            $sqlContent = str_replace('zf_', $dbConfig['prefix'], $sqlContent);
        }

        // Execute queries
        $pdo->exec($sqlContent);

        // Verify tables created
        $stmt = $pdo->query("SHOW TABLES");
        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
        $tableCount = count($tables);

        $importSuccess = true;
        $_SESSION['import_completed'] = true;

        header("Location: index.php?step=6");
        exit;
    } catch (Exception $e) {
        $importError = $e->getMessage();
    }
}
?>

<div>
    <h4 class="fw-bold text-slate-900 mb-2">Step 5: Database Schema & Seed Data Import</h4>
    <p class="text-muted small mb-4">Click below to automatically import the Z-FINANCE 1.0.0 database schema, core tables, standard income categories, and initial data into <code><?php echo htmlspecialchars($dbConfig['database']); ?></code>.</p>

    <?php if ($importError): ?>
        <div class="alert alert-danger bg-rose-50 text-rose-900 border-0 p-3 mb-4 rounded-3 d-flex align-items-center">
            <i class="bi bi-x-circle-fill fs-4 text-rose-600 me-3"></i>
            <div>
                <strong>SQL Import Error:</strong> <?php echo htmlspecialchars($importError); ?>
            </div>
        </div>
    <?php endif; ?>

    <div class="card border bg-light p-4 mb-4 text-center">
        <i class="bi bi-database-fill-gear fs-1 text-indigo-600 mb-2"></i>
        <h5 class="fw-bold text-dark">Target Database: <?php echo htmlspecialchars($dbConfig['database']); ?></h5>
        <p class="text-muted small mb-3">Host: <?php echo htmlspecialchars($dbConfig['host']); ?> | Prefix: <code><?php echo htmlspecialchars($dbConfig['prefix']); ?></code></p>

        <!-- Progress Bar Mock for visual AJAX feedback -->
        <div class="progress mb-3" style="height: 12px;">
            <div id="sqlProgressBar" class="progress-bar bg-indigo-600 progress-bar-striped" role="progressbar" style="width: 0%;"></div>
        </div>
        <span id="sqlProgressText" class="text-muted font-mono small">Ready to begin database migration...</span>
    </div>

    <form method="POST" action="index.php?step=5" id="sqlImportForm">
        <input type="hidden" name="action" value="import_sql">
        
        <div class="d-flex justify-content-between align-items-center">
            <a href="index.php?step=4" class="btn btn-outline-secondary font-semibold">
                &larr; Back to Database Setup
            </a>

            <button type="submit" id="btnImportSql" class="btn btn-indigo px-4 fw-bold">
                <i class="bi bi-cloud-arrow-down me-1"></i> Import SQL Schema & Data &rarr;
            </button>
        </div>
    </form>
</div>
