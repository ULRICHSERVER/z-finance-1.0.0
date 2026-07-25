# Z-FINANCE 1.0.0 - Payment Receipts & Notes Guide

## Receipt Generation & QR Authenticity

Every recorded payment automatically issues an official **Payment Receipt** (`RCT-...`).

### QR Code Cryptographic Verification
Each receipt features a SHA-256 hash calculated from:
`ReceiptNumber | InvoiceID | PaymentAmount | PaymentDate`

This hash can be scanned or entered into the **QR Document Verification Studio** in Z-FINANCE to verify document authenticity.
