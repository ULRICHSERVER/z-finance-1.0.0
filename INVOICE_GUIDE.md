# Z-FINANCE 1.0.0 - Invoicing & Double-Entry Posting Guide

## Invoice Architecture & Accounting Integration

The Invoicing module in Z-FINANCE automatically pushes source transactions into the **Double-Entry General Ledger** upon issuance and payment recording.

---

## Double-Entry Accounting Ledger Postings

### 1. Invoice Issuance Event
When an invoice is issued to a customer for $10,000 + $500 tax:
- **Debit**: Accounts Receivable (`1100`) — **+$10,500.00**
- **Credit**: Sales Revenue (`4010`) — **+$10,500.00**

### 2. Payment Received Event
When a client pays $10,500 via Bank Wire:
- **Debit**: Operating Bank Account (`1010`) — **+$10,500.00**
- **Credit**: Accounts Receivable (`1100`) — **-$10,500.00**

---

## API Usage

### Issue Invoice
`POST /modules/invoices/api/invoices.php`
```json
{
  "customer_name": "Acme Enterprise Global",
  "customer_email": "billing@acmeglobal.com",
  "issue_date": "2026-07-23",
  "due_date": "2026-08-22",
  "items": [
    {
      "item_name": "SaaS Subscription Q3",
      "quantity": 1,
      "unit_price": 10000.00,
      "discount": 0,
      "tax_rate": 5
    }
  ]
}
```

### Record Payment
`POST /modules/invoices/api/invoices.php`
```json
{
  "action": "record_payment",
  "invoice_id": 101,
  "payment_amount": 10500.00,
  "payment_method": "Bank Transfer"
}
```
