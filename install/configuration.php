<?php
if (!defined('Z_INSTALLER')) die('Direct access not permitted.');

session_start();

$appName = $_POST['app_name'] ?? 'Z-FINANCE';
$companyName = $_POST['company_name'] ?? 'Z-Enterprise Corp';
$defaultLang = $_POST['default_lang'] ?? 'en';
$defaultCurrency = $_POST['default_currency'] ?? 'XAF';
$timezone = $_POST['timezone'] ?? 'Africa/Douala';
$dateFormat = $_POST['date_format'] ?? 'Y-m-d';
$numberFormat = $_POST['number_format'] ?? '1,000.00';
$appEmail = $_POST['app_email'] ?? 'admin@zfinance.io';
$appPhone = $_POST['app_phone'] ?? '+237 600 000 000';
$appCountry = $_POST['app_country'] ?? 'Cameroon';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $_SESSION['app_config'] = [
        'app_name' => $appName,
        'company_name' => $companyName,
        'default_lang' => $defaultLang,
        'default_currency' => $defaultCurrency,
        'timezone' => $timezone,
        'date_format' => $dateFormat,
        'number_format' => $numberFormat,
        'app_email' => $appEmail,
        'app_phone' => $appPhone,
        'app_country' => $appCountry
    ];

    header("Location: index.php?step=7");
    exit;
}
?>

<div>
    <h4 class="fw-bold text-slate-900 mb-2">Step 6: Application & Company Configuration</h4>
    <p class="text-muted small mb-4">Configure your organization details, default operational currency, timezone, and regional format preferences.</p>

    <form method="POST" action="index.php?step=6">
        <div class="row g-3">
            <div class="col-md-6">
                <label class="form-label font-bold text-dark small">Application Name</label>
                <input type="text" name="app_name" value="<?php echo htmlspecialchars($appName); ?>" class="form-control" required>
            </div>

            <div class="col-md-6">
                <label class="form-label font-bold text-dark small">Company / Organization Name</label>
                <input type="text" name="company_name" value="<?php echo htmlspecialchars($companyName); ?>" class="form-control" required>
            </div>

            <div class="col-md-4">
                <label class="form-label font-bold text-dark small">Default System Language</label>
                <select name="default_lang" class="form-select">
                    <option value="en" <?php echo $defaultLang === 'en' ? 'selected' : ''; ?>>English (US/UK)</option>
                    <option value="fr" <?php echo $defaultLang === 'fr' ? 'selected' : ''; ?>>Français (French)</option>
                </select>
            </div>

            <div class="col-md-4">
                <label class="form-label font-bold text-dark small">Base Operating Currency</label>
                <select name="default_currency" class="form-select font-mono">
                    <option value="XAF" <?php echo $defaultCurrency === 'XAF' ? 'selected' : ''; ?>>XAF (FCFA Central Africa)</option>
                    <option value="USD" <?php echo $defaultCurrency === 'USD' ? 'selected' : ''; ?>>USD ($ US Dollar)</option>
                    <option value="EUR" <?php echo $defaultCurrency === 'EUR' ? 'selected' : ''; ?>>EUR (€ Euro)</option>
                    <option value="GBP" <?php echo $defaultCurrency === 'GBP' ? 'selected' : ''; ?>>GBP (£ British Pound)</option>
                    <option value="NGN" <?php echo $defaultCurrency === 'NGN' ? 'selected' : ''; ?>>NGN (₦ Nigerian Naira)</option>
                </select>
            </div>

            <div class="col-md-4">
                <label class="form-label font-bold text-dark small">Timezone</label>
                <select name="timezone" class="form-select font-mono">
                    <option value="Africa/Douala" <?php echo $timezone === 'Africa/Douala' ? 'selected' : ''; ?>>Africa/Douala (GMT+1)</option>
                    <option value="Africa/Lagos" <?php echo $timezone === 'Africa/Lagos' ? 'selected' : ''; ?>>Africa/Lagos (GMT+1)</option>
                    <option value="Europe/Paris" <?php echo $timezone === 'Europe/Paris' ? 'selected' : ''; ?>>Europe/Paris (GMT+1)</option>
                    <option value="UTC" <?php echo $timezone === 'UTC' ? 'selected' : ''; ?>>UTC (Coordinated Universal Time)</option>
                </select>
            </div>

            <div class="col-md-4">
                <label class="form-label font-bold text-dark small">Date Format</label>
                <select name="date_format" class="form-select font-mono">
                    <option value="Y-m-d">YYYY-MM-DD (2026-07-22)</option>
                    <option value="d/m/Y">DD/MM/YYYY (22/07/2026)</option>
                    <option value="m/d/Y">MM/DD/YYYY (07/22/2026)</option>
                </select>
            </div>

            <div class="col-md-4">
                <label class="form-label font-bold text-dark small">Number Format</label>
                <select name="number_format" class="form-select font-mono">
                    <option value="1,000.00">1,000.00 (Standard)</option>
                    <option value="1 000,00">1 000,00 (French/European)</option>
                </select>
            </div>

            <div class="col-md-4">
                <label class="form-label font-bold text-dark small">Country</label>
                <input type="text" name="app_country" value="<?php echo htmlspecialchars($appCountry); ?>" class="form-control" required>
            </div>

            <div class="col-md-6">
                <label class="form-label font-bold text-dark small">Official Email Address</label>
                <input type="email" name="app_email" value="<?php echo htmlspecialchars($appEmail); ?>" class="form-control" required>
            </div>

            <div class="col-md-6">
                <label class="form-label font-bold text-dark small">Contact Phone Number</label>
                <input type="text" name="app_phone" value="<?php echo htmlspecialchars($appPhone); ?>" class="form-control" required>
            </div>
        </div>

        <div class="mt-4 pt-3 border-top text-end">
            <button type="submit" class="btn btn-indigo px-4 fw-bold">
                Save & Setup Super Admin &rarr;
            </button>
        </div>
    </form>
</div>
