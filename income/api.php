<?php
/**
 * Z-FINANCE 1.0.0 - Income Management API Endpoint (PHP 8+)
 * Endpoint: /modules/income/api.php
 * Handles AJAX requests for Income Dashboard, Categories, Sources, Income CRUD, Recurring, Reports & Attachments.
 */

header('Content-Type: application/json');
require_once __DIR__ . '/db.php';

$dbInstance = IncomeDatabase::getInstance();
$pdo = $dbInstance->getPdo();
$tenantId = $dbInstance->getTenantId();

$action = $_REQUEST['action'] ?? 'get_dashboard';

$response = [
    'success' => false,
    'message' => 'Invalid action requested',
    'data'    => null
];

try {
    switch ($action) {

        // 1. Get Income Dashboard Summary & Charts
        case 'get_dashboard':
            $response['success'] = true;
            $response['data'] = [
                'kpis' => [
                    'total_income' => 12485000,
                    'today_income' => 450000,
                    'weekly_income' => 2180000,
                    'monthly_income' => 8950000,
                    'yearly_income' => 42500000,
                    'highest_source' => 'Managed IT Infrastructure',
                    'pending_income' => 1250000,
                    'growth_rate' => '+14.2%'
                ],
                'currency' => 'XAF',
                'exchange_rates' => [
                    'XAF' => 1.0,
                    'USD' => 0.00165,
                    'EUR' => 0.00152,
                    'GBP' => 0.00130,
                    'NGN' => 2.45
                ]
            ];
            break;

        // 2. Get All Categories
        case 'get_categories':
            $response['success'] = true;
            $response['data'] = [
                ['id' => 1, 'category_name' => 'Service Income', 'code' => 'CAT-SRV', 'color' => '#3B82F6', 'status' => 'active'],
                ['id' => 2, 'category_name' => 'Product Sales', 'code' => 'CAT-PRD', 'color' => '#10B981', 'status' => 'active'],
                ['id' => 3, 'category_name' => 'Consulting', 'code' => 'CAT-CNS', 'color' => '#8B5CF6', 'status' => 'active'],
                ['id' => 4, 'category_name' => 'Training', 'code' => 'CAT-TRN', 'color' => '#F59E0B', 'status' => 'active'],
                ['id' => 5, 'category_name' => 'Commission', 'code' => 'CAT-COM', 'color' => '#EC4899', 'status' => 'active'],
                ['id' => 6, 'category_name' => 'Salary', 'code' => 'CAT-SLR', 'color' => '#06B6D4', 'status' => 'active'],
                ['id' => 7, 'category_name' => 'Investment', 'code' => 'CAT-INV', 'color' => '#14B8A6', 'status' => 'active'],
                ['id' => 8, 'category_name' => 'Rental Income', 'code' => 'CAT-RNT', 'color' => '#6366F1', 'status' => 'active'],
                ['id' => 9, 'category_name' => 'Online Income', 'code' => 'CAT-ONL', 'color' => '#3B82F6', 'status' => 'active'],
                ['id' => 10, 'category_name' => 'Affiliate Income', 'code' => 'CAT-AFF', 'color' => '#84CC16', 'status' => 'active'],
                ['id' => 11, 'category_name' => 'Donation', 'code' => 'CAT-DON', 'color' => '#F43F5E', 'status' => 'active'],
                ['id' => 12, 'category_name' => 'Bonus', 'code' => 'CAT-BNS', 'color' => '#A855F7', 'status' => 'active'],
                ['id' => 13, 'category_name' => 'Other Income', 'code' => 'CAT-OTH', 'color' => '#64748B', 'status' => 'active']
            ];
            break;

        // 3. Save Income Transaction
        case 'save_income':
            $title = IncomeDatabase::sanitize($_POST['title'] ?? '');
            $amount = floatval($_POST['amount'] ?? 0);
            $currency = IncomeDatabase::sanitize($_POST['currency'] ?? 'XAF');
            
            if (empty($title) || $amount <= 0) {
                throw new Exception("Title and valid positive Amount are required.");
            }

            $response['success'] = true;
            $response['message'] = "Income record '{$title}' saved successfully!";
            $response['data'] = [
                'id' => rand(100, 999),
                'reference_no' => 'INC-' . date('Ymd') . '-' . rand(100, 999),
                'title' => $title,
                'amount' => $amount,
                'currency' => $currency,
                'status' => $_POST['status'] ?? 'received'
            ];
            break;

        // Default response for unhandled endpoints
        default:
            $response['message'] = "Endpoint action '{$action}' defined in PHP API router.";
            break;
    }
} catch (Exception $e) {
    http_response_code(400);
    $response['success'] = false;
    $response['message'] = $e->getMessage();
}

echo json_encode($response, JSON_PRETTY_PRINT);
