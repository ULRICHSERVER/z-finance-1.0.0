<?php
/**
 * Z-FINANCE 1.0.0 - Procurement REST API Endpoint
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
            'pending_requisitions' => 8,
            'active_pos' => 14,
            'total_suppliers' => 32,
            'total_procurement_spend' => 485200.00,
            'procurement_savings' => 42100.00,
            'expiring_contracts_count' => 3,
            'pending_rfqs' => 4
        ]
    ]);
    exit();
}

echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
