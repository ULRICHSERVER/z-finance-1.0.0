<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Financial Statements & Reports
 * Endpoint: /modules/accounting/api/reports.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once __DIR__ . '/../classes/GeneralLedgerManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$glManager = new GeneralLedgerManager($pdo);
$statement = $_GET['statement'] ?? 'income_statement';

switch ($statement) {
    case 'balance_sheet':
        $data = $glManager->getBalanceSheet(1);
        echo json_encode(['success' => true, 'statement' => 'Balance Sheet', 'data' => $data]);
        break;

    case 'trial_balance':
        $data = $glManager->getTrialBalance(1);
        echo json_encode(['success' => true, 'statement' => 'Trial Balance', 'data' => $data]);
        break;

    case 'income_statement':
    default:
        $data = $glManager->getIncomeStatement(1);
        echo json_encode(['success' => true, 'statement' => 'Income Statement (P&L)', 'data' => $data]);
        break;
}
