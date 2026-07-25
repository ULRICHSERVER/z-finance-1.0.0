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
$email = $cleanInput['email'] ?? '';

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Please provide a valid email address.']);
    exit;
}

try {
    $pdo = getAuthPdo();
    $auth = new Auth($pdo);
    $response = $auth->requestPasswordReset($email);
    echo json_encode($response);
} catch (\Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Password reset request error: ' . $e->getMessage()]);
}
