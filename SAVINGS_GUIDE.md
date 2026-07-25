# Z-FINANCE 1.0.0 — Savings Accounts & Reserve Vaults Guide

## Overview

The **Savings Management System** (`/modules/savings/`) manages dedicated high-yield savings accounts, internal liquidity vaults, automated allocations, deposit histories, and withdrawal tracking.

---

## Capabilities

1. **Vault & Account Registry**: Track balances across commercial banks and internal treasury vaults.
2. **Interest Yield Ledger**: Track annual yield rates and recorded interest earnings.
3. **Transaction Ledger**: Maintain strict double-entry ledger for deposits, withdrawals, and interest yield deposits.

---

## Database Tables

1. **`savings_accounts`**: Vault master table storing balances, target goals, interest rates, and statuses.
2. **`savings_transactions`**: Ledger recording deposit, withdrawal, and yield events.

---

## REST API Reference

```http
GET /modules/savings/api/savings.php
```

### Process Deposit or Withdrawal

```http
POST /modules/savings/api/savings.php
Content-Type: application/json

{
  "action": "transaction",
  "account_id": 1,
  "type": "deposit",
  "amount": 5000.00,
  "description": "Monthly surplus transfer to Treasury Vault"
}
```
