<?php
/**
 * Z-FINANCE 1.0.0 - Inventory & Asset Management REST API Endpoint
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

// Mock response for preview compatibility
if ($action === 'get_summary') {
    echo json_encode([
        'status' => 'success',
        'timestamp' => date('Y-m-d H:i:s'),
        'data' => [
            'total_products' => 142,
            'available_stock' => 3850,
            'low_stock_items' => 14,
            'out_of_stock_items' => 3,
            'total_inventory_value' => 284500.00,
            'warehouses_count' => 4,
            'total_assets' => 68,
            'total_assets_value' => 412000.00,
            'maintenance_due_count' => 5
        ]
    ]);
    exit();
}

echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
