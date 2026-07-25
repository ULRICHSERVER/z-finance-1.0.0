<?php
/**
 * Z-FINANCE 1.0.0 - Enterprise HRMS & Payroll REST API Endpoint
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
            'total_employees' => 142,
            'new_hires_month' => 6,
            'attendance_today' => 134,
            'absent_today' => 3,
            'late_arrivals' => 5,
            'pending_leave_requests' => 7,
            'open_positions' => 9,
            'monthly_payroll_total' => 685000.00,
            'training_completion_rate' => 92.5,
            'contracts_expiring' => 4
        ]
    ]);
    exit();
}

echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
