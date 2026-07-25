# Z-FINANCE 1.0.0 - Post-Installation First Setup Guide

After completing the installation wizard, follow these steps to perform initial setup and validation of your Z-FINANCE portal.

---

## 1. Initial Login
1. Navigate to `http://your-domain.com/` (or `http://localhost:3000`).
2. Log in using the **Super Admin** credentials configured in Step 7.

---

## 2. Verify System Health & Core PHP Status
1. Navigate to **PHP & SQL Core** from the left navigation sidebar.
2. Verify:
   - PHP Version (8.2+ verified)
   - PDO Driver Status (`pdo_mysql` active)
   - Database Connection Status (`connected`)
   - `.env` status (`found & readable`)
   - `installed.lock` status (`active`)

---

## 3. Customize Income Categories & Revenue Streams
1. Go to **Categories** in the navigation menu.
2. Review seeded categories (Software Development, Cloud Hosting, Retainers, Advisory, SaaS).
3. Add any specific custom revenue categories for your enterprise.

---

## 4. Test Multi-Currency Income Recording
1. Click **Add New Income** in the header or dashboard.
2. Select currency (XAF, USD, EUR, GBP, NGN).
3. Confirm that the system automatically calculates the base currency (`base_amount`) in XAF.

---

## 5. Security Maintenance
- Keep the installer lock file `install/installed.lock` intact.
- Ensure `APP_DEBUG=false` in production.
- Backup `Z-FINANCE.sql` and uploaded documents regularly via the **Financial Reports** tab.
