<?php
/**
 * Z-FINANCE 1.0.0 - Service Categories REST API Endpoint
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../classes/ServiceCategoryManager.php';

// Mock SQLite / PDO Connection for standalone execution
try {
    $dbPath = __DIR__ . '/../../../database.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Bootstrap sqlite schema fallback
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS service_categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER DEFAULT 1,
            name TEXT NOT NULL,
            slug TEXT UNIQUE,
            description TEXT,
            icon TEXT DEFAULT 'Briefcase',
            color TEXT DEFAULT '#2563eb',
            image_url TEXT,
            is_active INTEGER DEFAULT 1,
            display_order INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");
} catch (Exception $e) {
    // Return empty fallback
}

$categoryMgr = new ServiceCategoryManager($pdo);
$action = $_GET['action'] ?? 'list';
$userId = 1;

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if ($action === 'list') {
            $categories = $categoryMgr->getCategories($userId);
            echo json_encode(['status' => 'success', 'categories' => $categories]);
        } elseif ($action === 'get') {
            $id = (int)($_GET['id'] ?? 0);
            $category = $categoryMgr->getCategoryById($id, $userId);
            echo json_encode(['status' => 'success', 'category' => $category]);
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

        if ($action === 'save') {
            if (!empty($input['id'])) {
                $categoryMgr->updateCategory($input['id'], $input, $userId);
                echo json_encode(['status' => 'success', 'message' => 'Category updated successfully']);
            } else {
                $catId = $categoryMgr->createCategory($input, $userId);
                echo json_encode(['status' => 'success', 'id' => $catId, 'message' => 'Category created successfully']);
            }
        } elseif ($action === 'toggle') {
            $id = (int)($input['id'] ?? 0);
            $categoryMgr->toggleCategoryStatus($id, $userId);
            echo json_encode(['status' => 'success', 'message' => 'Category status toggled']);
        } elseif ($action === 'delete') {
            $id = (int)($input['id'] ?? 0);
            $categoryMgr->deleteCategory($id, $userId);
            echo json_encode(['status' => 'success', 'message' => 'Category deleted']);
        }
    }
} catch (Exception $ex) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $ex->getMessage()]);
}
