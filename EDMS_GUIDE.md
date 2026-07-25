# Z-FINANCE 1.0.0 - Enterprise Document Management System (EDMS) Guide

## Overview
The Enterprise Document Management System (EDMS) serves as the central, unified file repository for Z-FINANCE 1.0.0. Every module across the platform—CRM, Suppliers, Projects, Tasks, Accounting, Billing, Calendar, Communication, and AdSuite—automatically routes file attachments, contracts, reports, and digital assets into this central repository.

## Key Features
- **Global Repositories**: Private, Business, Workspace, Shared Libraries, Archive, and Recycle Bin.
- **Nested Repositories & Folder Trees**: Unlimited parent-child folder structures with custom colors and descriptions.
- **Cross-Module Linking**: Connect files directly to Projects, Customers, Invoices, Receipts, Expenses, Employees, and Calendar Events.
- **Supported File Formats**: PDF, Word (DOCX/DOC), Excel (XLSX/CSV), PowerPoint, Images (PNG/JPG/SVG), Audio, Video, ZIP/RAR, SQL DB Backups, and Code files.
- **REST API Endpoint**: `GET /modules/documents/api/documents.php?action=get_documents`
