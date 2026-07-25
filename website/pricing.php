<?php
$page_title = "Subscription Plans & Pricing";
$page_desc = "Transparent pricing for Z-FINANCE: Free, Basic, Professional, and Enterprise plans with multi-currency and offline features.";
require_once __DIR__ . '/header.php';
?>

<section class="py-5 bg-dark text-white border-bottom border-secondary">
  <div class="container py-4">
    <div class="text-center max-w-2xl mx-auto mb-5">
      <span class="badge bg-primary px-3 py-2 rounded-pill font-mono mb-3">PLANS & PRICING</span>
      <h1 class="display-5 font-extrabold mb-3">Flexible Plans for Every Enterprise Scale</h1>
      <p class="text-slate-400">All plans include self-hosting capabilities, offline PWA access, and database security safeguards.</p>
    </div>

    <!-- Pricing Cards Grid -->
    <div class="row g-4 mb-5">
      <div class="col-lg-3 col-md-6">
        <div class="card bg-slate-800 border-secondary text-white p-4 h-100 d-flex flex-column">
          <h5 class="font-bold text-slate-300">Community Free</h5>
          <h2 class="font-black my-3">$0 <span class="fs-6 text-slate-400 font-normal">/mo</span></h2>
          <p class="text-slate-400 text-xs mb-4">Single project or start-up ledger</p>
          <ul class="list-unstyled text-xs space-y-2.5 mb-4 text-slate-300">
            <li><i class="fas fa-check text-success me-2"></i> 1 Company Ledger</li>
            <li><i class="fas fa-check text-success me-2"></i> 100 Transactions / mo</li>
            <li><i class="fas fa-check text-success me-2"></i> Standard CSV Exports</li>
            <li><i class="fas fa-check text-success me-2"></i> Community Forum Support</li>
          </ul>
          <a href="#registerModal" data-bs-toggle="modal" class="btn btn-outline-light w-100 mt-auto font-bold">Start Free</a>
        </div>
      </div>

      <div class="col-lg-3 col-md-6">
        <div class="card bg-slate-800 border-secondary text-white p-4 h-100 d-flex flex-column">
          <h5 class="font-bold text-info">Basic</h5>
          <h2 class="font-black my-3">$19 <span class="fs-6 text-slate-400 font-normal">/mo</span></h2>
          <p class="text-slate-400 text-xs mb-4">For growing small businesses</p>
          <ul class="list-unstyled text-xs space-y-2.5 mb-4 text-slate-300">
            <li><i class="fas fa-check text-success me-2"></i> 3 Company Profiles</li>
            <li><i class="fas fa-check text-success me-2"></i> 1,000 Transactions / mo</li>
            <li><i class="fas fa-check text-success me-2"></i> Dual Currency (XAF / USD)</li>
            <li><i class="fas fa-check text-success me-2"></i> PDF Reports Generator</li>
          </ul>
          <a href="#registerModal" data-bs-toggle="modal" class="btn btn-info w-100 mt-auto font-bold text-white">Choose Basic</a>
        </div>
      </div>

      <div class="col-lg-3 col-md-6">
        <div class="card bg-slate-800 border-primary text-white p-4 h-100 d-flex flex-column position-relative">
          <span class="badge bg-primary position-absolute top-0 end-0 m-3">BEST VALUE</span>
          <h5 class="font-bold text-primary">Professional</h5>
          <h2 class="font-black my-3">$49 <span class="fs-6 text-slate-400 font-normal">/mo</span></h2>
          <p class="text-slate-400 text-xs mb-4">Complete enterprise capability</p>
          <ul class="list-unstyled text-xs space-y-2.5 mb-4 text-slate-300">
            <li><i class="fas fa-check text-success me-2"></i> Unlimited Companies</li>
            <li><i class="fas fa-check text-success me-2"></i> Unlimited Transactions</li>
            <li><i class="fas fa-check text-success me-2"></i> All 5 Currencies Native</li>
            <li><i class="fas fa-check text-success me-2"></i> AI Revenue Analytics</li>
            <li><i class="fas fa-check text-success me-2"></i> Offline PWA Auto-Sync</li>
          </ul>
          <a href="#registerModal" data-bs-toggle="modal" class="btn btn-primary w-100 mt-auto font-bold shadow-lg">Get Pro Plan</a>
        </div>
      </div>

      <div class="col-lg-3 col-md-6">
        <div class="card bg-slate-800 border-warning text-white p-4 h-100 d-flex flex-column">
          <h5 class="font-bold text-warning">Enterprise On-Prem</h5>
          <h2 class="font-black my-3">Custom</h2>
          <p class="text-slate-400 text-xs mb-4">Dedicated VPS or Cloud hosting</p>
          <ul class="list-unstyled text-xs space-y-2.5 mb-4 text-slate-300">
            <li><i class="fas fa-check text-success me-2"></i> Dedicated Server Deployment</li>
            <li><i class="fas fa-check text-success me-2"></i> Custom White-label Branding</li>
            <li><i class="fas fa-check text-success me-2"></i> 24/7 Priority SLA Support</li>
            <li><i class="fas fa-check text-success me-2"></i> Custom API Integrations</li>
          </ul>
          <a href="contact.php" class="btn btn-warning w-100 mt-auto font-bold text-slate-900">Contact Sales</a>
        </div>
      </div>
    </div>
  </div>
</section>

<?php require_once __DIR__ . '/footer.php'; ?>
