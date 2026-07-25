<?php
/**
 * Z-FINANCE 1.0.0 - REST API Gateway v1 Entry Point
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-API-Key, X-CSRF-Token');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$resource = $_GET['resource'] ?? 'health';

switch ($resource) {
    case 'health':
        echo json_encode([
            'status' => 'success',
            'api_version' => 'v1.0.0',
            'environment' => 'production',
            'timestamp' => date('Y-m-d H:i:s'),
            'gateway' => 'Z-FINANCE API Gateway'
        ]);
        break;

    case 'metrics':
        echo json_encode([
            'status' => 'success',
            'data' => [
                'total_requests' => 124500,
                'active_api_keys' => 18,
                'registered_webhooks' => 12,
                'avg_latency_ms' => 45.2,
                'rate_limit_hits' => 3
            ]
        ]);
        break;

    case 'openapi':
        echo json_encode([
            'openapi' => '3.1.0',
            'info' => [
                'title' => 'Z-FINANCE 1.0.0 Enterprise REST API Platform',
                'version' => '1.0.0',
                'description' => 'Comprehensive API for Finance, Accounting, POS, HRMS, CRM, and Workflows'
            ],
            'paths' => [
                '/api/v1/invoices' => ['get' => ['summary' => 'List all invoices']],
                '/api/v1/expenses' => ['get' => ['summary' => 'List expense records']],
                '/api/v1/customers' => ['get' => ['summary' => 'List CRM contacts']],
                '/api/v1/webhooks' => ['post' => ['summary' => 'Register outgoing webhook']]
            ]
        ]);
        break;

    default:
        echo json_encode([
            'status' => 'error',
            'message' => "Invalid or unknown resource endpoint '{$resource}'"
        ]);
        break;
}
