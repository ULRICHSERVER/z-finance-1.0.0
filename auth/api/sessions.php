<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/db_connect.php';
require_once __DIR__ . '/../classes/SessionManager.php';
use ZFinance\Auth\SessionManager;

SessionManager::startSecureSession();

$userId = $_SESSION['user_id'] ?? null;

if (!$userId) {
    echo json_encode(['success' => false, 'message' => 'Unauthenticated session.']);
    exit;
}

try {
    $pdo = getAuthPdo();
    $action = $_GET['action'] ?? $_POST['action'] ?? 'list';

    if ($action === 'logout_other') {
        $count = SessionManager::logoutOtherSessions($pdo, (int)$userId);
        echo json_encode([
            'success' => true,
            'message' => "Successfully terminated {$count} other active device session(s).",
            'revoked_count' => $count
        ]);
        exit;
    }

    $sessions = SessionManager::getUserActiveSessions($pdo, (int)$userId);
    echo json_encode([
        'success' => true,
        'sessions' => $sessions
    ]);

} catch (\Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Sessions processing error: ' . $e->getMessage()]);
}
