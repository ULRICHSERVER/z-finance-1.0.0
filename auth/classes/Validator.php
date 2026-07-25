<?php
/**
 * Z-FINANCE 1.0.0 - Authentication Validator Class
 * Validates registration data, credentials, token parameters, and email formats.
 */

namespace ZFinance\Auth;

class Validator {
    
    /**
     * Validate User Registration Fields
     */
    public static function validateRegistration(array $data): array {
        $errors = [];

        // First Name
        if (empty($data['first_name'])) {
            $errors['first_name'] = 'First name is required.';
        } elseif (strlen($data['first_name']) < 2 || strlen($data['first_name']) > 50) {
            $errors['first_name'] = 'First name must be between 2 and 50 characters.';
        }

        // Last Name
        if (empty($data['last_name'])) {
            $errors['last_name'] = 'Last name is required.';
        } elseif (strlen($data['last_name']) < 2 || strlen($data['last_name']) > 50) {
            $errors['last_name'] = 'Last name must be between 2 and 50 characters.';
        }

        // Username
        if (empty($data['username'])) {
            $errors['username'] = 'Username is required.';
        } elseif (!preg_match('/^[a-zA-Z0-9_]{3,30}$/', $data['username'])) {
            $errors['username'] = 'Username must be 3-30 characters (letters, numbers, underscores only).';
        }

        // Email
        if (empty($data['email'])) {
            $errors['email'] = 'Email address is required.';
        } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Please enter a valid email address.';
        }

        // Phone (optional or validated format)
        if (!empty($data['phone'])) {
            if (!preg_match('/^\+?[0-9\s\-()]{7,20}$/', $data['phone'])) {
                $errors['phone'] = 'Please enter a valid phone number format.';
            }
        }

        // Password
        if (empty($data['password'])) {
            $errors['password'] = 'Password is required.';
        } else {
            $strength = Security::checkPasswordStrength($data['password']);
            if (!$strength['is_valid']) {
                $errors['password'] = 'Password must be at least 8 characters long and contain uppercase and numbers.';
            }
        }

        // Confirm Password
        if (empty($data['confirm_password'])) {
            $errors['confirm_password'] = 'Password confirmation is required.';
        } elseif ($data['password'] !== $data['confirm_password']) {
            $errors['confirm_password'] = 'Password confirmation does not match.';
        }

        // Accept Terms
        if (empty($data['accept_terms'])) {
            $errors['accept_terms'] = 'You must accept the Terms and Conditions to register.';
        }

        return [
            'is_valid' => empty($errors),
            'errors' => $errors
        ];
    }

    /**
     * Validate Login Input
     */
    public static function validateLogin(array $data): array {
        $errors = [];

        if (empty($data['login_identifier'])) {
            $errors['login_identifier'] = 'Username, email, or phone number is required.';
        }

        if (empty($data['password'])) {
            $errors['password'] = 'Password is required.';
        }

        return [
            'is_valid' => empty($errors),
            'errors' => $errors
        ];
    }
}
