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

// Preserve raw password for validation & hashing
$cleanInput['password'] = $input['password'] ?? '';
$cleanInput['confirm_password'] = $input['confirm_password'] ?? '';

try {
    $pdo = getAuthPdo();
    $auth = new Auth($pdo);
    $response = $auth->register($cleanInput);
    echo json_encode($response);
} catch (\Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Registration processing error: ' . $e->getMessage()]);
}
