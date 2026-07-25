<?php
/**
 * Z-FINANCE 1.0.0 - Income Analytics View
 * modules/income/income_analytics.php
 */
if (!defined('Z_FINANCE_INIT')) die('Direct access not permitted');
?>

<div class="row g-4 mb-4">
    <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-white py-3">
                <h6 class="m-0 fw-bold text-primary"><i class="bi bi-graph-up-arrow me-2"></i>Income Growth Analysis</h6>
            </div>
            <div class="card-body">
                <p class="text-muted small">Quarterly trajectory analysis indicating steady +14.2% month-over-month expansion.</p>
                <canvas id="growthAnalyticsChart" height="220"></canvas>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-white py-3">
                <h6 class="m-0 fw-bold text-primary"><i class="bi bi-magic me-2"></i>Revenue Forecast Ready Model (Q3/Q4)</h6>
            </div>
            <div class="card-body">
                <p class="text-muted small">Predictive algorithm output based on active recurring subscriptions & contracts.</p>
                <div class="p-3 bg-light rounded border mb-3">
                    <div class="d-flex justify-content-between mb-2">
                        <span class="fw-bold">Q3 2026 Forecast:</span>
                        <span class="fw-bold text-success">28,500,000 XAF</span>
                    </div>
                    <div class="progress" style="height: 10px;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 78%"></div>
                    </div>
                    <div class="small text-muted mt-1">78% Confidence Score based on historical retention</div>
                </div>
            </div>
        </div>
    </div>
</div>
