<?php
/**
 * Z-FINANCE 1.0.0 - Business Intelligence REST API Endpoint
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$action = $_GET['action'] ?? 'get_dashboard';

if ($action === 'get_dashboard') {
    echo json_encode([
        'status' => 'success',
        'timestamp' => date('Y-m-d H:i:s'),
        'data' => [
            'revenue_forecast' => 212000.00,
            'expense_forecast' => 51000.00,
            'cashflow_forecast' => 345500.00,
            'insights_count' => 3,
            'confidence_score' => 92.4
        ]
    ]);
    exit();
}

echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
