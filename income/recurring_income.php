<?php
/**
 * Z-FINANCE 1.0.0 - Recurring Income Management
 * modules/income/recurring_income.php
 */
if (!defined('Z_FINANCE_INIT')) die('Direct access not permitted');
?>

<div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 d-flex align-items-center justify-content-between">
        <h5 class="m-0 fw-bold text-dark"><i class="bi bi-arrow-repeat text-primary me-2"></i>Recurring Income Automation</h5>
        <button class="btn btn-primary btn-sm"><i class="bi bi-plus-circle me-1"></i>New Recurring Schedule</button>
    </div>
    <div class="card-body">
        <p class="text-muted">Automate daily, weekly, monthly, and yearly income generation for subscriptions, contracts, rent, and memberships.</p>
        <div class="table-responsive">
            <table class="table table-hover align-middle">
                <thead class="table-light">
                    <tr>
                        <th>Schedule Name</th>
                        <th>Frequency</th>
                        <th>Amount</th>
                        <th>Customer / Service</th>
                        <th>Start Date</th>
                        <th>Next Generation</th>
                        <th>Status</th>
                        <th class="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="fw-bold">Afriland Enterprise Maintenance Contract</td>
                        <td><span class="badge bg-primary">Monthly</span></td>
                        <td class="fw-bold text-success">2,500,000 XAF</td>
                        <td>Afriland First Bank</td>
                        <td>2026-01-01</td>
                        <td><span class="fw-bold text-primary">2026-08-01</span></td>
                        <td><span class="badge bg-success">Active Auto-Run</span></td>
                        <td class="text-end">
                            <button class="btn btn-sm btn-outline-primary me-1"><i class="bi bi-play-fill me-1"></i>Run Now</button>
                            <button class="btn btn-sm btn-light"><i class="bi bi-gear"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
