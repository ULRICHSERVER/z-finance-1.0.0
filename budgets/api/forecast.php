<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Financial Forecasting & Cash Flow
 * Endpoint: /modules/budgets/api/forecast.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once __DIR__ . '/../classes/ForecastManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$forecastManager = new ForecastManager($pdo);
$months = isset($_GET['months']) ? (int)$_GET['months'] : 6;

$data = $forecastManager->generateCashFlowForecast($months, 1);
echo json_encode(['success' => true, 'months' => $months, 'forecast' => $data]);
