<?php
$page_title = "Frequently Asked Questions (FAQ)";
$page_desc = "Get answers to common questions about Z-FINANCE 1.0.0 installation, offline PWA mode, multi-currency ledgers, and data security.";
require_once __DIR__ . '/header.php';
?>

<section class="py-5 bg-dark text-white border-bottom border-secondary">
  <div class="container py-4">
    <div class="text-center max-w-2xl mx-auto mb-5">
      <span class="badge bg-primary px-3 py-2 rounded-pill font-mono mb-3">HELP CENTER</span>
      <h1 class="display-5 font-extrabold mb-3">Frequently Asked Questions</h1>
      <p class="text-slate-400">Everything you need to know about setting up and operating Z-FINANCE.</p>
    </div>

    <div class="max-w-3xl mx-auto accordion accordion-flush" id="faqAccordion">
      
      <div class="accordion-item bg-slate-800 border-secondary text-white rounded mb-3 overflow-hidden">
        <h2 class="accordion-header">
          <button class="accordion-button bg-slate-800 text-white font-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
            <i class="fas fa-server me-2 text-primary"></i> Can I install Z-FINANCE on shared hosting or XAMPP?
          </button>
        </h2>
        <div id="faq1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body text-slate-300 text-sm">
            Yes! Z-FINANCE comes with an interactive <strong>Installation Wizard (`/install/`)</strong> that runs on XAMPP, Laragon, WAMP, cPanel Shared Hosting, VPS, or Docker without editing PHP files manually.
          </div>
        </div>
      </div>

      <div class="accordion-item bg-slate-800 border-secondary text-white rounded mb-3 overflow-hidden">
        <h2 class="accordion-header">
          <button class="accordion-button bg-slate-800 text-white font-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
            <i class="fas fa-wifi me-2 text-emerald-400"></i> How does the Offline PWA Mode work?
          </button>
        </h2>
        <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body text-slate-300 text-sm">
            Z-FINANCE utilizes a Service Worker and IndexedDB / LocalStorage cache. You can create transactions offline; when internet connectivity returns, the background sync engine pushes pending entries to MySQL automatically.
          </div>
        </div>
      </div>

      <div class="accordion-item bg-slate-800 border-secondary text-white rounded mb-3 overflow-hidden">
        <h2 class="accordion-header">
          <button class="accordion-button bg-slate-800 text-white font-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
            <i class="fas fa-coins me-2 text-info"></i> Which currencies are supported natively?
          </button>
        </h2>
        <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body text-slate-300 text-sm">
            Z-FINANCE includes native support for Central African Franc (XAF), US Dollar (USD), Euro (EUR), British Pound (GBP), and Nigerian Naira (NGN), complete with exchange rate calculators and base currency ledger conversion.
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<?php require_once __DIR__ . '/footer.php'; ?>
