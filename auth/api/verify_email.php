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

$token = Security::sanitize($_GET['token'] ?? $_POST['token'] ?? '');

if (empty($token)) {
    echo json_encode(['success' => false, 'message' => 'Verification token is required.']);
    exit;
}

try {
    $pdo = getAuthPdo();
    $auth = new Auth($pdo);
    $response = $auth->verifyEmail($token);
    echo json_encode($response);
} catch (\Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Email verification error: ' . $e->getMessage()]);
}
