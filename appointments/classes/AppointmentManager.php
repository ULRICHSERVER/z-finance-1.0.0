<?php
/**
 * Z-FINANCE 1.0.0 - Appointment Manager
 * Handles customer, service, employee appointments, booking statuses, and slot verification.
 */

namespace ZFinance\Appointments;

use PDO;

class AppointmentManager {
    private PDO $db;
    private int $tenantId;

    public function __construct(PDO $db, int $tenantId = 1) {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    public function getAppointments(array $filters = []): array {
        $sql = "SELECT * FROM appointments WHERE tenant_id = :tenantId";
        $params = ['tenantId' => $this->tenantId];

        if (!empty($filters['status'])) {
            $sql .= " AND status = :status";
            $params['status'] = $filters['status'];
        }

        if (!empty($filters['date'])) {
            $sql .= " AND appointment_date = :date";
            $params['date'] = $filters['date'];
        }

        $sql .= " ORDER BY appointment_date DESC, appointment_time ASC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createAppointment(array $data): array {
        $num = 'APT-' . date('Ymd') . '-' . rand(1000, 9999);
        $stmt = $this->db->prepare("
            INSERT INTO appointments (
                tenant_id, appointment_number, customer_id, customer_name, customer_email,
                customer_phone, service_id, service_name, assigned_employee_id,
                appointment_date, appointment_time, duration_minutes, location, status,
                payment_status, notes
            ) VALUES (
                :tenantId, :appNum, :customerId, :customerName, :customerEmail,
                :customerPhone, :serviceId, :serviceName, :assignedEmpId,
                :appDate, :appTime, :duration, :location, :status, :paymentStatus, :notes
            )
        ");
        $stmt->execute([
            'tenantId' => $this->tenantId,
            'appNum' => $num,
            'customerId' => $data['customer_id'] ?? null,
            'customerName' => $data['customer_name'],
            'customerEmail' => $data['customer_email'] ?? '',
            'customerPhone' => $data['customer_phone'] ?? '',
            'serviceId' => $data['service_id'] ?? null,
            'serviceName' => $data['service_name'] ?? 'General Service',
            'assignedEmpId' => $data['assigned_employee_id'] ?? null,
            'appDate' => $data['appointment_date'],
            'appTime' => $data['appointment_time'] ?? '10:00:00',
            'duration' => $data['duration_minutes'] ?? 30,
            'location' => $data['location'] ?? 'Main Office',
            'status' => $data['status'] ?? 'confirmed',
            'paymentStatus' => $data['payment_status'] ?? 'unpaid',
            'notes' => $data['notes'] ?? ''
        ]);
        $id = $this->db->lastInsertId();
        return ['success' => true, 'appointment_id' => $id, 'appointment_number' => $num];
    }

    public function updateStatus(int $id, string $status): array {
        $stmt = $this->db->prepare("
            UPDATE appointments SET status = :status WHERE id = :id AND tenant_id = :tenantId
        ");
        $stmt->execute(['status' => $status, 'id' => $id, 'tenantId' => $this->tenantId]);
        return ['success' => true];
    }
}
