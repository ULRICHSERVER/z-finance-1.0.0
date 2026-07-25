<!-- =============================================================================
  Z-FINANCE 1.0.0 - AUTHENTICATION BOOTSTRAP 5 MODALS VIEW
============================================================================= -->

<!-- 1. LOGIN MODAL -->
<div class="modal fade auth-modal" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-0 shadow-lg">
      <div class="modal-header border-0 pb-0">
        <h5 class="modal-title fw-bold" id="loginModalLabel">
          <i class="bi bi-shield-lock me-2 text-primary"></i>Sign In to Z-FINANCE
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-4">
        <div id="loginAlert"></div>
        
        <form id="loginForm" novalidate>
          <input type="hidden" name="csrf_token" class="csrf-field" value="">

          <div class="mb-3">
            <label for="loginIdentifier" class="form-label text-muted small fw-semibold">Username, Email, or Phone Number</label>
            <div class="input-group">
              <span class="input-group-text bg-light border-end-0"><i class="bi bi-person"></i></span>
              <input type="text" class="form-control border-start-0" id="loginIdentifier" name="login_identifier" placeholder="e.g. admin@zfinance.com or +1234567890" required>
            </div>
          </div>

          <div class="mb-3">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <label for="loginPassword" class="form-label text-muted small fw-semibold mb-0">Password</label>
              <a href="#" class="text-decoration-none small" data-bs-toggle="modal" data-bs-target="#forgotPasswordModal">Forgot Password?</a>
            </div>
            <div class="input-group">
              <span class="input-group-text bg-light border-end-0"><i class="bi bi-key"></i></span>
              <input type="password" class="form-control border-start-0 border-end-0" id="loginPassword" name="password" placeholder="Enter your password" required>
              <button class="btn btn-outline-secondary toggle-password" type="button" data-target="loginPassword">
                <i class="bi bi-eye"></i>
              </button>
            </div>
          </div>

          <!-- CAPTCHA Architecture (Future Ready) -->
          <div class="mb-3 p-2 bg-light rounded border d-flex align-items-center justify-content-between text-muted small">
            <div><i class="bi bi-shield-check me-1 text-success"></i> ReCAPTCHA v3 Protection Active</div>
            <span class="badge bg-secondary">Verified</span>
          </div>

          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="rememberMe" name="remember_me" value="1">
            <label class="form-check-label small" for="rememberMe">Remember me on this device (30 days)</label>
          </div>

          <button type="submit" class="btn btn-primary w-100 py-2 fw-semibold d-flex align-items-center justify-content-center" id="btnLoginSubmit">
            <span class="spinner-border spinner-border-sm me-2 d-none" role="status" aria-hidden="true"></span>
            <span>Sign In</span>
          </button>
        </form>
      </div>
      <div class="modal-footer bg-light border-0 justify-content-center py-3">
        <span class="small text-muted">Don't have an account?</span>
        <a href="#" class="small fw-bold text-decoration-none ms-1" data-bs-toggle="modal" data-bs-target="#registerModal">Create an Account</a>
      </div>
    </div>
  </div>
</div>

<!-- 2. REGISTER MODAL -->
<div class="modal fade auth-modal" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content border-0 shadow-lg">
      <div class="modal-header border-0 pb-0">
        <h5 class="modal-title fw-bold" id="registerModalLabel">
          <i class="bi bi-person-plus me-2 text-primary"></i>Create Z-FINANCE Account
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-4">
        <div id="registerAlert"></div>

        <form id="registerForm" novalidate>
          <input type="hidden" name="csrf_token" class="csrf-field" value="">

          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label for="regFirstName" class="form-label text-muted small fw-semibold">First Name *</label>
              <input type="text" class="form-control" id="regFirstName" name="first_name" placeholder="John" required>
            </div>
            <div class="col-md-6">
              <label for="regLastName" class="form-label text-muted small fw-semibold">Last Name *</label>
              <input type="text" class="form-control" id="regLastName" name="last_name" placeholder="Doe" required>
            </div>
          </div>

          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label for="regUsername" class="form-label text-muted small fw-semibold">Username *</label>
              <input type="text" class="form-control" id="regUsername" name="username" placeholder="johndoe88" required>
            </div>
            <div class="col-md-6">
              <label for="regEmail" class="form-label text-muted small fw-semibold">Email Address *</label>
              <input type="email" class="form-control" id="regEmail" name="email" placeholder="john.doe@company.com" required>
            </div>
          </div>

          <div class="mb-3">
            <label for="regPhone" class="form-label text-muted small fw-semibold">Phone Number (Optional)</label>
            <input type="tel" class="form-control" id="regPhone" name="phone" placeholder="+1 (555) 000-1234">
          </div>

          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label for="regPassword" class="form-label text-muted small fw-semibold">Password *</label>
              <div class="input-group">
                <input type="password" class="form-control" id="regPassword" name="password" placeholder="At least 8 chars" required>
                <button class="btn btn-outline-secondary toggle-password" type="button" data-target="regPassword"><i class="bi bi-eye"></i></button>
              </div>
              <!-- Password Strength Meter -->
              <div class="progress mt-2" style="height: 6px;">
                <div class="progress-bar" id="regPasswordStrengthBar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <small class="form-text text-muted" id="regPasswordStrengthLabel">Password strength: None</small>
            </div>

            <div class="col-md-6">
              <label for="regConfirmPassword" class="form-label text-muted small fw-semibold">Confirm Password *</label>
              <div class="input-group">
                <input type="password" class="form-control" id="regConfirmPassword" name="confirm_password" placeholder="Re-enter password" required>
                <button class="btn btn-outline-secondary toggle-password" type="button" data-target="regConfirmPassword"><i class="bi bi-eye"></i></button>
              </div>
            </div>
          </div>

          <div class="row g-3 mb-3">
            <div class="col-md-4">
              <label for="regLanguage" class="form-label text-muted small fw-semibold">Language</label>
              <select class="form-select" id="regLanguage" name="language">
                <option value="en" selected>English (EN)</option>
                <option value="fr">Français (FR)</option>
              </select>
            </div>
            <div class="col-md-4">
              <label for="regTimezone" class="form-label text-muted small fw-semibold">Timezone</label>
              <select class="form-select" id="regTimezone" name="timezone">
                <option value="UTC" selected>UTC</option>
                <option value="America/New_York">New York (EST)</option>
                <option value="Europe/Paris">Paris (CET)</option>
              </select>
            </div>
            <div class="col-md-4">
              <label for="regCurrency" class="form-label text-muted small fw-semibold">Currency</label>
              <select class="form-select" id="regCurrency" name="currency">
                <option value="USD" selected>USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD ($)</option>
              </select>
            </div>
          </div>

          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="regAcceptTerms" name="accept_terms" value="1" required>
            <label class="form-check-label small" for="regAcceptTerms">
              I agree to the <a href="/website/terms.php" target="_blank">Terms & Conditions</a> and <a href="/website/privacy.php" target="_blank">Privacy Policy</a> *
            </label>
          </div>

          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="regNewsletter" name="newsletter" value="1" checked>
            <label class="form-check-label small text-muted" for="regNewsletter">
              Send me monthly financial insights and system security updates
            </label>
          </div>

          <button type="submit" class="btn btn-primary w-100 py-2 fw-semibold d-flex align-items-center justify-content-center" id="btnRegisterSubmit">
            <span class="spinner-border spinner-border-sm me-2 d-none" role="status" aria-hidden="true"></span>
            <span>Complete Registration</span>
          </button>
        </form>
      </div>
      <div class="modal-footer bg-light border-0 justify-content-center py-3">
        <span class="small text-muted">Already registered?</span>
        <a href="#" class="small fw-bold text-decoration-none ms-1" data-bs-toggle="modal" data-bs-target="#loginModal">Sign In Here</a>
      </div>
    </div>
  </div>
</div>

<!-- 3. FORGOT PASSWORD MODAL -->
<div class="modal fade auth-modal" id="forgotPasswordModal" tabindex="-1" aria-labelledby="forgotPasswordModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-0 shadow-lg">
      <div class="modal-header border-0 pb-0">
        <h5 class="modal-title fw-bold" id="forgotPasswordModalLabel">
          <i class="bi bi-arrow-counterclockwise me-2 text-warning"></i>Reset Password
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-4">
        <p class="small text-muted mb-3">
          Enter your account email address below. We will send you a secure link and code to reset your password.
        </p>
        <div id="forgotAlert"></div>

        <form id="forgotPasswordForm" novalidate>
          <input type="hidden" name="csrf_token" class="csrf-field" value="">

          <div class="mb-3">
            <label for="forgotEmail" class="form-label text-muted small fw-semibold">Email Address</label>
            <input type="email" class="form-control" id="forgotEmail" name="email" placeholder="your.email@company.com" required>
          </div>

          <button type="submit" class="btn btn-warning w-100 py-2 fw-semibold text-dark d-flex align-items-center justify-content-center" id="btnForgotSubmit">
            <span class="spinner-border spinner-border-sm me-2 d-none" role="status" aria-hidden="true"></span>
            <span>Send Reset Instructions</span>
          </button>
        </form>
      </div>
      <div class="modal-footer bg-light border-0 justify-content-between py-3">
        <a href="#" class="small text-decoration-none" data-bs-toggle="modal" data-bs-target="#loginModal"><i class="bi bi-arrow-left me-1"></i>Back to Sign In</a>
        <a href="#" class="small text-decoration-none" data-bs-toggle="modal" data-bs-target="#resendVerificationModal">Need email verification?</a>
      </div>
    </div>
  </div>
</div>

<!-- 4. RESET PASSWORD MODAL -->
<div class="modal fade auth-modal" id="resetPasswordModal" tabindex="-1" aria-labelledby="resetPasswordModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-0 shadow-lg">
      <div class="modal-header border-0 pb-0">
        <h5 class="modal-title fw-bold" id="resetPasswordModalLabel">
          <i class="bi bi-lock me-2 text-danger"></i>Set New Password
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-4">
        <div id="resetAlert"></div>

        <form id="resetPasswordForm" novalidate>
          <input type="hidden" name="csrf_token" class="csrf-field" value="">

          <div class="mb-3">
            <label for="resetTokenInput" class="form-label text-muted small fw-semibold">Reset Token / Security Code</label>
            <input type="text" class="form-control font-monospace" id="resetTokenInput" name="token" placeholder="Paste token from email" required>
          </div>

          <div class="mb-3">
            <label for="newPassword" class="form-label text-muted small fw-semibold">New Password</label>
            <div class="input-group">
              <input type="password" class="form-control" id="newPassword" name="new_password" placeholder="At least 8 chars" required>
              <button class="btn btn-outline-secondary toggle-password" type="button" data-target="newPassword"><i class="bi bi-eye"></i></button>
            </div>
          </div>

          <div class="mb-3">
            <label for="confirmNewPassword" class="form-label text-muted small fw-semibold">Confirm New Password</label>
            <div class="input-group">
              <input type="password" class="form-control" id="confirmNewPassword" name="confirm_new_password" placeholder="Re-enter new password" required>
              <button class="btn btn-outline-secondary toggle-password" type="button" data-target="confirmNewPassword"><i class="bi bi-eye"></i></button>
            </div>
          </div>

          <button type="submit" class="btn btn-danger w-100 py-2 fw-semibold d-flex align-items-center justify-content-center" id="btnResetSubmit">
            <span class="spinner-border spinner-border-sm me-2 d-none" role="status" aria-hidden="true"></span>
            <span>Update Password</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- 5. EMAIL VERIFICATION MODAL -->
<div class="modal fade auth-modal" id="emailVerifyModal" tabindex="-1" aria-labelledby="emailVerifyModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-0 shadow-lg">
      <div class="modal-header border-0 pb-0">
        <h5 class="modal-title fw-bold" id="emailVerifyModalLabel">
          <i class="bi bi-envelope-check me-2 text-success"></i>Email Address Verification
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-4">
        <div id="verifyAlert"></div>

        <form id="verifyEmailForm" novalidate>
          <input type="hidden" name="csrf_token" class="csrf-field" value="">

          <div class="mb-3">
            <label for="verifyTokenInput" class="form-label text-muted small fw-semibold">Verification Code / Token</label>
            <input type="text" class="form-control font-monospace" id="verifyTokenInput" name="token" placeholder="Enter token from email" required>
          </div>

          <button type="submit" class="btn btn-success w-100 py-2 fw-semibold d-flex align-items-center justify-content-center" id="btnVerifySubmit">
            <span class="spinner-border spinner-border-sm me-2 d-none" role="status" aria-hidden="true"></span>
            <span>Verify & Activate Account</span>
          </button>
        </form>
      </div>
      <div class="modal-footer bg-light border-0 justify-content-center py-3">
        <span class="small text-muted">Didn't receive code?</span>
        <a href="#" class="small fw-bold text-decoration-none ms-1" data-bs-toggle="modal" data-bs-target="#resendVerificationModal">Resend Verification Email</a>
      </div>
    </div>
  </div>
</div>

<!-- 6. RESEND VERIFICATION MODAL -->
<div class="modal fade auth-modal" id="resendVerificationModal" tabindex="-1" aria-labelledby="resendVerificationModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-0 shadow-lg">
      <div class="modal-header border-0 pb-0">
        <h5 class="modal-title fw-bold" id="resendVerificationModalLabel">
          <i class="bi bi-send me-2 text-info"></i>Resend Email Verification
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-4">
        <div id="resendAlert"></div>

        <form id="resendVerificationForm" novalidate>
          <input type="hidden" name="csrf_token" class="csrf-field" value="">

          <div class="mb-3">
            <label for="resendEmailInput" class="form-label text-muted small fw-semibold">Registered Email Address</label>
            <input type="email" class="form-control" id="resendEmailInput" name="email" placeholder="your.email@company.com" required>
          </div>

          <button type="submit" class="btn btn-info text-white w-100 py-2 fw-semibold d-flex align-items-center justify-content-center" id="btnResendSubmit">
            <span class="spinner-border spinner-border-sm me-2 d-none" role="status" aria-hidden="true"></span>
            <span>Resend Verification Link</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- 7. PHONE VERIFICATION MODAL (Future Ready) -->
<div class="modal fade auth-modal" id="phoneVerifyModal" tabindex="-1" aria-labelledby="phoneVerifyModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-0 shadow-lg">
      <div class="modal-header border-0 pb-0">
        <h5 class="modal-title fw-bold" id="phoneVerifyModalLabel">
          <i class="bi bi-phone me-2 text-primary"></i>Phone SMS Verification
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-4">
        <p class="small text-muted">Enter the 6-digit SMS code sent to your registered phone number.</p>
        <div id="phoneAlert"></div>

        <form id="phoneVerifyForm" novalidate>
          <input type="hidden" name="csrf_token" class="csrf-field" value="">

          <div class="mb-3">
            <label for="smsCodeInput" class="form-label text-muted small fw-semibold">6-Digit Code</label>
            <input type="text" class="form-control text-center font-monospace fs-4 tracking-widest" id="smsCodeInput" name="sms_code" maxlength="6" placeholder="123456" required>
          </div>

          <button type="submit" class="btn btn-primary w-100 py-2 fw-semibold" id="btnPhoneVerifySubmit">Verify Phone Number</button>
        </form>
      </div>
    </div>
  </div>
</div>
