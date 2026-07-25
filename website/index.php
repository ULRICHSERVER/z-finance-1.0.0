<?php
$page_title = "Enterprise Financial Management Engine";
$page_desc = "Z-FINANCE 1.0.0 provides complete income control, multi-currency ledgering, AI revenue analytics, and offline PWA capability.";
require_once __DIR__ . '/header.php';
?>

<!-- HERO SECTION -->
<section class="py-5 bg-dark text-white border-bottom border-secondary position-relative overflow-hidden">
  <div class="container py-lg-5">
    <div class="row align-items-center g-5">
      <div class="col-lg-7">
        <span class="badge bg-primary-subtle text-primary border border-primary px-3 py-2 rounded-pill font-mono mb-3">
          <i class="fas fa-bolt me-1"></i> Z-FINANCE v1.0.0 Enterprise Release
        </span>
        <h1 class="display-4 font-extrabold tracking-tight mb-3">
          Enterprise Financial Control Without Limits
        </h1>
        <p class="lead text-slate-300 mb-4">
          Unify your company's income, expenses, customer billings, project profit margins, and multi-currency ledgers in one secure, high-performance platform. Works 100% offline with zero cloud lock-in.
        </p>
        <div class="d-flex flex-wrap gap-3">
          <a href="#registerModal" data-bs-toggle="modal" class="btn btn-primary btn-lg px-4 font-bold shadow-lg">
            <i class="fas fa-rocket me-2"></i> Get Started Free
          </a>
          <a href="features.php" class="btn btn-outline-light btn-lg px-4 font-semibold">
            <i class="fas fa-layer-group me-2"></i> Explore Features
          </a>
          <a href="download.php" class="btn btn-outline-info btn-lg px-3">
            <i class="fas fa-mobile-alt me-2"></i> Install App (PWA)
          </a>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="card bg-slate-800 border-secondary text-white shadow-2xl rounded-2">
          <div class="card-header border-secondary bg-slate-900 d-flex justify-content-between align-items-center">
            <span class="font-mono text-xs text-primary font-bold"><i class="fas fa-chart-line me-1"></i> Live Financial Engine</span>
            <span class="badge bg-success font-bold">ONLINE ● XAF / USD</span>
          </div>
          <div class="card-body p-4">
            <div class="mb-3">
              <small class="text-slate-400 font-semibold uppercase tracking-wider text-xs block mb-1">Total Monthly Net Income</small>
              <h2 class="font-extrabold text-emerald-400 mb-0">$284,950.00 <span class="fs-6 text-slate-400 font-normal">/ 171,250,000 XAF</span></h2>
            </div>
            <div class="row g-2 mb-3 text-xs">
              <div class="col-6 bg-slate-900/60 p-2 rounded border border-slate-700">
                <span class="text-slate-400 block">Verified Transactions</span>
                <strong class="text-white fs-6">1,482 Entries</strong>
              </div>
              <div class="col-6 bg-slate-900/60 p-2 rounded border border-slate-700">
                <span class="text-slate-400 block">System Growth</span>
                <strong class="text-emerald-400 fs-6">+14.2% MoM</strong>
              </div>
            </div>
            <div class="progress bg-slate-900 h-2">
              <div class="progress-bar bg-primary w-75" role="progressbar"></div>
            </div>
            <small class="text-slate-400 text-xs mt-2 block">75% Target Achieved • Auto Sync Active</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ANIMATED STATISTICS -->
<section class="py-4 bg-slate-900 border-bottom border-secondary">
  <div class="container">
    <div class="row text-center g-4">
      <div class="col-6 col-md-3">
        <h3 class="font-black text-primary mb-0">$50M+</h3>
        <p class="text-slate-400 text-sm mb-0">Processed Volume</p>
      </div>
      <div class="col-6 col-md-3">
        <h3 class="font-black text-emerald-400 mb-0">100%</h3>
        <p class="text-slate-400 text-sm mb-0">Offline-Ready PWA</p>
      </div>
      <div class="col-6 col-md-3">
        <h3 class="font-black text-info mb-0">5+</h3>
        <p class="text-slate-400 text-sm mb-0">Native Currencies</p>
      </div>
      <div class="col-6 col-md-3">
        <h3 class="font-black text-warning mb-0">99.99%</h3>
        <p class="text-slate-400 text-sm mb-0">Uptime Reliability</p>
      </div>
    </div>
  </div>
</section>

<!-- FEATURES OVERVIEW -->
<section class="py-5 bg-dark text-white border-bottom border-secondary">
  <div class="container py-4">
    <div class="text-center max-w-2xl mx-auto mb-5">
      <h2 class="font-extrabold tracking-tight mb-2">Architected for Enterprise Velocity</h2>
      <p class="text-slate-400">Everything your finance team needs to track, analyze, and optimize business revenue streams.</p>
    </div>

    <div class="row g-4">
      <div class="col-md-4">
        <div class="card bg-slate-800 border-secondary text-white h-100 p-4">
          <div class="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center fs-4 mb-3">
            <i class="fas fa-wallet"></i>
          </div>
          <h5 class="font-bold mb-2">Income Management</h5>
          <p class="text-slate-400 text-sm mb-0">Track all income entries with references, payment methods, attachments, categories, and direct CRM links.</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-slate-800 border-secondary text-white h-100 p-4">
          <div class="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center fs-4 mb-3">
            <i class="fas fa-globe"></i>
          </div>
          <h5 class="font-bold mb-2">Multi-Currency Engine</h5>
          <p class="text-slate-400 text-sm mb-0">Real-time conversions between XAF, USD, EUR, GBP, and NGN with base currency consolidation.</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-slate-800 border-secondary text-white h-100 p-4">
          <div class="w-12 h-12 bg-info/20 text-info rounded-xl flex items-center justify-center fs-4 mb-3">
            <i class="fas fa-wifi"></i>
          </div>
          <h5 class="font-bold mb-2">Offline PWA Sync</h5>
          <p class="text-slate-400 text-sm mb-0">Record transactions without internet access. Data synchronizes automatically when connection restores.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- PRICING PREVIEW -->
<section class="py-5 bg-slate-900 text-white border-bottom border-secondary">
  <div class="container py-4">
    <div class="text-center mb-5">
      <h2 class="font-extrabold mb-2">Transparent Pricing Plans</h2>
      <p class="text-slate-400">Choose the ideal tier for your business growth.</p>
    </div>
    <div class="row g-4">
      <div class="col-lg-3 col-md-6">
        <div class="card bg-slate-800 border-secondary text-white p-4 h-100">
          <h5 class="font-bold text-slate-300">Free</h5>
          <h2 class="font-black my-2">$0 <span class="fs-6 font-normal text-slate-400">/mo</span></h2>
          <p class="text-slate-400 text-xs mb-3">Ideal for solo founders</p>
          <ul class="list-unstyled text-xs space-y-2 mb-4 text-slate-300">
            <li><i class="fas fa-check text-success me-2"></i> 1 Company Profile</li>
            <li><i class="fas fa-check text-success me-2"></i> 100 Incomes / mo</li>
            <li><i class="fas fa-check text-success me-2"></i> Single Currency</li>
          </ul>
          <a href="pricing.php" class="btn btn-outline-light w-100 mt-auto font-bold">Select Free</a>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="card bg-slate-800 border-primary text-white p-4 h-100 position-relative">
          <span class="badge bg-primary position-absolute top-0 end-0 m-3">POPULAR</span>
          <h5 class="font-bold text-primary">Pro</h5>
          <h2 class="font-black my-2">$49 <span class="fs-6 font-normal text-slate-400">/mo</span></h2>
          <p class="text-slate-400 text-xs mb-3">For growing companies</p>
          <ul class="list-unstyled text-xs space-y-2 mb-4 text-slate-300">
            <li><i class="fas fa-check text-success me-2"></i> Unlimited Incomes</li>
            <li><i class="fas fa-check text-success me-2"></i> All 5 Currencies</li>
            <li><i class="fas fa-check text-success me-2"></i> Offline Sync PWA</li>
            <li><i class="fas fa-check text-success me-2"></i> PDF Reports & Analytics</li>
          </ul>
          <a href="pricing.php" class="btn btn-primary w-100 mt-auto font-bold">Get Pro Plan</a>
        </div>
      </div>
    </div>
  </div>
</section>

<?php require_once __DIR__ . '/footer.php'; ?>
