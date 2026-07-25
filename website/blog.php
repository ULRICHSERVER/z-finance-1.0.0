<?php
$page_title = "Blog & Enterprise News";
$page_desc = "Insights, tax compliance strategies, and financial management best practices from the Z-FINANCE engineering team.";
require_once __DIR__ . '/header.php';
?>

<section class="py-5 bg-dark text-white border-bottom border-secondary">
  <div class="container py-4">
    <div class="text-center max-w-2xl mx-auto mb-5">
      <span class="badge bg-primary px-3 py-2 rounded-pill font-mono mb-3">INSIGHTS & NEWS</span>
      <h1 class="display-5 font-extrabold mb-3">Financial Intelligence Blog</h1>
      <p class="text-slate-400">Expert articles on cashflow control, multi-currency strategies, and PHP software architecture.</p>
    </div>

    <!-- Featured Articles Grid -->
    <div class="row g-4">
      <div class="col-md-6 col-lg-4">
        <div class="card bg-slate-800 border-secondary text-white h-100 overflow-hidden">
          <div class="p-4 bg-slate-900 border-bottom border-slate-700">
            <span class="badge bg-primary mb-2">Strategy</span>
            <h5 class="font-bold mb-2">Managing Multi-Currency Cashflow in Central & West Africa</h5>
            <small class="text-slate-400 text-xs">July 22, 2026 • 5 min read</small>
          </div>
          <div class="card-body p-4 text-slate-300 text-sm">
            Discover how enterprise CFOs handle dynamic conversion rates between XAF, USD, and NGN without creating ledger accounting imbalances.
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card bg-slate-800 border-secondary text-white h-100 overflow-hidden">
          <div class="p-4 bg-slate-900 border-bottom border-slate-700">
            <span class="badge bg-emerald-500 mb-2">Tech & PWA</span>
            <h5 class="font-bold mb-2">Why Offline-First PWA Architecture Matters for Financial Apps</h5>
            <small class="text-slate-400 text-xs">July 18, 2026 • 4 min read</small>
          </div>
          <div class="card-body p-4 text-slate-300 text-sm">
            Unstable mobile connections should never halt billing. Learn how Z-FINANCE leverages IndexedDB and Service Workers for zero data loss.
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card bg-slate-800 border-secondary text-white h-100 overflow-hidden">
          <div class="p-4 bg-slate-900 border-bottom border-slate-700">
            <span class="badge bg-info mb-2">Compliance</span>
            <h5 class="font-bold mb-2">Preparing Your Business for Audited PDF Financial Statement Exports</h5>
            <small class="text-slate-400 text-xs">July 10, 2026 • 6 min read</small>
          </div>
          <div class="card-body p-4 text-slate-300 text-sm">
            A guide to categorizing income and cost centers to streamline quarterly balance sheets and annual tax returns.
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<?php require_once __DIR__ . '/footer.php'; ?>
