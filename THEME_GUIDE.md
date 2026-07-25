# Z-FINANCE 1.0.0 — Theme & Styling Guide

## Overview
Z-FINANCE 1.0.0 features a modern visual design system based on **Bootstrap 5** and **Tailwind CSS utility classes**, featuring seamless Light, Dark, and Automatic Theme modes.

---

## 🎨 Theme Modes

1. **Light Mode**: Clean, high-contrast light slate canvas (`#f8fafc`) with indigo primary accents (`#4f46e5`) and emerald status indicators (`#10b981`).
2. **Dark Mode**: Eye-friendly twilight canvas (`#0f172a`) with slate panel backgrounds (`#1e293b`), crisp typography, and glowing borders.
3. **Auto Mode**: Uses browser `prefers-color-scheme: dark` media query to synchronize automatically with device OS theme settings.

---

## 🛠 Persistence & Implementation

- Theme state is stored in `localStorage.setItem('z_theme', 'light' | 'dark' | 'auto')`.
- On initial DOM load, an inline script applies the `dark` class to `document.documentElement` to prevent visual flicker (FOUT).
- The dynamic **Theme Switcher** component allows toggling between Light, Dark, and System Auto settings at any time with smooth CSS transitions.
