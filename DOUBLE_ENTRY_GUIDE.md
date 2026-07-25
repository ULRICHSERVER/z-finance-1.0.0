# Z-FINANCE 1.0.0 — Double-Entry Bookkeeping Principles Guide

## Core Principle

For every financial transaction in Z-FINANCE:
$$\sum \text{Total Debits} = \sum \text{Total Credits}$$

---

## Debit & Credit Rules Matrix

| Account Type | Debit Action | Credit Action | Normal Balance |
| :--- | :--- | :--- | :--- |
| **Assets** | Increases | Decreases | Debit |
| **Liabilities** | Decreases | Increases | Credit |
| **Equity** | Decreases | Increases | Credit |
| **Revenue** | Decreases | Increases | Credit |
| **COGS / Expenses** | Increases | Decreases | Debit |

---

## Automatic Integration Rules

1. **Income Receipt**: Debit Bank/Cash Account (1010/1020), Credit Revenue Account (4010).
2. **Expense Payment**: Debit Expense Account (6010), Credit Bank/Cash Account (1010/1020).
3. **Accounts Receivable Invoice**: Debit Accounts Receivable (1100), Credit Sales Revenue (4010).
4. **Accounts Payable Vendor Bill**: Debit Expense Account (6010), Credit Accounts Payable (2010).
