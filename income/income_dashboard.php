<?php
/**
 * Z-FINANCE 1.0.0 - Income Dashboard View
 * modules/income/income_dashboard.php
 */
if (!defined('Z_FINANCE_INIT')) die('Direct access not permitted');
?>

<div class="row mb-4 align-items-center">
    <div class="col">
        <h2 class="h3 fw-bold text-gray-800">Income Overview Dashboard</h2>
        <p class="text-muted mb-0">Real-time total income, revenue growth, and category performance streams.</p>
    </div>
    <div class="col-auto">
        <a href="index.php?view=add" class="btn btn-primary shadow-sm">
            <i class="bi bi-plus-circle me-1"></i> Add Income Entry
        </a>
    </div>
</div>

<!-- KPI Summary Cards Row -->
<div class="row g-3 mb-4">
    <div class="col-xl-3 col-md-6">
        <div class="card border-0 shadow-sm border-start border-4 border-primary h-100">
            <div class="card-body">
                <div class="text-xs fw-bold text-primary text-uppercase mb-1">Total Gross Income</div>
                <div class="h3 mb-0 fw-bold text-dark">12,485,000 XAF</div>
                <div class="mt-2 text-muted small">
                    <span class="text-success fw-bold"><i class="bi bi-arrow-up-short"></i> +14.2%</span> vs last month
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-md-6">
        <div class="card border-0 shadow-sm border-start border-4 border-success h-100">
            <div class="card-body">
                <div class="text-xs fw-bold text-success text-uppercase mb-1">Monthly Income (Jul 2026)</div>
                <div class="h3 mb-0 fw-bold text-dark">8,950,000 XAF</div>
                <div class="mt-2 text-muted small">
                    <span class="text-success fw-bold"><i class="bi bi-check-circle me-1"></i> On Target</span> 92% goal
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-md-6">
        <div class="card border-0 shadow-sm border-start border-4 border-warning h-100">
            <div class="card-body">
                <div class="text-xs fw-bold text-warning text-uppercase mb-1">Pending Income</div>
                <div class="h3 mb-0 fw-bold text-dark">1,250,000 XAF</div>
                <div class="mt-2 text-muted small">
                    <span class="text-danger fw-bold"><i class="bi bi-clock-history me-1"></i> 3 Unsettled</span> customer invoices
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-md-6">
        <div class="card border-0 shadow-sm border-start border-4 border-info h-100">
            <div class="card-body">
                <div class="text-xs fw-bold text-info text-uppercase mb-1">Top Income Source</div>
                <div class="h5 mb-0 fw-bold text-dark">Managed IT Infrastructure</div>
                <div class="mt-2 text-muted small">
                    <span class="fw-bold">3,800,000 XAF</span> (30.4% share)
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Charts & Analytics Section -->
<div class="row g-4 mb-4">
    <div class="col-lg-8">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white py-3 d-flex align-items-center justify-content-between">
                <h6 class="m-0 fw-bold text-primary"><i class="bi bi-graph-up me-2"></i>Income Trend & Growth (Monthly)</h6>
            </div>
            <div class="card-body">
                <canvas id="incomeTrendChart" height="280"></canvas>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white py-3">
                <h6 class="m-0 fw-bold text-primary"><i class="bi bi-pie-chart me-2"></i>Category Distribution</h6>
            </div>
            <div class="card-body">
                <canvas id="categoryDistChart" height="280"></canvas>
            </div>
        </div>
    </div>
</div>
