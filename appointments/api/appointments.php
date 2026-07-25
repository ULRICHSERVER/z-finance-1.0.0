<?php
/**
 * Z-FINANCE 1.0.0 - Appointments REST API Endpoint
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$action = $_GET['action'] ?? $_POST['action'] ?? 'get_appointments';

$sampleAppointments = [
    [
        'id' => 1,
        'appointment_number' => 'APT-20260723-8821',
        'customer_id' => 101,
        'customer_name' => 'Acme Corporation (John Miller)',
        'customer_email' => 'john.m@acmecorp.com',
        'customer_phone' => '+1 (555) 234-5678',
        'service_id' => 12,
        'service_name' => 'Enterprise Financial Audit Consultation',
        'assigned_employee_id' => 4,
        'assigned_employee_name' => 'Sarah Connor (Senior Accountant)',
        'appointment_date' => date('Y-m-d'),
        'appointment_time' => '11:00:00',
        'duration_minutes' => 60,
        'location' => 'Main Executive Suite B',
        'status' => 'confirmed',
        'payment_status' => 'paid',
        'notes' => 'Customer requested focus on international tax compliance.'
    ],
    [
        'id' => 2,
        'appointment_number' => 'APT-20260723-9104',
        'customer_id' => 102,
        'customer_name' => 'Global Logistics Inc (Elena Rostova)',
        'customer_email' => 'elena@globallogistics.io',
        'customer_phone' => '+1 (555) 876-5432',
        'service_id' => 15,
        'service_name' => 'Software & Ledger Integration Review',
        'assigned_employee_id' => 2,
        'assigned_employee_name' => 'David Kim (Lead Developer)',
        'appointment_date' => date('Y-m-d', strtotime('+1 day')),
        'appointment_time' => '15:30:00',
        'duration_minutes' => 45,
        'location' => 'Online Google Meet',
        'status' => 'requested',
        'payment_status' => 'unpaid',
        'notes' => 'Awaiting confirmation from engineering lead.'
    ]
];

switch ($action) {
    case 'get_appointments':
        echo json_encode([
            'status' => 'success',
            'data' => $sampleAppointments,
            'total' => count($sampleAppointments)
        ]);
        break;

    case 'create_appointment':
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true) ?? $_POST;
        $num = 'APT-' . date('Ymd') . '-' . rand(1000, 9999);
        echo json_encode([
            'status' => 'success',
            'message' => 'Appointment booked successfully',
            'appointment' => array_merge(['id' => rand(100, 999), 'appointment_number' => $num, 'status' => 'confirmed'], $data)
        ]);
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
        break;
}
