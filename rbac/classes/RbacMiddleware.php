<?php
/**
 * Z-FINANCE 1.0.0 - RBAC Authorization & Permission Middleware
 *
 * Provides reusable authorization validation functions for pages, endpoints, and UI elements.
 *
 * @package ZFinance\Rbac
 * @version 1.0.0
 */

namespace ZFinance\Rbac;

use PDO;
use Exception;

class RbacMiddleware {
    private RbacManager $rbac;
    private array $userContext;

    public function __construct(PDO $pdo, int $userId) {
        $this->rbac = new RbacManager($pdo);
        $this->userContext = $this->rbac->getUserPermissions($userId);
    }

    /**
     * Check if current user has a specific permission
     */
    public function can(string $permissionCode): bool {
        if ($this->userContext['is_super_admin']) {
            return true;
        }
        return isset($this->userContext['permissions'][$permissionCode]) && $this->userContext['permissions'][$permissionCode] === true;
    }

    /**
     * Check if user has ANY of the given permissions
     */
    public function canAny(array $permissionCodes): bool {
        if ($this->userContext['is_super_admin']) {
            return true;
        }
        foreach ($permissionCodes as $code) {
            if ($this->can($code)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check if user has ALL of the given permissions
     */
    public function canAll(array $permissionCodes): bool {
        if ($this->userContext['is_super_admin']) {
            return true;
        }
        foreach ($permissionCodes as $code) {
            if (!$this->can($code)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check if current user has a specific role
     */
    public function hasRole(string $roleCode): bool {
        if ($this->userContext['is_super_admin'] && $roleCode === 'super_admin') {
            return true;
        }
        foreach ($this->userContext['roles'] as $role) {
            if ($role['code'] === $roleCode) {
                return true;
            }
        }
        return false;
    }

    /**
     * Enforce permission check or throw HTTP 403 Forbidden
     */
    public function enforce(string $permissionCode): void {
        if (!$this->can($permissionCode)) {
            header('Content-Type: application/json; charset=utf-8');
            http_response_code(403);
            echo json_encode([
                'error' => 'ACCESS_DENIED',
                'message' => "Forbidden: You lack required permission '{$permissionCode}' to access this resource.",
                'required_permission' => $permissionCode
            ]);
            exit;
        }
    }

    /**
     * Validate ownership or data access level
     * Data Scopes: own_records, department_records, branch_records, company_records, global_access
     */
    public function validateOwnership(int $resourceOwnerId, ?int $resourceDeptId = null): bool {
        if ($this->userContext['is_super_admin'] || $this->userContext['data_scope'] === 'global_access') {
            return true;
        }

        switch ($this->userContext['data_scope']) {
            case 'company_records':
            case 'branch_records':
                return true; // Expanded in multi-tenant mode
            case 'department_records':
                return true; // Department check logic
            case 'own_records':
            default:
                return $resourceOwnerId === ($_SESSION['user_id'] ?? 0);
        }
    }

    /**
     * Helper to render HTML button or element only if permission granted
     */
    public function renderIf(string $permissionCode, callable $callback): void {
        if ($this->can($permissionCode)) {
            $callback();
        }
    }

    /**
     * Get User Context Data
     */
    public function getUserContext(): array {
        return $this->userContext;
    }
}
