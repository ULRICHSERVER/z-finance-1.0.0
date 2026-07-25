<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Employees Engine
 * Endpoint: /modules/employees/api/employees.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');

require_once __DIR__ . '/../classes/EmployeeManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$empManager = new EmployeeManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $search = $_GET['search'] ?? null;
        $deptId = isset($_GET['department_id']) ? (int)$_GET['department_id'] : null;
        $teamId = isset($_GET['team_id']) ? (int)$_GET['team_id'] : null;

        $employees = $empManager->getEmployees(1, $search, $deptId, $teamId);
        echo json_encode(['success' => true, 'employees' => $employees]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if (empty($data['first_name']) || empty($data['email'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'First Name and Email are required']);
            exit;
        }

        $id = $empManager->createEmployee($data, 1);
        echo json_encode(['success' => true, 'employee_id' => $id]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
