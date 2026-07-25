<?php
/**
 * Z-FINANCE 1.0.0 - Enterprise Role-Based Access Control (RBAC) Manager
 *
 * Core engine for Roles, Permissions, Access Matrix, User Assignments,
 * Direct Overrides, Role Hierarchy, and Audit Logging.
 *
 * @package ZFinance\Rbac
 * @version 1.0.0
 */

namespace ZFinance\Rbac;

use PDO;
use Exception;

class RbacManager {
    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    /**
     * Get all active permission groups with their child permissions
     */
    public function getPermissionGroupsWithPermissions(): array {
        $stmt = $this->pdo->query("
            SELECT g.id as group_id, g.code as group_code, g.name as group_name, g.icon as group_icon, g.description as group_desc,
                   p.id as perm_id, p.code as perm_code, p.name as perm_name, p.action as perm_action, p.description as perm_desc, p.is_system
            FROM permission_groups g
            LEFT JOIN permissions p ON g.id = p.group_id
            ORDER BY g.display_order ASC, p.id ASC
        ");
        $raw = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $groups = [];
        foreach ($raw as $row) {
            $gId = $row['group_id'];
            if (!isset($groups[$gId])) {
                $groups[$gId] = [
                    'id' => $row['group_id'],
                    'code' => $row['group_code'],
                    'name' => $row['group_name'],
                    'icon' => $row['group_icon'],
                    'description' => $row['group_desc'],
                    'permissions' => []
                ];
            }
            if ($row['perm_id']) {
                $groups[$gId]['permissions'][] = [
                    'id' => $row['perm_id'],
                    'code' => $row['perm_code'],
                    'name' => $row['perm_name'],
                    'action' => $row['perm_action'],
                    'description' => $row['perm_desc'],
                    'is_system' => (bool)$row['is_system']
                ];
            }
        }
        return array_values($groups);
    }

    /**
     * Get all roles with hierarchy and permissions count
     */
    public function getRoles(bool $includeDeleted = false, string $search = ''): array {
        $sql = "SELECT r.*, 
                       (SELECT COUNT(*) FROM role_permissions rp WHERE rp.role_id = r.id) as permission_count,
                       (SELECT COUNT(*) FROM user_roles ur WHERE ur.role_id = r.id) as user_count
                FROM roles r
                WHERE 1=1";
        
        $params = [];
        if (!$includeDeleted) {
            $sql .= " AND r.is_deleted = 0";
        }
        if (!empty($search)) {
            $sql .= " AND (r.name LIKE :search OR r.code LIKE :search OR r.description LIKE :search)";
            $params['search'] = "%{$search}%";
        }
        $sql .= " ORDER BY r.hierarchy_level DESC, r.name ASC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get a single role by ID or Code along with granted permission IDs
     */
    public function getRole(int $roleId): ?array {
        $stmt = $this->pdo->prepare("SELECT * FROM roles WHERE id = :id AND is_deleted = 0");
        $stmt->execute(['id' => $roleId]);
        $role = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$role) return null;

        // Fetch permissions
        $pStmt = $this->pdo->prepare("SELECT permission_id FROM role_permissions WHERE role_id = :role_id");
        $pStmt->execute(['role_id' => $roleId]);
        $role['permission_ids'] = $pStmt->fetchAll(PDO::FETCH_COLUMN);

        return $role;
    }

    /**
     * Create a new role
     */
    public function createRole(array $data, array $permissionIds = [], int $performedBy = 1): array {
        $code = strtolower(trim(preg_replace('/[^a-zA-Z0-9_]/', '_', $data['code'] ?? $data['name'])));
        $name = trim($data['name']);
        $description = trim($data['description'] ?? '');
        $hierarchy = (int)($data['hierarchy_level'] ?? 10);
        $dataScope = $data['data_scope'] ?? 'own_records';

        if (empty($name) || empty($code)) {
            return ['success' => false, 'message' => 'Role name and code are required.'];
        }

        // Check unique code
        $checkStmt = $this->pdo->prepare("SELECT id FROM roles WHERE code = :code AND is_deleted = 0");
        $checkStmt->execute(['code' => $code]);
        if ($checkStmt->fetch()) {
            return ['success' => false, 'message' => "Role code '{$code}' already exists."];
        }

        $uuid = sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff), mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );

        $stmt = $this->pdo->prepare("
            INSERT INTO roles (uuid, code, name, description, hierarchy_level, is_system, is_active, is_deleted, data_scope)
            VALUES (:uuid, :code, :name, :description, :hierarchy_level, 0, 1, 0, :data_scope)
        ");
        $stmt->execute([
            'uuid' => $uuid,
            'code' => $code,
            'name' => $name,
            'description' => $description,
            'hierarchy_level' => $hierarchy,
            'data_scope' => $dataScope
        ]);
        $roleId = (int)$this->pdo->lastInsertId();

        // Assign permissions
        if (!empty($permissionIds)) {
            $this->syncRolePermissions($roleId, $permissionIds, $performedBy);
        }

        $this->logAudit($performedBy, 'ROLE_CREATED', 'roles', (string)$roleId, ['name' => $name, 'code' => $code]);

        return ['success' => true, 'message' => "Role '{$name}' created successfully.", 'role_id' => $roleId];
    }

    /**
     * Edit existing role
     */
    public function updateRole(int $roleId, array $data, array $permissionIds = [], int $performedBy = 1): array {
        // Super Admin Protection
        if ($roleId === 1 && isset($data['is_active']) && !$data['is_active']) {
            return ['success' => false, 'message' => 'Super Administrator role cannot be deactivated.'];
        }

        $stmt = $this->pdo->prepare("SELECT * FROM roles WHERE id = :id AND is_deleted = 0");
        $stmt->execute(['id' => $roleId]);
        $role = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$role) {
            return ['success' => false, 'message' => 'Role not found.'];
        }

        $name = trim($data['name'] ?? $role['name']);
        $description = trim($data['description'] ?? $role['description']);
        $hierarchy = isset($data['hierarchy_level']) ? (int)$data['hierarchy_level'] : (int)$role['hierarchy_level'];
        $isActive = isset($data['is_active']) ? (int)(bool)$data['is_active'] : (int)$role['is_active'];
        $dataScope = $data['data_scope'] ?? $role['data_scope'];

        $updateStmt = $this->pdo->prepare("
            UPDATE roles 
            SET name = :name, description = :description, hierarchy_level = :hierarchy, is_active = :is_active, data_scope = :data_scope
            WHERE id = :id
        ");
        $updateStmt->execute([
            'name' => $name,
            'description' => $description,
            'hierarchy' => $hierarchy,
            'is_active' => $isActive,
            'data_scope' => $dataScope,
            'id' => $roleId
        ]);

        if (!empty($permissionIds) || isset($data['permissions_updated'])) {
            $this->syncRolePermissions($roleId, $permissionIds, $performedBy);
        }

        $this->logAudit($performedBy, 'ROLE_UPDATED', 'roles', (string)$roleId, ['name' => $name]);

        return ['success' => true, 'message' => "Role '{$name}' updated successfully."];
    }

    /**
     * Delete role (soft delete) with Super Admin Protection
     */
    public function deleteRole(int $roleId, int $performedBy = 1): array {
        if ($roleId === 1) {
            return ['success' => false, 'message' => 'CRITICAL SECURITY: Super Administrator role cannot be deleted!'];
        }

        $stmt = $this->pdo->prepare("UPDATE roles SET is_deleted = 1, is_active = 0 WHERE id = :id AND is_system = 0");
        $stmt->execute(['id' => $roleId]);

        if ($stmt->rowCount() > 0) {
            $this->logAudit($performedBy, 'ROLE_DELETED', 'roles', (string)$roleId, []);
            return ['success' => true, 'message' => 'Role deleted successfully.'];
        }

        return ['success' => false, 'message' => 'Role is a protected system role or does not exist.'];
    }

    /**
     * Restore soft-deleted role
     */
    public function restoreRole(int $roleId, int $performedBy = 1): array {
        $stmt = $this->pdo->prepare("UPDATE roles SET is_deleted = 0, is_active = 1 WHERE id = :id");
        $stmt->execute(['id' => $roleId]);
        $this->logAudit($performedBy, 'ROLE_RESTORED', 'roles', (string)$roleId, []);
        return ['success' => true, 'message' => 'Role restored successfully.'];
    }

    /**
     * Duplicate / Clone role
     */
    public function cloneRole(int $sourceRoleId, string $newRoleName, int $performedBy = 1): array {
        $source = $this->getRole($sourceRoleId);
        if (!$source) {
            return ['success' => false, 'message' => 'Source role not found.'];
        }

        $newCode = strtolower(trim(preg_replace('/[^a-zA-Z0-9_]/', '_', $newRoleName)));
        $creation = $this->createRole([
            'name' => $newRoleName,
            'code' => $newCode,
            'description' => "Cloned from {$source['name']}",
            'hierarchy_level' => $source['hierarchy_level'],
            'data_scope' => $source['data_scope']
        ], $source['permission_ids'], $performedBy);

        return $creation;
    }

    /**
     * Sync Role Permissions
     */
    public function syncRolePermissions(int $roleId, array $permissionIds, int $performedBy = 1): void {
        // Clear existing
        $del = $this->pdo->prepare("DELETE FROM role_permissions WHERE role_id = :role_id");
        $del->execute(['role_id' => $roleId]);

        // Insert new
        if (!empty($permissionIds)) {
            $ins = $this->pdo->prepare("INSERT INTO role_permissions (role_id, permission_id, granted_by) VALUES (:role_id, :perm_id, :granted_by)");
            foreach ($permissionIds as $permId) {
                $ins->execute([
                    'role_id' => $roleId,
                    'perm_id' => (int)$permId,
                    'granted_by' => $performedBy
                ]);
            }
        }
        $this->logAudit($performedBy, 'ROLE_PERMISSIONS_SYNCED', 'roles', (string)$roleId, ['permission_count' => count($permissionIds)]);
    }

    /**
     * Get Effective Permissions for a User (Role Permissions + Direct User Overrides)
     */
    public function getUserPermissions(int $userId): array {
        // 1. Get all roles assigned to user
        $stmt = $this->pdo->prepare("
            SELECT r.* FROM roles r
            INNER JOIN user_roles ur ON r.id = ur.role_id
            WHERE ur.user_id = :user_id AND r.is_active = 1 AND r.is_deleted = 0
        ");
        $stmt->execute(['user_id' => $userId]);
        $roles = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Check if user has Super Admin role
        foreach ($roles as $r) {
            if ($r['code'] === 'super_admin' || $r['hierarchy_level'] >= 100) {
                // Return wildcard full permission list
                $all = $this->pdo->query("SELECT code FROM permissions")->fetchAll(PDO::FETCH_COLUMN);
                return [
                    'is_super_admin' => true,
                    'permissions' => array_fill_keys($all, true),
                    'roles' => $roles,
                    'highest_hierarchy' => 100,
                    'data_scope' => 'global_access'
                ];
            }
        }

        // 2. Aggregate role permissions
        $rolePerms = [];
        $maxHierarchy = 0;
        $maxScope = 'own_records';

        if (!empty($roles)) {
            $roleIds = array_column($roles, 'id');
            $inClause = implode(',', array_map('intval', $roleIds));
            $pStmt = $this->pdo->query("
                SELECT DISTINCT p.code 
                FROM permissions p
                INNER JOIN role_permissions rp ON p.id = rp.permission_id
                WHERE rp.role_id IN ({$inClause})
            ");
            $roleCodes = $pStmt->fetchAll(PDO::FETCH_COLUMN);
            foreach ($roleCodes as $c) {
                $rolePerms[$c] = true;
            }

            foreach ($roles as $r) {
                if ($r['hierarchy_level'] > $maxHierarchy) {
                    $maxHierarchy = $r['hierarchy_level'];
                    $maxScope = $r['data_scope'];
                }
            }
        }

        // 3. Apply Direct User Permission Overrides (User Override > Role Perm)
        $overrideStmt = $this->pdo->prepare("
            SELECT p.code, up.is_granted
            FROM user_permissions up
            INNER JOIN permissions p ON up.permission_id = p.id
            WHERE up.user_id = :user_id AND (up.expires_at IS NULL OR up.expires_at > NOW())
        ");
        $overrideStmt->execute(['user_id' => $userId]);
        $overrides = $overrideStmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($overrides as $ov) {
            $rolePerms[$ov['code']] = (bool)$ov['is_granted'];
        }

        return [
            'is_super_admin' => false,
            'permissions' => $rolePerms,
            'roles' => $roles,
            'highest_hierarchy' => $maxHierarchy,
            'data_scope' => $maxScope
        ];
    }

    /**
     * Direct User Permission Override (Grant or Revoke directly)
     */
    public function setUserPermissionOverride(int $userId, int $permissionId, bool $isGranted, int $performedBy = 1, ?string $expiresAt = null): array {
        $stmt = $this->pdo->prepare("
            INSERT INTO user_permissions (user_id, permission_id, is_granted, granted_by, expires_at)
            VALUES (:user_id, :permission_id, :is_granted, :granted_by, :expires_at)
            ON DUPLICATE KEY UPDATE is_granted = VALUES(is_granted), granted_by = VALUES(granted_by), expires_at = VALUES(expires_at)
        ");
        $stmt->execute([
            'user_id' => $userId,
            'permission_id' => $permissionId,
            'is_granted' => (int)$isGranted,
            'granted_by' => $performedBy,
            'expires_at' => $expiresAt
        ]);

        $this->logAudit($performedBy, 'USER_PERMISSION_OVERRIDE', 'user_permissions', (string)$userId, [
            'permission_id' => $permissionId,
            'is_granted' => $isGranted
        ]);

        return ['success' => true, 'message' => 'Direct user permission override saved.'];
    }

    /**
     * Assign User Roles (Multi-Role Support)
     */
    public function assignUserRoles(int $userId, array $roleIds, int $primaryRoleId, int $performedBy = 1): array {
        // Super Admin Protection for User 1
        if ($userId === 1 && !in_array(1, $roleIds)) {
            $roleIds[] = 1; // Preserve Super Admin role for Primary Super Admin User
        }

        // Clear existing
        $del = $this->pdo->prepare("DELETE FROM user_roles WHERE user_id = :user_id");
        $del->execute(['user_id' => $userId]);

        $ins = $this->pdo->prepare("INSERT INTO user_roles (user_id, role_id, is_primary, assigned_by) VALUES (:user_id, :role_id, :is_primary, :assigned_by)");
        foreach ($roleIds as $rId) {
            $ins->execute([
                'user_id' => $userId,
                'role_id' => (int)$rId,
                'is_primary' => ((int)$rId === $primaryRoleId) ? 1 : 0,
                'assigned_by' => $performedBy
            ]);
        }

        $this->logAudit($performedBy, 'USER_ROLES_UPDATED', 'user_roles', (string)$userId, [
            'roles' => $roleIds,
            'primary_role' => $primaryRoleId
        ]);

        return ['success' => true, 'message' => 'User roles updated successfully.'];
    }

    /**
     * Audit logger
     */
    public function logAudit(int $userId, string $actionCode, string $moduleCode, ?string $targetId, array $details = []): void {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
        $ua = $_SERVER['HTTP_USER_AGENT'] ?? 'CLI/Internal';

        $stmt = $this->pdo->prepare("
            INSERT INTO rbac_audit_logs (user_id, action_code, module_code, target_id, ip_address, user_agent, details_json)
            VALUES (:user_id, :action_code, :module_code, :target_id, :ip_address, :user_agent, :details_json)
        ");
        $stmt->execute([
            'user_id' => $userId,
            'action_code' => $actionCode,
            'module_code' => $moduleCode,
            'target_id' => $targetId,
            'ip_address' => $ip,
            'user_agent' => substr($ua, 0, 255),
            'details_json' => json_encode($details)
        ]);
    }

    /**
     * Get Audit Logs
     */
    public function getAuditLogs(int $limit = 50): array {
        $stmt = $this->pdo->prepare("SELECT * FROM rbac_audit_logs ORDER BY created_at DESC LIMIT :limit");
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
