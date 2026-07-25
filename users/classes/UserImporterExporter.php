<?php
namespace ZFinance\Users;

use PDO;
use Exception;

/**
 * Enterprise User Import & Export Processor for Z-FINANCE 1.0.0
 * Handles CSV validation, batch insertion, data sanitation,
 * error reporting, and multi-format user exports.
 */
class UserImporterExporter {
    private PDO $db;
    private UserManager $userManager;

    public function __construct(PDO $db, UserManager $userManager) {
        $this->db = $db;
        $this->userManager = $userManager;
    }

    /**
     * Validate and Import Users from CSV Content
     */
    public function importCsv(string $csvContent, int $defaultRoleId = 8, string $defaultPlan = 'free'): array {
        $lines = explode("\n", str_replace("\r", "", trim($csvContent)));
        if (count($lines) < 2) {
            throw new Exception("CSV file must contain a header row and at least one user record.");
        }

        $header = str_getcsv(array_shift($lines));
        $headerMap = array_flip(array_map('trim', array_map('strtolower', $header)));

        // Required CSV Columns Check
        $required = ['email', 'first_name', 'last_name'];
        foreach ($required as $req) {
            if (!isset($headerMap[$req])) {
                throw new Exception("Missing required CSV header column: '{$req}'. Required headers: email, first_name, last_name, username, phone, department, job_title.");
            }
        }

        $processed = 0;
        $imported = 0;
        $skipped = 0;
        $errors = [];

        foreach ($lines as $index => $line) {
            $rowNum = $index + 2; // Accounting for 1-based index and header
            if (empty(trim($line))) continue;

            $data = str_getcsv($line);
            if (count($data) < count($required)) {
                $skipped++;
                $errors[] = "Row {$rowNum}: Malformed CSV row, insufficient columns.";
                continue;
            }

            $email = trim($data[$headerMap['email']] ?? '');
            $firstName = trim($data[$headerMap['first_name']] ?? '');
            $lastName = trim($data[$headerMap['last_name']] ?? '');
            $username = trim($data[$headerMap['username']] ?? explode('@', $email)[0]);
            $phone = isset($headerMap['phone']) ? trim($data[$headerMap['phone']]) : null;
            $department = isset($headerMap['department']) ? trim($data[$headerMap['department']]) : 'General';
            $jobTitle = isset($headerMap['job_title']) ? trim($data[$headerMap['job_title']]) : 'Staff';

            $processed++;

            // Email validation
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $skipped++;
                $errors[] = "Row {$rowNum}: Invalid email format '{$email}'.";
                continue;
            }

            try {
                $userId = $this->userManager->createUser([
                    'email' => $email,
                    'username' => $username,
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'password' => 'Pass@' . bin2hex(random_bytes(4)), // Temp random password
                    'phone' => $phone,
                    'department' => $department,
                    'job_title' => $jobTitle,
                    'role_id' => $defaultRoleId,
                    'plan_code' => $defaultPlan,
                    'status' => 'active',
                    'is_email_verified' => 1
                ]);
                $imported++;
            } catch (Exception $e) {
                $skipped++;
                $errors[] = "Row {$rowNum} ({$email}): " . $e->getMessage();
            }
        }

        return [
            'total_rows' => $processed,
            'imported' => $imported,
            'skipped' => $skipped,
            'errors' => $errors
        ];
    }

    /**
     * Export Users to CSV Format String
     */
    public function exportCsv(array $filters = []): string {
        $result = $this->userManager->searchUsers($filters, 1, 10000);
        $users = $result['data'];

        $output = [];
        $output[] = implode(",", [
            'ID', 'Username', 'Email', 'First Name', 'Last Name', 'Phone', 
            'Role', 'Status', 'Plan', 'Country', 'City', 'Created At', 'Last Login'
        ]);

        foreach ($users as $u) {
            $output[] = implode(",", array_map(function($val) {
                return '"' . str_replace('"', '""', $val ?? '') . '"';
            }, [
                $u['id'],
                $u['username'],
                $u['email'],
                $u['first_name'],
                $u['last_name'],
                $u['phone'],
                $u['primary_role'],
                $u['status'],
                $u['plan_code'],
                $u['country'],
                $u['city'],
                $u['created_at'],
                $u['last_login_at']
            ]));
        }

        return implode("\n", $output);
    }
}
