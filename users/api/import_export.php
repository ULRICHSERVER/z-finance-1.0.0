<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../../rbac/classes/RbacManager.php';
require_once __DIR__ . '/../classes/UserManager.php';
require_once __DIR__ . '/../classes/UserImporterExporter.php';

use ZFinance\Users\UserManager;
use ZFinance\Users\UserImporterExporter;

try {
    $pdo = new PDO('sqlite::memory:');
    $userManager = new UserManager($pdo, 1);
    $importerExporter = new UserImporterExporter($pdo, $userManager);

    $action = $_GET['action'] ?? $_POST['action'] ?? 'export';

    if ($action === 'import') {
        $csvContent = $_POST['csv_data'] ?? file_get_contents('php://input');
        $roleId = (int)($_POST['role_id'] ?? 8);
        $plan = $_POST['plan_code'] ?? 'free';

        $report = $importerExporter->importCsv($csvContent, $roleId, $plan);
        echo json_encode(['status' => 'success', 'data' => $report]);

    } elseif ($action === 'export') {
        $filters = [
            'status' => $_GET['status'] ?? 'all',
            'role_id' => $_GET['role_id'] ?? 'all',
            'plan' => $_GET['plan'] ?? 'all'
        ];
        $csv = $importerExporter->exportCsv($filters);

        if (isset($_GET['download'])) {
            header('Content-Type: text/csv');
            header('Content-Disposition: attachment; filename="zfinance_users_export_' . date('Y-m-d') . '.csv"');
            echo $csv;
            exit;
        }

        echo json_encode(['status' => 'success', 'csv_content' => $csv]);
    } else {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => "Unknown import/export action '{$action}'"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
