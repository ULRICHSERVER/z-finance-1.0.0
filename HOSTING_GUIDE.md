# Z-FINANCE 1.0.0 - Web Hosting & Web Server Configuration Guide

This guide provides explicit web server configuration instructions for **Apache**, **Nginx**, and **cPanel Shared Hosting**.

---

## 1. Apache Configuration (.htaccess)

Create or verify the root `.htaccess` file:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Force HTTPS (Optional but Recommended)
    # RewriteCond %{HTTPS} off
    # RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

    # Handle Front Controller
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>

# Security Headers & File Protection
<FilesMatch "^\.env|installed\.lock">
    Order allow,deny
    Deny from all
</FilesMatch>

# Disable Directory Browsing
Options -Indexes
```

---

## 2. Nginx Server Block Configuration

For Virtual Private Servers (VPS) running Nginx + PHP-FPM 8.2:

```nginx
server {
    listen 80;
    server_name zfinance.yourdomain.com;
    root /var/www/html/zfinance;
    index index.php index.html;

    charset utf-8;

    # Security: Protect sensitive files
    location ~ /\.(env|git|lock) {
        deny all;
        return 404;
    }

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires max;
        log_not_found off;
    }
}
```

---

## 3. cPanel Shared Hosting Setup

1. **Upload Files**: Upload the ZIP archive to `public_html/zfinance` or the document root and extract.
2. **PHP Selector**: In cPanel, navigate to **Select PHP Version** and choose **PHP 8.2** or **PHP 8.3**.
3. **Enable PHP Extensions**: Check the boxes for `pdo_mysql`, `fileinfo`, `gd`, `mbstring`, `zip`, and `curl`.
4. **Create Database**: Go to **MySQL Database Wizard**, create a database (e.g. `cpaneluser_zfinance`), a DB user, and grant **ALL PRIVILEGES**.
5. **Run Installer**: Open `http://yourdomain.com/install/` and follow the on-screen steps.
