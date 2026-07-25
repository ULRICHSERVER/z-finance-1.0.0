# Z-FINANCE 1.0.0 - Asset Depreciation & Accounting Ledger Guide

## Overview
Automated asset depreciation engines supporting GAAP and IFRS compliant calculation methods.

## Supported Depreciation Methods
- **Straight-Line**: Equal monthly depreciation over useful life (`(Cost - Salvage) / Useful Life`).
- **Declining Balance**: Accelerated percentage depreciation on net book value.
- **Units of Production**: Usage-based depreciation for manufacturing equipment.

## Automatic Accounting Posting
Depreciation runs automatically generate debit (Depreciation Expense) and credit (Accumulated Depreciation) journal entries into the General Ledger module.
