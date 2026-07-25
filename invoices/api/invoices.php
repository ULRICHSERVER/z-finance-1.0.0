<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Invoices & Recurring Billing
 * Endpoint: /modules/invoices/api/invoices.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once __DIR__ . '/../classes/InvoiceManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$invManager = new InvoiceManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $inv = $invManager->getInvoiceWithItems($_GET['id'], 1);
            echo json_encode(['success' => true, 'data' => $inv]);
        } else {
            $filters = [
                'status' => $_GET['status'] ?? null,
                'search' => $_GET['search'] ?? null
            ];
            $invoices = $invManager->getInvoices(1, $filters);
            echo json_encode(['success' => true, 'data' => $invoices]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;

        if (isset($data['action']) && $data['action'] === 'record_payment') {
            if (empty($data['invoice_id']) || empty($data['payment_amount'])) {
                echo json_encode(['success' => false, 'message' => 'Invoice ID and payment amount required']);
                exit;
            }
            try {
                $status = $invManager->recordPayment($data['invoice_id'], $data['payment_amount'], $data['payment_method'] ?? 'Bank Transfer', 1, 1);
                echo json_encode(['success' => true, 'message' => 'Payment recorded successfully', 'invoice_status' => $status]);
            } catch (Exception $e) {
                echo json_encode(['success' => false, 'message' => $e->getMessage()]);
            }
            exit;
        }

        if (!isset($data['customer_name']) || empty($data['items'])) {
            echo json_encode(['success' => false, 'message' => 'Customer name and line items are required']);
            exit;
        }

        try {
            $invId = $invManager->createInvoice($data, 1, 1);
            echo json_encode(['success' => true, 'message' => 'Invoice issued successfully', 'invoice_id' => $invId]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
