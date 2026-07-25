<?php
/**
 * Z-FINANCE 1.0.0 - REST API: General Ledger & Trial Balance
 * Endpoint: /modules/accounting/api/ledger.php
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

if (isset($_GET['type']) && $_GET['type'] === 'trial_balance') {
    $data = $glManager->getTrialBalance(1);
    echo json_encode(['success' => true, 'data' => $data]);
} else {
    $accountId = $_GET['account_id'] ?? null;
    $startDate = $_GET['start_date'] ?? null;
    $endDate = $_GET['end_date'] ?? null;
    
    $entries = $glManager->getLedgerEntries($accountId, 1, $startDate, $endDate);
    echo json_encode(['success' => true, 'data' => $entries]);
}
