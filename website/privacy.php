<?php
$page_title = "Privacy Policy";
$page_desc = "Z-FINANCE 1.0.0 Privacy Policy and GDPR / CCPA data protection guidelines.";
require_once __DIR__ . '/header.php';
?>

<section class="py-5 bg-dark text-white border-bottom border-secondary">
  <div class="container py-4 max-w-4xl">
    <h1 class="font-extrabold mb-4">Privacy Policy</h1>
    <p class="text-slate-400 text-xs font-mono mb-4">Last Updated: July 22, 2026</p>
    
    <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
      <p>At Z-FINANCE, we prioritize data sovereignty and user privacy. Because Z-FINANCE can be hosted on self-managed servers or on-premise infrastructure, you maintain primary ownership of all stored financial data.</p>

      <h5 class="text-white font-bold mt-4">1. Information Collection & Local Storage</h5>
      <p>Z-FINANCE utilizes IndexedDB and LocalStorage in Progressive Web App (PWA) mode strictly to enable offline operation. Transaction records, customer profiles, and user settings stored on your client browser remain isolated to your session.</p>

      <h5 class="text-white font-bold mt-4">2. Database Security</h5>
      <p>All database connections utilize PDO prepared statements and parameter binding to protect against SQL injection vulnerabilities. Password fields use modern secure hashing algorithms (Argon2id / Bcrypt).</p>
    </div>
  </div>
</section>

<?php require_once __DIR__ . '/footer.php'; ?>
