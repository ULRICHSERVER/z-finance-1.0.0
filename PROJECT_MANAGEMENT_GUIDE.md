# Z-FINANCE 1.0.0 - Project Management Guide

## Overview
The Project Management system in Z-FINANCE 1.0.0 tracks end-to-end project lifecycles, budgets, deadlines, and financial performance.

## Core Features
- **Project Reference & Metadata**: Auto-generated project refs (`PRJ-YYYYMMDD-XXXX`), Project Name, Description, Manager, Workspaces, Business Profiles.
- **Project Types**: Personal, Business, Client, Internal, Training, Construction, IT, Research, and Custom Project Types.
- **Statuses**: Draft, Planning, Active, On Hold, Completed, Cancelled, Archived.
- **Priorities**: Low, Medium, High, Urgent, Critical.
- **Financial Integrations**: Links projects with Customers, Services, Income, Expenses, Invoices, and General Ledger Accounting.

## REST API Endpoint
`GET /modules/projects/api/projects.php?action=list`
`POST /modules/projects/api/projects.php`
