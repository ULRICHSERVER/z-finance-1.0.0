<?php
$page_title = "Contact Enterprise Support & Sales";
$page_desc = "Get in touch with Z-FINANCE sales, support desk, or enterprise custom deployment advisors.";
require_once __DIR__ . '/header.php';
?>

<section class="py-5 bg-dark text-white border-bottom border-secondary">
  <div class="container py-4">
    <div class="text-center max-w-2xl mx-auto mb-5">
      <span class="badge bg-primary px-3 py-2 rounded-pill font-mono mb-3">GET IN TOUCH</span>
      <h1 class="display-5 font-extrabold mb-3">Contact Enterprise Advisory</h1>
      <p class="text-slate-400">Have questions regarding deployment, custom API integrations, or licensing?</p>
    </div>

    <div class="row g-5">
      <div class="col-lg-6">
        <form id="contactForm" class="bg-slate-800 p-4 rounded-xl border border-secondary space-y-4">
          <div>
            <label class="form-label text-slate-300 font-bold text-sm">Full Name</label>
            <input type="text" class="form-control bg-dark text-white border-secondary" placeholder="John Doe" required>
          </div>
          <div>
            <label class="form-label text-slate-300 font-bold text-sm">Business Email</label>
            <input type="email" class="form-control bg-dark text-white border-secondary" placeholder="john@company.com" required>
          </div>
          <div>
            <label class="form-label text-slate-300 font-bold text-sm">Subject</label>
            <input type="text" class="form-control bg-dark text-white border-secondary" placeholder="Enterprise License Query" required>
          </div>
          <div>
            <label class="form-label text-slate-300 font-bold text-sm">Message</label>
            <textarea class="form-control bg-dark text-white border-secondary" rows="4" placeholder="How can we assist your financial workflow?" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary w-100 font-bold py-2.5">
            <i class="fas fa-paper-plane me-2"></i> Send Message
          </button>
          <div id="contactAlert" class="text-xs text-emerald-400 mt-2 font-bold"></div>
        </form>
      </div>

      <div class="col-lg-6">
        <div class="card bg-slate-800 border-secondary text-white p-4 mb-4">
          <h5 class="font-bold mb-3"><i class="fas fa-building text-primary me-2"></i> Headquarters Information</h5>
          <ul class="list-unstyled text-slate-300 text-sm space-y-3 mb-0">
            <li><i class="fas fa-map-marker-alt text-danger me-2"></i> Innovation Tech Tower, Financial District</li>
            <li><i class="fas fa-envelope text-info me-2"></i> support@z-finance.app</li>
            <li><i class="fas fa-phone text-success me-2"></i> +237 (600) 000-888</li>
            <li><i class="fas fa-clock text-warning me-2"></i> Monday – Friday: 08:00 – 18:00 GMT+1</li>
          </ul>
        </div>

        <!-- Google Maps Embed Placeholder -->
        <div class="card bg-slate-800 border-secondary text-white p-4 text-center">
          <div class="p-4 bg-slate-900 rounded border border-slate-700">
            <i class="fas fa-map-marked-alt fs-1 text-primary mb-2"></i>
            <p class="mb-0 text-slate-400 text-sm font-mono">Interactive Map Embed Placeholder<br>40.7128° N, 74.0060° W</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
  document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('contactAlert').innerText = "Message transmitted successfully! Our advisory team will respond within 24 hours.";
  });
</script>

<?php require_once __DIR__ . '/footer.php'; ?>
