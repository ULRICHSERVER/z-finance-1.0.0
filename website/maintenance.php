<?php
$page_title = "Scheduled System Maintenance";
require_once __DIR__ . '/header.php';
?>

<section class="py-5 bg-dark text-white text-center border-bottom border-secondary my-5">
  <div class="container py-5">
    <div class="fs-1 text-warning mb-3"><i class="fas fa-tools"></i></div>
    <h1 class="display-5 font-black mb-3">System Under Scheduled Maintenance</h1>
    <p class="text-slate-400 mb-4 max-w-lg mx-auto">We are currently deploying core database upgrades for Z-FINANCE 1.0.0. Service will resume shortly.</p>
    <div class="badge bg-slate-800 text-slate-300 p-3 font-mono border border-slate-700">Expected Uptime: Today at 16:00 GMT+1</div>
  </div>
</section>

<?php require_once __DIR__ . '/footer.php'; ?>
