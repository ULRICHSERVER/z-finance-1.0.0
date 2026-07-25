# Z-FINANCE 1.0.0 — Progressive Web App (PWA) Guide

## Overview
Z-FINANCE 1.0.0 is engineered as a **Progressive Web App (PWA)**, enabling native app installation on mobile and desktop devices without requiring app store approvals.

---

## ⚡ PWA Core Capabilities

### 1. One-Click Installation
- **Web App Manifest (`/public/manifest.json`)**: Configures app display name, theme color (`#4f46e5`), background color (`#0f172a`), start URL (`/`), and app icons (192x192 and 512x512).
- **Native Prompt Trigger**: Listens for the browser `beforeinstallprompt` event and presents an interactive "Install Z-FINANCE App" button in the navigation header and footer.

### 2. Service Worker (`sw.js`) & Caching Strategies
- **Cache-First Strategy for Static Assets**: Pre-caches CSS, JavaScript, web fonts, and public image assets.
- **Network-First with Cache Fallback for API & Pages**: Attempts live server fetch; if offline, serves cached response or redirects to `/offline.php` / Offline Page view.

### 3. Offline Experience
- When network disconnects, a top notification banner informs the user ("Offline Mode Active — Changes cached locally").
- The dedicated **Offline Page** allows viewing cached financial data, creating offline records, and syncing automatically upon network restoration.

---

## 📱 Installation Instructions

### Desktop (Chrome, Edge, Brave)
1. Visit the Z-FINANCE public website.
2. Click the **"Install App"** button in the header navigation or address bar.
3. Confirm installation. Z-FINANCE will open in a standalone window with desktop shortcuts.

### Android (Chrome / Firefox)
1. Open Z-FINANCE in mobile browser.
2. Tap the banner **"Install Z-FINANCE App"** or select **"Add to Home Screen"** from browser menu.
3. Launch directly from your Android application drawer.

### iOS (Safari)
1. Open Z-FINANCE in Safari.
2. Tap the **Share** icon (square with arrow).
3. Scroll down and tap **"Add to Home Screen"**.
