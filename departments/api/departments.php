<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Departments Engine
 * Endpoint: /modules/departments/api/departments.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once __DIR__ . '/../classes/DepartmentManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$deptManager = new DepartmentManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $departments = $deptManager->getDepartments(1);
        echo json_encode(['success' => true, 'departments' => $departments]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        $id = $deptManager->createDepartment($data['department_code'], $data['department_name'], $data['description'] ?? '', 1);
        echo json_encode(['success' => true, 'department_id' => $id]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
