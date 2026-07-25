<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Customer Documents
 * Endpoint: /modules/customers/api/documents.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');

require_once __DIR__ . '/../classes/CustomerDocumentManager.php';

try {
    $dbPath = __DIR__ . '/../../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$docManager = new CustomerDocumentManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $customerId = $_GET['customer_id'] ?? null;
        if ($customerId) {
            $docs = $docManager->getDocumentsByCustomer($customerId);
            echo json_encode(['success' => true, 'data' => $docs]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Customer ID required']);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if (!isset($data['customer_id']) || !isset($data['title']) || !isset($data['file_path'])) {
            echo json_encode(['success' => false, 'message' => 'Missing required fields']);
            exit;
        }
        $docId = $docManager->addDocument($data);
        echo json_encode(['success' => true, 'message' => 'Document added successfully', 'doc_id' => $docId]);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? $_GET['id'] ?? null;
        if ($id) {
            $docManager->deleteDocument($id);
            echo json_encode(['success' => true, 'message' => 'Document deleted']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Document ID required']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
