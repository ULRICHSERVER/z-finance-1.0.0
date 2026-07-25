# Z-FINANCE 1.0.0 — Public Website Architecture Guide

## Overview
The **Z-FINANCE Public Website** is a modern, responsive, SEO-optimized, multilingual, and PWA-ready marketing and documentation portal designed to introduce Z-FINANCE 1.0.0 to prospective clients, enterprise decision-makers, and users.

---

## 🌐 Public Pages Architecture

### 1. Home Page (`/` or `index.php`)
- **Hero Section**: High-converting headline, slogan ("Enterprise Financial Control Without Limits"), animated live statistics, primary CTAs ("Get Started Free", "Watch Demo").
- **Animated Statistics**: Total Transactions Processed, Currency Volume, Active Companies, System Uptime.
- **Features Overview**: Highlighting Income, Expenses, CRM, Services, Projects, Analytics, and Offline Sync.
- **Benefits Section ("Why Choose Z-FINANCE")**: Zero Subscription Lock-in, On-Premise & Cloud Freedom, Instant Offline Sync, Multi-Currency Ledger.
- **Supported Services**: Financial Reporting, Bank Reconciliation, Recurring Billings, Tax Compliance Ready.
- **Testimonials & Partners**: Social proof placeholders with enterprise rating metrics.
- **Pricing Preview**: Quick tier overview (Free, Basic, Professional, Enterprise).
- **FAQ Accordion**: Top questions answered.
- **Latest News**: Integrated blog preview cards.
- **Newsletter Subscription**: Direct AJAX email capture form with validation.
- **Download App CTA**: Direct PWA & Android APK callouts.

### 2. About Us (`about.php`)
- **Company Vision & Mission**: Building accessible, ultra-secure financial infrastructure for global businesses.
- **Core Values**: Data Sovereignty, Transparency, Performance, Security.
- **Leadership & Team**: Team member profiles and advisory board placeholders.
- **Enterprise Milestones**: Interactive timeline from v1.0.0 launch onwards.

### 3. Features Page (`features.php`)
Deep-dive grid with interactive tabs for:
- Income Management & Invoicing
- Expense & Cost Control
- Customer CRM & Receivable Tracking
- Supplier Management & Payables
- Services & Billing Packages
- Project Profitability & Cost Center Tracking
- PDF Financial Reports (Balance Sheets, P&L, Tax Summaries)
- AI-Powered Revenue Analytics
- Offline Sync Engine & PWA Capability
- Multi-Language & Multi-Currency Engine (XAF, USD, EUR, GBP, NGN)
- Advertising Management Suite
- Super Admin Delegation & Audit Logs

### 4. Solutions Page (`solutions.php`)
Tailored enterprise solutions for:
- **SMEs & Small Businesses**: Simplified cashflow control and instant invoicing.
- **Enterprises & Holding Companies**: Multi-branch, multi-currency ledger consolidation.
- **Freelancers & Consultants**: Automated billable hours, recurring retainers, and client portals.
- **Accounting & Advisory Firms**: Multi-tenant client book management and PDF tax exports.
- **E-Commerce & Digital Outlets**: API-driven income webhook sync and automated payment reconciliation.

### 5. Pricing Page (`pricing.php`)
Comparison table and interactive monthly/annual billing toggle:
- **Free Plan**: $0/mo — 1 Company, Up to 100 Income Records/mo, Basic Reports.
- **Basic Plan**: $19/mo — 3 Companies, Multi-Currency, PDF Reports, Offline Sync.
- **Professional Plan**: $49/mo — Unlimited Companies, AI Analytics, Recurring Incomes, Priority Support.
- **Enterprise Plan**: Custom — Custom On-Premise Installation, Dedicated SLA, Custom API Integrations.

### 6. FAQ Page (`faq.php`)
Categorized accordion with search filter:
- General Platform Questions
- Security, Encryption & Data Privacy
- Self-Hosting, Installation & Updates
- Billing, Currencies & Subscriptions
- PWA & Offline Usage

### 7. Blog Module (`blog.php`)
- Featured Articles & Hero Grid
- Category Filters (Financial Management, Tech & Updates, Invoicing Tips, Tax Compliance)
- Tag Clouds & Search Bar
- Reading Time Estimator & Author Badges
- Prepared for Future Headless CMS / Database Integration

### 8. Documentation (`documentation.php`)
- Quickstart Guide
- Server Requirements & Installation Instructions
- API Endpoints Reference
- User & Administrator Manuals
- Troubleshooting & FAQs

### 9. Download Center (`download.php`)
- Progressive Web App (PWA) One-Click Installer
- Desktop Shortcut Manifest Setup Guide
- Android APK Download Link Placeholder
- iOS Web Clip Setup Instructions

### 10. Contact Page (`contact.php`)
- Interactive AJAX Contact Form with Field Validation
- Interactive Google Maps Embed Placeholder
- Office Address, Direct Phone, Email, Working Hours
- Direct FAQ Link & Support Desk Ticket Portal

### 11. Legal Policies
- **Privacy Policy (`privacy.php`)**: GDPR & CCPA compliant data handling disclosures.
- **Terms & Conditions (`terms.php`)**: Usage rights, license scope, liability limitations.
- **Cookie Policy (`cookies.php`)**: LocalStorage, session cookies, and tracking preferences.

### 12. Error & Status Pages
- **404 Page (`404.php`)**: Friendly page not found with quick link search.
- **500 Page (`500.php`)**: Server exception screen with diagnostic retry.
- **Maintenance Page (`maintenance.php`)**: System maintenance countdown window.
- **Offline Page (`offline.php`)**: Custom offline standby screen served by PWA Service Worker.

---

## 🎨 Theme & Styling Architecture
- Built with **Bootstrap 5** & custom CSS utility extensions.
- Supports **Light Mode**, **Dark Mode**, and **Auto-System Detection**.
- Responsive layout adapting seamlessly from 320px mobile devices to 4K desktop screens.

---

## 🌍 Multi-Language Engine
- Ships with **English (EN)** and **French (FR)** translation dictionaries out of the box.
- Dynamic language switcher preserving active route and user preference in `localStorage` and `$_COOKIE['z_lang']`.
- Scalable design allowing addition of extra language JSON/array files without code modification.
