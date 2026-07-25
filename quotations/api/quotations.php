<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Quotations & Estimates
 * Endpoint: /modules/quotations/api/quotations.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once __DIR__ . '/../classes/QuotationManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$quotationManager = new QuotationManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $q = $quotationManager->getQuotationWithItems($_GET['id'], 1);
            echo json_encode(['success' => true, 'data' => $q]);
        } else {
            $filters = [
                'status' => $_GET['status'] ?? null,
                'search' => $_GET['search'] ?? null
            ];
            $quotations = $quotationManager->getQuotations(1, $filters);
            echo json_encode(['success' => true, 'data' => $quotations]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;

        if (isset($data['action']) && $data['action'] === 'convert_to_invoice') {
            if (empty($data['quotation_id'])) {
                echo json_encode(['success' => false, 'message' => 'Quotation ID required for conversion']);
                exit;
            }
            try {
                $invId = $quotationManager->convertToInvoice($data['quotation_id'], 1, 1);
                echo json_encode(['success' => true, 'message' => 'Quotation converted to Invoice successfully', 'invoice_id' => $invId]);
            } catch (Exception $e) {
                echo json_encode(['success' => false, 'message' => $e->getMessage()]);
            }
            exit;
        }

        if (!isset($data['customer_name']) || empty($data['items'])) {
            echo json_encode(['success' => false, 'message' => 'Customer name and quotation items are required']);
            exit;
        }

        try {
            $qId = $quotationManager->createQuotation($data, 1, 1);
            echo json_encode(['success' => true, 'message' => 'Quotation created successfully', 'quotation_id' => $qId]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
