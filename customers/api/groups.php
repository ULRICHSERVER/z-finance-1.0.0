<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Customer Groups
 * Endpoint: /modules/customers/api/groups.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');

require_once __DIR__ . '/../classes/CustomerGroupManager.php';

try {
    $dbPath = __DIR__ . '/../../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$groupManager = new CustomerGroupManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $groups = $groupManager->getAllGroups(1);
        echo json_encode(['success' => true, 'data' => $groups]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if (isset($data['action']) && $data['action'] === 'assign') {
            $groupManager->assignCustomerToGroup($data['customer_id'], $data['group_id']);
            echo json_encode(['success' => true, 'message' => 'Assigned to group']);
        } else {
            $groupId = $groupManager->createGroup($data, 1);
            echo json_encode(['success' => true, 'message' => 'Group created', 'group_id' => $groupId]);
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($data['customer_id']) && isset($data['group_id'])) {
            $groupManager->removeCustomerFromGroup($data['customer_id'], $data['group_id']);
            echo json_encode(['success' => true, 'message' => 'Removed from group']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Missing parameters']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
