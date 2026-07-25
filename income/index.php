<?php
/**
 * Z-FINANCE 1.0.0 - Income Management System
 * Main Router File (modules/income/index.php)
 */

define('Z_FINANCE_INIT', true);
require_once __DIR__ . '/db.php';

$page = $_GET['view'] ?? 'dashboard';

// Header & Layout Template Inclusion
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Z-FINANCE 1.0.0 | Income Management System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../../assets/css/income.css">
</head>
<body class="bg-light">
    <!-- Navigation Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div class="container-fluid">
            <a class="navbar-brand fw-bold" href="index.php"><i class="bi bi-wallet2 me-2"></i>Z-FINANCE 1.0.0</a>
            <span class="badge bg-light text-primary me-3">Income System</span>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item"><a class="nav-link <?= $page=='dashboard'?'active':'' ?>" href="index.php?view=dashboard">Dashboard</a></li>
                    <li class="nav-item"><a class="nav-link <?= $page=='list'?'active':'' ?>" href="index.php?view=list">Income List</a></li>
                    <li class="nav-item"><a class="nav-link <?= $page=='add'?'active':'' ?>" href="index.php?view=add">Add Income</a></li>
                    <li class="nav-item"><a class="nav-link <?= $page=='categories'?'active':'' ?>" href="index.php?view=categories">Categories</a></li>
                    <li class="nav-item"><a class="nav-link <?= $page=='sources'?'active':'' ?>" href="index.php?view=sources">Sources</a></li>
                    <li class="nav-item"><a class="nav-link <?= $page=='recurring'?'active':'' ?>" href="index.php?view=recurring">Recurring</a></li>
                    <li class="nav-item"><a class="nav-link <?= $page=='reports'?'active':'' ?>" href="index.php?view=reports">Reports</a></li>
                    <li class="nav-item"><a class="nav-link <?= $page=='analytics'?'active':'' ?>" href="index.php?view=analytics">Analytics</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Module View Content -->
    <main class="container-fluid py-4">
        <?php
        switch ($page) {
            case 'list':
                include __DIR__ . '/income_list.php';
                break;
            case 'add':
                include __DIR__ . '/add_income.php';
                break;
            case 'categories':
                include __DIR__ . '/income_categories.php';
                break;
            case 'sources':
                include __DIR__ . '/income_sources.php';
                break;
            case 'recurring':
                include __DIR__ . '/recurring_income.php';
                break;
            case 'reports':
                include __DIR__ . '/income_reports.php';
                break;
            case 'analytics':
                include __DIR__ . '/income_analytics.php';
                break;
            case 'dashboard':
            default:
                include __DIR__ . '/income_dashboard.php';
                break;
        }
        ?>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="../../assets/js/income.js"></script>
</body>
</html>
