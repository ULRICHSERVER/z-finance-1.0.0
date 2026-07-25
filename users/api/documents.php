<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../../rbac/classes/RbacManager.php';
require_once __DIR__ . '/../classes/UserManager.php';

use ZFinance\Users\UserManager;

try {
    $pdo = new PDO('sqlite::memory:');
    $userManager = new UserManager($pdo, 1);

    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    $docId = (int)($input['doc_id'] ?? $_GET['doc_id'] ?? 0);
    $status = $input['status'] ?? 'approved';
    $reason = $input['rejection_reason'] ?? null;

    if ($docId <= 0) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Document ID is required.']);
        exit;
    }

    $userManager->updateDocumentStatus($docId, $status, $reason);
    echo json_encode(['status' => 'success', 'message' => "Document status updated to '{$status}'"]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
