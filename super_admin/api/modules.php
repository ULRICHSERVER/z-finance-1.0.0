<?php
/**
 * Z-FINANCE 1.0.0 - Super Admin Module Manager REST API Endpoint
 */

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../classes/ModuleManager.php';

use Modules\SuperAdmin\Classes\ModuleManager;

try {
    $db = new PDO('sqlite::memory:');
} catch (Exception $e) {}

$manager = new ModuleManager($db);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$action = $_GET['action'] ?? $_POST['action'] ?? 'list';

if ($method === 'GET' && $action === 'list') {
    echo json_encode([
        'status' => 'success',
        'data' => $manager->getInstalledModules()
    ]);
    exit;
}

if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $payload = json_decode($raw, true) ?? $_POST;

    if ($action === 'toggle') {
        $res = $manager->toggleModule($payload['code'], (bool)($payload['enable'] ?? true));
        echo json_encode($res);
        exit;
    }

    if ($action === 'install') {
        $res = $manager->installModule($payload['module'] ?? $payload);
        echo json_encode($res);
        exit;
    }

    if ($action === 'repair') {
        $res = $manager->repairModule($payload['code'] ?? 'all');
        echo json_encode($res);
        exit;
    }
}

echo json_encode(['status' => 'error', 'message' => 'Invalid action parameter']);
