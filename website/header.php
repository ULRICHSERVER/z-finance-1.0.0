<?php
require_once __DIR__ . '/seo.php';

$lang = isset($_COOKIE['z_lang']) ? $_COOKIE['z_lang'] : 'en';
$theme = isset($_COOKIE['z_theme']) ? $_COOKIE['z_theme'] : 'dark';

// Language translation dictionary stub for PHP website
$translations = [
    'en' => [
        'home' => 'Home',
        'about' => 'About Us',
        'features' => 'Features',
        'solutions' => 'Solutions',
        'pricing' => 'Pricing',
        'faq' => 'FAQ',
        'blog' => 'Blog',
        'docs' => 'Documentation',
        'contact' => 'Contact',
        'download' => 'Download App',
        'login' => 'Sign In',
        'register' => 'Register Free',
        'install_pwa' => 'Install App'
    ],
    'fr' => [
        'home' => 'Accueil',
        'about' => 'À Propos',
        'features' => 'Fonctionnalités',
        'solutions' => 'Solutions',
        'pricing' => 'Tarification',
        'faq' => 'FAQ',
        'blog' => 'Blog',
        'docs' => 'Documentation',
        'contact' => 'Contact',
        'download' => 'Télécharger',
        'login' => 'Connexion',
        'register' => 'S\'inscrire',
        'install_pwa' => 'Installer l\'Application'
    ]
];

$t = $translations[$lang] ?? $translations['en'];
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>" class="<?php echo $theme === 'dark' ? 'dark' : ''; ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php render_seo_tags($page_title ?? '', $page_desc ?? '', $page_kw ?? ''); ?>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Manifest & Favicon -->
    <link rel="manifest" href="/manifest.json">
    <style>
        :root {
            --primary: #4f46e5;
            --primary-hover: #4338ca;
            --bg-dark: #0f172a;
            --card-dark: #1e293b;
        }
        body.dark {
            background-color: var(--bg-dark);
            color: #f1f5f9;
        }
        .navbar-custom {
            backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
    </style>
</head>
<body className="<?php echo $theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'; ?>">

<!-- Header Navigation Bar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top navbar-custom py-3">
  <div class="container">
    <a class="navbar-brand d-flex items-center gap-2 font-bold" href="index.php">
      <div class="bg-primary text-white rounded px-2.5 py-1 font-black">Z</div>
      <span class="fs-4 font-extrabold tracking-tight">Z-FINANCE</span>
      <span class="badge bg-primary fs-7">v1.0.0</span>
    </a>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 fw-semibold text-sm">
        <li class="nav-item"><a class="nav-link" href="index.php"><?php echo $t['home']; ?></a></li>
        <li class="nav-item"><a class="nav-link" href="about.php"><?php echo $t['about']; ?></a></li>
        <li class="nav-item"><a class="nav-link" href="features.php"><?php echo $t['features']; ?></a></li>
        <li class="nav-item"><a class="nav-link" href="solutions.php"><?php echo $t['solutions']; ?></a></li>
        <li class="nav-item"><a class="nav-link" href="pricing.php"><?php echo $t['pricing']; ?></a></li>
        <li class="nav-item"><a class="nav-link" href="blog.php"><?php echo $t['blog']; ?></a></li>
        <li class="nav-item"><a class="nav-link" href="documentation.php"><?php echo $t['docs']; ?></a></li>
        <li class="nav-item"><a class="nav-link" href="contact.php"><?php echo $t['contact']; ?></a></li>
      </ul>

      <div class="d-flex align-items-center gap-2 ms-lg-3 mt-3 mt-lg-0">
        <!-- Language Switcher -->
        <select class="form-select form-select-sm bg-dark text-white border-secondary w-auto" id="langSelect">
          <option value="en" <?php echo $lang === 'en' ? 'selected' : ''; ?>>🇺🇸 EN</option>
          <option value="fr" <?php echo $lang === 'fr' ? 'selected' : ''; ?>>🇫🇷 FR</option>
        </select>

        <!-- Theme Switcher -->
        <button class="btn btn-outline-light btn-sm" id="themeToggleBtn" title="Toggle Theme">
          <i class="fas <?php echo $theme === 'dark' ? 'fa-sun text-warning' : 'fa-moon'; ?>"></i>
        </button>

        <!-- PWA Install Button -->
        <button class="btn btn-outline-info btn-sm d-none" id="btnPwaInstall">
          <i class="fas fa-download me-1"></i> <?php echo $t['install_pwa']; ?>
        </button>

        <!-- Auth CTAs -->
        <a href="#loginModal" data-bs-toggle="modal" class="btn btn-outline-light btn-sm px-3"><?php echo $t['login']; ?></a>
        <a href="#registerModal" data-bs-toggle="modal" class="btn btn-primary btn-sm px-3 font-bold"><?php echo $t['register']; ?></a>
      </div>
    </div>
  </div>
</nav>

<!-- Advertisement Zone: Header Banner (Hidden by default) -->
<div id="adZoneHeader" class="container mt-2 d-none">
  <div class="alert alert-info text-center py-2 fs-7">
    <i class="fas fa-bullhorn me-2"></i><strong>Sponsor Ad:</strong> Upgrade your enterprise accounting with Z-FINANCE Pro. <a href="pricing.php" class="alert-link">Learn More</a>
  </div>
</div>
