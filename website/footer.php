<?php
// Modular Footer Template
?>
<!-- Advertisement Zone: Footer (Hidden by default) -->
<div id="adZoneFooter" class="container my-3 d-none">
  <div class="bg-secondary text-white text-center py-2 rounded fs-7">
    <i class="fas fa-ad me-1"></i> Partner Banner Placeholder Zone
  </div>
</div>

<footer class="bg-dark text-slate-300 pt-5 pb-4 border-top border-secondary">
  <div class="container">
    <div class="row g-4">
      
      <!-- Company Information -->
      <div class="col-lg-4 col-md-6">
        <div class="d-flex align-items-center gap-2 mb-3">
          <div class="bg-primary text-white rounded px-2.5 py-1 font-black">Z</div>
          <span class="fs-4 font-extrabold text-white">Z-FINANCE</span>
          <span class="badge bg-primary">v1.0.0</span>
        </div>
        <p class="text-slate-400 text-sm mb-3">
          The next-generation financial management engine engineered for enterprises, SMEs, and digital ventures. Complete income control, multi-currency ledgering, and offline PWA reliability.
        </p>
        <div class="d-flex gap-2">
          <a href="#" class="btn btn-outline-light btn-sm rounded-circle"><i class="fab fa-twitter"></i></a>
          <a href="#" class="btn btn-outline-light btn-sm rounded-circle"><i class="fab fa-linkedin-in"></i></a>
          <a href="#" class="btn btn-outline-light btn-sm rounded-circle"><i class="fab fa-github"></i></a>
          <a href="#" class="btn btn-outline-light btn-sm rounded-circle"><i class="fab fa-youtube"></i></a>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="col-lg-2 col-md-6">
        <h6 class="text-white font-bold mb-3">Quick Links</h6>
        <ul class="list-unstyled text-sm space-y-2">
          <li><a href="index.php" class="text-slate-400 text-decoration-none hover-text-white">Home</a></li>
          <li><a href="about.php" class="text-slate-400 text-decoration-none hover-text-white">About Us</a></li>
          <li><a href="features.php" class="text-slate-400 text-decoration-none hover-text-white">Features</a></li>
          <li><a href="solutions.php" class="text-slate-400 text-decoration-none hover-text-white">Solutions</a></li>
          <li><a href="pricing.php" class="text-slate-400 text-decoration-none hover-text-white">Pricing Plans</a></li>
          <li><a href="download.php" class="text-slate-400 text-decoration-none hover-text-white">Download App</a></li>
        </ul>
      </div>

      <!-- Documentation & Resources -->
      <div class="col-lg-3 col-md-6">
        <h6 class="text-white font-bold mb-3">Resources & Support</h6>
        <ul class="list-unstyled text-sm space-y-2">
          <li><a href="documentation.php" class="text-slate-400 text-decoration-none">Documentation</a></li>
          <li><a href="faq.php" class="text-slate-400 text-decoration-none">Frequently Asked Questions</a></li>
          <li><a href="blog.php" class="text-slate-400 text-decoration-none">Blog & Industry News</a></li>
          <li><a href="contact.php" class="text-slate-400 text-decoration-none">Support Desk</a></li>
          <li><a href="privacy.php" class="text-slate-400 text-decoration-none">Privacy Policy</a></li>
          <li><a href="terms.php" class="text-slate-400 text-decoration-none">Terms & Conditions</a></li>
          <li><a href="cookies.php" class="text-slate-400 text-decoration-none">Cookie Policy</a></li>
        </ul>
      </div>

      <!-- Newsletter Capture -->
      <div class="col-lg-3 col-md-6">
        <h6 class="text-white font-bold mb-3">Stay Informed</h6>
        <p class="text-slate-400 text-sm mb-3">
          Subscribe to our release updates and enterprise financial strategy insights.
        </p>
        <form id="newsletterForm" class="input-group input-group-sm">
          <input type="email" class="form-control bg-dark text-white border-secondary" placeholder="Enter business email" required>
          <button class="btn btn-primary" type="submit"><i class="fas fa-paper-plane"></i></button>
        </form>
        <div id="newsletterAlert" class="mt-2 text-xs"></div>
      </div>

    </div>

    <hr class="my-4 border-secondary">

    <!-- Bottom Copyright -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center text-slate-400 text-sm">
      <div>
        © <?php echo date('Y'); ?> Z-FINANCE Technologies Inc. All rights reserved.
      </div>
      <div class="mt-2 mt-md-0 font-mono text-xs">
        Powered by <strong class="text-white">Z-FINANCE 1.0.0 Enterprise Core</strong>
      </div>
    </div>
  </div>
</footer>

<!-- Modals for Login & Register Placeholders -->
<div class="modal fade" id="loginModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bg-dark text-white border-secondary">
      <div class="modal-header border-secondary">
        <h5 class="modal-title font-bold"><i class="fas fa-lock text-primary me-2"></i>Sign In to Z-FINANCE</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body text-center py-4">
        <div class="p-3 bg-secondary/30 rounded mb-3">
          <i class="fas fa-info-circle text-info fs-3 mb-2"></i>
          <p class="mb-0 text-sm">Authentication & User Portal modules will be activated in the next development phase according to platform specifications.</p>
        </div>
        <button class="btn btn-primary px-4 font-bold" data-bs-dismiss="modal">Understand & Close</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="registerModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bg-dark text-white border-secondary">
      <div class="modal-header border-secondary">
        <h5 class="modal-title font-bold"><i class="fas fa-user-plus text-success me-2"></i>Create Free Account</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body text-center py-4">
        <div class="p-3 bg-secondary/30 rounded mb-3">
          <i class="fas fa-check-circle text-success fs-3 mb-2"></i>
          <p class="mb-0 text-sm">Registration portal will open upon activation of Step 2 User Management backend.</p>
        </div>
        <button class="btn btn-success px-4 font-bold" data-bs-dismiss="modal">Got It</button>
      </div>
    </div>
  </div>
</div>

<!-- Bootstrap 5 JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script>
  // Language Switcher handler
  document.getElementById('langSelect')?.addEventListener('change', function(e) {
    document.cookie = "z_lang=" + e.target.value + "; path=/; max-age=31536000";
    window.location.reload();
  });

  // Theme Toggle handler
  document.getElementById('themeToggleBtn')?.addEventListener('click', function() {
    const isDark = document.body.classList.contains('bg-slate-900');
    const newTheme = isDark ? 'light' : 'dark';
    document.cookie = "z_theme=" + newTheme + "; path=/; max-age=31536000";
    window.location.reload();
  });

  // Newsletter Form handler
  document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const alertDiv = document.getElementById('newsletterAlert');
    alertDiv.className = "text-success fw-bold";
    alertDiv.innerText = "Thank you! You are now subscribed to Z-FINANCE news.";
  });
</script>
</body>
</html>
