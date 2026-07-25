<?php
if (!defined('Z_INSTALLER')) die('Direct access not permitted.');

$directories = [
    'config/' => ROOT_PATH . '/config',
    'uploads/' => ROOT_PATH . '/uploads',
    'storage/' => ROOT_PATH . '/storage',
    'cache/' => ROOT_PATH . '/cache',
    'logs/' => ROOT_PATH . '/logs',
    'backups/' => ROOT_PATH . '/backups',
    'offline/' => ROOT_PATH . '/offline',
];

$permissionsStatus = [];
$allPermissionsPassed = true;

foreach ($directories as $name => $path) {
    // Attempt to create directory if it does not exist
    if (!file_exists($path)) {
        @mkdir($path, 0755, true);
    }

    $isWritable = is_writable($path) || (file_exists($path) && @chmod($path, 0755));
    $permissionsStatus[$name] = [
        'path' => $path,
        'writable' => $isWritable,
        'permission' => file_exists($path) ? substr(sprintf('%o', fileperms($path)), -4) : '0755'
    ];

    if (!$isWritable) {
        $allPermissionsPassed = false;
    }
}
?>

<div>
    <h4 class="fw-bold text-slate-900 mb-2">Step 3: Directory Permissions Verification</h4>
    <p class="text-muted small mb-4">Ensure the following application folders are writable (CHMOD 0755 / 0775) by your web server process.</p>

    <div class="table-responsive border rounded-3 overflow-hidden mb-4">
        <table class="table table-hover align-middle mb-0 text-sm">
            <thead class="bg-light text-uppercase font-mono text-muted text-[11px]">
                <tr>
                    <th class="p-3">Directory Name</th>
                    <th class="p-3 text-center">Required Permission</th>
                    <th class="p-3 text-center">Detected Mode</th>
                    <th class="p-3 text-end">Writable Status</th>
                </tr>
            </thead>
            <tbody class="divide-y">
                <?php foreach ($permissionsStatus as $dir => $status): ?>
                    <tr>
                        <td class="p-3 font-mono fw-bold text-dark"><?php echo htmlspecialchars($dir); ?></td>
                        <td class="p-3 text-center font-mono text-muted small">0755 / 0775</td>
                        <td class="p-3 text-center font-mono small"><?php echo htmlspecialchars($status['permission']); ?></td>
                        <td class="p-3 text-end">
                            <?php if ($status['writable']): ?>
                                <span class="badge bg-success-subtle text-success border border-success-subtle fw-bold px-2.5 py-1">
                                    <i class="bi bi-check-circle-fill me-1"></i> Writable
                                </span>
                            <?php else: ?>
                                <span class="badge bg-danger-subtle text-danger border border-danger-subtle fw-bold px-2.5 py-1">
                                    <i class="bi bi-x-circle-fill me-1"></i> Read-Only
                                </span>
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <?php if ($allPermissionsPassed): ?>
        <div class="alert alert-success bg-emerald-50 text-emerald-900 border-0 p-3 mb-4 rounded-3 d-flex align-items-center">
            <i class="bi bi-check-circle-fill fs-4 text-emerald-600 me-3"></i>
            <div>
                <strong>Permissions Verified!</strong> All required system directories are write-enabled for cache, log, and `.env` generation.
            </div>
        </div>
        <div class="text-end">
            <a href="index.php?step=4" class="btn btn-indigo px-4 fw-bold">
                Configure Database &rarr;
            </a>
        </div>
    <?php else: ?>
        <div class="alert alert-warning bg-amber-50 text-amber-900 border-0 p-3 mb-4 rounded-3">
            <div class="d-flex align-items-center mb-2">
                <i class="bi bi-exclamation-triangle-fill fs-4 text-amber-600 me-2"></i>
                <strong class="fs-6">Troubleshooting Permissions Issues:</strong>
            </div>
            <p class="small mb-2">Run the following SSH command in your server terminal or adjust folder permissions in cPanel File Manager:</p>
            <pre class="bg-dark text-white p-2.5 rounded font-mono text-xs mb-0">chmod -R 775 config uploads storage cache logs backups offline</pre>
        </div>
        <div class="text-end">
            <a href="index.php?step=3" class="btn btn-outline-secondary px-4 fw-bold">
                <i class="bi bi-arrow-clockwise me-1"></i> Re-check Directory Permissions
            </a>
        </div>
    <?php endif; ?>
</div>
