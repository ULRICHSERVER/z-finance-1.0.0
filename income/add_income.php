<?php
/**
 * Z-FINANCE 1.0.0 - Add / Edit Income Entry View
 * modules/income/add_income.php
 */
if (!defined('Z_FINANCE_INIT')) die('Direct access not permitted');
?>

<div class="row justify-content-center">
    <div class="col-lg-10">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white py-3 d-flex align-items-center justify-content-between">
                <h5 class="m-0 fw-bold text-dark"><i class="bi bi-plus-square-fill text-primary me-2"></i>New Income Entry</h5>
                <a href="index.php?view=list" class="btn btn-outline-secondary btn-sm"><i class="bi bi-arrow-left me-1"></i>Back to List</a>
            </div>
            <div class="card-body p-4">
                <form action="api.php?action=save_income" method="POST" enctype="multipart/form-data" id="addIncomeForm">
                    <input type="hidden" name="csrf_token" value="<?= IncomeDatabase::generateCsrfToken() ?>">

                    <!-- Basic Transaction Info -->
                    <div class="row g-3 mb-4">
                        <div class="col-md-6">
                            <label class="form-label fw-bold">Income Title <span class="text-danger">*</span></label>
                            <input type="text" name="title" class="form-control" placeholder="e.g. Q3 Software Retainer Fee" required>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label fw-bold">Category <span class="text-danger">*</span></label>
                            <select name="category_id" class="form-select" required>
                                <option value="">Select Category...</option>
                                <option value="1">Service Income</option>
                                <option value="2">Product Sales</option>
                                <option value="3">Consulting</option>
                                <option value="4">Training</option>
                                <option value="5">Commission</option>
                                <option value="6">Salary</option>
                                <option value="7">Investment</option>
                                <option value="8">Rental Income</option>
                                <option value="9">Online Income</option>
                                <option value="10">Affiliate Income</option>
                                <option value="11">Donation</option>
                                <option value="12">Bonus</option>
                                <option value="13">Other Income</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label fw-bold">Income Source <span class="text-danger">*</span></label>
                            <select name="source_id" class="form-select" required>
                                <option value="">Select Source...</option>
                                <option value="1">Managed IT Infrastructure</option>
                                <option value="2">Software License Subscriptions</option>
                                <option value="3">Fintech Architecture Advisory</option>
                            </select>
                        </div>
                    </div>

                    <!-- Financial & Multi-Currency -->
                    <div class="row g-3 mb-4">
                        <div class="col-md-4">
                            <label class="form-label fw-bold">Amount <span class="text-danger">*</span></label>
                            <input type="number" step="0.01" name="amount" class="form-control form-control-lg fw-bold text-success" placeholder="0.00" required>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label fw-bold">Currency</label>
                            <select name="currency" class="form-select form-select-lg">
                                <option value="XAF" selected>XAF - Central African CFA</option>
                                <option value="USD">USD - US Dollar</option>
                                <option value="EUR">EUR - Euro</option>
                                <option value="GBP">GBP - British Pound</option>
                                <option value="NGN">NGN - Nigerian Naira</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <label class="form-label fw-bold">Exchange Rate</label>
                            <input type="number" step="0.000001" name="exchange_rate" class="form-control form-control-lg" value="1.000000">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label fw-bold">Income Date <span class="text-danger">*</span></label>
                            <input type="date" name="income_date" class="form-control form-control-lg" value="<?= date('Y-m-d') ?>" required>
                        </div>
                    </div>

                    <!-- CRM / Service / Project Links -->
                    <div class="row g-3 mb-4 p-3 bg-light rounded border">
                        <div class="col-12"><h6 class="fw-bold text-primary m-0"><i class="bi bi-link-45deg me-1"></i>Related Modules Connection</h6></div>
                        <div class="col-md-4">
                            <label class="form-label small fw-bold">Link Customer (CRM)</label>
                            <select name="customer_id" class="form-select form-select-sm">
                                <option value="">None (Walk-in / General)</option>
                                <option value="101">Cameroon Telecom S.A.</option>
                                <option value="102">Afriland First Bank</option>
                                <option value="103">SNET Consulting</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label small fw-bold">Link Service</label>
                            <select name="service_id" class="form-select form-select-sm">
                                <option value="">None</option>
                                <option value="201">Cloud Network Audit</option>
                                <option value="202">Dedicated VPS Server</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label small fw-bold">Link Project</label>
                            <select name="project_id" class="form-select form-select-sm">
                                <option value="">None</option>
                                <option value="301">Project Alpha - Mobile Banking</option>
                                <option value="302">Project Beta - E-Gov Portal</option>
                            </select>
                        </div>
                    </div>

                    <!-- Payment Method & Status -->
                    <div class="row g-3 mb-4">
                        <div class="col-md-4">
                            <label class="form-label fw-bold">Payment Method</label>
                            <select name="payment_method" class="form-select">
                                <option value="Bank Transfer">Bank Transfer</option>
                                <option value="Cash">Cash</option>
                                <option value="MTN Mobile Money">MTN Mobile Money</option>
                                <option value="Orange Money">Orange Money</option>
                                <option value="Express Union Mobile Money">Express Union Mobile Money</option>
                                <option value="Cheque">Cheque</option>
                                <option value="Credit">Credit</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label fw-bold">Status</label>
                            <select name="status" class="form-select">
                                <option value="received">Received / Completed</option>
                                <option value="pending">Pending</option>
                                <option value="partially_received">Partially Received</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="refunded">Refunded</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label fw-bold">Reference Number</label>
                            <input type="text" name="reference_no" class="form-control" placeholder="Auto-generated if empty">
                        </div>
                    </div>

                    <!-- Attachments & Notes -->
                    <div class="row g-3 mb-4">
                        <div class="col-md-6">
                            <label class="form-label fw-bold">Attachment (Receipt, Invoice, PDF, Proof)</label>
                            <input type="file" name="attachment" class="form-control">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold">Tags (Comma separated)</label>
                            <input type="text" name="tags" class="form-control" placeholder="e.g. Q3, Retainer, VIP-Client">
                        </div>
                        <div class="col-12">
                            <label class="form-label fw-bold">Description / Internal Notes</label>
                            <textarea name="description" class="form-control" rows="3" placeholder="Additional details..."></textarea>
                        </div>
                    </div>

                    <div class="text-end">
                        <button type="reset" class="btn btn-light me-2">Clear Form</button>
                        <button type="submit" class="btn btn-primary px-4 fw-bold"><i class="bi bi-check-circle me-1"></i>Save Income Record</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
