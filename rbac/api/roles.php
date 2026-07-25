<?php
/**
 * Z-FINANCE 1.0.0 - RBAC Roles API Endpoint
 * Handles CRUD, cloning, search, filter, and permission matrix assignments for roles.
 */

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../../auth/api/db_connect.php';
require_once __DIR__ . '/../classes/RbacManager.php';

use ZFinance\Rbac\RbacManager;

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? $_POST['action'] ?? 'list';

try {
    $pdo = getDbConnection();
    $rbac = new RbacManager($pdo);
    $userId = $_SESSION['user_id'] ?? 1;

    switch ($action) {
        case 'list':
            $search = $_GET['search'] ?? '';
            $roles = $rbac->getRoles(false, $search);
            echo json_encode(['success' => true, 'roles' => $roles]);
            break;

        case 'get':
            $roleId = (int)($_GET['id'] ?? 0);
            $role = $rbac->getRole($roleId);
            if ($role) {
                echo json_encode(['success' => true, 'role' => $role]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Role not found.']);
            }
            break;

        case 'create':
            $raw = file_get_contents('php://input');
            $data = json_decode($raw, true) ?? $_POST;
            $permIds = $data['permissions'] ?? [];
            $result = $rbac->createRole($data, $permIds, $userId);
            if (!$result['success']) http_response_code(400);
            echo json_encode($result);
            break;

        case 'update':
            $raw = file_get_contents('php://input');
            $data = json_decode($raw, true) ?? $_POST;
            $roleId = (int)($data['id'] ?? 0);
            $permIds = $data['permissions'] ?? [];
            $result = $rbac->updateRole($roleId, $data, $permIds, $userId);
            if (!$result['success']) http_response_code(400);
            echo json_encode($result);
            break;

        case 'delete':
            $roleId = (int)($_GET['id'] ?? $_POST['id'] ?? 0);
            $result = $rbac->deleteRole($roleId, $userId);
            if (!$result['success']) http_response_code(400);
            echo json_encode($result);
            break;

        case 'restore':
            $roleId = (int)($_GET['id'] ?? $_POST['id'] ?? 0);
            $result = $rbac->restoreRole($roleId, $userId);
            echo json_encode($result);
            break;

        case 'clone':
            $raw = file_get_contents('php://input');
            $data = json_decode($raw, true) ?? $_POST;
            $sourceId = (int)($data['source_id'] ?? 0);
            $newName = trim($data['new_name'] ?? '');
            $result = $rbac->cloneRole($sourceId, $newName, $userId);
            echo json_encode($result);
            break;

        default:
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid action parameter.']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server Error: ' . $e->getMessage()]);
}
