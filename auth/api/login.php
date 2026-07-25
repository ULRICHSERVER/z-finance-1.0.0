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
$cleanInput = Security::sanitizeArray($input);

$identifier = $cleanInput['login_identifier'] ?? '';
$password = $input['password'] ?? '';
$rememberMe = !empty($cleanInput['remember_me']);

if (empty($identifier) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Username/email and password are required.']);
    exit;
}

try {
    $pdo = getAuthPdo();
    $auth = new Auth($pdo);
    $response = $auth->login($identifier, $password, $rememberMe);
    echo json_encode($response);
} catch (\Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Login processing error: ' . $e->getMessage()]);
}
