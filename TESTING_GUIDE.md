# Z-FINANCE 1.0.0 - Testing Guide

## Overview
Instructions for executing unit, integration, security, load/stress, and offline synchronization tests.

## Test Execution
- **Full Test Suite**: Execute `php tests/TestSuite.php` or run via DevOps Module UI.
- **Unit Tests**: Coverage for accounting math, double-entry balance validation, and currency conversions.
- **Security Tests**: Automated penetration checks for SQL injection, XSS, CSRF, and SOC2 access controls.
- **Stress Tests**: Simulated 10,000 concurrent API requests with response time < 50ms requirement.
