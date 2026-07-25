# Z-FINANCE 1.0.0 - License Key & Offline Verification Guide

## Overview
Technical documentation for Z-FINANCE cryptographic license generation, device fingerprint registration, offline HMAC SHA-256 signature validation, and commercial seat limits.

## Key Verification
- **Online Verification**: REST API validation against central `/api/v1/licenses/verify` gateway.
- **Offline Signature Validation**: Cryptographic signature checks using local salt and machine fingerprint without requiring continuous internet connectivity.
