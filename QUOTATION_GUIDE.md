# Z-FINANCE 1.0.0 - Quotations & Proposals Guide

## Quotations & Estimates Lifecycle

1. **Draft / Creation**: Create commercial proposals with line items, custom terms, discounts, and expiration dates.
2. **Client Sign-off**: Collect digital signature from client via canvas pad or electronic approval.
3. **Automated Conversion**: 1-click conversion from accepted Quotation directly into a live Invoice, preserving all items, pricing, and tax structures.

---

## API Usage

### Convert Quotation to Invoice
`POST /modules/quotations/api/quotations.php`
```json
{
  "action": "convert_to_invoice",
  "quotation_id": 201
}
```
