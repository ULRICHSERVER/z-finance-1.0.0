<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Financial Goals
 * Endpoint: /modules/goals/api/goals.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once __DIR__ . '/../classes/GoalManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$goalManager = new GoalManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $goals = $goalManager->getGoals(1);
        echo json_encode(['success' => true, 'data' => $goals]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if (isset($data['action']) && $data['action'] === 'contribute') {
            if (!isset($data['goal_id']) || !isset($data['amount'])) {
                echo json_encode(['success' => false, 'message' => 'Goal ID and contribution amount required']);
                exit;
            }
            $goalManager->recordContribution($data['goal_id'], $data['amount'], $data['notes'] ?? '');
            echo json_encode(['success' => true, 'message' => 'Goal contribution logged successfully']);
        } else {
            if (!isset($data['goal_name']) || !isset($data['target_amount'])) {
                echo json_encode(['success' => false, 'message' => 'Goal name and target amount required']);
                exit;
            }
            $goalId = $goalManager->createGoal($data, 1);
            echo json_encode(['success' => true, 'message' => 'Financial goal created', 'goal_id' => $goalId]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
