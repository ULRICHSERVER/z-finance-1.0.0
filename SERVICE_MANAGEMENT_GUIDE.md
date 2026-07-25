# Service Management Guide - Z-FINANCE 1.0.0

## 1. Executive Summary
The **Z-FINANCE Service Management System** (`modules/services/`) allows individuals, freelancers, SMEs, NGOs, and enterprise organizations to define, categorize, price, market, and analyze unlimited business services.

---

## 2. System Architecture

- **Database Schema**: `modules/services/schema.sql`
- **Core Service Manager**: `modules/services/classes/ServiceManager.php`
- **Category Manager**: `modules/services/classes/ServiceCategoryManager.php`
- **Package Manager**: `modules/services/classes/ServicePackageManager.php`
- **REST APIs**: `modules/services/api/` (`services.php`, `categories.php`, `packages.php`)
- **Frontend Engine**: `src/components/ServiceModule.tsx`
- **Styles & Scripts**: `assets/css/services.css`, `assets/js/services.js`

---

## 3. Key Functionalities

### 3.1 Service Lifecycle & Statuses
- **Active**: Publicly or privately available for bookings/orders.
- **Inactive**: Temporarily disabled.
- **Draft**: Work-in-progress definition.
- **Archived**: Soft-deleted historical record.

### 3.2 Offline Synchronization Engine
When connection drops, operations are stored in `localStorage` queue (`zfinance_services_offline_queue`) and automatically synced when connection resumes.

### 3.3 Security & Multi-Tenant Boundaries
- User isolation via `user_id` filtering on all PDO queries.
- CSRF, XSS, and SQL Injection protection via PDO prepared statements.
