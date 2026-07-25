<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Expense Management
 * Endpoint: /modules/expenses/api/expenses.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

require_once __DIR__ . '/../classes/ExpenseManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$expenseManager = new ExpenseManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['action']) && $_GET['action'] === 'stats') {
            echo json_encode(['success' => true, 'data' => $expenseManager->getDashboardStats(1)]);
        } elseif (isset($_GET['id'])) {
            $record = $expenseManager->getExpenseById($_GET['id'], 1);
            echo json_encode(['success' => true, 'data' => $record]);
        } else {
            $filters = [
                'approval_status' => $_GET['approval_status'] ?? null,
                'payment_status' => $_GET['payment_status'] ?? null,
                'category_id' => $_GET['category_id'] ?? null,
                'supplier_id' => $_GET['supplier_id'] ?? null,
                'search' => $_GET['search'] ?? null,
            ];
            $records = $expenseManager->getExpenseRecords(1, $filters);
            echo json_encode(['success' => true, 'data' => $records]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if (!isset($data['title']) || !isset($data['amount']) || !isset($data['category_id'])) {
            echo json_encode(['success' => false, 'message' => 'Title, amount, and category are required']);
            exit;
        }
        $expenseId = $expenseManager->createExpense($data, 1, 1);
        echo json_encode(['success' => true, 'message' => 'Expense recorded successfully', 'expense_id' => $expenseId]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['id'])) {
            echo json_encode(['success' => false, 'message' => 'Expense ID required']);
            exit;
        }
        $expenseManager->updateExpense($data['id'], $data, 1);
        echo json_encode(['success' => true, 'message' => 'Expense updated successfully']);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? $_GET['id'] ?? null;
        if ($id) {
            $expenseManager->deleteExpense($id, 1);
            echo json_encode(['success' => true, 'message' => 'Expense deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Expense ID required']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
