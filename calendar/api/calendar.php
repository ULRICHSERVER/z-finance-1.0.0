<?php
/**
 * Z-FINANCE 1.0.0 - Calendar REST API Endpoint
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$action = $_GET['action'] ?? $_POST['action'] ?? 'get_events';

$sampleEvents = [
    [
        'id' => 101,
        'calendar_id' => 1,
        'calendar_name' => 'General Operations',
        'color_hex' => '#4f46e5',
        'title' => 'Executive Strategy Sync',
        'description' => 'Quarterly review with department heads & board members',
        'category' => 'meeting',
        'start_date' => date('Y-m-d'),
        'start_time' => '10:00:00',
        'end_date' => date('Y-m-d'),
        'end_time' => '11:30:00',
        'location' => 'Executive Boardroom / Zoom',
        'online_meeting_link' => 'https://meet.google.com/zfin-exec-sync',
        'priority' => 'high',
        'status' => 'scheduled',
        'reminder_minutes_before' => 15,
        'organizer_id' => 1,
        'workspace_id' => 1,
        'is_recurring' => 0
    ],
    [
        'id' => 102,
        'calendar_id' => 2,
        'calendar_name' => 'CRM & Client Meetings',
        'color_hex' => '#059669',
        'title' => 'Acme Corp Contract Renewal Consultation',
        'description' => 'Reviewing annual license updates and custom SLA details',
        'category' => 'appointment',
        'start_date' => date('Y-m-d', strtotime('+1 day')),
        'start_time' => '14:00:00',
        'end_date' => date('Y-m-d', strtotime('+1 day')),
        'end_time' => '15:00:00',
        'location' => 'Client HQ & Google Meet',
        'online_meeting_link' => 'https://meet.google.com/acme-renewal-2026',
        'priority' => 'urgent',
        'status' => 'scheduled',
        'reminder_minutes_before' => 30,
        'organizer_id' => 2,
        'workspace_id' => 1,
        'is_recurring' => 0
    ],
    [
        'id' => 103,
        'calendar_id' => 3,
        'calendar_name' => 'Project Milestones',
        'color_hex' => '#d97706',
        'title' => 'Q3 Financial Ledger Audit Due',
        'description' => 'Final submission deadline for internal auditing logs',
        'category' => 'deadline',
        'start_date' => date('Y-m-d', strtotime('+3 days')),
        'start_time' => '17:00:00',
        'end_date' => date('Y-m-d', strtotime('+3 days')),
        'end_time' => '18:00:00',
        'location' => 'Accounting Department',
        'priority' => 'high',
        'status' => 'scheduled',
        'reminder_minutes_before' => 60,
        'organizer_id' => 1,
        'workspace_id' => 1,
        'is_recurring' => 0
    ]
];

switch ($action) {
    case 'get_events':
        echo json_encode([
            'status' => 'success',
            'data' => $sampleEvents,
            'total' => count($sampleEvents)
        ]);
        break;

    case 'create_event':
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true) ?? $_POST;
        echo json_encode([
            'status' => 'success',
            'message' => 'Event created successfully',
            'event' => array_merge(['id' => rand(200, 999), 'status' => 'scheduled'], $data)
        ]);
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
        break;
}
