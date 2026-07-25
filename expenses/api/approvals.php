<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Expense Approvals
 * Endpoint: /modules/expenses/api/approvals.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once __DIR__ . '/../classes/ExpenseApprovalManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$approvalManager = new ExpenseApprovalManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $expenseId = $_GET['expense_id'] ?? null;
        if ($expenseId) {
            $history = $approvalManager->getApprovalHistory($expenseId);
            echo json_encode(['success' => true, 'data' => $history]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Expense ID required']);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if (!isset($data['expense_id']) || !isset($data['action'])) {
            echo json_encode(['success' => false, 'message' => 'Expense ID and action are required']);
            exit;
        }
        $comments = $data['comments'] ?? '';
        $approverId = $data['approver_id'] ?? 1;
        
        $approvalManager->updateApprovalStatus($data['expense_id'], $data['action'], $approverId, $comments, 1);
        echo json_encode(['success' => true, 'message' => 'Expense approval status updated to ' . $data['action']]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
