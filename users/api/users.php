<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../../rbac/classes/RbacManager.php';
require_once __DIR__ . '/../classes/UserManager.php';

use ZFinance\Users\UserManager;

try {
    // Mock database connection for standard PHP environment
    $pdo = new PDO('sqlite::memory:');
    $userManager = new UserManager($pdo, 1);

    $action = $_GET['action'] ?? $_POST['action'] ?? 'list';

    switch ($action) {
        case 'stats':
            echo json_encode(['status' => 'success', 'data' => $userManager->getDashboardStats()]);
            break;

        case 'list':
            $page = (int)($_GET['page'] ?? 1);
            $limit = (int)($_GET['limit'] ?? 15);
            $filters = [
                'search' => $_GET['search'] ?? '',
                'status' => $_GET['status'] ?? 'all',
                'role_id' => $_GET['role_id'] ?? 'all',
                'plan' => $_GET['plan'] ?? 'all',
                'is_verified' => $_GET['is_verified'] ?? 'all',
                'sort_by' => $_GET['sort_by'] ?? 'created_at',
                'sort_order' => $_GET['sort_order'] ?? 'DESC'
            ];
            $result = $userManager->searchUsers($filters, $page, $limit);
            echo json_encode(['status' => 'success', 'data' => $result]);
            break;

        case 'get':
            $userId = (int)($_GET['id'] ?? 0);
            $user = $userManager->getUserDetails($userId);
            if (!$user) {
                http_response_code(404);
                echo json_encode(['status' => 'error', 'message' => 'User not found']);
                exit;
            }
            echo json_encode(['status' => 'success', 'data' => $user]);
            break;

        case 'create':
            $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
            $userId = $userManager->createUser($input);
            echo json_encode(['status' => 'success', 'message' => 'User account created successfully', 'user_id' => $userId]);
            break;

        case 'update':
            $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
            $userId = (int)($input['id'] ?? 0);
            $userManager->updateUser($userId, $input);
            echo json_encode(['status' => 'success', 'message' => 'User profile updated successfully']);
            break;

        case 'update_status':
            $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
            $userId = (int)($input['id'] ?? 0);
            $status = $input['status'] ?? 'active';
            $userManager->updateStatus($userId, $status);
            echo json_encode(['status' => 'success', 'message' => "User status changed to '{$status}'"]);
            break;

        case 'delete':
            $userId = (int)($_GET['id'] ?? $_POST['id'] ?? 0);
            $userManager->softDeleteUser($userId);
            echo json_encode(['status' => 'success', 'message' => 'User account soft-deleted']);
            break;

        case 'restore':
            $userId = (int)($_GET['id'] ?? $_POST['id'] ?? 0);
            $userManager->restoreUser($userId);
            echo json_encode(['status' => 'success', 'message' => 'User account restored']);
            break;

        case 'hard_delete':
            $userId = (int)($_GET['id'] ?? $_POST['id'] ?? 0);
            $userManager->hardDeleteUser($userId);
            echo json_encode(['status' => 'success', 'message' => 'User account permanently deleted']);
            break;

        default:
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => "Unknown action '{$action}'"]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
