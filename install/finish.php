<?php
/**
 * Z-FINANCE 1.0.0 Installation Completed Screen
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Z-FINANCE 1.0.0 - Installation Successful</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="installer.css">
</head>
<body class="bg-slate-900 text-slate-800 py-5">

<div class="container max-w-2xl">
    <div class="card shadow-lg border-0 rounded-4 overflow-hidden text-center p-5">
        <div class="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle p-3 mx-auto mb-3 shadow" style="width: 72px; height: 72px;">
            <i class="bi bi-check-lg fs-1"></i>
        </div>

        <h2 class="fw-bold text-slate-900 mb-2">Installation Completed Successfully!</h2>
        <p class="text-muted leading-relaxed max-w-lg mx-auto mb-4">
            Z-FINANCE 1.0.0 has been configured and deployed on your server. Your <code>.env</code> file has been generated and the installer is now locked.
        </p>

        <div class="alert alert-success bg-emerald-50 text-emerald-900 border-0 p-3 mb-4 rounded-3 text-start small">
            <div class="fw-bold mb-1"><i class="bi bi-lock-fill me-1"></i> Security Lock Active:</div>
            The lock file <code>install/installed.lock</code> was created to prevent unauthorized re-installation attempts.
        </div>

        <div class="p-3 bg-light rounded-3 text-start mb-4 border font-mono text-xs">
            <div class="fw-bold text-dark mb-2">Deployment Status Summary:</div>
            <div class="d-flex justify-content-between py-1 border-bottom">
                <span>Database Engine:</span>
                <span class="fw-bold text-indigo-600">PDO MySQL (utf8mb4)</span>
            </div>
            <div class="d-flex justify-content-between py-1 border-bottom">
                <span>Environment File:</span>
                <span class="fw-bold text-emerald-600">.env Generated & Saved</span>
            </div>
            <div class="d-flex justify-content-between py-1">
                <span>Super Admin Account:</span>
                <span class="fw-bold text-indigo-600">Created & Argon2id Hashed</span>
            </div>
        </div>

        <div>
            <a href="../index.php" class="btn btn-indigo btn-lg px-5 fw-bold shadow">
                Launch Z-FINANCE Application &rarr;
            </a>
        </div>
    </div>
</div>

</body>
</html>
