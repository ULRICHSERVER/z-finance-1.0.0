# Z-FINANCE 1.0.0 — Bank & Cash Reconciliation Guide

## Overview

The **Reconciliation Manager** (`/modules/accounting/classes/ReconciliationManager.php`) automates bank statement vs general ledger cash balance verification.

---

## Reconciliation Workflow

1. **Input Bank Statement Ending Balance**.
2. **Compare with Ledger Book Balance**.
3. **Difference Detection**: $\text{Difference} = \text{Statement Balance} - \text{Book Balance}$.
4. **Status Assignment**:
   - `balanced` (Difference = 0.00)
   - `unreconciled` (Difference $\neq$ 0.00)
