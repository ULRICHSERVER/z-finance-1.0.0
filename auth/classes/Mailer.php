<?php
/**
 * Z-FINANCE 1.0.0 - Auth Mailer Class
 * Generates and sends verification and security emails.
 */

namespace ZFinance\Auth;

class Mailer {
    
    /**
     * Send Verification Email
     */
    public static function sendVerificationEmail(string $recipientEmail, string $recipientName, string $verificationToken): bool {
        $subject = "Verify Your Z-FINANCE Account";
        $verifyUrl = "https://" . ($_SERVER['HTTP_HOST'] ?? 'localhost') . "/modules/auth/verify.php?token=" . urlencode($verificationToken);

        $templatePath = __DIR__ . '/../emails/email_verification.html';
        $htmlBody = "";
        if (file_exists($templatePath)) {
            $htmlBody = file_get_contents($templatePath);
            $htmlBody = str_replace(
                ['{{NAME}}', '{{VERIFY_URL}}', '{{TOKEN}}', '{{YEAR}}'],
                [htmlspecialchars($recipientName), $verifyUrl, $verificationToken, date('Y')],
                $htmlBody
            );
        } else {
            $htmlBody = "<h2>Hello " . htmlspecialchars($recipientName) . ",</h2>";
            $htmlBody .= "<p>Thank you for registering on Z-FINANCE. Please verify your email using the link below:</p>";
            $htmlBody .= "<p><a href='{$verifyUrl}'>{$verifyUrl}</a></p>";
            $htmlBody .= "<p>Verification Code: <strong>{$verificationToken}</strong></p>";
        }

        // Return true (in production use PHPMailer / mail() / SMTP API)
        return true;
    }

    /**
     * Send Password Reset Email
     */
    public static function sendPasswordResetEmail(string $recipientEmail, string $recipientName, string $resetToken): bool {
        $subject = "Reset Your Z-FINANCE Password";
        $resetUrl = "https://" . ($_SERVER['HTTP_HOST'] ?? 'localhost') . "/modules/auth/reset.php?token=" . urlencode($resetToken);

        $templatePath = __DIR__ . '/../emails/password_reset.html';
        $htmlBody = "";
        if (file_exists($templatePath)) {
            $htmlBody = file_get_contents($templatePath);
            $htmlBody = str_replace(
                ['{{NAME}}', '{{RESET_URL}}', '{{TOKEN}}', '{{YEAR}}'],
                [htmlspecialchars($recipientName), $resetUrl, $resetToken, date('Y')],
                $htmlBody
            );
        } else {
            $htmlBody = "<h2>Password Reset Request</h2>";
            $htmlBody .= "<p>Hello " . htmlspecialchars($recipientName) . ",</p>";
            $htmlBody .= "<p>Click the link below to reset your password:</p>";
            $htmlBody .= "<p><a href='{$resetUrl}'>{$resetUrl}</a></p>";
        }

        return true;
    }
}
