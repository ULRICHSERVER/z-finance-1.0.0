<?php
$page_title = "500 Internal Server Error";
require_once __DIR__ . '/header.php';
?>

<section class="py-5 bg-dark text-white text-center border-bottom border-secondary my-5">
  <div class="container py-5">
    <h1 class="display-1 font-black text-danger">500</h1>
    <h3 class="font-extrabold mb-3">Internal Server Exception</h3>
    <p class="text-slate-400 mb-4">A server error occurred while processing your request. Please try refreshing or contact system administrators.</p>
    <a href="index.php" class="btn btn-outline-light font-bold px-4"><i class="fas fa-redo me-2"></i> Reload Platform</a>
  </div>
</section>

<?php require_once __DIR__ . '/footer.php'; ?>
