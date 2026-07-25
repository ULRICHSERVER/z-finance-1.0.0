# Z-FINANCE 1.0.0 — Expense Approval Workflow Guide

## Overview

The **Approval Workflow Engine** ensures financial compliance, budget adherence, and governance across organizational hierarchy.

---

## Approval Lifecycle & Statuses

1. **Draft**: Expense entry saved locally by employee/user before formal submission.
2. **Pending Approval**: Submitted to manager/approver queue for compliance verification.
3. **Approved**: Verified by authorized role. Approved funds released for disbursement or reimbursement.
4. **Rejected**: Declined with mandatory reviewer feedback/comments.
5. **Revision Requested**: Returned to requestor for additional receipts, invoices, or clarification.

---

## REST API Integration

Updating approval status programmatically:

```http
POST /modules/expenses/api/approvals.php
Content-Type: application/json

{
  "expense_id": 4,
  "action": "approved",
  "approver_id": 1,
  "comments": "Verified receipt INV-TM-4412 against Q3 hardware budget."
}
```
