# Z-FINANCE 1.0.0 - Infrastructure & System Health Monitoring Guide

## Overview
Real-time infrastructure monitoring covering CPU utilization, RAM allocation, NVMe disk I/O, database connection pool statistics, queue worker health, and API latency.

## Metrics Monitored
- **CPU & Memory**: Live telemetry updates via HealthMonitor service.
- **Database Connection Pool**: Active/Idle PDO connection telemetry.
- **Cron Workers**: Queue heartbeat checks for automated workflow and email jobs.
