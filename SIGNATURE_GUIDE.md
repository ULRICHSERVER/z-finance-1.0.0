# Z-FINANCE 1.0.0 - Digital Signature & Verification Guide

## Digital Signatures Architecture

Z-FINANCE supports digital signature capture across financial documents (Quotations, Invoices, Receipts).

### Supported Signature Formats
1. **Interactive Draw**: Freehand signature captured on canvas.
2. **Uploaded Image**: PNG/SVG signature file with background transparency.
3. **Electronic Sign-Off**: Verification using logged IP, timestamp, and user credentials.

### Cryptographic Verification
Signatures generate a unique SHA-256 hash stored in `document_signatures.verification_hash`. Any modification invalidates the verification.
