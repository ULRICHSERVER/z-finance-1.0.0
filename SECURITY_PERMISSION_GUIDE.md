# Z-FINANCE 1.0.0 - Security & Permission Enforcement Guide

## Overview
Guarantees data isolation, activity log auditing, CSRF/XSS protection, and RBAC middleware checks.

## Security Policies
- **Data Isolation**: Strict multi-tenant filtering using `tenant_id`.
- **Activity Logging**: Automated tracking of employee logins, record creation, modifications, and deletions in `employee_activity_logs`.
