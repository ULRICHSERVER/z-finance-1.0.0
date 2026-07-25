<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Expense Categories
 * Endpoint: /modules/expenses/api/categories.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

require_once __DIR__ . '/../classes/ExpenseCategoryManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$catManager = new ExpenseCategoryManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $categories = $catManager->getCategories(1);
        echo json_encode(['success' => true, 'data' => $categories]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if (!isset($data['category_name'])) {
            echo json_encode(['success' => false, 'message' => 'Category name required']);
            exit;
        }
        $catId = $catManager->createCategory($data, 1, 1);
        echo json_encode(['success' => true, 'message' => 'Category created', 'category_id' => $catId]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['id'])) {
            echo json_encode(['success' => false, 'message' => 'Category ID required']);
            exit;
        }
        $catManager->updateCategory($data['id'], $data, 1);
        echo json_encode(['success' => true, 'message' => 'Category updated']);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? $_GET['id'] ?? null;
        if ($id) {
            $catManager->deleteCategory($id, 1);
            echo json_encode(['success' => true, 'message' => 'Category deleted']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Category ID required']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
