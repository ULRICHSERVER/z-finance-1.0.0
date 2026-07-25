# Z-FINANCE 1.0.0 - Billing & Financial Document System Guide

## Executive Summary
The **Z-FINANCE Billing & Document Transaction System** (Phase 4.5) is an enterprise-grade document creation, tracking, digital signature, and payment processing suite built natively for PHP 8+, PDO, and React.

It seamlessly integrates document lifecycles with the **Double-Entry Accounting Engine** (General Ledger) and **CRM Customer Balances**, ensuring that every financial document issued is auditable, tamper-proof, and synchronized across ledger accounts.

---

## Key Features & Architecture

### 1. Document Lifecycle & Lifecycle Tracking
- **Quotations / Proposals**: Create estimates, track client views, capture digital approvals, and convert to active invoices in 1 click.
- **Invoices**: Standard & Recurring billing with custom tax rules, discount allocations, and automatic Journal Entry posting.
- **Payment Receipts**: Issued automatically upon payment recording, embedded with SHA-256 QR Code authenticity verification.
- **Credit & Debit Notes**: Adjust accounts receivable and clear overpayments or inventory returns.

### 2. Digital Signatures & Security
- **Triple Format Support**: Draw on Canvas, Upload PNG/SVG, or Electronic Verification.
- **SHA-256 Anti-Tamper Verification**: Every signature generates a unique cryptographic hash (`signer | timestamp | document_id`).
- **QR Verification Studio**: Verification interface to validate document authenticity against the tenant's cryptographic ledger.

### 3. Super Admin & Template Control
- **Custom Branding**: Configure logos, primary/secondary brand colors, custom CSS headers/footers, and default terms & conditions.
- **Watermark Engine**: Custom watermark overlays for draft, paid, or cancelled states.

### 4. Offline Support
- Local storage queue (`zfinance_billing_offline_queue`) caches drafts and signatures captured while disconnected.
- Automatic background synchronization upon connection recovery.

---

## Technical Stack & API Endpoints

- **Database**: `/modules/billing/schema.sql`
- **Template Manager**: `/modules/billing/classes/BillingTemplateManager.php`
- **Invoices API**: `/modules/invoices/api/invoices.php`
- **Quotations API**: `/modules/quotations/api/quotations.php`
- **Receipts API**: `/modules/receipts/api/receipts.php`
- **Signatures API**: `/modules/signatures/api/signatures.php`
