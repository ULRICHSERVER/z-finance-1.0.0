<?php
if (!defined('Z_INSTALLER')) die('Direct access not permitted.');
?>

<div class="text-center py-3">
    <div class="mb-4">
        <span class="badge bg-indigo-50 text-indigo-700 font-mono px-3 py-1 border border-indigo-100 rounded-pill">
            Universal Enterprise Installer
        </span>
    </div>

    <h3 class="fw-bold text-slate-900 mb-3">Welcome to Z-FINANCE 1.0.0 Setup</h3>
    <p class="text-muted leading-relaxed max-w-xl mx-auto">
        This automated wizard will guide you through system compatibility checks, directory permission verification, MySQL database creation, schema seeding, and environment configuration.
    </p>

    <!-- Hosting Compatibility Grid -->
    <div class="row g-3 my-4 text-start">
        <div class="col-6 col-md-3">
            <div class="p-3 bg-light rounded-3 border text-center">
                <i class="bi bi-laptop fs-3 text-indigo-600 mb-1 d-block"></i>
                <span class="fw-bold d-block text-dark small">Localhost</span>
                <span class="text-muted text-[10px]">XAMPP, WAMP, Laragon</span>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="p-3 bg-light rounded-3 border text-center">
                <i class="bi bi-hdd-network fs-3 text-indigo-600 mb-1 d-block"></i>
                <span class="fw-bold d-block text-dark small">cPanel Hosting</span>
                <span class="text-muted text-[10px]">Shared / Reseller</span>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="p-3 bg-light rounded-3 border text-center">
                <i class="bi bi-server fs-3 text-indigo-600 mb-1 d-block"></i>
                <span class="fw-bold d-block text-dark small">VPS Server</span>
                <span class="text-muted text-[10px]">Ubuntu, AlmaLinux</span>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="p-3 bg-light rounded-3 border text-center">
                <i class="bi bi-cloud-check fs-3 text-indigo-600 mb-1 d-block"></i>
                <span class="fw-bold d-block text-dark small">Cloud Hosting</span>
                <span class="text-muted text-[10px]">AWS, GCP, DigitalOcean</span>
            </div>
        </div>
    </div>

    <div class="alert alert-info border-0 bg-indigo-50 text-indigo-900 p-3 text-start mb-4 rounded-3">
        <div class="d-flex align-items-center">
            <i class="bi bi-info-circle-fill fs-5 text-indigo-600 me-2"></i>
            <div>
                <strong>No manual PHP file editing required!</strong> The installer will generate your <code>.env</code> file, set encryption keys, and provision the MySQL schema automatically.
            </div>
        </div>
    </div>

    <a href="index.php?step=2" class="btn btn-indigo btn-lg px-5 shadow-sm fw-bold">
        Start System Audit &rarr;
    </a>
</div>
