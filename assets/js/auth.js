/**
 * Z-FINANCE 1.0.0 - Modular Authentication Suite JavaScript
 * Handles AJAX requests, Bootstrap Modals, offline detection, CSRF management,
 * and live password strength analysis.
 */

class ZFinanceAuthEngine {
    constructor() {
        this.csrfToken = '';
        this.isOnline = navigator.onLine;
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkNetworkState();
        this.initPasswordStrengthMeter();
        this.initShowPasswordToggle();
    }

    bindEvents() {
        // Network state listeners
        window.addEventListener('online', () => this.handleNetworkChange(true));
        window.addEventListener('offline', () => this.handleNetworkChange(false));

        // Form submissions
        this.attachFormHandler('loginForm', '/modules/auth/api/login.php', 'loginAlert', 'btnLoginSubmit');
        this.attachFormHandler('registerForm', '/modules/auth/api/register.php', 'registerAlert', 'btnRegisterSubmit');
        this.attachFormHandler('forgotPasswordForm', '/modules/auth/api/forgot_password.php', 'forgotAlert', 'btnForgotSubmit');
        this.attachFormHandler('resetPasswordForm', '/modules/auth/api/reset_password.php', 'resetAlert', 'btnResetSubmit');
        this.attachFormHandler('verifyEmailForm', '/modules/auth/api/verify_email.php', 'verifyAlert', 'btnVerifySubmit');
        this.attachFormHandler('resendVerificationForm', '/modules/auth/api/resend_verification.php', 'resendAlert', 'btnResendSubmit');
        this.attachFormHandler('phoneVerifyForm', '/modules/auth/api/verify_phone.php', 'phoneAlert', 'btnPhoneVerifySubmit');
    }

    checkNetworkState() {
        if (!this.isOnline) {
            this.showOfflineAlert();
        }
    }

    handleNetworkChange(online) {
        this.isOnline = online;
        if (!online) {
            this.showOfflineAlert();
        } else {
            this.removeOfflineAlert();
            this.showAlert('loginAlert', 'info', '<i class="bi bi-wifi me-2"></i>Network connection restored.');
        }
    }

    showOfflineAlert() {
        if (document.getElementById('authOfflineNotice')) return;

        const banner = document.createElement('div');
        banner.id = 'authOfflineNotice';
        banner.className = 'alert alert-warning alert-dismissible auth-offline-banner border-0 show';
        banner.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi bi-wifi-off fs-3 me-3 text-warning"></i>
                <div>
                    <strong class="d-block">Authentication Offline</strong>
                    <span class="small">Authentication actions require an active internet connection.</span>
                </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        document.body.appendChild(banner);
    }

    removeOfflineAlert() {
        const notice = document.getElementById('authOfflineNotice');
        if (notice) notice.remove();
    }

    initPasswordStrengthMeter() {
        const passwordInput = document.getElementById('regPassword');
        if (!passwordInput) return;

        passwordInput.addEventListener('input', (e) => {
            const val = e.target.value;
            const res = this.calculatePasswordStrength(val);

            const bar = document.getElementById('regPasswordStrengthBar');
            const label = document.getElementById('regPasswordStrengthLabel');

            if (bar && label) {
                bar.style.width = `${res.score}%`;
                bar.className = 'progress-bar ' + res.className;
                label.innerText = `Password strength: ${res.label}`;
                label.style.color = res.color;
            }
        });
    }

    calculatePasswordStrength(password) {
        if (!password) return { score: 0, label: 'None', className: '', color: '#6c757d' };

        let score = 0;
        if (password.length >= 8) score += 20;
        if (password.length >= 12) score += 20;
        if (password.length >= 16) score += 10;
        if (/[a-z]/.test(password)) score += 10;
        if (/[A-Z]/.test(password)) score += 15;
        if (/[0-9]/.test(password)) score += 15;
        if (/[^a-zA-Z0-9]/.test(password)) score += 10;

        score = Math.min(100, score);

        if (score >= 80) return { score, label: 'Very Strong', className: 'password-vstrong', color: '#198754' };
        if (score >= 60) return { score, label: 'Strong', className: 'password-strong', color: '#20c997' };
        if (score >= 40) return { score, label: 'Fair', className: 'password-fair', color: '#ffc107' };
        return { score, label: 'Weak', className: 'password-weak', color: '#dc3545' };
    }

    initShowPasswordToggle() {
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.getAttribute('data-target');
                const input = document.getElementById(targetId);
                const icon = btn.querySelector('i');

                if (input) {
                    if (input.type === 'password') {
                        input.type = 'text';
                        if (icon) icon.className = 'bi bi-eye-slash';
                    } else {
                        input.type = 'password';
                        if (icon) icon.className = 'bi bi-eye';
                    }
                }
            });
        });
    }

    attachFormHandler(formId, endpointUrl, alertBoxId, submitBtnId) {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!this.isOnline) {
                this.showAlert(alertBoxId, 'warning', '<i class="bi bi-exclamation-triangle me-2"></i>You are currently offline. Authentication actions require a network connection.');
                return;
            }

            const submitBtn = document.getElementById(submitBtnId);
            const spinner = submitBtn ? submitBtn.querySelector('.spinner-border') : null;

            if (submitBtn) submitBtn.disabled = true;
            if (spinner) spinner.classList.remove('d-none');

            const formData = new FormData(form);
            const jsonObj = {};
            formData.forEach((value, key) => { jsonObj[key] = value; });

            try {
                const response = await fetch(endpointUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(jsonObj)
                });

                const res = await response.json();

                if (res.success) {
                    this.showAlert(alertBoxId, 'success', res.message);
                    if (res.verification_token) {
                        this.showAlert(alertBoxId, 'info', `<strong>Demo Code:</strong> ${res.verification_token}`);
                    }
                    if (formId === 'loginForm') {
                        setTimeout(() => window.location.reload(), 1500);
                    }
                } else {
                    let errMsg = res.message || 'An unexpected error occurred.';
                    if (res.errors) {
                        errMsg += '<ul class="mb-0 mt-2 ps-3">' + Object.values(res.errors).map(e => `<li>${e}</li>`).join('') + '</ul>';
                    }
                    this.showAlert(alertBoxId, 'danger', errMsg);
                }
            } catch (err) {
                this.showAlert(alertBoxId, 'danger', 'Network request failed. Please verify server connection.');
            } finally {
                if (submitBtn) submitBtn.disabled = false;
                if (spinner) spinner.classList.add('d-none');
            }
        });
    }

    showAlert(alertBoxId, type, message) {
        const box = document.getElementById(alertBoxId);
        if (!box) return;
        box.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show border-0" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }
}

// Instantiate on DOM content load
document.addEventListener('DOMContentLoaded', () => {
    window.zFinanceAuth = new ZFinanceAuthEngine();
});
