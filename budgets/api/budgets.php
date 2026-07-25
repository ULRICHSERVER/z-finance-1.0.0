<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Budget Planning & Monitoring
 * Endpoint: /modules/budgets/api/budgets.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

require_once __DIR__ . '/../classes/BudgetManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$budgetManager = new BudgetManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['action']) && $_GET['action'] === 'stats') {
            echo json_encode(['success' => true, 'data' => $budgetManager->getDashboardStats(1)]);
        } elseif (isset($_GET['id'])) {
            $record = $budgetManager->getBudgetById($_GET['id'], 1);
            echo json_encode(['success' => true, 'data' => $record]);
        } else {
            $filters = [
                'budget_type' => $_GET['budget_type'] ?? null,
                'status' => $_GET['status'] ?? null,
                'search' => $_GET['search'] ?? null,
            ];
            $records = $budgetManager->getBudgets(1, $filters);
            echo json_encode(['success' => true, 'data' => $records]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if (!isset($data['budget_name']) || !isset($data['budget_amount'])) {
            echo json_encode(['success' => false, 'message' => 'Budget name and budget amount are required']);
            exit;
        }
        $budgetId = $budgetManager->createBudget($data, 1, 1);
        echo json_encode(['success' => true, 'message' => 'Budget created successfully', 'budget_id' => $budgetId]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($data['budget_id']) && isset($data['actual_expenses'])) {
            $budgetManager->updateTracking($data['budget_id'], (float)$data['actual_expenses'], (float)($data['actual_income'] ?? 0));
            echo json_encode(['success' => true, 'message' => 'Budget tracking updated']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Budget ID and actual expenses required']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
