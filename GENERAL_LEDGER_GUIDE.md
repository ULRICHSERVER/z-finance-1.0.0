# Z-FINANCE 1.0.0 — General Ledger Guide

## Overview

The **General Ledger** (`general_ledger` table) records every posted debit and credit line item alongside historical running balances per account code.

---

## Key Functions

- **Account Ledger Querying**: Retrieve chronological debit/credit line items per account.
- **Running Balance Calculation**: Dynamically updates account balances upon journal posting.
- **Trial Balance Verification**: Audits whether total debits across all accounts equal total credits.
- **Financial Statement Extraction**: Powers Balance Sheet, Income Statement (P&L), and Cash Flow Statements.
