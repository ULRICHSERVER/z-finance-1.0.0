# Z-FINANCE 1.0.0 - AI Security & Data Privacy Guide

## Overview
Ensuring privacy, encryption, data governance, and strict access control for artificial intelligence operations within Z-FINANCE.

## Core Security Controls
1. **Server-Side API Proxying**: All AI calls (Google AI / OpenAI) are proxied server-side (`GEMINI_API_KEY` is never exposed to client browsers).
2. **Role-Based AI Permissions**: Granular controls per role (`can_use_chat`, `can_access_financial_ai`, `can_access_hr_ai`, `daily_token_limit`).
3. **Audit Logging**: Every AI prompt, token consumption, latency, and system response is logged in `ai_audit_logs` and `ai_usage_logs`.
4. **Data Isolation**: Strict multi-tenant isolation enforcing `tenant_id` filtering on all vector embeddings and database queries.
