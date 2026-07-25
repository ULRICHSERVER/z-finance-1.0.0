<?php
$page_title = "About Us — Enterprise Mission & Milestones";
$page_desc = "Learn about Z-FINANCE's mission to provide resilient, self-hosted, offline-ready financial software for global enterprises.";
require_once __DIR__ . '/header.php';
?>

<section class="py-5 bg-dark text-white border-bottom border-secondary">
  <div class="container py-4">
    <div class="max-w-3xl mx-auto text-center mb-5">
      <span class="badge bg-primary px-3 py-2 rounded-pill font-mono mb-3">ABOUT Z-FINANCE</span>
      <h1 class="display-5 font-extrabold mb-3">Empowering Global Commerce with Resilient Financial Architecture</h1>
      <p class="lead text-slate-300">
        Z-FINANCE 1.0.0 was engineered to solve a fundamental challenge faced by businesses worldwide: maintaining complete financial control across multi-currency ledgers with zero downtime, even in offline environments.
      </p>
    </div>

    <div class="row g-4 my-4">
      <div class="col-md-4">
        <div class="card bg-slate-800 border-secondary text-white p-4 h-100">
          <div class="text-primary fs-2 mb-3"><i class="fas fa-shield-alt"></i></div>
          <h4 class="font-bold">Data Sovereignty</h4>
          <p class="text-slate-400 text-sm">Deploy on your own infrastructure — Localhost, cPanel, VPS, or Docker. Your financial data remains strictly under your control.</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-slate-800 border-secondary text-white p-4 h-100">
          <div class="text-emerald-400 fs-2 mb-3"><i class="fas fa-bolt"></i></div>
          <h4 class="font-bold">Uncompromising Speed</h4>
          <p class="text-slate-400 text-sm">Built on lightweight PHP 8.2+ PDO core and local caching to deliver sub-millisecond query execution and zero input lag.</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-slate-800 border-secondary text-white p-4 h-100">
          <div class="text-info fs-2 mb-3"><i class="fas fa-globe-africa"></i></div>
          <h4 class="font-bold">Multi-Currency Native</h4>
          <p class="text-slate-400 text-sm">Full native support for Central African Franc (XAF), USD, EUR, GBP, and NGN with automatic base currency ledger conversions.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<?php require_once __DIR__ . '/footer.php'; ?>
