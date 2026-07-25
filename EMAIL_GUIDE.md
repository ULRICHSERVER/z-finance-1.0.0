# Z-FINANCE 1.0.0 - Email Engine Guide

## Overview
The Email Management module handles transactional email dispatch, SMTP configuration, queued delivery background workers, and email templates.

## Key Features
- **SMTP Gateway**: Configurable host, port (587/465), user, password, and SSL/TLS encryption.
- **Email Queue**: Async email queue processor to prevent browser request blocking.
- **Email Templates**: HTML templates for Welcome Messages, Registration Confirmation, Invoice Alerts, Payment Confirmations, and Security Warnings.
