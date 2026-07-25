# Z-FINANCE 1.0.0 - REST API Architecture Guide

## Overview
Z-FINANCE provides an enterprise-grade REST API (`/api/v1/`) supporting JSON request/response formats, JWT Bearer authentication, and Granular Role-Based Access Controls (RBAC).

## Base Endpoint
`https://api.zfinance.enterprise/api/v1/`

## Core Resources
- `/api/v1/invoices` - Billing & Invoicing Management
- `/api/v1/expenses` - Enterprise Expense Tracking
- `/api/v1/customers` - CRM & Customer Data Sync
- `/api/v1/inventory` - Multi-Warehouse Stock Management
- `/api/v1/pos` - Omnichannel Retail POS Transactions
- `/api/v1/payments/momo` - Mobile Money Disbursements & Collections
