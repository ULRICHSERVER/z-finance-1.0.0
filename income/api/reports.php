<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Income Reports & Analytics
 * Endpoint: /modules/income/api/reports.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once __DIR__ . '/../classes/IncomeReportManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$reportManager = new IncomeReportManager($pdo);

$type = $_GET['type'] ?? 'category';

if ($type === 'monthly') {
    $data = $reportManager->getMonthlyBreakdown(1);
} else {
    $start = $_GET['start_date'] ?? null;
    $end = $_GET['end_date'] ?? null;
    $data = $reportManager->getIncomeByCategoryReport(1, $start, $end);
}

echo json_encode(['success' => true, 'report_type' => $type, 'data' => $data]);
