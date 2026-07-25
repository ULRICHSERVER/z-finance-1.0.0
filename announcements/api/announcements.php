<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Announcements Engine
 * Endpoint: /modules/announcements/api/announcements.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once __DIR__ . '/../classes/AnnouncementManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$annManager = new AnnouncementManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $announcements = $annManager->getAnnouncements(1);
        echo json_encode(['success' => true, 'announcements' => $announcements]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        $id = $annManager->createAnnouncement(
            $data['title'],
            $data['content'],
            $data['type'] ?? 'global',
            $data['priority'] ?? 'medium'
        );
        echo json_encode(['success' => true, 'announcement_id' => $id]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
