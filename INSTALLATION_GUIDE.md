# Z-FINANCE 1.0.0 - Installation Guide

## Overview
This guide provides complete instructions for installing Z-FINANCE 1.0.0 on local, staging, or production web servers.

## System Prerequisites
- **PHP**: 8.1 or higher (PDO, pdo_mysql, mbstring, openssl, gd, curl, redis extensions enabled).
- **Database**: MySQL 8.0+ or MariaDB 10.5+.
- **Web Server**: Apache, Nginx, or LiteSpeed with URL rewriting support.
- **Cache**: Redis 6.0+ (optional but recommended for high-volume enterprise concurrency).

## Installation Steps
1. **Extract Archive**: Unpack Z-FINANCE source archive into web root (e.g. `/var/www/html/zfinance`).
2. **Directory Permissions**: Ensure `storage/`, `storage/logs/`, and `storage/backups/` directories are writable (`chmod -R 775 storage`).
3. **Run Interactive Installer**: Navigate browser to `https://your-domain.com/install/index.php`.
4. **Environment Check**: The installer verifies PHP extensions, folder permissions, and MySQL connection parameters.
5. **Database Provisioning**: Schema tables (148 tables) will be automatically initialized.
6. **Super Admin Setup**: Create the primary Super Administrator account.
