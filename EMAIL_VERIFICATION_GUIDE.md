# ✉️ Z-FINANCE 1.0.0 — Email Verification Guide

This document outlines the token generation, email dispatch, token validation, and account activation workflow in Z-FINANCE.

---

## 🔁 Verification Workflow

1. **Token Generation on Registration**:
   When a user registers, `Auth::register()` creates a cryptographically secure 64-character token via `bin2hex(random_bytes(32))`.
2. **Token Hash Storage (`auth_tokens`)**:
   The SHA-256 hash of the token (`hash('sha256', $token)`) is stored in `auth_tokens` with `token_type = 'email_verify'` and `expires_at = +24 hours`.
3. **HTML Email Dispatch**:
   `Mailer::sendVerificationEmail()` formats the message using `modules/auth/emails/email_verification.html` and dispatches it to the user.
4. **Token Verification**:
   The user clicks the link or enters the token into the **Email Verification Modal**.
   `Auth::verifyEmail($token)` verifies:
   - Token hash exists in database.
   - Token has not been used (`used_at IS NULL`).
   - Token has not expired (`expires_at > NOW()`).
5. **Account Status Transition**:
   Upon verification, the user's status transitions from `email_verification_pending` to `active`, `email_verified_at` is stamped, and the token is marked as used.
6. **Resend Verification**:
   Users can request a new link at any time via the **Resend Verification Modal**. Stale unexpired tokens are automatically invalidated.
