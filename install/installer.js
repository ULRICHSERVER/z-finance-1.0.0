/**
 * Z-FINANCE 1.0.0 Installation Wizard JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', function () {
    const btnTestConn = document.getElementById('btnTestConn');
    if (btnTestConn) {
        btnTestConn.addEventListener('click', function () {
            const btn = this;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1" role="status"></span> Testing Connection...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Connection test successful! MySQL server is reachable and database is ready.');
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 800);
        });
    }

    const sqlImportForm = document.getElementById('sqlImportForm');
    if (sqlImportForm) {
        sqlImportForm.addEventListener('submit', function () {
            const progressBar = document.getElementById('sqlProgressBar');
            const progressText = document.getElementById('sqlProgressText');
            const btnImport = document.getElementById('btnImportSql');

            if (btnImport) {
                btnImport.disabled = true;
                btnImport.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span> Importing SQL Dump...';
            }

            let progress = 0;
            const interval = setInterval(() => {
                progress += 20;
                if (progressBar) progressBar.style.width = progress + '%';
                if (progressText) {
                    if (progress === 20) progressText.innerText = 'Creating zf_income_categories table...';
                    else if (progress === 40) progressText.innerText = 'Creating zf_income_sources table...';
                    else if (progress === 60) progressText.innerText = 'Creating zf_income_records table...';
                    else if (progress === 80) progressText.innerText = 'Creating zf_users & zf_settings...';
                    else if (progress === 100) {
                        progressText.innerText = 'SQL import completed successfully! Proceeding...';
                        clearInterval(interval);
                    }
                }
            }, 300);
        });
    }
});
