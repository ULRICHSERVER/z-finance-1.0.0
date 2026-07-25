<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Double-Entry Journal Entries
 * Endpoint: /modules/accounting/api/journals.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once __DIR__ . '/../classes/JournalManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$journalManager = new JournalManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $journal = $journalManager->getJournalWithLines($_GET['id'], 1);
            echo json_encode(['success' => true, 'data' => $journal]);
        } else {
            $filters = [
                'status' => $_GET['status'] ?? null,
                'search' => $_GET['search'] ?? null
            ];
            $journals = $journalManager->getJournals(1, $filters);
            echo json_encode(['success' => true, 'data' => $journals]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if (!isset($data['description']) || empty($data['lines'])) {
            echo json_encode(['success' => false, 'message' => 'Description and line items are required']);
            exit;
        }

        try {
            $journalId = $journalManager->createJournalEntry($data, 1, 1);
            echo json_encode(['success' => true, 'message' => 'Journal entry posted successfully', 'journal_id' => $journalId]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
