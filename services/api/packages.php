<?php
/**
 * Z-FINANCE 1.0.0 - Service Packages REST API Endpoint
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../classes/ServicePackageManager.php';

try {
    $dbPath = __DIR__ . '/../../../database.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS service_packages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            service_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            description TEXT,
            price REAL DEFAULT 0.00,
            discount_percentage REAL DEFAULT 0.00,
            duration_unit TEXT DEFAULT 'month',
            duration_value INTEGER DEFAULT 1,
            max_customers INTEGER DEFAULT 0,
            max_projects INTEGER DEFAULT 0,
            max_sessions INTEGER DEFAULT 0,
            is_popular INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS service_package_features (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            package_id INTEGER NOT NULL,
            feature_text TEXT NOT NULL,
            is_included INTEGER DEFAULT 1
        );
    ");
} catch (Exception $e) {
    // Return fallback
}

$pkgMgr = new ServicePackageManager($pdo);
$action = $_GET['action'] ?? 'list';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if ($action === 'list') {
            $serviceId = (int)($_GET['service_id'] ?? 0);
            $packages = $pkgMgr->getPackagesByService($serviceId);
            echo json_encode(['status' => 'success', 'packages' => $packages]);
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

        if ($action === 'save') {
            if (!empty($input['id'])) {
                $pkgMgr->updatePackage($input['id'], $input);
                echo json_encode(['status' => 'success', 'message' => 'Package updated successfully']);
            } else {
                $serviceId = (int)($input['service_id'] ?? 0);
                $pkgId = $pkgMgr->createPackage($serviceId, $input);
                echo json_encode(['status' => 'success', 'id' => $pkgId, 'message' => 'Package created successfully']);
            }
        } elseif ($action === 'delete') {
            $id = (int)($input['id'] ?? 0);
            $pkgMgr->deletePackage($id);
            echo json_encode(['status' => 'success', 'message' => 'Package deleted successfully']);
        }
    }
} catch (Exception $ex) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $ex->getMessage()]);
}
