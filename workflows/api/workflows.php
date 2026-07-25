<?php
/**
 * Z-FINANCE 1.0.0 - Workflow REST API Endpoint
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-CSRF-Token');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$action = $_GET['action'] ?? 'get_summary';

if ($action === 'get_summary') {
    echo json_encode([
        'status' => 'success',
        'timestamp' => date('Y-m-d H:i:s'),
        'data' => [
            'active_workflows' => 18,
            'paused_workflows' => 2,
            'successful_executions' => 1420,
            'failed_executions' => 12,
            'pending_approvals' => 4,
            'scheduled_jobs_count' => 8,
            'avg_execution_duration_ms' => 312.5
        ]
    ]);
    exit();
}

if ($action === 'trigger') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    $event = $input['event'] ?? 'manual_trigger';

    echo json_encode([
        'status' => 'success',
        'message' => "Workflow triggered for event '{$event}'",
        'execution_uuid' => 'EXEC-' . rand(10000000, 99999999),
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit();
}

echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
