<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Teams Engine
 * Endpoint: /modules/teams/api/teams.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once __DIR__ . '/../classes/TeamManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$teamManager = new TeamManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $teams = $teamManager->getTeams(1);
        echo json_encode(['success' => true, 'teams' => $teams]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        $id = $teamManager->createTeam($data['team_name'], $data['description'] ?? '', $data['department_id'] ?? null, 1);
        echo json_encode(['success' => true, 'team_id' => $id]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
