<?php
$page_title = "Documentation & User Manuals";
$page_desc = "Complete developer and user guides for Z-FINANCE 1.0.0, including installation, API endpoints, and database models.";
require_once __DIR__ . '/header.php';
?>

<section class="py-5 bg-dark text-white border-bottom border-secondary">
  <div class="container py-4">
    <div class="text-center max-w-2xl mx-auto mb-5">
      <span class="badge bg-primary px-3 py-2 rounded-pill font-mono mb-3">DOCUMENTATION PORTAL</span>
      <h1 class="display-5 font-extrabold mb-3">Developer & User Manuals</h1>
      <p class="text-slate-400">Everything you need to configure, extend, and operate Z-FINANCE.</p>
    </div>

    <div class="row g-4">
      <div class="col-md-4">
        <div class="card bg-slate-800 border-secondary text-white p-4 h-100">
          <h5 class="font-bold text-primary mb-2"><i class="fas fa-rocket me-2"></i> Quickstart & Installation</h5>
          <p class="text-slate-400 text-sm mb-3">Step-by-step setup using the <code>/install/</code> web wizard on XAMPP, cPanel, or VPS.</p>
          <a href="download.php" class="btn btn-outline-primary btn-sm font-bold">View Installation Guide</a>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card bg-slate-800 border-secondary text-white p-4 h-100">
          <h5 class="font-bold text-emerald-400 mb-2"><i class="fas fa-code me-2"></i> REST API Documentation</h5>
          <p class="text-slate-400 text-sm mb-3">JSON API endpoints for income transactions, customer links, and currency rates.</p>
          <a href="faq.php" class="btn btn-outline-success btn-sm font-bold">View API Reference</a>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card bg-slate-800 border-secondary text-white p-4 h-100">
          <h5 class="font-bold text-info mb-2"><i class="fas fa-mobile-alt me-2"></i> PWA Offline Guide</h5>
          <p class="text-slate-400 text-sm mb-3">Instructions for installing the Progressive Web App on Android, iOS, and Desktop.</p>
          <a href="download.php" class="btn btn-outline-info btn-sm font-bold">PWA Setup Steps</a>
        </div>
      </div>
    </div>
  </div>
</section>

<?php require_once __DIR__ . '/footer.php'; ?>
