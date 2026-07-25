<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Customers Management
 * Endpoint: /modules/customers/api/customers.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

require_once __DIR__ . '/../classes/CustomerManager.php';

// Mock DB Connection for API layer
try {
    $dbPath = __DIR__ . '/../../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    // Fallback in-memory SQLite if missing
    $pdo = new PDO("sqlite::memory:");
}

$customerManager = new CustomerManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['action']) && $_GET['action'] === 'stats') {
            echo json_encode(['success' => true, 'data' => $customerManager->getDashboardStats()]);
        } elseif (isset($_GET['id'])) {
            $customer = $customerManager->getCustomerById($_GET['id']);
            echo json_encode(['success' => true, 'data' => $customer]);
        } else {
            $filters = [
                'status' => $_GET['status'] ?? null,
                'customer_type' => $_GET['customer_type'] ?? null,
                'is_vip' => $_GET['is_vip'] ?? null,
                'search' => $_GET['search'] ?? null,
            ];
            $customers = $customerManager->getCustomers(1, $filters);
            echo json_encode(['success' => true, 'data' => $customers]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        $customerId = $customerManager->createCustomer($data, 1);
        echo json_encode(['success' => true, 'message' => 'Customer created successfully', 'customer_id' => $customerId]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['id'])) {
            echo json_encode(['success' => false, 'message' => 'Customer ID required']);
            exit;
        }
        $customerManager->updateCustomer($data['id'], $data, 1);
        echo json_encode(['success' => true, 'message' => 'Customer updated successfully']);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? $_GET['id'] ?? null;
        if ($id) {
            $customerManager->deleteCustomer($id, 1);
            echo json_encode(['success' => true, 'message' => 'Customer deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Customer ID required']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
