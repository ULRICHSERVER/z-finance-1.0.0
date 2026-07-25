<?php
/**
 * Z-FINANCE 1.0.0 - EDMS REST API Endpoint
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$action = $_GET['action'] ?? $_POST['action'] ?? 'get_documents';

$sampleDocuments = [
    [
        'id' => 101,
        'title' => 'Q3 Enterprise Financial Report.pdf',
        'file_name' => 'q3_report_2026.pdf',
        'file_size' => 4587520,
        'extension' => 'pdf',
        'file_type' => 'PDF Document',
        'current_version' => '1.2.0',
        'library_type' => 'business',
        'module_origin' => 'accounting',
        'status' => 'approved',
        'created_at' => '2026-07-20 10:30:00',
        'is_favorite' => true,
        'owner_name' => 'Sarah Connor',
        'tags' => ['Financial', 'Q3', 'Audit']
    ],
    [
        'id' => 102,
        'title' => 'Client Service Master Agreement.docx',
        'file_name' => 'client_agreement_v2.docx',
        'file_size' => 2048000,
        'extension' => 'docx',
        'file_type' => 'Word Document',
        'current_version' => '2.0.0',
        'library_type' => 'shared',
        'module_origin' => 'crm',
        'status' => 'under_review',
        'created_at' => '2026-07-22 14:15:00',
        'is_favorite' => false,
        'owner_name' => 'Alex Rivera',
        'tags' => ['Contract', 'Legal']
    ],
    [
        'id' => 103,
        'title' => 'Company Logo & Brand Guidelines 2026.png',
        'file_name' => 'brand_kit.png',
        'file_size' => 8388608,
        'extension' => 'png',
        'file_type' => 'Image',
        'current_version' => '1.0.0',
        'library_type' => 'workspace',
        'module_origin' => 'advertisement',
        'status' => 'approved',
        'created_at' => '2026-07-24 09:00:00',
        'is_favorite' => true,
        'owner_name' => 'John Doe',
        'tags' => ['Branding', 'AdSuite']
    ]
];

switch ($action) {
    case 'get_documents':
        echo json_encode(['status' => 'success', 'data' => $sampleDocuments]);
        break;

    case 'get_storage_quota':
        echo json_encode([
            'status' => 'success',
            'data' => [
                'total_space_bytes' => 10737418240, // 10 GB
                'used_space_bytes'  => 3221225472,  // ~3 GB
                'free_space_bytes'  => 7516192768,  // ~7 GB
                'file_count'        => 452,
                'usage_percentage'  => 30.0
            ]
        ]);
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid action parameter']);
        break;
}
