# Z-FINANCE 1.0.0 - Queue System & Worker Architecture Guide

## Overview
High-throughput background job processing with concurrency limits, retry policies, and dead letter queue tracking.

## Architecture
- **Job Tables**: `job_queue` and `failed_jobs`.
- **Worker Configuration**: Configurable `max_concurrent_jobs` (default 10) and `retry_delay_seconds` (default 60).
- **Dead Letter Queue**: Holds persistently failing executions for manual Super Admin review and force execution.
