<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Document Templates
 * Endpoint: /modules/billing/api/templates.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once __DIR__ . '/../classes/BillingTemplateManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$templateManager = new BillingTemplateManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $tmpl = $templateManager->getTemplateById($_GET['id'], 1);
            echo json_encode(['success' => true, 'data' => $tmpl]);
        } else {
            $type = $_GET['type'] ?? null;
            $templates = $templateManager->getTemplates(1, $type);
            echo json_encode(['success' => true, 'data' => $templates]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if (!isset($data['template_name']) || !isset($data['template_type'])) {
            echo json_encode(['success' => false, 'message' => 'Template name and type are required']);
            exit;
        }

        try {
            $tmplId = $templateManager->createTemplate($data, 1, 1);
            echo json_encode(['success' => true, 'message' => 'Template created successfully', 'template_id' => $tmplId]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
