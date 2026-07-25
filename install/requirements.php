<?php
if (!defined('Z_INSTALLER')) die('Direct access not permitted.');

// Requirements verification definitions
$requirements = [
    'php_version' => [
        'name' => 'PHP Version (8.1+ Required)',
        'current' => PHP_VERSION,
        'pass' => version_compare(PHP_VERSION, '8.1.0', '>='),
        'required' => '8.1.0 or higher'
    ],
    'pdo' => [
        'name' => 'PDO Extension',
        'current' => extension_loaded('pdo') ? 'Enabled' : 'Disabled',
        'pass' => extension_loaded('pdo'),
        'required' => 'Enabled'
    ],
    'pdo_mysql' => [
        'name' => 'MySQL PDO Driver (pdo_mysql)',
        'current' => extension_loaded('pdo_mysql') ? 'Enabled' : 'Disabled',
        'pass' => extension_loaded('pdo_mysql'),
        'required' => 'Enabled'
    ],
    'json' => [
        'name' => 'JSON Extension',
        'current' => extension_loaded('json') ? 'Enabled' : 'Disabled',
        'pass' => extension_loaded('json'),
        'required' => 'Enabled'
    ],
    'openssl' => [
        'name' => 'OpenSSL Extension',
        'current' => extension_loaded('openssl') ? 'Enabled' : 'Disabled',
        'pass' => extension_loaded('openssl'),
        'required' => 'Enabled'
    ],
    'mbstring' => [
        'name' => 'Mbstring Extension',
        'current' => extension_loaded('mbstring') ? 'Enabled' : 'Disabled',
        'pass' => extension_loaded('mbstring'),
        'required' => 'Enabled'
    ],
    'fileinfo' => [
        'name' => 'FileInfo Extension',
        'current' => extension_loaded('fileinfo') ? 'Enabled' : 'Disabled',
        'pass' => extension_loaded('fileinfo'),
        'required' => 'Enabled'
    ],
    'gd' => [
        'name' => 'GD Image Library',
        'current' => extension_loaded('gd') ? 'Enabled' : 'Disabled',
        'pass' => extension_loaded('gd'),
        'required' => 'Enabled'
    ],
    'zip' => [
        'name' => 'ZIP Extension',
        'current' => extension_loaded('zip') ? 'Enabled' : 'Disabled',
        'pass' => extension_loaded('zip'),
        'required' => 'Enabled'
    ],
    'curl' => [
        'name' => 'cURL Extension',
        'current' => extension_loaded('curl') ? 'Enabled' : 'Disabled',
        'pass' => extension_loaded('curl'),
        'required' => 'Enabled'
    ],
    'disk_space' => [
        'name' => 'Available Disk Space',
        'current' => function_exists('disk_free_space') ? round(disk_free_space(__DIR__) / (1024 * 1024)) . ' MB' : 'Sufficient',
        'pass' => function_exists('disk_free_space') ? disk_free_space(__DIR__) > (50 * 1024 * 1024) : true,
        'required' => 'Min 50 MB'
    ]
];

$allPassed = true;
foreach ($requirements as $req) {
    if (!$req['pass']) {
        $allPassed = false;
        break;
    }
}
?>

<div>
    <h4 class="fw-bold text-slate-900 mb-2">Step 2: System Requirements Verification</h4>
    <p class="text-muted small mb-4">The installer is automatically checking your server environment to ensure complete compatibility with Z-FINANCE 1.0.0.</p>

    <div class="table-responsive border rounded-3 overflow-hidden mb-4">
        <table class="table table-hover align-middle mb-0 text-sm">
            <thead class="bg-light text-uppercase font-mono text-muted text-[11px]">
                <tr>
                    <th class="p-3">Requirement</th>
                    <th class="p-3 text-center">Required State</th>
                    <th class="p-3 text-center">Detected Value</th>
                    <th class="p-3 text-end">Status</th>
                </tr>
            </thead>
            <tbody class="divide-y">
                <?php foreach ($requirements as $key => $item): ?>
                    <tr>
                        <td class="p-3 fw-semibold text-dark"><?php echo htmlspecialchars($item['name']); ?></td>
                        <td class="p-3 text-center font-mono text-muted small"><?php echo htmlspecialchars($item['required']); ?></td>
                        <td class="p-3 text-center font-mono small"><?php echo htmlspecialchars($item['current']); ?></td>
                        <td class="p-3 text-end">
                            <?php if ($item['pass']): ?>
                                <span class="badge bg-success-subtle text-success border border-success-subtle fw-bold px-2.5 py-1">
                                    <i class="bi bi-check-circle-fill me-1"></i> PASS
                                </span>
                            <?php else: ?>
                                <span class="badge bg-danger-subtle text-danger border border-danger-subtle fw-bold px-2.5 py-1">
                                    <i class="bi bi-x-circle-fill me-1"></i> FAIL
                                </span>
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <?php if ($allPassed): ?>
        <div class="alert alert-success bg-emerald-50 text-emerald-900 border-0 p-3 mb-4 rounded-3 d-flex align-items-center">
            <i class="bi bi-shield-check fs-4 text-emerald-600 me-3"></i>
            <div>
                <strong>System Requirements Passed!</strong> Your server fully satisfies all prerequisites for running Z-FINANCE 1.0.0.
            </div>
        </div>
        <div class="text-end">
            <a href="index.php?step=3" class="btn btn-indigo px-4 fw-bold">
                Check Permissions &rarr;
            </a>
        </div>
    <?php else: ?>
        <div class="alert alert-danger bg-rose-50 text-rose-900 border-0 p-3 mb-4 rounded-3 d-flex align-items-center">
            <i class="bi bi-exclamation-triangle-fill fs-4 text-rose-600 me-3"></i>
            <div>
                <strong>Requirements Unmet:</strong> Please enable missing PHP extensions or upgrade your PHP version before continuing.
            </div>
        </div>
        <div class="text-end">
            <a href="index.php?step=2" class="btn btn-outline-secondary px-4 fw-bold">
                <i class="bi bi-arrow-clockwise me-1"></i> Re-check Requirements
            </a>
        </div>
    <?php endif; ?>
</div>
