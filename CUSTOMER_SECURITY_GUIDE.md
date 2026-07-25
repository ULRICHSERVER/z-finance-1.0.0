# Customer Security Guide - Z-FINANCE 1.0.0

## 1. Multi-Tenant Data Isolation
Every customer record is strictly bounded by `user_id = :user_id` on all SQL PDO prepared statements.

---

## 2. Protection Mechanisms
- **SQL Injection**: Complete parameterization via PDO bindings.
- **XSS Protection**: HTML encoding on all output fields.
- **CSRF Protection**: Tokens enforced on POST/PUT/DELETE API operations.
- **Secure File Uploads**: Extension whitelist and MIME validation for customer document attachments.
