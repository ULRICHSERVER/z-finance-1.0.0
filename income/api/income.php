<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Income Management
 * Endpoint: /modules/income/api/income.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

require_once __DIR__ . '/../classes/IncomeManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$incomeManager = new IncomeManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['action']) && $_GET['action'] === 'stats') {
            echo json_encode(['success' => true, 'data' => $incomeManager->getDashboardStats(1)]);
        } elseif (isset($_GET['id'])) {
            $record = $incomeManager->getIncomeById($_GET['id'], 1);
            echo json_encode(['success' => true, 'data' => $record]);
        } else {
            $filters = [
                'status' => $_GET['status'] ?? null,
                'category_id' => $_GET['category_id'] ?? null,
                'source_id' => $_GET['source_id'] ?? null,
                'customer_id' => $_GET['customer_id'] ?? null,
                'search' => $_GET['search'] ?? null,
            ];
            $records = $incomeManager->getIncomeRecords(1, $filters);
            echo json_encode(['success' => true, 'data' => $records]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if (!isset($data['title']) || !isset($data['amount']) || !isset($data['category_id'])) {
            echo json_encode(['success' => false, 'message' => 'Title, amount, and category are required']);
            exit;
        }
        $incomeId = $incomeManager->createIncome($data, 1, 1);
        echo json_encode(['success' => true, 'message' => 'Income recorded successfully', 'income_id' => $incomeId]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['id'])) {
            echo json_encode(['success' => false, 'message' => 'Income ID required']);
            exit;
        }
        $incomeManager->updateIncome($data['id'], $data, 1);
        echo json_encode(['success' => true, 'message' => 'Income updated successfully']);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? $_GET['id'] ?? null;
        if ($id) {
            $incomeManager->deleteIncome($id, 1);
            echo json_encode(['success' => true, 'message' => 'Income deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Income ID required']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
