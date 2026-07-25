# Z-FINANCE 1.0.0 - Role & Permission Matrix Guide

## Overview
Implements Role-Based Access Control (RBAC) ensuring precise permission boundaries across all platform modules.

## Roles & Matrix
- **Roles**: Super Administrator, Administrator, Manager, Accountant, Employee, Customer Support.
- **Granular Actions**: View, Create, Edit, Delete, Approve, Export, Manage, Configure.
- **REST API Endpoint**:
  - `GET /modules/roles/api/roles.php`
  - `POST /modules/roles/api/roles.php`
