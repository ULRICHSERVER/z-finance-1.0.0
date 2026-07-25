<?php
/**
 * Z-FINANCE 1.0.0 - Expense Approval Manager Class
 * Handles expense approval workflows, status transitions, and audit logs.
 */

class ExpenseApprovalManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function updateApprovalStatus($expenseId, $action, $approverId = 1, $comments = '', $tenantId = 1) {
        $validStatuses = ['approved', 'rejected', 'revision_requested', 'cancelled', 'pending'];
        if (!in_array($action, $validStatuses)) {
            throw new Exception("Invalid approval action");
        }

        // Update Expense Record
        $stmt = $this->pdo->prepare("
            UPDATE expenses 
            SET approval_status = :status, approved_by = :approved_by, approved_at = CURRENT_TIMESTAMP
            WHERE id = :id AND tenant_id = :tenant_id
        ");
        $stmt->execute([
            'status' => $action,
            'approved_by' => $approverId,
            'id' => $expenseId,
            'tenant_id' => $tenantId
        ]);

        // Audit Trail Record
        $auditStmt = $this->pdo->prepare("
            INSERT INTO expense_approvals (expense_id, approver_id, action, comments)
            VALUES (:expense_id, :approver_id, :action, :comments)
        ");
        $auditStmt->execute([
            'expense_id' => $expenseId,
            'approver_id' => $approverId,
            'action' => $action,
            'comments' => $comments
        ]);

        return true;
    }

    public function getApprovalHistory($expenseId) {
        $stmt = $this->pdo->prepare("
            SELECT ea.*
            FROM expense_approvals ea
            WHERE ea.expense_id = :expense_id
            ORDER BY ea.created_at DESC
        ");
        $stmt->execute(['expense_id' => $expenseId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
