<?php
$page_title = "Offline Standby Mode";
require_once __DIR__ . '/header.php';
?>

<section class="py-5 bg-dark text-white text-center border-bottom border-secondary my-5">
  <div class="container py-5">
    <div class="fs-1 text-info mb-3"><i class="fas fa-wifi-slash"></i></div>
    <h1 class="display-5 font-black mb-3">You Are Currently Offline</h1>
    <p class="text-slate-400 mb-4 max-w-lg mx-auto">Z-FINANCE PWA engine is active. You can continue recording transactions locally; entries will sync automatically upon reconnection.</p>
    <a href="index.php" class="btn btn-info text-white font-bold px-4"><i class="fas fa-database me-2"></i> Access Local Offline Cache</a>
  </div>
</section>

<?php require_once __DIR__ . '/footer.php'; ?>
