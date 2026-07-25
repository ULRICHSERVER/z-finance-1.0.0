<?php
/**
 * Z-FINANCE 1.0.0 - Super Admin Settings REST API Endpoint
 */

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../classes/SuperAdminManager.php';

use Modules\SuperAdmin\Classes\SuperAdminManager;

// Establish Mock/Real PDO instance
try {
    $db = new PDO('sqlite::memory:');
} catch (Exception $e) {
    // Fallback
}

$manager = new SuperAdminManager($db);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$action = $_GET['action'] ?? $_POST['action'] ?? 'get';

if ($method === 'GET' && $action === 'get') {
    echo json_encode([
        'status' => 'success',
        'data' => $manager->getAllSettings()
    ]);
    exit;
}

if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $payload = json_decode($raw, true) ?? $_POST;

    if ($action === 'update') {
        $success = $manager->updateSettings($payload['settings'] ?? $payload, $payload['admin_id'] ?? 1);
        echo json_encode([
            'status' => $success ? 'success' : 'error',
            'message' => $success ? 'System settings saved successfully.' : 'Failed to update system settings.'
        ]);
        exit;
    }

    if ($action === 'maintenance') {
        $enable = (bool)($payload['enable'] ?? false);
        $whitelist = $payload['whitelist'] ?? '';
        $message = $payload['message'] ?? '';
        $success = $manager->setMaintenanceMode($enable, $whitelist, $message);
        echo json_encode([
            'status' => $success ? 'success' : 'error',
            'message' => $enable ? 'Maintenance mode enabled.' : 'Maintenance mode disabled.'
        ]);
        exit;
    }
}

echo json_encode(['status' => 'error', 'message' => 'Invalid action parameter']);
