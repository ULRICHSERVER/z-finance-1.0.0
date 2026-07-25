<?php
/**
 * Z-FINANCE 1.0.0 - Super Admin Backup & Disaster Recovery REST API Endpoint
 */

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../classes/SystemBackupManager.php';

use Modules\SuperAdmin\Classes\SystemBackupManager;

try {
    $db = new PDO('sqlite::memory:');
} catch (Exception $e) {}

$manager = new SystemBackupManager($db);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$action = $_GET['action'] ?? $_POST['action'] ?? 'list';

if ($method === 'GET' && $action === 'list') {
    echo json_encode([
        'status' => 'success',
        'data' => $manager->getBackupHistory()
    ]);
    exit;
}

if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $payload = json_decode($raw, true) ?? $_POST;

    if ($action === 'create') {
        $res = $manager->createBackup($payload['backup_type'] ?? 'full_database', $payload['admin_id'] ?? 1);
        echo json_encode($res);
        exit;
    }

    if ($action === 'restore') {
        $res = $manager->restoreBackup((int)($payload['backup_id'] ?? 0));
        echo json_encode($res);
        exit;
    }
}

echo json_encode(['status' => 'error', 'message' => 'Invalid action parameter']);
