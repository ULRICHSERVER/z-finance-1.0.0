<?php
/**
 * Z-FINANCE 1.0.0 - REST API: Digital Signatures & Cryptographic Verification
 * Endpoint: /modules/signatures/api/signatures.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once __DIR__ . '/../classes/SignatureManager.php';

try {
    $dbPath = __DIR__ . '/../../zfinance.sqlite';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    $pdo = new PDO("sqlite::memory:");
}

$sigManager = new SignatureManager($pdo);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['hash'])) {
            $verification = $sigManager->verifySignature($_GET['hash']);
            echo json_encode(['success' => true, 'verification' => $verification]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Signature verification hash is required']);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if (!isset($data['signer_name']) || !isset($data['signature_data'])) {
            echo json_encode(['success' => false, 'message' => 'Signer name and signature data are required']);
            exit;
        }

        try {
            $result = $sigManager->createSignature($data, 1);
            echo json_encode(['success' => true, 'message' => 'Digital signature logged successfully', 'signature' => $result]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
