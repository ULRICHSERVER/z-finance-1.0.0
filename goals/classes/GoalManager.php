<?php
/**
 * Z-FINANCE 1.0.0 - Financial Goals Manager Class
 * Handles creation, milestone tracking, contributions, and progress monitoring for financial goals.
 */

class GoalManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getGoals($tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT fg.*, 
                   ROUND((fg.current_amount / NULLIF(fg.target_amount, 0)) * 100, 2) as progress_percentage
            FROM financial_goals fg
            WHERE fg.tenant_id = :tenant_id
            ORDER BY fg.deadline ASC
        ");
        $stmt->execute(['tenant_id' => $tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createGoal($data, $tenantId = 1) {
        $refNo = 'GOAL-' . date('Y') . '-' . str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);

        $stmt = $this->pdo->prepare("
            INSERT INTO financial_goals (tenant_id, reference_no, goal_name, goal_type, target_amount, current_amount, currency, start_date, deadline, priority, status, description)
            VALUES (:tenant_id, :reference_no, :goal_name, :goal_type, :target_amount, :current_amount, :currency, :start_date, :deadline, :priority, :status, :description)
        ");

        $stmt->execute([
            'tenant_id' => $tenantId,
            'reference_no' => $refNo,
            'goal_name' => $data['goal_name'],
            'goal_type' => $data['goal_type'] ?? 'custom',
            'target_amount' => (float)$data['target_amount'],
            'current_amount' => (float)($data['current_amount'] ?? 0.00),
            'currency' => $data['currency'] ?? 'USD',
            'start_date' => $data['start_date'] ?? date('Y-m-d'),
            'deadline' => $data['deadline'] ?? date('Y-12-31'),
            'priority' => $data['priority'] ?? 'medium',
            'status' => 'in_progress',
            'description' => $data['description'] ?? null
        ]);

        return $this->pdo->lastInsertId();
    }

    public function recordContribution($goalId, $amount, $notes = '') {
        $stmt = $this->pdo->prepare("
            INSERT INTO goal_progress (goal_id, contribution_amount, notes)
            VALUES (:goal_id, :amount, :notes)
        ");
        $stmt->execute([
            'goal_id' => $goalId,
            'amount' => (float)$amount,
            'notes' => $notes
        ]);

        // Update Financial Goal current amount
        $updateStmt = $this->pdo->prepare("
            UPDATE financial_goals
            SET current_amount = current_amount + :amount
            WHERE id = :id
        ");
        $updateStmt->execute(['amount' => (float)$amount, 'id' => $goalId]);

        // Check if achieved
        $goalStmt = $this->pdo->prepare("SELECT current_amount, target_amount FROM financial_goals WHERE id = :id");
        $goalStmt->execute(['id' => $goalId]);
        $goal = $goalStmt->fetch(PDO::FETCH_ASSOC);

        if ($goal && (float)$goal['current_amount'] >= (float)$goal['target_amount']) {
            $this->pdo->prepare("UPDATE financial_goals SET status = 'achieved' WHERE id = :id")->execute(['id' => $goalId]);
        }

        return true;
    }

    public function getGoalHistory($goalId) {
        $stmt = $this->pdo->prepare("SELECT * FROM goal_progress WHERE goal_id = :goal_id ORDER BY contributed_at DESC");
        $stmt->execute(['goal_id' => $goalId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
