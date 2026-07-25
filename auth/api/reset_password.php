<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/db_connect.php';
require_once __DIR__ . '/../classes/Security.php';
require_once __DIR__ . '/../classes/Validator.php';
require_once __DIR__ . '/../classes/SessionManager.php';
require_once __DIR__ . '/../classes/Mailer.php';
require_once __DIR__ . '/../classes/Auth.php';

use ZFinance\Auth\Auth;
use ZFinance\Auth\Security;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
$token = Security::sanitize($input['token'] ?? '');
$newPassword = $input['new_password'] ?? '';
$confirmPassword = $input['confirm_new_password'] ?? '';

if (empty($token)) {
    echo json_encode(['success' => false, 'message' => 'Password reset token is required.']);
    exit;
}

if (empty($newPassword) || strlen($newPassword) < 8) {
    echo json_encode(['success' => false, 'message' => 'New password must be at least 8 characters long.']);
    exit;
}

if ($newPassword !== $confirmPassword) {
    echo json_encode(['success' => false, 'message' => 'Password confirmation does not match.']);
    exit;
}

try {
    $pdo = getAuthPdo();
    $auth = new Auth($pdo);
    $response = $auth->resetPassword($token, $newPassword);
    echo json_encode($response);
} catch (\Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Reset password processing error: ' . $e->getMessage()]);
}
