# Super Administrator Control Center Guide - Z-FINANCE 1.0.0

## 1. Executive Summary
The **Z-FINANCE Super Administrator Control Center** (`/modules/super_admin/`) serves as the central command node for platform governance, infrastructure configuration, module lifecycle management, security monitoring, and payment gateway configuration.

---

## 2. Core Control Center Architecture

- **Database Schema**: `modules/super_admin/schema.sql`
- **Core Manager Class**: `modules/super_admin/classes/SuperAdminManager.php`
- **Module Manager Class**: `modules/super_admin/classes/ModuleManager.php`
- **Advertisement Suite Manager**: `modules/super_admin/classes/AdManager.php`
- **Disaster Recovery Manager**: `modules/super_admin/classes/SystemBackupManager.php`
- **REST APIs**: `modules/super_admin/api/` (`settings.php`, `modules.php`, `ads.php`, `backups.php`, `system.php`)
- **Frontend Hub**: `src/components/SuperAdminModule.tsx`

---

## 3. Sub-System Control Centers

### 3.1 Platform Health & Infrastructure Dashboard
- Real-time system gauges: Uptime percentage (99.98%), Database Size (MB), Active Device Sessions, Memory/CPU load metrics.
- Environment inspector: PHP runtime details, MySQL engine version, server software, max execution constraints.

### 3.2 Global System Settings Engine
- Branding & Identity: Application Name, Company Name, Support Email, Contact Phone.
- Localization & Regional Formatting: Timezones, Default Base Currency, Default Language.
- Security & Maintenance Mode: Global session timeout, max failed login attempts, maintenance mode IP whitelist.

### 3.3 Dynamic Module Manager
- Core vs. Extension Isolation: Safeguards core modules (Auth, RBAC, User Management, Super Admin) against accidental deactivation.
- Feature Modules: Enable or disable feature extensions (Income Engine, Ad Suite) with instant runtime state propagation.

### 3.4 Advertisement Suite & Target Engine
- Campaign Controls: Create, edit, pause, and resume promotional campaigns across platform locations (Sidebar, Top Banner, Footer, Modal Popups).
- Granular Targeting Engine: Target ads based on User Role, Subscription Tier (Starter, Professional, Enterprise), Location/Country, or Device Type.
- Impressions & Click Analytics: Real-time counter tracking CTR performance.

### 3.5 Payment Gateway Integrations
- Gateway Matrix: Configurable support for MTN Mobile Money, Orange Money, PayUnit, Flutterwave, Paystack, Stripe, and PayPal.
- Sandbox & Live Modes: Test credentials and webhook secrets management.

### 3.6 Disaster Recovery & Database Backups
- Database Dumps: Generate full SQL database dumps or schema-only SQL files on demand.
- One-Click Restoration: Revert database state to verified backup snapshots.

---

## 4. REST API Endpoint Reference

| Endpoint | Method | Action |
| :--- | :--- | :--- |
| `modules/super_admin/api/system.php?action=stats` | `GET` | Fetch platform health and infrastructure metrics |
| `modules/super_admin/api/settings.php?action=update` | `POST` | Update global platform settings |
| `modules/super_admin/api/modules.php?action=toggle` | `POST` | Enable or disable a system module |
| `modules/super_admin/api/ads.php?action=save` | `POST` | Save ad campaign or targeting parameters |
| `modules/super_admin/api/backups.php?action=create` | `POST` | Trigger database dump generation |
