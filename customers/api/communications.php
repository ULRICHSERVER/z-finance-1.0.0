<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Communications Logging
 * Endpoint: /modules/customers/api/communications.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once __DIR__ . '/../classes/CustomerCommunicationManager.php';

try {
    $dbPath = __DIR__ . '/../../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$commManager = new CustomerCommunicationManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $customerId = $_GET['customer_id'] ?? null;
        if ($customerId) {
            $comms = $commManager->getCommunications($customerId);
            echo json_encode(['success' => true, 'data' => $comms]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Customer ID required']);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if (!isset($data['customer_id']) || !isset($data['subject'])) {
            echo json_encode(['success' => false, 'message' => 'Missing customer_id or subject']);
            exit;
        }
        $logId = $commManager->logCommunication($data);
        echo json_encode(['success' => true, 'message' => 'Communication logged successfully', 'log_id' => $logId]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
