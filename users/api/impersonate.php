<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../../rbac/classes/RbacManager.php';
require_once __DIR__ . '/../classes/UserManager.php';

use ZFinance\Users\UserManager;

try {
    $pdo = new PDO('sqlite::memory:');
    $userManager = new UserManager($pdo, 1);

    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    $targetUserId = (int)($input['target_user_id'] ?? 0);
    $reason = trim($input['reason'] ?? 'Admin support session');

    if ($targetUserId <= 0) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Target User ID is required for account impersonation.']);
        exit;
    }

    $result = $userManager->impersonateUser($targetUserId, $reason);
    echo json_encode(['status' => 'success', 'data' => $result]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
