<?php
/**
 * Z-FINANCE 1.0.0 - User Access & Direct Permission Overrides API
 */

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../../auth/api/db_connect.php';
require_once __DIR__ . '/../classes/RbacManager.php';

use ZFinance\Rbac\RbacManager;

$action = $_GET['action'] ?? $_POST['action'] ?? 'get_user_context';

try {
    $pdo = getDbConnection();
    $rbac = new RbacManager($pdo);
    $performedBy = $_SESSION['user_id'] ?? 1;

    switch ($action) {
        case 'get_user_context':
            $targetUserId = (int)($_GET['user_id'] ?? $performedBy);
            $context = $rbac->getUserPermissions($targetUserId);
            echo json_encode(['success' => true, 'context' => $context]);
            break;

        case 'assign_roles':
            $raw = file_get_contents('php://input');
            $data = json_decode($raw, true) ?? $_POST;
            $targetUserId = (int)($data['user_id'] ?? 0);
            $roleIds = $data['role_ids'] ?? [];
            $primaryRoleId = (int)($data['primary_role_id'] ?? ($roleIds[0] ?? 0));
            $result = $rbac->assignUserRoles($targetUserId, $roleIds, $primaryRoleId, $performedBy);
            echo json_encode($result);
            break;

        case 'override_permission':
            $raw = file_get_contents('php://input');
            $data = json_decode($raw, true) ?? $_POST;
            $targetUserId = (int)($data['user_id'] ?? 0);
            $permissionId = (int)($data['permission_id'] ?? 0);
            $isGranted = (bool)($data['is_granted'] ?? true);
            $expiresAt = $data['expires_at'] ?? null;
            $result = $rbac->setUserPermissionOverride($targetUserId, $permissionId, $isGranted, $performedBy, $expiresAt);
            echo json_encode($result);
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
