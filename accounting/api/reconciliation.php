<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Bank & Account Reconciliation
 * Endpoint: /modules/accounting/api/reconciliation.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once __DIR__ . '/../classes/ReconciliationManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$recManager = new ReconciliationManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $reconciliations = $recManager->getReconciliations(1);
        echo json_encode(['success' => true, 'data' => $reconciliations]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if (!isset($data['account_id']) || !isset($data['statement_balance'])) {
            echo json_encode(['success' => false, 'message' => 'Account ID and statement balance are required']);
            exit;
        }

        try {
            $recId = $recManager->createReconciliation($data, 1, 1);
            echo json_encode(['success' => true, 'message' => 'Reconciliation statement created', 'reconciliation_id' => $recId]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
