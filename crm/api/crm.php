<?php
/**
 * Z-FINANCE 1.0.0 - Enterprise CRM REST API Endpoint
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
            'total_leads' => 128,
            'active_customers' => 84,
            'pipeline_value' => 1250000.00,
            'active_subscriptions' => 62,
            'open_tickets' => 5,
            'conversion_rate' => 24.8,
            'customer_lifetime_value' => 45800.00
        ]
    ]);
    exit();
}

echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
