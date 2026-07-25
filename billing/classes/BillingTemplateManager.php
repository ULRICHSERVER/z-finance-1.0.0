<?php
/**
 * Z-FINANCE 1.0.0 - Billing Template Manager Class
 * Super Admin complete control over document layouts, styling, watermarks, and branding.
 */

class BillingTemplateManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getTemplates($tenantId = 1, $type = null) {
        $sql = "SELECT * FROM document_templates WHERE tenant_id = :tenant_id AND is_active = 1";
        $params = ['tenant_id' => $tenantId];

        if ($type) {
            $sql .= " AND template_type = :type";
            $params['type'] = $type;
        }

        $sql .= " ORDER BY is_default DESC, id DESC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getTemplateById($id, $tenantId = 1) {
        $stmt = $this->pdo->prepare("SELECT * FROM document_templates WHERE id = :id AND tenant_id = :tenant_id");
        $stmt->execute(['id' => $id, 'tenant_id' => $tenantId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createTemplate($data, $tenantId = 1, $userId = 1) {
        if (!empty($data['is_default'])) {
            // Unset previous defaults for this type
            $resetStmt = $this->pdo->prepare("UPDATE document_templates SET is_default = 0 WHERE tenant_id = :tenant_id AND template_type = :type");
            $resetStmt->execute(['tenant_id' => $tenantId, 'type' => $data['template_type']]);
        }

        $stmt = $this->pdo->prepare("
            INSERT INTO document_templates (tenant_id, template_name, template_type, header_html, footer_html, primary_color, secondary_color, logo_url, watermark_text, terms_conditions, is_default, is_active, created_by)
            VALUES (:tenant_id, :template_name, :template_type, :header_html, :footer_html, :primary_color, :secondary_color, :logo_url, :watermark_text, :terms_conditions, :is_default, 1, :created_by)
        ");

        $stmt->execute([
            'tenant_id' => $tenantId,
            'template_name' => $data['template_name'],
            'template_type' => $data['template_type'],
            'header_html' => $data['header_html'] ?? null,
            'footer_html' => $data['footer_html'] ?? null,
            'primary_color' => $data['primary_color'] ?? '#2563eb',
            'secondary_color' => $data['secondary_color'] ?? '#1e293b',
            'logo_url' => $data['logo_url'] ?? null,
            'watermark_text' => $data['watermark_text'] ?? null,
            'terms_conditions' => $data['terms_conditions'] ?? null,
            'is_default' => !empty($data['is_default']) ? 1 : 0,
            'created_by' => $userId
        ]);

        return $this->pdo->lastInsertId();
    }

    public function setDefaultTemplate($id, $type, $tenantId = 1) {
        $this->pdo->prepare("UPDATE document_templates SET is_default = 0 WHERE tenant_id = :tenant_id AND template_type = :type")->execute(['tenant_id' => $tenantId, 'type' => $type]);
        $stmt = $this->pdo->prepare("UPDATE document_templates SET is_default = 1 WHERE id = :id AND tenant_id = :tenant_id");
        return $stmt->execute(['id' => $id, 'tenant_id' => $tenantId]);
    }
}
