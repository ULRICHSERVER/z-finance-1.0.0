<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Tasks & Time Tracking
 * Endpoint: /modules/tasks/api/tasks.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once __DIR__ . '/../classes/TaskManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$taskManager = new TaskManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $projectId = $_GET['project_id'] ?? null;
        $filters = [
            'status' => $_GET['status'] ?? null,
            'priority' => $_GET['priority'] ?? null
        ];
        $tasks = $taskManager->getTasks(1, $projectId, $filters);
        echo json_encode(['success' => true, 'tasks' => $tasks]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        $action = $data['action'] ?? 'create_task';

        if ($action === 'create_task') {
            if (!isset($data['project_id']) || !isset($data['task_title'])) {
                echo json_encode(['success' => false, 'message' => 'Project ID and Task Title required']);
                exit;
            }
            $taskId = $taskManager->createTask($data, 1, 1);
            echo json_encode(['success' => true, 'message' => 'Task created successfully', 'task_id' => $taskId]);
        } else if ($action === 'log_time') {
            $timeId = $taskManager->logTime(
                $data['project_id'],
                $data['task_id'] ?? null,
                1,
                $data['start_time'],
                $data['end_time'],
                $data['notes'] ?? ''
            );
            echo json_encode(['success' => true, 'message' => 'Time logged successfully', 'time_log_id' => $timeId]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid action']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
