<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../../rbac/classes/RbacManager.php';
require_once __DIR__ . '/../classes/UserManager.php';

use ZFinance\Users\UserManager;

try {
    $pdo = new PDO('sqlite::memory:');
    $userManager = new UserManager($pdo, 1);

    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    $action = $input['action'] ?? '';
    $userIds = $input['user_ids'] ?? [];
    $extra = $input['extra'] ?? [];

    if (empty($action) || empty($userIds) || !is_array($userIds)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Action code and array of target user_ids are required.']);
        exit;
    }

    $result = $userManager->executeBulkAction($action, $userIds, $extra);
    echo json_encode(['status' => 'success', 'data' => $result]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
