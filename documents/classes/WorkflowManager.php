<?php
/**
 * Z-FINANCE 1.0.0 - Enterprise Document Management System (EDMS)
 * Class: WorkflowManager
 */

namespace ZFinance\Modules\Documents;

use PDO;
use Exception;

class WorkflowManager {
    private PDO $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    /**
     * Create approval workflow for document
     */
    public function createWorkflow(int $docId, string $workflowName, int $approverId, int $totalSteps = 1): array {
        $stmt = $this->db->prepare("
            INSERT INTO document_workflows (document_id, workflow_name, current_step, total_steps, status, assigned_approver_id)
            VALUES (:doc_id, :name, 1, :steps, 'pending', :approver_id)
        ");
        $stmt->execute([
            ':doc_id' => $docId,
            ':name' => $workflowName,
            ':steps' => $totalSteps,
            ':approver_id' => $approverId
        ]);

        $wfId = (int)$this->db->lastInsertId();

        // Update document status to under_review
        $uStmt = $this->db->prepare("UPDATE documents SET status = 'under_review' WHERE id = :doc_id");
        $uStmt->execute([':doc_id' => $docId]);

        return ['success' => true, 'workflow_id' => $wfId];
    }

    /**
     * Process workflow approval/rejection
     */
    public function processDecision(int $workflowId, string $decision, string $comments = ''): array {
        $stmt = $this->db->prepare("SELECT * FROM document_workflows WHERE id = :id");
        $stmt->execute([':id' => $workflowId]);
        $wf = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$wf) {
            throw new Exception("Workflow not found");
        }

        $newStatus = match ($decision) {
            'approve' => ($wf['current_step'] >= $wf['total_steps']) ? 'approved' : 'pending',
            'reject'  => 'rejected',
            'revision' => 'revision_requested',
            default   => 'pending'
        };

        $nextStep = ($decision === 'approve' && $wf['current_step'] < $wf['total_steps']) ? $wf['current_step'] + 1 : $wf['current_step'];

        $uStmt = $this->db->prepare("
            UPDATE document_workflows 
            SET status = :status, current_step = :step, comments = :comments, updated_at = NOW()
            WHERE id = :id
        ");
        $uStmt->execute([
            ':status' => $newStatus,
            ':step' => $nextStep,
            ':comments' => $comments,
            ':id' => $workflowId
        ]);

        // Update document status
        $docStatus = match ($newStatus) {
            'approved' => 'approved',
            'rejected' => 'rejected',
            default    => 'under_review'
        };

        $dStmt = $this->db->prepare("UPDATE documents SET status = :status WHERE id = :doc_id");
        $dStmt->execute([':status' => $docStatus, ':doc_id' => $wf['document_id']]);

        return ['success' => true, 'workflow_status' => $newStatus, 'current_step' => $nextStep];
    }
}
