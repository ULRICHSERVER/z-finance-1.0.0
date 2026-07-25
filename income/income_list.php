<?php
/**
 * Z-FINANCE 1.0.0 - Income List & Filterable Transactions View
 * modules/income/income_list.php
 */
if (!defined('Z_FINANCE_INIT')) die('Direct access not permitted');
?>

<div class="card border-0 shadow-sm mb-4">
    <div class="card-header bg-white py-3 d-flex flex-wrap align-items-center justify-content-between gap-2">
        <h5 class="m-0 fw-bold text-dark"><i class="bi bi-list-columns-reverse me-2"></i>Income Records</h5>
        <div class="d-flex gap-2">
            <a href="index.php?view=add" class="btn btn-primary btn-sm"><i class="bi bi-plus-lg me-1"></i>New Entry</a>
            <button class="btn btn-outline-secondary btn-sm" onclick="window.print()"><i class="bi bi-printer me-1"></i>Print</button>
        </div>
    </div>
    <div class="card-body border-bottom bg-light">
        <!-- Search & Advanced Multi-field Filters -->
        <form class="row g-2" id="incomeFilterForm">
            <div class="col-md-3">
                <input type="text" class="form-control form-control-sm" placeholder="Search by title, ref #, tag...">
            </div>
            <div class="col-md-2">
                <select class="form-select form-select-sm">
                    <option value="">All Categories</option>
                    <option>Service Income</option>
                    <option>Product Sales</option>
                    <option>Consulting</option>
                    <option>Training</option>
                    <option>Commission</option>
                </select>
            </div>
            <div class="col-md-2">
                <select class="form-select form-select-sm">
                    <option value="">All Payment Methods</option>
                    <option>Cash</option>
                    <option>Bank Transfer</option>
                    <option>MTN Mobile Money</option>
                    <option>Orange Money</option>
                </select>
            </div>
            <div class="col-md-2">
                <select class="form-select form-select-sm">
                    <option value="">All Statuses</option>
                    <option>Received</option>
                    <option>Pending</option>
                    <option>Partially Received</option>
                    <option>Cancelled</option>
                </select>
            </div>
            <div class="col-md-3 d-flex gap-2">
                <input type="date" class="form-control form-control-sm">
                <button type="submit" class="btn btn-dark btn-sm px-3"><i class="bi bi-funnel me-1"></i>Filter</button>
            </div>
        </form>
    </div>
    <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
            <thead class="table-light text-muted text-uppercase small">
                <tr>
                    <th>Ref No</th>
                    <th>Title / Details</th>
                    <th>Category & Source</th>
                    <th>Customer / Service</th>
                    <th>Date</th>
                    <th>Amount & FX</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th class="text-end">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="font-monospace fw-bold text-primary">INC-202607-001</span></td>
                    <td>
                        <div class="fw-bold text-dark">Enterprise IT Infrastructure Contract</div>
                        <small class="text-muted">Managed cloud maintenance Q3</small>
                    </td>
                    <td>
                        <span class="badge bg-primary-subtle text-primary border border-primary-subtle">Service Income</span>
                        <div class="small text-muted">Managed IT</div>
                    </td>
                    <td>
                        <div class="fw-semibold">Cameroon Telecom S.A.</div>
                        <small class="text-muted">Service ID: #SRV-102</small>
                    </td>
                    <td>2026-07-20</td>
                    <td>
                        <div class="fw-bold text-dark">3,500,000 XAF</div>
                        <small class="text-muted">1.0000 Base</small>
                    </td>
                    <td><span class="badge bg-light text-dark border">Bank Transfer</span></td>
                    <td><span class="badge bg-success"><i class="bi bi-check-circle me-1"></i>Received</span></td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-outline-primary me-1"><i class="bi bi-eye"></i></button>
                        <button class="btn btn-sm btn-outline-secondary me-1"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
