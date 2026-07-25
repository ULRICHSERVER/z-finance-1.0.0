<?php
/**
 * Z-FINANCE 1.0.0 - Income Source Manager Class
 * Manages specific revenue channels (consulting, digital sales, subscriptions, etc.)
 */

class IncomeSourceManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getSources($tenantId = 1) {
        $stmt = $this->pdo->prepare("
            SELECT isr.*, ic.category_name, ic.color_code, COUNT(i.id) as transaction_count, COALESCE(SUM(i.amount), 0) as total_generated
            FROM income_sources isr
            JOIN income_categories ic ON isr.category_id = ic.id
            LEFT JOIN income i ON isr.id = i.source_id AND i.is_deleted = 0
            WHERE isr.tenant_id = :tenant_id AND isr.is_deleted = 0
            GROUP BY isr.id
            ORDER BY isr.source_name ASC
        ");
        $stmt->execute(['tenant_id' => $tenantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createSource($data, $tenantId = 1) {
        $stmt = $this->pdo->prepare("
            INSERT INTO income_sources (tenant_id, category_id, source_name, description, type, is_recurring, status)
            VALUES (:tenant_id, :category_id, :source_name, :description, :type, :is_recurring, :status)
        ");

        $stmt->execute([
            'tenant_id' => $tenantId,
            'category_id' => $data['category_id'],
            'source_name' => $data['source_name'],
            'description' => $data['description'] ?? null,
            'type' => $data['type'] ?? 'general',
            'is_recurring' => isset($data['is_recurring']) ? (int)$data['is_recurring'] : 0,
            'status' => $data['status'] ?? 'active'
        ]);

        return $this->pdo->lastInsertId();
    }
}
