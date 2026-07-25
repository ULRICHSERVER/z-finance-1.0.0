<?php
$page_title = "Download Z-FINANCE PWA & Server Suite";
$page_desc = "Download Z-FINANCE 1.0.0 ZIP package, install PWA on desktop and mobile, or access Android APK build.";
require_once __DIR__ . '/header.php';
?>

<section class="py-5 bg-dark text-white border-bottom border-secondary">
  <div class="container py-4">
    <div class="text-center max-w-2xl mx-auto mb-5">
      <span class="badge bg-primary px-3 py-2 rounded-pill font-mono mb-3">DOWNLOAD CENTER</span>
      <h1 class="display-5 font-extrabold mb-3">Get Z-FINANCE 1.0.0</h1>
      <p class="text-slate-400">Install as a native Progressive Web App (PWA) or download the full PHP server installer zip.</p>
    </div>

    <div class="row g-4 justify-content-center">
      <div class="col-md-5">
        <div class="card bg-slate-800 border-primary text-white p-4 text-center h-100">
          <div class="fs-1 text-primary mb-3"><i class="fas fa-mobile-screen-button"></i></div>
          <h4 class="font-bold mb-2">Install PWA Application</h4>
          <p class="text-slate-400 text-sm mb-4">Install Z-FINANCE directly on your phone or desktop. Works offline with instant launch shortcuts.</p>
          <button id="btnPwaPageInstall" class="btn btn-primary btn-lg font-bold shadow-lg">
            <i class="fas fa-download me-2"></i> Install App Now
          </button>
        </div>
      </div>

      <div class="col-md-5">
        <div class="card bg-slate-800 border-secondary text-white p-4 text-center h-100">
          <div class="fs-1 text-success mb-3"><i class="fas fa-file-archive"></i></div>
          <h4 class="font-bold mb-2">PHP Server Package (ZIP)</h4>
          <p class="text-slate-400 text-sm mb-4">Complete Z-FINANCE 1.0.0 codebase including `/install/` wizard for cPanel, XAMPP, or VPS hosting.</p>
          <a href="/install/" class="btn btn-outline-success btn-lg font-bold">
            <i class="fas fa-server me-2"></i> Launch Web Installer
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<?php require_once __DIR__ . '/footer.php'; ?>
