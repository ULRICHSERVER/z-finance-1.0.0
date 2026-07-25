<?php
/**
 * Z-FINANCE 1.0.0 - Income Categories Management View
 * modules/income/income_categories.php
 */
if (!defined('Z_FINANCE_INIT')) die('Direct access not permitted');
?>

<div class="row g-4">
    <!-- Category Creation Form -->
    <div class="col-md-4">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white py-3">
                <h6 class="m-0 fw-bold text-dark"><i class="bi bi-tag-fill me-2 text-primary"></i>New Income Category</h6>
            </div>
            <div class="card-body">
                <form id="addCategoryForm">
                    <div class="mb-3">
                        <label class="form-label fw-bold">Category Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" placeholder="e.g. Consulting Income" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Category Code</label>
                        <input type="text" class="form-control" placeholder="e.g. CAT-CNS">
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Color Identification</label>
                        <input type="color" class="form-control form-control-color w-100" value="#3B82F6">
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Description</label>
                        <textarea class="form-control" rows="3" placeholder="Category purpose..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary w-100 fw-bold"><i class="bi bi-plus-circle me-1"></i>Create Category</button>
                </form>
            </div>
        </div>
    </div>

    <!-- Category List Table -->
    <div class="col-md-8">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white py-3 d-flex align-items-center justify-content-between">
                <h6 class="m-0 fw-bold text-dark"><i class="bi bi-grid-3x3-gap-fill me-2 text-primary"></i>Income Categories List</h6>
                <span class="badge bg-primary">13 Active Categories</span>
            </div>
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>Category</th>
                            <th>Code</th>
                            <th>Color</th>
                            <th>Status</th>
                            <th class="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $cats = [
                            ['Service Income', 'CAT-SRV', '#3B82F6', 'active'],
                            ['Product Sales', 'CAT-PRD', '#10B981', 'active'],
                            ['Consulting', 'CAT-CNS', '#8B5CF6', 'active'],
                            ['Training', 'CAT-TRN', '#F59E0B', 'active'],
                            ['Commission', 'CAT-COM', '#EC4899', 'active'],
                            ['Salary', 'CAT-SLR', '#06B6D4', 'active'],
                            ['Investment', 'CAT-INV', '#14B8A6', 'active'],
                            ['Rental Income', 'CAT-RNT', '#6366F1', 'active'],
                            ['Online Income', 'CAT-ONL', '#3B82F6', 'active'],
                            ['Affiliate Income', 'CAT-AFF', '#84CC16', 'active'],
                            ['Donation', 'CAT-DON', '#F43F5E', 'active'],
                            ['Bonus', 'CAT-BNS', '#A855F7', 'active'],
                            ['Other Income', 'CAT-OTH', '#64748B', 'active']
                        ];
                        foreach ($cats as $c): ?>
                        <tr>
                            <td class="fw-bold"><?= $c[0] ?></td>
                            <td><code><?= $c[1] ?></code></td>
                            <td><span class="d-inline-block rounded-circle" style="width:16px;height:16px;background-color:<?= $c[2] ?>"></span></td>
                            <td><span class="badge bg-success-subtle text-success border border-success-subtle">Active</span></td>
                            <td class="text-end">
                                <button class="btn btn-sm btn-light"><i class="bi bi-pencil"></i></button>
                                <button class="btn btn-sm btn-light text-danger"><i class="bi bi-trash"></i></button>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
