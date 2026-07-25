<?php
/**
 * Z-FINANCE 1.0.0 - Rules Engine & Decision Matrix
 */

namespace ZFinance\Modules\RulesEngine;

use PDO;
use Exception;

class RulesEngine
{
    private PDO $db;
    private string $tenantId;

    public function __construct(PDO $db, string $tenantId = 'default')
    {
        $this->db = $db;
        $this->tenantId = $tenantId;
    }

    /**
     * Evaluate Conditions Against Context Data
     */
    public function evaluateRules(array $conditions, array $context): bool
    {
        foreach ($conditions as $cond) {
            $field = $cond['field'] ?? '';
            $op = $cond['operator'] ?? 'equals';
            $val = $cond['value'] ?? null;

            $contextVal = $context[$field] ?? null;

            switch ($op) {
                case 'greater_than':
                    if (!($contextVal > $val)) return false;
                    break;
                case 'less_than':
                    if (!($contextVal < $val)) return false;
                    break;
                case 'equals':
                    if ($contextVal != $val) return false;
                    break;
                case 'contains':
                    if (strpos((string)$contextVal, (string)$val) === false) return false;
                    break;
            }
        }

        return true;
    }
}
