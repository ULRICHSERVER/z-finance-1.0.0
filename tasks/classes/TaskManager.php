<?php
/**
 * Z-FINANCE 1.0.0 - Task & Time Tracking Engine
 * Handles Task CRUD, Status Progression, Comments, Time Logs, and Productivity tracking.
 */

class TaskManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    /**
     * Create New Task
     */
    public function createTask(array $data, $tenantId = 1, $userId = 1) {
        $taskNum = 'TSK-' . rand(10000, 99999);

        $stmt = $this->pdo->prepare("
            INSERT INTO project_tasks (
                tenant_id, project_id, task_number, task_title, description, assigned_to,
                priority, start_date, deadline, status, progress_percent, estimated_hours, created_by
            ) VALUES (
                :tenant_id, :project_id, :task_number, :task_title, :description, :assigned_to,
                :priority, :start_date, :deadline, :status, :progress_percent, :estimated_hours, :created_by
            )
        ");

        $stmt->execute([
            'tenant_id' => $tenantId,
            'project_id' => $data['project_id'],
            'task_number' => $data['task_number'] ?? $taskNum,
            'task_title' => $data['task_title'],
            'description' => $data['description'] ?? null,
            'assigned_to' => $data['assigned_to'] ?? $userId,
            'priority' => $data['priority'] ?? 'medium',
            'start_date' => $data['start_date'] ?? date('Y-m-d'),
            'deadline' => $data['deadline'] ?? date('Y-m-d', strtotime('+7 days')),
            'status' => $data['status'] ?? 'new',
            'progress_percent' => $data['progress_percent'] ?? 0.00,
            'estimated_hours' => $data['estimated_hours'] ?? 0.00,
            'created_by' => $userId
        ]);

        return $this->pdo->lastInsertId();
    }

    /**
     * Get Tasks by Project ID or Tenant
     */
    public function getTasks($tenantId = 1, $projectId = null, $filters = []) {
        $sql = "SELECT t.*, p.project_name, p.project_ref
                FROM project_tasks t
                INNER JOIN projects p ON t.project_id = p.id
                WHERE t.tenant_id = :tenant_id";

        $params = ['tenant_id' => $tenantId];

        if ($projectId) {
            $sql .= " AND t.project_id = :project_id";
            $params['project_id'] = $projectId;
        }

        if (!empty($filters['status'])) {
            $sql .= " AND t.status = :status";
            $params['status'] = $filters['status'];
        }

        if (!empty($filters['priority'])) {
            $sql .= " AND t.priority = :priority";
            $params['priority'] = $filters['priority'];
        }

        $sql .= " ORDER BY t.id DESC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Log Worked Time for a Task / Project
     */
    public function logTime($projectId, $taskId, $userId, $startTime, $endTime, $notes = '', $billableRate = 50.00, $tenantId = 1) {
        $start = new DateTime($startTime);
        $end = new DateTime($endTime);
        $diff = $start->diff($end);
        $minutes = ($diff->h * 60) + $diff->i + ($diff->days * 24 * 60);

        $stmt = $this->pdo->prepare("
            INSERT INTO project_time_tracking (
                tenant_id, project_id, task_id, user_id, start_time, end_time, duration_minutes, billable_rate, notes
            ) VALUES (
                :tenant_id, :project_id, :task_id, :user_id, :start_time, :end_time, :duration_minutes, :billable_rate, :notes
            )
        ");

        $stmt->execute([
            'tenant_id' => $tenantId,
            'project_id' => $projectId,
            'task_id' => $taskId,
            'user_id' => $userId,
            'start_time' => $startTime,
            'end_time' => $endTime,
            'duration_minutes' => $minutes,
            'billable_rate' => $billableRate,
            'notes' => $notes
        ]);

        return $this->pdo->lastInsertId();
    }

    /**
     * Add Comment to Task
     */
    public function addComment($taskId, $userId, $commentText) {
        $stmt = $this->pdo->prepare("
            INSERT INTO task_comments (task_id, user_id, comment_text)
            VALUES (:task_id, :user_id, :comment_text)
        ");
        $stmt->execute([
            'task_id' => $taskId,
            'user_id' => $userId,
            'comment_text' => $commentText
        ]);
        return $this->pdo->lastInsertId();
    }
}
