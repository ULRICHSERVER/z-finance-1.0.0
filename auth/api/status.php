<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/db_connect.php';
require_once __DIR__ . '/../classes/SessionManager.php';
use ZFinance\Auth\SessionManager;

SessionManager::startSecureSession();

if (!empty($_SESSION['logged_in'])) {
    echo json_encode([
        'authenticated' => true,
        'user' => [
            'id' => $_SESSION['user_id'],
            'uuid' => $_SESSION['uuid'],
            'username' => $_SESSION['username'],
            'email' => $_SESSION['email'],
            'full_name' => $_SESSION['full_name'],
            'role_code' => $_SESSION['role_code'],
            'role_name' => $_SESSION['role_name'],
            'status' => $_SESSION['status']
        ],
        'session_id' => session_id()
    ]);
} else {
    echo json_encode([
        'authenticated' => false,
        'user' => null
    ]);
}
