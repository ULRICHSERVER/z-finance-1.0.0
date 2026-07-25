<?php
/**
 * Z-FINANCE 1.0.0 - RBAC Audit Logs API
 */

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../../auth/api/db_connect.php';
require_once __DIR__ . '/../classes/RbacManager.php';

use ZFinance\Rbac\RbacManager;

try {
    $pdo = getDbConnection();
    $rbac = new RbacManager($pdo);
    $limit = (int)($_GET['limit'] ?? 50);
    $logs = $rbac->getAuditLogs($limit);
    echo json_encode(['success' => true, 'logs' => $logs]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server Error: ' . $e->getMessage()]);
}
