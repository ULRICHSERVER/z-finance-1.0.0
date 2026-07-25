<?php
/**
 * Z-FINANCE 1.0.0 - RBAC Permissions & Access Matrix API
 */

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../../auth/api/db_connect.php';
require_once __DIR__ . '/../classes/RbacManager.php';
require_once __DIR__ . '/../classes/PermissionRegistrar.php';

use ZFinance\Rbac\RbacManager;
use ZFinance\Rbac\PermissionRegistrar;

$action = $_GET['action'] ?? $_POST['action'] ?? 'matrix';

try {
    $pdo = getDbConnection();
    $rbac = new RbacManager($pdo);

    switch ($action) {
        case 'matrix':
            $groups = $rbac->getPermissionGroupsWithPermissions();
            $roles = $rbac->getRoles();
            echo json_encode([
                'success' => true,
                'groups' => $groups,
                'roles' => $roles
            ]);
            break;

        case 'register_module':
            $raw = file_get_contents('php://input');
            $data = json_decode($raw, true) ?? $_POST;
            $registrar = new PermissionRegistrar($pdo);
            $groupId = $registrar->registerModule(
                $data['group_code'],
                $data['group_name'],
                $data['description'] ?? '',
                $data['icon'] ?? 'bi-box',
                $data['actions'] ?? ['view', 'create', 'edit', 'delete']
            );
            echo json_encode(['success' => true, 'group_id' => $groupId, 'message' => "Module '{$data['group_name']}' registered successfully."]);
            break;

        default:
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid action.']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server Error: ' . $e->getMessage()]);
}
