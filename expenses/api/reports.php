<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Expense Reports & Analytics
 * Endpoint: /modules/expenses/api/reports.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once __DIR__ . '/../classes/ExpenseReportManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$reportManager = new ExpenseReportManager($pdo);

$type = $_GET['type'] ?? 'category';

if ($type === 'monthly') {
    $data = $reportManager->getMonthlyBreakdown(1);
} else {
    $start = $_GET['start_date'] ?? null;
    $end = $_GET['end_date'] ?? null;
    $data = $reportManager->getExpenseByCategoryReport(1, $start, $end);
}

echo json_encode(['success' => true, 'report_type' => $type, 'data' => $data]);
