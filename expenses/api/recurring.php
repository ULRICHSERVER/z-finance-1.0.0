<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Recurring Expenses
 * Endpoint: /modules/expenses/api/recurring.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');

require_once __DIR__ . '/../classes/RecurringExpenseManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$recManager = new RecurringExpenseManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $schedules = $recManager->getRecurringSchedules(1);
        echo json_encode(['success' => true, 'data' => $schedules]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if (!isset($data['title']) || !isset($data['amount']) || !isset($data['category_id'])) {
            echo json_encode(['success' => false, 'message' => 'Title, amount, and category required']);
            exit;
        }
        $id = $recManager->createRecurringSchedule($data, 1);
        echo json_encode(['success' => true, 'message' => 'Recurring schedule created', 'id' => $id]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($data['id']) && isset($data['status'])) {
            $recManager->toggleStatus($data['id'], $data['status'], 1);
            echo json_encode(['success' => true, 'message' => 'Recurring status updated']);
        } else {
            echo json_encode(['success' => false, 'message' => 'ID and status required']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
