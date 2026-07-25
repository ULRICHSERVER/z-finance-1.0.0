<?php
/**
 * Z-FINANCE 1.0.0 - Enterprise POS REST API Endpoint
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
            'today_sales' => 18450.00,
            'cash_sales' => 8200.00,
            'card_sales' => 6450.00,
            'mobile_money_sales' => 3800.00,
            'active_stores' => 4,
            'returns_count' => 2,
            'top_product' => 'Industrial Automation Controller v4'
        ]
    ]);
    exit();
}

echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
