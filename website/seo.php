<?php
/**
 * Z-FINANCE 1.0.0 - SEO Helper & Meta Tag Generator
 */

function render_seo_tags($page_title = '', $description = '', $keywords = '', $og_image = '/assets/images/og-preview.jpg') {
    $site_name = "Z-FINANCE 1.0.0";
    $base_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
    $current_url = $base_url . $_SERVER['REQUEST_URI'];
    
    $title = !empty($page_title) ? "$page_title | $site_name" : "Z-FINANCE 1.0.0 — Enterprise Financial Management Suite";
    $desc = !empty($description) ? $description : "Z-FINANCE is an enterprise-grade financial management platform offering Income, Expenses, CRM, Project Billing, AI Analytics, Multi-Currency, and Offline PWA support.";
    $kw = !empty($keywords) ? $keywords : "financial management, invoicing, income manager, expense tracking, multi-currency, accounting software, PWA, PHP 8";

    echo '
    <title>' . htmlspecialchars($title) . '</title>
    <meta name="description" content="' . htmlspecialchars($desc) . '">
    <meta name="keywords" content="' . htmlspecialchars($kw) . '">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Z-FINANCE Technologies">
    <meta name="robots" content="index, follow">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="' . htmlspecialchars($title) . '">
    <meta property="og:description" content="' . htmlspecialchars($desc) . '">
    <meta property="og:image" content="' . htmlspecialchars($base_url . $og_image) . '">
    <meta property="og:url" content="' . htmlspecialchars($current_url) . '">
    <meta property="og:site_name" content="' . htmlspecialchars($site_name) . '">

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@ZFinanceApp">
    <meta name="twitter:title" content="' . htmlspecialchars($title) . '">
    <meta name="twitter:description" content="' . htmlspecialchars($desc) . '">
    <meta name="twitter:image" content="' . htmlspecialchars($base_url . $og_image) . '">

    <!-- Canonical -->
    <link rel="canonical" href="' . htmlspecialchars($current_url) . '">

    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Z-FINANCE",
      "operatingSystem": "Web, Windows, macOS, Linux, Android, iOS",
      "applicationCategory": "FinanceApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
    </script>
    ';
}
