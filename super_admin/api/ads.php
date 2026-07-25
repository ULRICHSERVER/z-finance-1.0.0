<?php
/**
 * Z-FINANCE 1.0.0 - Super Admin Advertisement Suite REST API Endpoint
 */

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../classes/AdManager.php';

use Modules\SuperAdmin\Classes\AdManager;

try {
    $db = new PDO('sqlite::memory:');
} catch (Exception $e) {}

$manager = new AdManager($db);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$action = $_GET['action'] ?? $_POST['action'] ?? 'list';

if ($method === 'GET' && $action === 'list') {
    echo json_encode([
        'status' => 'success',
        'data' => $manager->getAdvertisements($_GET)
    ]);
    exit;
}

if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $payload = json_decode($raw, true) ?? $_POST;

    if ($action === 'save') {
        $res = $manager->saveAdvertisement($payload['ad'] ?? $payload);
        echo json_encode($res);
        exit;
    }

    if ($action === 'toggle_status') {
        $res = $manager->toggleAdStatus((int)$payload['id'], $payload['status']);
        echo json_encode($res);
        exit;
    }

    if ($action === 'track') {
        $manager->recordMetrics((int)$payload['id'], $payload['type'] ?? 'impression');
        echo json_encode(['status' => 'success']);
        exit;
    }
}

echo json_encode(['status' => 'error', 'message' => 'Invalid action parameter']);
