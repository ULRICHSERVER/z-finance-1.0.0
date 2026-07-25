<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Project Management
 * Endpoint: /modules/projects/api/projects.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

require_once __DIR__ . '/../classes/ProjectManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$projectManager = new ProjectManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $action = $_GET['action'] ?? 'list';
        if ($action === 'dashboard') {
            $summary = $projectManager->getDashboardSummary(1);
            echo json_encode(['success' => true, 'dashboard' => $summary]);
        } else {
            $filters = [
                'status' => $_GET['status'] ?? null,
                'priority' => $_GET['priority'] ?? null,
                'search' => $_GET['search'] ?? null
            ];
            $projects = $projectManager->getProjects(1, $filters);
            echo json_encode(['success' => true, 'projects' => $projects]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if (!isset($data['project_name'])) {
            echo json_encode(['success' => false, 'message' => 'Project Name is required']);
            exit;
        }

        try {
            $projectId = $projectManager->createProject($data, 1, 1);
            echo json_encode([
                'success' => true, 
                'message' => 'Project created successfully', 
                'project_id' => $projectId
            ]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
