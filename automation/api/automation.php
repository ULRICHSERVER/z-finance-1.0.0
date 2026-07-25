<?php
/**
 * Z-FINANCE 1.0.0 - Smart Automation REST API Endpoint
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$action = $_GET['action'] ?? 'get_rules';

if ($action === 'get_rules') {
    echo json_encode([
        'status' => 'success',
        'timestamp' => date('Y-m-d H:i:s'),
        'rules' => [
            ['id' => 1, 'name' => 'Auto-Categorize Cloud Invoices', 'trigger' => 'invoice_upload', 'status' => 'active'],
            ['id' => 2, 'name' => 'Unusual Expense Smart Alert', 'trigger' => 'expense_over_1000', 'status' => 'active'],
            ['id' => 3, 'name' => 'Low Stock Reorder Reminder', 'trigger' => 'inventory_below_threshold', 'status' => 'active']
        ]
    ]);
    exit();
}

echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
