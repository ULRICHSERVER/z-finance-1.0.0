# Z-FINANCE 1.0.0 - Multi-Tenant Data Isolation & Workspace Guide

## Overview
Detailed guide on tenant isolation strategies, database query scoping, shared database vs. isolated schema options, and multi-branch workspace isolation.

## Isolation Levels
- **Level 1 (Tenant ID Scoping)**: Automatic row-level PDO binding on all queries.
- **Level 2 (Workspace & Branch Isolation)**: Fine-grained user role permissions restricted by active branch context.
- **Level 3 (Storage Vault)**: Separate cloud storage bucket paths per tenant UUID.
