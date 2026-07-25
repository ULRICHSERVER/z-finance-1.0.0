<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Notifications Engine
 * Endpoint: /modules/notifications/api/notifications.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once __DIR__ . '/../classes/NotificationManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$notifManager = new NotificationManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $notifications = $notifManager->getNotifications(1, false, 1);
        echo json_encode(['success' => true, 'notifications' => $notifications]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        $notifId = $notifManager->notify(
            $data['recipient_id'] ?? 1,
            $data['title'],
            $data['message'],
            $data['category'] ?? 'system',
            $data['type'] ?? 'in_app'
        );
        echo json_encode(['success' => true, 'notification_id' => $notifId]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
