<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Income Sources
 * Endpoint: /modules/income/api/sources.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once __DIR__ . '/../classes/IncomeSourceManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$sourceManager = new IncomeSourceManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $sources = $sourceManager->getSources(1);
        echo json_encode(['success' => true, 'data' => $sources]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if (!isset($data['source_name']) || !isset($data['category_id'])) {
            echo json_encode(['success' => false, 'message' => 'Source name and category_id are required']);
            exit;
        }
        $sourceId = $sourceManager->createSource($data, 1);
        echo json_encode(['success' => true, 'message' => 'Income source created', 'source_id' => $sourceId]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
