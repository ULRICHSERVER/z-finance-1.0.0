<?php
/**
 * Z-FINANCE 1.0.0 - REST API: AI Financial Insights & Forecasting
 * Endpoint: /modules/ai_finance/api/insights.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once __DIR__ . '/../classes/AIFinanceEngine.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$aiEngine = new AIFinanceEngine($pdo);
$action = $_GET['action'] ?? 'insights';

switch ($action) {
    case 'insights':
        $insights = $aiEngine->generateInsights(1);
        echo json_encode(['success' => true, 'insights' => $insights]);
        break;

    case 'forecast':
        $months = (int)($_GET['months'] ?? 6);
        $forecast = $aiEngine->generateForecast($months, 1);
        echo json_encode(['success' => true, 'forecast' => $forecast]);
        break;

    case 'alerts':
        $alerts = $aiEngine->getActiveAlerts(1);
        echo json_encode(['success' => true, 'alerts' => $alerts]);
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Invalid AI action']);
        break;
}
