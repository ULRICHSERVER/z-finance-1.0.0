<?php
/**
 * Z-FINANCE 1.0.0 - Services REST API Endpoint
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../classes/ServiceManager.php';

try {
    $dbPath = __DIR__ . '/../../../database.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER DEFAULT 1,
            category_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            short_name TEXT,
            reference_code TEXT UNIQUE,
            slug TEXT UNIQUE,
            status TEXT DEFAULT 'active',
            visibility TEXT DEFAULT 'public',
            pricing_type TEXT DEFAULT 'fixed',
            base_price REAL DEFAULT 0.00,
            currency TEXT DEFAULT 'USD',
            short_description TEXT,
            detailed_description TEXT,
            featured_image TEXT,
            color TEXT DEFAULT '#2563eb',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS service_statistics (
            service_id INTEGER PRIMARY KEY,
            total_requests INTEGER DEFAULT 0,
            completed_projects INTEGER DEFAULT 0,
            total_revenue REAL DEFAULT 0.00,
            rating_score REAL DEFAULT 5.00,
            views_count INTEGER DEFAULT 0,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS service_availability (
            service_id INTEGER PRIMARY KEY,
            business_days TEXT,
            working_hours_start TEXT DEFAULT '08:00:00',
            working_hours_end TEXT DEFAULT '17:00:00',
            requires_appointment INTEGER DEFAULT 1,
            delivery_mode TEXT DEFAULT 'hybrid'
        );

        CREATE TABLE IF NOT EXISTS service_seo (
            service_id INTEGER PRIMARY KEY,
            seo_title TEXT,
            meta_description TEXT,
            keywords TEXT,
            og_image TEXT
        );

        CREATE TABLE IF NOT EXISTS service_tags (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            service_id INTEGER NOT NULL,
            tag_name TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS service_documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            service_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            file_path TEXT NOT NULL,
            file_type TEXT DEFAULT 'pdf',
            file_size_mb REAL DEFAULT 0.00,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");
} catch (Exception $e) {
    // Return fallback
}

$serviceMgr = new ServiceManager($pdo);
$action = $_GET['action'] ?? 'list';
$userId = 1;

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if ($action === 'stats') {
            $stats = $serviceMgr->getDashboardStats($userId);
            echo json_encode(['status' => 'success', 'stats' => $stats]);
        } elseif ($action === 'list') {
            $filters = [
                'status' => $_GET['status'] ?? null,
                'category_id' => $_GET['category_id'] ?? null,
                'pricing_type' => $_GET['pricing_type'] ?? null,
                'search' => $_GET['search'] ?? null,
                'visibility' => $_GET['visibility'] ?? null
            ];
            $services = $serviceMgr->getServices($userId, $filters);
            echo json_encode(['status' => 'success', 'services' => $services]);
        } elseif ($action === 'get') {
            $id = (int)($_GET['id'] ?? 0);
            $service = $serviceMgr->getServiceById($id, $userId);
            echo json_encode(['status' => 'success', 'service' => $service]);
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

        if ($action === 'save') {
            if (!empty($input['id'])) {
                $serviceMgr->updateService($input['id'], $input, $userId);
                echo json_encode(['status' => 'success', 'message' => 'Service updated successfully']);
            } else {
                $srvId = $serviceMgr->createService($input, $userId);
                echo json_encode(['status' => 'success', 'id' => $srvId, 'message' => 'Service created successfully']);
            }
        } elseif ($action === 'delete') {
            $id = (int)($input['id'] ?? 0);
            $serviceMgr->deleteService($id, $userId);
            echo json_encode(['status' => 'success', 'message' => 'Service deleted']);
        } elseif ($action === 'add_document') {
            $srvId = (int)($input['service_id'] ?? 0);
            $serviceMgr->addServiceDocument($srvId, $input['title'], $input['file_path'], $input['file_type'] ?? 'pdf', $input['file_size_mb'] ?? 0);
            echo json_encode(['status' => 'success', 'message' => 'Document added successfully']);
        }
    }
} catch (Exception $ex) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $ex->getMessage()]);
}
