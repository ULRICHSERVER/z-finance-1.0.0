<?php
namespace ZFinance\Users;

use PDO;
use Exception;

/**
 * Enterprise User Management Engine for Z-FINANCE 1.0.0
 * Handles complete lifecycle, multi-tenant expansion, security protections,
 * status transitions, bulk updates, and admin audit logging.
 */
class UserManager {
    private PDO $db;
    private ?int $currentAdminId;

    public function __construct(PDO $db, ?int $currentAdminId = null) {
        $this->db = $db;
        $this->currentAdminId = $currentAdminId;
    }

    /**
     * Fetch user statistics dashboard cards
     */
    public function getDashboardStats(): array {
        $stats = [
            'total_users' => 0,
            'active_users' => 0,
            'inactive_users' => 0,
            'pending_users' => 0,
            'suspended_users' => 0,
            'blocked_users' => 0,
            'verified_users' => 0,
            'online_users' => 0,
            'recently_registered' => 0,
            'subscriptions' => [
                'free' => 0,
                'basic' => 0,
                'professional' => 0,
                'enterprise' => 0
            ]
        ];

        // Status counts
        $stmt = $this->db->query("
            SELECT status, COUNT(*) as cnt 
            FROM users 
            WHERE is_deleted = 0 
            GROUP BY status
        ");
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $status = $row['status'];
            $cnt = (int)$row['cnt'];
            $stats['total_users'] += $cnt;

            if ($status === 'active') $stats['active_users'] = $cnt;
            elseif ($status === 'inactive') $stats['inactive_users'] = $cnt;
            elseif ($status === 'pending' || $status === 'email_verification_pending') $stats['pending_users'] += $cnt;
            elseif ($status === 'suspended') $stats['suspended_users'] = $cnt;
            elseif ($status === 'blocked') $stats['blocked_users'] = $cnt;
        }

        // Verified count
        $stmt = $this->db->query("SELECT COUNT(*) FROM users WHERE is_email_verified = 1 AND is_deleted = 0");
        $stats['verified_users'] = (int)$stmt->fetchColumn();

        // Online count (active within last 15 minutes)
        $stmt = $this->db->query("SELECT COUNT(*) FROM users WHERE last_login_at >= NOW() - INTERVAL 15 MINUTE AND is_deleted = 0");
        $stats['online_users'] = (int)$stmt->fetchColumn();

        // Recently registered (last 7 days)
        $stmt = $this->db->query("SELECT COUNT(*) FROM users WHERE created_at >= NOW() - INTERVAL 7 DAY AND is_deleted = 0");
        $stats['recently_registered'] = (int)$stmt->fetchColumn();

        // Subscription breakdown
        $stmt = $this->db->query("
            SELECT plan_code, COUNT(*) as cnt 
            FROM user_subscriptions 
            GROUP BY plan_code
        ");
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $code = $row['plan_code'];
            if (isset($stats['subscriptions'][$code])) {
                $stats['subscriptions'][$code] = (int)$row['cnt'];
            }
        }

        return $stats;
    }

    /**
     * Advanced Search, Filter & Paginate Users
     */
    public function searchUsers(array $filters, int $page = 1, int $limit = 15): array {
        $offset = ($page - 1) * $limit;
        $params = [];
        $where = ["u.is_deleted = :is_deleted"];
        $params['is_deleted'] = isset($filters['is_deleted']) ? (int)$filters['is_deleted'] : 0;

        // Search term (Name, Username, Email, Phone)
        if (!empty($filters['search'])) {
            $where[] = "(u.first_name LIKE :search OR u.last_name LIKE :search OR u.username LIKE :search OR u.email LIKE :search OR p.phone LIKE :search)";
            $params['search'] = '%' . trim($filters['search']) . '%';
        }

        // Filter by Status
        if (!empty($filters['status']) && $filters['status'] !== 'all') {
            $where[] = "u.status = :status";
            $params['status'] = $filters['status'];
        }

        // Filter by Role
        if (!empty($filters['role_id']) && $filters['role_id'] !== 'all') {
            $where[] = "ur.role_id = :role_id";
            $params['role_id'] = (int)$filters['role_id'];
        }

        // Filter by Subscription Plan
        if (!empty($filters['plan']) && $filters['plan'] !== 'all') {
            $where[] = "sub.plan_code = :plan";
            $params['plan'] = $filters['plan'];
        }

        // Filter by Verification
        if (isset($filters['is_verified']) && $filters['is_verified'] !== 'all') {
            $where[] = "u.is_email_verified = :is_verified";
            $params['is_verified'] = (int)$filters['is_verified'];
        }

        $whereClause = implode(" AND ", $where);

        // Count total
        $countSql = "
            SELECT COUNT(DISTINCT u.id) 
            FROM users u
            LEFT JOIN user_profiles p ON u.id = p.user_id
            LEFT JOIN user_roles ur ON u.id = ur.user_id
            LEFT JOIN user_subscriptions sub ON u.id = sub.user_id
            WHERE {$whereClause}
        ";
        $stmtCount = $this->db->prepare($countSql);
        $stmtCount->execute($params);
        $totalRecords = (int)$stmtCount->fetchColumn();

        // Sort clause
        $sortColumn = $filters['sort_by'] ?? 'created_at';
        $sortOrder = strtoupper($filters['sort_order'] ?? 'DESC') === 'ASC' ? 'ASC' : 'DESC';
        $allowedSorts = ['id' => 'u.id', 'name' => 'u.first_name', 'email' => 'u.email', 'status' => 'u.status', 'created_at' => 'u.created_at', 'last_login' => 'u.last_login_at'];
        $orderBy = $allowedSorts[$sortColumn] ?? 'u.created_at';

        // Main Query
        $sql = "
            SELECT 
                u.id, u.username, u.email, u.first_name, u.last_name, u.avatar, 
                u.status, u.is_email_verified, u.last_login_at, u.last_login_ip, u.created_at,
                p.phone, p.country, p.city, p.department, p.job_title,
                r.id as primary_role_id, r.role_name as primary_role, r.role_code, r.badge_color,
                sub.plan_code, sub.plan_name, sub.status as sub_status,
                TIMESTAMPDIFF(MINUTE, u.last_login_at, NOW()) <= 15 as is_online
            FROM users u
            LEFT JOIN user_profiles p ON u.id = p.user_id
            LEFT JOIN user_roles ur ON u.id = ur.user_id AND ur.is_primary = 1
            LEFT JOIN roles r ON ur.role_id = r.id
            LEFT JOIN user_subscriptions sub ON u.id = sub.user_id
            WHERE {$whereClause}
            GROUP BY u.id
            ORDER BY {$orderBy} {$sortOrder}
            LIMIT {$limit} OFFSET {$offset}
        ";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return [
            'data' => $users,
            'pagination' => [
                'current_page' => $page,
                'per_page' => $limit,
                'total_records' => $totalRecords,
                'total_pages' => ceil($totalRecords / $limit)
            ]
        ];
    }

    /**
     * Fetch Single Detailed User Profile (Admin View)
     */
    public function getUserDetails(int $userId): ?array {
        $stmt = $this->db->prepare("
            SELECT 
                u.*, 
                p.phone, p.address_line1, p.address_line2, p.city, p.state, p.postal_code, p.country,
                p.department, p.job_title, p.employee_id, p.bio, p.company_name, p.tax_id,
                sub.plan_code, sub.plan_name, sub.status as sub_status, sub.starts_at as sub_starts_at, sub.expires_at as sub_expires_at, sub.renewal_date
            FROM users u
            LEFT JOIN user_profiles p ON u.id = p.user_id
            LEFT JOIN user_subscriptions sub ON u.id = sub.user_id
            WHERE u.id = :user_id
        ");
        $stmt->execute(['user_id' => $userId]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) return null;

        // Fetch Assigned Roles
        $stmtRoles = $this->db->prepare("
            SELECT r.id, r.role_name, r.role_code, r.hierarchy_level, r.data_scope, r.badge_color, ur.is_primary
            FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = :user_id
        ");
        $stmtRoles->execute(['user_id' => $userId]);
        $user['roles'] = $stmtRoles->fetchAll(PDO::FETCH_ASSOC);

        // Fetch User Direct Permission Overrides
        $stmtPerms = $this->db->prepare("
            SELECT p.id, p.permission_code, p.permission_name, up.is_granted
            FROM user_permissions up
            JOIN permissions p ON up.permission_id = p.id
            WHERE up.user_id = :user_id
        ");
        $stmtPerms->execute(['user_id' => $userId]);
        $user['permission_overrides'] = $stmtPerms->fetchAll(PDO::FETCH_ASSOC);

        // Fetch Trusted Devices
        $stmtDevices = $this->db->prepare("
            SELECT * FROM user_devices WHERE user_id = :user_id ORDER BY last_active_at DESC
        ");
        $stmtDevices->execute(['user_id' => $userId]);
        $user['devices'] = $stmtDevices->fetchAll(PDO::FETCH_ASSOC);

        // Fetch User Verification Documents
        $stmtDocs = $this->db->prepare("
            SELECT * FROM user_documents WHERE user_id = :user_id ORDER BY created_at DESC
        ");
        $stmtDocs->execute(['user_id' => $userId]);
        $user['documents'] = $stmtDocs->fetchAll(PDO::FETCH_ASSOC);

        // Fetch Recent Activity Logs
        $stmtActivity = $this->db->prepare("
            SELECT * FROM rbac_audit_logs WHERE user_id = :user_id ORDER BY created_at DESC LIMIT 20
        ");
        $stmtActivity->execute(['user_id' => $userId]);
        $user['activity_logs'] = $stmtActivity->fetchAll(PDO::FETCH_ASSOC);

        return $user;
    }

    /**
     * Create New User Account
     */
    public function createUser(array $data): int {
        // Validate email uniqueness
        $stmt = $this->db->prepare("SELECT COUNT(*) FROM users WHERE email = :email AND is_deleted = 0");
        $stmt->execute(['email' => $data['email']]);
        if ($stmt->fetchColumn() > 0) {
            throw new Exception("Email address is already in use.");
        }

        $passwordHash = password_hash($data['password'], PASSWORD_ARGON2ID);
        $username = strtolower(trim($data['username'] ?? explode('@', $data['email'])[0]));

        $this->db->beginTransaction();
        try {
            // Insert user
            $stmt = $this->db->prepare("
                INSERT INTO users (username, email, password_hash, first_name, last_name, status, is_email_verified)
                VALUES (:username, :email, :password_hash, :first_name, :last_name, :status, :is_email_verified)
            ");
            $stmt->execute([
                'username' => $username,
                'email' => $data['email'],
                'password_hash' => $passwordHash,
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'status' => $data['status'] ?? 'active',
                'is_email_verified' => $data['is_email_verified'] ?? 1
            ]);
            $userId = (int)$this->db->lastInsertId();

            // Profile
            $stmtProfile = $this->db->prepare("
                INSERT INTO user_profiles (user_id, phone, department, job_title, country, city)
                VALUES (:user_id, :phone, :department, :job_title, :country, :city)
            ");
            $stmtProfile->execute([
                'user_id' => $userId,
                'phone' => $data['phone'] ?? null,
                'department' => $data['department'] ?? 'General',
                'job_title' => $data['job_title'] ?? 'Staff',
                'country' => $data['country'] ?? 'United States',
                'city' => $data['city'] ?? 'New York'
            ]);

            // Subscription Plan
            $stmtSub = $this->db->prepare("
                INSERT INTO user_subscriptions (user_id, plan_code, plan_name, status)
                VALUES (:user_id, :plan_code, :plan_name, 'active')
            ");
            $planCode = $data['plan_code'] ?? 'free';
            $planNames = ['free' => 'Free Trial Plan', 'basic' => 'Basic Tier', 'professional' => 'Professional Suite', 'enterprise' => 'Enterprise License'];
            $stmtSub->execute([
                'user_id' => $userId,
                'plan_code' => $planCode,
                'plan_name' => $planNames[$planCode] ?? 'Free Plan'
            ]);

            // Assign Primary Role
            $roleId = $data['role_id'] ?? 8; // Default Standard User (30) or Employee (40)
            $stmtRole = $this->db->prepare("
                INSERT INTO user_roles (user_id, role_id, is_primary) VALUES (:user_id, :role_id, 1)
            ");
            $stmtRole->execute(['user_id' => $userId, 'role_id' => $roleId]);

            $this->logAudit('USER_CREATED', $userId, "Created user {$data['email']}");
            $this->db->commit();
            return $userId;
        } catch (Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }

    /**
     * Update User Profile & Account Data
     */
    public function updateUser(int $userId, array $data): bool {
        $this->checkSuperAdminProtection($userId, 'modify_primary_super_admin');

        $this->db->beginTransaction();
        try {
            $stmt = $this->db->prepare("
                UPDATE users 
                SET first_name = :first_name, last_name = :last_name, email = :email, status = :status, is_email_verified = :verified
                WHERE id = :id
            ");
            $stmt->execute([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'status' => $data['status'],
                'verified' => $data['is_email_verified'] ?? 1,
                'id' => $userId
            ]);

            // Profile update
            $stmtProf = $this->db->prepare("
                INSERT INTO user_profiles (user_id, phone, department, job_title, country, city)
                VALUES (:user_id, :phone, :department, :job_title, :country, :city)
                ON DUPLICATE KEY UPDATE 
                    phone = VALUES(phone), department = VALUES(department), 
                    job_title = VALUES(job_title), country = VALUES(country), city = VALUES(city)
            ");
            $stmtProf->execute([
                'user_id' => $userId,
                'phone' => $data['phone'] ?? null,
                'department' => $data['department'] ?? 'General',
                'job_title' => $data['job_title'] ?? 'Staff',
                'country' => $data['country'] ?? 'United States',
                'city' => $data['city'] ?? 'New York'
            ]);

            // Role Update if supplied
            if (!empty($data['role_id'])) {
                $this->db->prepare("DELETE FROM user_roles WHERE user_id = :user_id")->execute(['user_id' => $userId]);
                $stmtRole = $this->db->prepare("INSERT INTO user_roles (user_id, role_id, is_primary) VALUES (:user_id, :role_id, 1)");
                $stmtRole->execute(['user_id' => $userId, 'role_id' => $data['role_id']]);
            }

            $this->logAudit('USER_UPDATED', $userId, "Updated profile for user ID {$userId}");
            $this->db->commit();
            return true;
        } catch (Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }

    /**
     * Change User Account Status (Activate, Deactivate, Suspend, Block)
     */
    public function updateStatus(int $userId, string $newStatus): bool {
        $allowedStatuses = ['pending', 'active', 'inactive', 'suspended', 'blocked', 'archived', 'email_verification_pending'];
        if (!in_array($newStatus, $allowedStatuses)) {
            throw new Exception("Invalid status code: {$newStatus}");
        }

        if (in_array($newStatus, ['suspended', 'blocked', 'inactive'])) {
            $this->checkSuperAdminProtection($userId, 'disable_super_admin');
        }

        $stmt = $this->db->prepare("UPDATE users SET status = :status WHERE id = :id");
        $stmt->execute(['status' => $newStatus, 'id' => $userId]);

        $this->logAudit('USER_STATUS_CHANGED', $userId, "Changed status to {$newStatus}");
        return true;
    }

    /**
     * Soft Delete User Account
     */
    public function softDeleteUser(int $userId): bool {
        $this->checkSuperAdminProtection($userId, 'delete_super_admin');

        $stmt = $this->db->prepare("UPDATE users SET is_deleted = 1, deleted_at = NOW() WHERE id = :id");
        $stmt->execute(['id' => $userId]);

        $this->logAudit('USER_SOFT_DELETED', $userId, "Soft deleted user ID {$userId}");
        return true;
    }

    /**
     * Restore Soft-Deleted User Account
     */
    public function restoreUser(int $userId): bool {
        $stmt = $this->db->prepare("UPDATE users SET is_deleted = 0, deleted_at = NULL WHERE id = :id");
        $stmt->execute(['id' => $userId]);

        $this->logAudit('USER_RESTORED', $userId, "Restored soft-deleted user ID {$userId}");
        return true;
    }

    /**
     * Permanently Delete User Account (Hard Delete)
     */
    public function hardDeleteUser(int $userId): bool {
        $this->checkSuperAdminProtection($userId, 'hard_delete_super_admin');

        $this->db->beginTransaction();
        try {
            $this->db->prepare("DELETE FROM user_profiles WHERE user_id = :id")->execute(['id' => $userId]);
            $this->db->prepare("DELETE FROM user_roles WHERE user_id = :id")->execute(['id' => $userId]);
            $this->db->prepare("DELETE FROM user_permissions WHERE user_id = :id")->execute(['id' => $userId]);
            $this->db->prepare("DELETE FROM user_subscriptions WHERE user_id = :id")->execute(['id' => $userId]);
            $this->db->prepare("DELETE FROM user_documents WHERE user_id = :id")->execute(['id' => $userId]);
            $this->db->prepare("DELETE FROM user_devices WHERE user_id = :id")->execute(['id' => $userId]);
            $this->db->prepare("DELETE FROM users WHERE id = :id")->execute(['id' => $userId]);

            $this->logAudit('USER_HARD_DELETED', $userId, "Permanently deleted user ID {$userId}");
            $this->db->commit();
            return true;
        } catch (Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }

    /**
     * Execute Admin Account Impersonation
     */
    public function impersonateUser(int $targetUserId, string $reason): array {
        $this->checkSuperAdminProtection($targetUserId, 'impersonate_super_admin');

        $stmt = $this->db->prepare("SELECT id, username, email, first_name, last_name, status FROM users WHERE id = :id AND is_deleted = 0");
        $stmt->execute(['id' => $targetUserId]);
        $targetUser = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$targetUser) {
            throw new Exception("Target user not found or is deleted.");
        }

        if ($targetUser['status'] !== 'active') {
            throw new Exception("Cannot impersonate an inactive, suspended, or blocked account.");
        }

        $token = bin2hex(random_bytes(32));
        $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';

        $stmtLog = $this->db->prepare("
            INSERT INTO user_impersonations (admin_id, target_user_id, impersonation_token, reason, ip_address)
            VALUES (:admin_id, :target_user_id, :token, :reason, :ip)
        ");
        $stmtLog->execute([
            'admin_id' => $this->currentAdminId ?? 1,
            'target_user_id' => $targetUserId,
            'token' => $token,
            'reason' => $reason,
            'ip' => $ip
        ]);

        $this->logAudit('USER_IMPERSONATED', $targetUserId, "Admin initiated impersonation session for {$targetUser['email']}. Reason: {$reason}");

        return [
            'impersonation_token' => $token,
            'target_user' => $targetUser,
            'started_at' => date('Y-m-d H:i:s')
        ];
    }

    /**
     * Execute Bulk Administrative Operations
     */
    public function executeBulkAction(string $action, array $userIds, array $extra = []): array {
        $successCount = 0;
        $failedCount = 0;
        $errors = [];

        foreach ($userIds as $id) {
            $userId = (int)$id;
            try {
                switch ($action) {
                    case 'activate':
                        $this->updateStatus($userId, 'active');
                        break;
                    case 'deactivate':
                        $this->updateStatus($userId, 'inactive');
                        break;
                    case 'suspend':
                        $this->updateStatus($userId, 'suspended');
                        break;
                    case 'block':
                        $this->updateStatus($userId, 'blocked');
                        break;
                    case 'delete':
                        $this->softDeleteUser($userId);
                        break;
                    case 'restore':
                        $this->restoreUser($userId);
                        break;
                    case 'assign_role':
                        if (empty($extra['role_id'])) throw new Exception("Role ID required for bulk assignment.");
                        $this->updateUserRole($userId, (int)$extra['role_id']);
                        break;
                    case 'send_notification':
                        if (empty($extra['title']) || empty($extra['message'])) throw new Exception("Title and message required.");
                        $this->sendNotification($userId, $extra['title'], $extra['message'], $extra['channel'] ?? 'system');
                        break;
                    default:
                        throw new Exception("Unsupported bulk action code.");
                }
                $successCount++;
            } catch (Exception $e) {
                $failedCount++;
                $errors[] = "User #{$userId}: " . $e->getMessage();
            }
        }

        return [
            'success_count' => $successCount,
            'failed_count' => $failedCount,
            'errors' => $errors
        ];
    }

    /**
     * Send System Notification
     */
    public function sendNotification(int $userId, string $title, string $message, string $channel = 'system'): bool {
        $stmt = $this->db->prepare("
            INSERT INTO user_notifications (user_id, sender_id, title, message, channel)
            VALUES (:user_id, :sender_id, :title, :message, :channel)
        ");
        return $stmt->execute([
            'user_id' => $userId,
            'sender_id' => $this->currentAdminId ?? 1,
            'title' => $title,
            'message' => $message,
            'channel' => $channel
        ]);
    }

    /**
     * Update user role
     */
    public function updateUserRole(int $userId, int $roleId): bool {
        $this->checkSuperAdminProtection($userId, 'demote_primary_super_admin');
        $this->db->prepare("DELETE FROM user_roles WHERE user_id = :user_id")->execute(['user_id' => $userId]);
        $stmt = $this->db->prepare("INSERT INTO user_roles (user_id, role_id, is_primary) VALUES (:user_id, :role_id, 1)");
        $stmt->execute(['user_id' => $userId, 'role_id' => $roleId]);

        $this->logAudit('USER_ROLE_CHANGED', $userId, "Assigned primary role ID {$roleId}");
        return true;
    }

    /**
     * Document Status Update (Approve / Reject)
     */
    public function updateDocumentStatus(int $docId, string $status, ?string $reason = null): bool {
        $stmt = $this->db->prepare("
            UPDATE user_documents 
            SET status = :status, rejection_reason = :reason, reviewed_by = :reviewer, reviewed_at = NOW()
            WHERE id = :id
        ");
        return $stmt->execute([
            'status' => $status,
            'reason' => $reason,
            'reviewer' => $this->currentAdminId ?? 1,
            'id' => $docId
        ]);
    }

    /**
     * Strict Super Admin Protection Rule Engine
     */
    private function checkSuperAdminProtection(int $targetUserId, string $action): void {
        if ($targetUserId === 1) {
            throw new Exception("SECURITY DIRECTIVE: Primary Super Administrator account (User ID #1) cannot be modified, suspended, blocked, demoted, or deleted.");
        }
    }

    /**
     * Audit Log Helper
     */
    private function logAudit(string $actionCode, int $targetUserId, string $description): void {
        $stmt = $this->db->prepare("
            INSERT INTO rbac_audit_logs (user_id, action_code, resource_name, ip_address, description)
            VALUES (:user_id, :action, 'USER_MANAGEMENT', :ip, :desc)
        ");
        $stmt->execute([
            'user_id' => $this->currentAdminId ?? 1,
            'action' => $actionCode,
            'ip' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
            'desc' => $description
        ]);
    }
}
