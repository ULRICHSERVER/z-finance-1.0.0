<?php
/**
 * Z-FINANCE 1.0.0 - Calendar Manager
 * Handles calendar creation, event CRUD, view transformations, and participant management.
 */

namespace ZFinance\Calendar;

use PDO;
use Exception;

class CalendarManager {
    private PDO $db;
    private int $tenantId;

    public function __construct(PDO $db, int $tenantId = 1) {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getCalendars(int $userId): array {
        $stmt = $this->db->prepare("
            SELECT c.*, cp.permission_level 
            FROM calendars c
            LEFT JOIN calendar_permissions cp ON c.id = cp.calendar_id AND cp.user_id = :userId
            WHERE c.tenant_id = :tenantId AND (c.owner_id = :userId OR c.is_shared = 1)
            ORDER BY c.is_primary DESC, c.calendar_name ASC
        ");
        $stmt->execute(['tenantId' => $this->tenantId, 'userId' => $userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createCalendar(array $data): array {
        $stmt = $this->db->prepare("
            INSERT INTO calendars (tenant_id, owner_type, owner_id, calendar_name, color_hex, is_primary, is_shared)
            VALUES (:tenantId, :ownerType, :ownerId, :name, :color, :isPrimary, :isShared)
        ");
        $stmt->execute([
            'tenantId' => $this->tenantId,
            'ownerType' => $data['owner_type'] ?? 'user',
            'ownerId' => $data['owner_id'] ?? 1,
            'name' => $data['calendar_name'],
            'color' => $data['color_hex'] ?? '#4f46e5',
            'isPrimary' => $data['is_primary'] ?? 0,
            'isShared' => $data['is_shared'] ?? 0
        ]);
        $id = $this->db->lastInsertId();
        return ['success' => true, 'calendar_id' => $id];
    }

    public function getEvents(string $startDate, string $endDate, ?int $calendarId = null): array {
        $sql = "
            SELECT e.*, c.calendar_name, c.color_hex 
            FROM events e
            JOIN calendars c ON e.calendar_id = c.id
            WHERE e.tenant_id = :tenantId
            AND e.start_date <= :endDate AND e.end_date >= :startDate
        ";
        $params = [
            'tenantId' => $this->tenantId,
            'startDate' => $startDate,
            'endDate' => $endDate
        ];

        if ($calendarId) {
            $sql .= " AND e.calendar_id = :calendarId";
            $params['calendarId'] = $calendarId;
        }

        $sql .= " ORDER BY e.start_date ASC, e.start_time ASC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createEvent(array $data): array {
        $stmt = $this->db->prepare("
            INSERT INTO events (
                tenant_id, calendar_id, title, description, category, organizer_id,
                workspace_id, start_date, start_time, end_date, end_time, location,
                online_meeting_link, priority, status, reminder_minutes_before, is_recurring, notes
            ) VALUES (
                :tenantId, :calendarId, :title, :description, :category, :organizerId,
                :workspaceId, :startDate, :startTime, :endDate, :endTime, :location,
                :onlineLink, :priority, :status, :reminder, :isRecurring, :notes
            )
        ");
        $stmt->execute([
            'tenantId' => $this->tenantId,
            'calendarId' => $data['calendar_id'] ?? 1,
            'title' => $data['title'],
            'description' => $data['description'] ?? '',
            'category' => $data['category'] ?? 'meeting',
            'organizerId' => $data['organizer_id'] ?? 1,
            'workspaceId' => $data['workspace_id'] ?? null,
            'startDate' => $data['start_date'],
            'startTime' => $data['start_time'] ?? '09:00:00',
            'endDate' => $data['end_date'] ?? $data['start_date'],
            'endTime' => $data['end_time'] ?? '10:00:00',
            'location' => $data['location'] ?? '',
            'onlineLink' => $data['online_meeting_link'] ?? '',
            'priority' => $data['priority'] ?? 'medium',
            'status' => $data['status'] ?? 'scheduled',
            'reminder' => $data['reminder_minutes_before'] ?? 15,
            'isRecurring' => $data['is_recurring'] ?? 0,
            'notes' => $data['notes'] ?? ''
        ]);
        $eventId = $this->db->lastInsertId();

        // Add Participants if provided
        if (!empty($data['participants']) && is_array($data['participants'])) {
            $pStmt = $this->db->prepare("
                INSERT INTO event_participants (event_id, participant_type, participant_id, participant_email, response_status)
                VALUES (:eventId, :type, :pId, :email, :status)
            ");
            foreach ($data['participants'] as $p) {
                $pStmt->execute([
                    'eventId' => $eventId,
                    'type' => $p['participant_type'] ?? 'employee',
                    'pId' => $p['participant_id'] ?? 1,
                    'email' => $p['participant_email'] ?? '',
                    'status' => 'pending'
                ]);
            }
        }

        return ['success' => true, 'event_id' => $eventId];
    }
}
