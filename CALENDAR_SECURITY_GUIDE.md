# Z-FINANCE 1.0.0 - Calendar & Scheduling Security Guide

## Security & Data Integrity
- **Role-Based Access Control (RBAC)**: Granular permissions for viewing, creating, editing, and managing public vs shared vs private calendars.
- **Data Protection**: Multi-tenant data isolation using `tenant_id` filtering on all PDO queries.
- **Audit Logging**: Automated event creation, modification, and cancellation logging in `calendar_logs`.
