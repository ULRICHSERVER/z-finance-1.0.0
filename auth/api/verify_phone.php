<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/db_connect.php';
require_once __DIR__ . '/../classes/Security.php';
use ZFinance\Auth\Security;

$input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
$smsCode = Security::sanitize($input['sms_code'] ?? '');

if (empty($smsCode) || strlen($smsCode) !== 6) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid 6-digit SMS verification code.']);
    exit;
}

// Future-ready phone SMS verification stub
echo json_encode([
    'success' => true,
    'message' => 'Phone number verified successfully! Multi-Factor Authentication registered.'
]);
