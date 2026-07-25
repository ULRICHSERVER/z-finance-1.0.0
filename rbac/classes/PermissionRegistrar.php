<?php
/**
 * Z-FINANCE 1.0.0 - Permission Auto-Registrar
 *
 * Provides module auto-registration capabilities. Any future module (Income, Expenses, CRM, etc.)
 * can automatically register its permission group and actions upon initialization without modifying core code.
 *
 * @package ZFinance\Rbac
 * @version 1.0.0
 */

namespace ZFinance\Rbac;

use PDO;

class PermissionRegistrar {
    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    /**
     * Auto-register a permission group and its associated permissions
     */
    public function registerModule(string $groupCode, string $groupName, string $description, string $icon, array $actions): int {
        // 1. Ensure Permission Group exists
        $stmt = $this->pdo->prepare("SELECT id FROM permission_groups WHERE code = :code");
        $stmt->execute(['code' => $groupCode]);
        $group = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$group) {
            $insGroup = $this->pdo->prepare("
                INSERT INTO permission_groups (code, name, description, icon, display_order)
                VALUES (:code, :name, :description, :icon, 99)
            ");
            $insGroup->execute([
                'code' => $groupCode,
                'name' => $groupName,
                'description' => $description,
                'icon' => $icon
            ]);
            $groupId = (int)$this->pdo->lastInsertId();
        } else {
            $groupId = (int)$group['id'];
        }

        // 2. Register Actions (view, create, edit, delete, approve, export, etc.)
        $insPerm = $this->pdo->prepare("
            INSERT INTO permissions (group_id, code, name, action, description, is_system)
            VALUES (:group_id, :code, :name, :action, :description, 0)
            ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description)
        ");

        foreach ($actions as $action) {
            $actionCode = strtolower(trim($action));
            $permCode = "{$groupCode}.{$actionCode}";
            $permName = ucfirst($actionCode) . " " . $groupName;

            $insPerm->execute([
                'group_id' => $groupId,
                'code' => $permCode,
                'name' => $permName,
                'action' => $actionCode,
                'description' => "Allows user to {$actionCode} {$groupName}"
            ]);
        }

        return $groupId;
    }
}
