<?php
/**
 * Z-FINANCE 1.0.0 - SaaS Subscription & Billing Cycle Manager
 */

namespace ZFinance\Modules\Subscriptions;

use PDO;
use Exception;

class SubscriptionManager
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function getActivePlans(): array
    {
        return [
            [
                'code' => 'starter',
                'name' => 'Starter Plan',
                'monthly_price' => 49.00,
                'annual_price' => 470.00,
                'max_users' => 5,
                'max_branches' => 1,
                'features' => ['Core Accounting', 'Invoicing', 'Basic Expense Tracking']
            ],
            [
                'code' => 'professional',
                'name' => 'Professional Business',
                'monthly_price' => 199.00,
                'annual_price' => 1900.00,
                'max_users' => 25,
                'max_branches' => 5,
                'features' => ['Accounting', 'Payroll', 'POS', 'CRM', 'REST API (10k/mo)']
            ],
            [
                'code' => 'enterprise',
                'name' => 'Enterprise Unlimited',
                'monthly_price' => 599.00,
                'annual_price' => 5700.00,
                'max_users' => -1,
                'max_branches' => -1,
                'features' => ['All Modules', 'AI Assistant', 'Unlimited API', 'White-Label Branding', 'Dedicated SOC']
            ]
        ];
    }
}
