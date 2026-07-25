<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Chart of Accounts
 * Endpoint: /modules/accounting/api/accounts.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once __DIR__ . '/../classes/ChartOfAccountsManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$coaManager = new ChartOfAccountsManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $acc = $coaManager->getAccountById($_GET['id'], 1);
            echo json_encode(['success' => true, 'data' => $acc]);
        } else {
            $filters = [
                'account_type' => $_GET['account_type'] ?? null,
                'search' => $_GET['search'] ?? null
            ];
            $accounts = $coaManager->getAccounts(1, $filters);
            echo json_encode(['success' => true, 'data' => $accounts]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if (!isset($data['account_code']) || !isset($data['account_name']) || !isset($data['account_type'])) {
            echo json_encode(['success' => false, 'message' => 'Account code, name, and type are required']);
            exit;
        }

        try {
            $accId = $coaManager->createAccount($data, 1);
            echo json_encode(['success' => true, 'message' => 'Account created successfully', 'account_id' => $accId]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
