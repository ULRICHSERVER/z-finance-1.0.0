<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/db_connect.php';
require_once __DIR__ . '/../classes/SessionManager.php';
use ZFinance\Auth\SessionManager;

SessionManager::startSecureSession();
$userId = $_SESSION['user_id'] ?? null;

if ($userId) {
    try {
        $pdo = getAuthPdo();
        SessionManager::logoutCurrentSession($pdo, (int)$userId);
    } catch (\Exception $e) {
        SessionManager::destroySession();
    }
} else {
    SessionManager::destroySession();
}

// Clear remember me cookie
if (isset($_COOKIE['zfin_remember'])) {
    setcookie('zfin_remember', '', time() - 3600, '/');
}

echo json_encode([
    'success' => true,
    'message' => 'Logged out successfully.'
]);
