<?php
/**
 * Z-FINANCE 1.0.0 - Income Sources View
 * modules/income/income_sources.php
 */
if (!defined('Z_FINANCE_INIT')) die('Direct access not permitted');
?>

<div class="row g-4">
    <div class="col-md-4">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white py-3">
                <h6 class="m-0 fw-bold text-dark"><i class="bi bi-diagram-3-fill me-2 text-primary"></i>Add Income Source</h6>
            </div>
            <div class="card-body">
                <form id="addSourceForm">
                    <div class="mb-3">
                        <label class="form-label fw-bold">Source Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" placeholder="e.g. AWS Cloud Reseller" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Parent Category <span class="text-danger">*</span></label>
                        <select class="form-select" required>
                            <option value="">Select Category...</option>
                            <option>Service Income</option>
                            <option>Product Sales</option>
                            <option>Consulting</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Type</label>
                        <select class="form-select">
                            <option value="service_related">Service Related</option>
                            <option value="customer_related">Customer Related</option>
                            <option value="project_related">Project Related</option>
                            <option value="general">General</option>
                        </select>
                    </div>
                    <div class="mb-3 form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="recurringSwitch">
                        <label class="form-check-label fw-bold" for="recurringSwitch">Recurring Stream</label>
                    </div>
                    <button type="submit" class="btn btn-primary w-100 fw-bold"><i class="bi bi-plus-lg me-1"></i>Save Source</button>
                </form>
            </div>
        </div>
    </div>
    <div class="col-md-8">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white py-3 d-flex align-items-center justify-content-between">
                <h6 class="m-0 fw-bold text-dark"><i class="bi bi-layers-fill me-2 text-primary"></i>Income Sources Directory</h6>
                <span class="badge bg-primary">Unlimited Streams Enabled</span>
            </div>
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>Source Name</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Recurring</th>
                            <th>Status</th>
                            <th class="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="fw-bold">Managed IT Infrastructure</td>
                            <td>Service Income</td>
                            <td><span class="badge bg-info-subtle text-info">Service Related</span></td>
                            <td><span class="badge bg-success">Yes (Monthly)</span></td>
                            <td><span class="badge bg-success">Active</span></td>
                            <td class="text-end"><button class="btn btn-sm btn-light"><i class="bi bi-pencil"></i></button></td>
                        </tr>
                        <tr>
                            <td class="fw-bold">Software License Subscriptions</td>
                            <td>Product Sales</td>
                            <td><span class="badge bg-primary-subtle text-primary">Customer Related</span></td>
                            <td><span class="badge bg-success">Yes (Yearly)</span></td>
                            <td><span class="badge bg-success">Active</span></td>
                            <td class="text-end"><button class="btn btn-sm btn-light"><i class="bi bi-pencil"></i></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
