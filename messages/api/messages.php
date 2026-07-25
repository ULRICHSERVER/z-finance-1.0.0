<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Messaging Engine
 * Endpoint: /modules/messages/api/messages.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once __DIR__ . '/../classes/MessageManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$msgManager = new MessageManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $action = $_GET['action'] ?? 'conversations';
        if ($action === 'conversations') {
            $convs = $msgManager->getConversations(1, 1);
            echo json_encode(['success' => true, 'conversations' => $convs]);
        } else if ($action === 'messages') {
            $convId = $_GET['conversation_id'] ?? 1;
            $msgs = $msgManager->getMessages($convId, 1);
            echo json_encode(['success' => true, 'messages' => $msgs]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        $action = $data['action'] ?? 'send_message';

        if ($action === 'send_message') {
            $msgId = $msgManager->sendMessage($data['conversation_id'], 1, $data['message_text'], $data['message_type'] ?? 'text');
            echo json_encode(['success' => true, 'message_id' => $msgId]);
        } else if ($action === 'create_conversation') {
            $convId = $msgManager->createConversation($data['type'] ?? 'direct', $data['title'] ?? null, $data['members'] ?? []);
            echo json_encode(['success' => true, 'conversation_id' => $convId]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
