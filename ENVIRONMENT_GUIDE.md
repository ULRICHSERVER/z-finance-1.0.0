# Z-FINANCE 1.0.0 - Environment Configuration (.env) Reference

Z-FINANCE 1.0.0 relies on a root `.env` configuration file automatically created during installation.

---

## Sample `.env` Structure

```env
# Z-FINANCE 1.0.0 Environment Configuration
APP_NAME="Z-FINANCE"
APP_ENV=production
APP_KEY=base64:eXlvdXJfc2VjdXJlX2Jhc2U2NF9yYW5kb21fa2V5
APP_DEBUG=false
APP_URL="http://localhost:3000"
APP_TIMEZONE="Africa/Douala"
APP_LANG="en"
APP_CURRENCY="XAF"

# Database Credentials
DB_HOST="127.0.0.1"
DB_PORT=3306
DB_DATABASE="zfinance_db"
DB_USERNAME="root"
DB_PASSWORD="your_secure_password"
DB_PREFIX="zf_"

# Security & Session
CSRF_SECRET=a1b2c3d4e5f67890123456789abcdef0
ENCRYPTION_KEY=9876543210fedcba0987654321fedcba
SESSION_DRIVER=file
SESSION_LIFETIME=120
```

---

## Parameter Descriptions

| Key | Description | Default / Example |
| :--- | :--- | :--- |
| `APP_NAME` | Display name of the financial portal | `"Z-FINANCE"` |
| `APP_ENV` | Environment mode (`production` or `local`) | `production` |
| `APP_KEY` | 32-byte Base64 key for password & session encryption | `base64:...` |
| `APP_DEBUG` | Display detailed stack trace errors (`true` / `false`) | `false` |
| `APP_TIMEZONE` | PHP default timezone | `Africa/Douala` |
| `APP_CURRENCY` | Base financial accounting currency | `XAF` |
| `DB_HOST` | MySQL database host or socket path | `127.0.0.1` |
| `DB_PORT` | MySQL connection port | `3306` |
| `DB_DATABASE` | MySQL database name | `zfinance_db` |
| `DB_USERNAME` | MySQL database user | `root` |
| `DB_PASSWORD` | MySQL database password | `secret` |
| `DB_PREFIX` | Prefix for database table names | `zf_` |
| `CSRF_SECRET` | Secret token for cross-site request forgery prevention | `32-char hex` |
| `ENCRYPTION_KEY` | Key for AES-256 binary data encryption | `64-char hex` |
