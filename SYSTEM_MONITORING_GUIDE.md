# System Monitoring & Diagnostics Guide - Z-FINANCE 1.0.0

## 1. Overview
The **System Monitoring Engine** provides Super Administrators with operational visibility into container health, MySQL performance, memory allocation, active user sessions, and security event logs.

---

## 2. Key Monitoring Metrics

1. **System Health Status**: Evaluates runtime availability (`OPTIMAL`, `DEGRADED`, `CRITICAL`).
2. **Uptime Guarantee**: Measured SLA uptime percentage (Target: 99.98%).
3. **Database Size (MB)**: Total disk allocation used by InnoDB tables and indexes.
4. **Active Sessions**: Monitored count of unexpired device session tokens in `user_devices`.
5. **Memory & CPU Utilization**: Tracked PHP memory allocation and container CPU load averages.

---

## 3. Real-Time Diagnostics API
`GET /modules/super_admin/api/system.php?action=health`

```json
{
  "status": "success",
  "health": {
    "database": "ONLINE",
    "redis_cache": "ONLINE",
    "pwa_service_worker": "ACTIVE (v1.0.4)",
    "mail_queue": "IDLE (0 pending)",
    "ai_service": "ONLINE (Gemini Flash 1.5)",
    "disk_free_gb": 75.9,
    "server_load": "0.14, 0.08, 0.02"
  }
}
```
