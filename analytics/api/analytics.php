<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Financial Analytics & Executive Dashboard
 * Endpoint: /modules/analytics/api/analytics.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once __DIR__ . '/../classes/AnalyticsManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$analytics = new AnalyticsManager($pdo);
$action = $_GET['action'] ?? 'dashboard';

switch ($action) {
    case 'dashboard':
        $data = $analytics->getExecutiveDashboard(1);
        echo json_encode(['success' => true, 'dashboard' => $data]);
        break;

    case 'kpis':
        $data = $analytics->getCalculatedKPIs(1);
        echo json_encode(['success' => true, 'kpis' => $data]);
        break;

    case 'cash_flow':
        $data = $analytics->getCashFlowAnalytics(1);
        echo json_encode(['success' => true, 'cash_flow' => $data]);
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Invalid analytics action']);
        break;
}
