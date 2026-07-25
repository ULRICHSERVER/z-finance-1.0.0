# Z-FINANCE 1.0.0 - Purchase Order & 3-Way Matching Guide

## Overview
Purchase Orders in Z-FINANCE are immutable digital contracts signed using cryptographic SHA-256 signatures.

## Key Workflows
- **Creation**: Generated directly from approved RFQs or manual requisitions.
- **Digital Signature**: Embedded tamper-proof hash linking tenant ID, PO number, and timestamp.
- **3-Way Matching**: Automated reconciliation comparing PO line items, GRN quantities, and Supplier Invoices. Discrepancies exceeding 0.5% automatically trigger compliance holds.
