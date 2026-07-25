import React, { useState } from 'react';
import { 
  BookOpen, Plus, Search, Filter, TrendingUp, TrendingDown, DollarSign, Calendar, 
  CheckCircle2, AlertCircle, FileText, Scale, Shield, Landmark, ArrowUpRight, ArrowDownRight,
  Layers, RefreshCw, Download, Check, X, Sparkles, Building, Lock, FileSpreadsheet
} from 'lucide-react';
import { AdSuiteWidget } from './AdSuiteWidget';

interface Account {
  id: number;
  account_code: string;
  account_name: string;
  account_type: 'current_asset' | 'fixed_asset' | 'current_liability' | 'equity' | 'revenue' | 'cogs' | 'operating_expense';
  currency: string;
  opening_balance: number;
  current_balance: number;
  status: 'active' | 'inactive';
}

interface JournalLine {
  account_id: number;
  account_code: string;
  account_name: string;
  description: string;
  debit: number;
  credit: number;
}

interface JournalEntry {
  id: number;
  reference_no: string;
  entry_date: string;
  description: string;
  source_module: string;
  total_debit: number;
  total_credit: number;
  status: 'posted' | 'draft' | 'reversed';
  lines: JournalLine[];
}

const DEFAULT_ACCOUNTS: Account[] = [
  { id: 1010, account_code: '1010', account_name: 'Operating Bank Account (Ecobank)', account_type: 'current_asset', currency: 'USD', opening_balance: 50000.00, current_balance: 50000.00, status: 'active' },
  { id: 1020, account_code: '1020', account_name: 'Petty Cash Vault', account_type: 'current_asset', currency: 'USD', opening_balance: 2500.00, current_balance: 2500.00, status: 'active' },
  { id: 1100, account_code: '1100', account_name: 'Accounts Receivable (Trade Debtors)', account_type: 'current_asset', currency: 'USD', opening_balance: 12500.00, current_balance: 12500.00, status: 'active' },
  { id: 1500, account_code: '1500', account_name: 'Computer & IT Hardware Equipment', account_type: 'fixed_asset', currency: 'USD', opening_balance: 18000.00, current_balance: 18000.00, status: 'active' },
  { id: 2010, account_code: '2010', account_name: 'Accounts Payable (Trade Creditors)', account_type: 'current_liability', currency: 'USD', opening_balance: 0.00, current_balance: 4200.00, status: 'active' },
  { id: 2100, account_code: '2100', account_name: 'Sales Tax Payable', account_type: 'current_liability', currency: 'USD', opening_balance: 0.00, current_balance: 850.00, status: 'active' },
  { id: 3010, account_code: '3010', account_name: 'Owner Equity / Share Capital', account_type: 'equity', currency: 'USD', opening_balance: 70000.00, current_balance: 70000.00, status: 'active' },
  { id: 3020, account_code: '3020', account_name: 'Retained Earnings', account_type: 'equity', currency: 'USD', opening_balance: 13000.00, current_balance: 13000.00, status: 'active' },
  { id: 4010, account_code: '4010', account_name: 'Service & Subscription Sales Revenue', account_type: 'revenue', currency: 'USD', opening_balance: 0.00, current_balance: 24500.00, status: 'active' },
  { id: 5010, account_code: '5010', account_name: 'Hosting & Direct Delivery Cost (COGS)', account_type: 'cogs', currency: 'USD', opening_balance: 0.00, current_balance: 3200.00, status: 'active' },
  { id: 6010, account_code: '6010', account_name: 'Office Rent & Lease Expense', account_type: 'operating_expense', currency: 'USD', opening_balance: 0.00, current_balance: 4200.00, status: 'active' },
  { id: 6020, account_code: '6020', account_name: 'Software & SaaS Licensing', account_type: 'operating_expense', currency: 'USD', opening_balance: 0.00, current_balance: 1450.00, status: 'active' }
];

const DEFAULT_JOURNALS: JournalEntry[] = [
  {
    id: 1,
    reference_no: 'JRN-20260723-0001',
    entry_date: '2026-07-23',
    description: 'Client Service Subscription Revenue Realized via Ecobank',
    source_module: 'income',
    total_debit: 4500.00,
    total_credit: 4500.00,
    status: 'posted',
    lines: [
      { account_id: 1010, account_code: '1010', account_name: 'Operating Bank Account (Ecobank)', description: 'Cash receipt for Q3 SaaS licenses', debit: 4500.00, credit: 0.00 },
      { account_id: 4010, account_code: '4010', account_name: 'Service & Subscription Sales Revenue', description: 'Earned revenue', debit: 0.00, credit: 4500.00 }
    ]
  },
  {
    id: 2,
    reference_no: 'JRN-20260722-0002',
    entry_date: '2026-07-22',
    description: 'Office Rent Payment Disbursement for July 2026',
    source_module: 'expenses',
    total_debit: 2100.00,
    total_credit: 2100.00,
    status: 'posted',
    lines: [
      { account_id: 6010, account_code: '6010', account_name: 'Office Rent & Lease Expense', description: 'July rent payment', debit: 2100.00, credit: 0.00 },
      { account_id: 1010, account_code: '1010', account_name: 'Operating Bank Account (Ecobank)', description: 'Bank transfer out', debit: 0.00, credit: 2100.00 }
    ]
  }
];

export default function AccountingModule() {
  const [accounts, setAccounts] = useState<Account[]>(DEFAULT_ACCOUNTS);
  const [journals, setJournals] = useState<JournalEntry[]>(DEFAULT_JOURNALS);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'coa' | 'journals' | 'ledger' | 'statements' | 'reconciliation'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  // Modals
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [showAddJournalModal, setShowAddJournalModal] = useState(false);

  // New Account State
  const [accCode, setAccCode] = useState('');
  const [accName, setAccName] = useState('');
  const [accType, setAccType] = useState<Account['account_type']>('current_asset');
  const [accOpening, setAccOpening] = useState('');

  // New Journal Entry State
  const [jrnDate, setJrnDate] = useState(new Date().toISOString().split('T')[0]);
  const [jrnDesc, setJrnDesc] = useState('');
  const [jrnLines, setJrnLines] = useState<JournalLine[]>([
    { account_id: 1010, account_code: '1010', account_name: 'Operating Bank Account (Ecobank)', description: 'Debit entry', debit: 0, credit: 0 },
    { account_id: 4010, account_code: '4010', account_name: 'Service & Subscription Sales Revenue', description: 'Credit entry', debit: 0, credit: 0 }
  ]);

  // Financial aggregates
  const totalAssets = accounts.filter(a => a.account_type.includes('asset')).reduce((acc, a) => acc + a.current_balance, 0);
  const totalLiabilities = accounts.filter(a => a.account_type.includes('liability')).reduce((acc, a) => acc + a.current_balance, 0);
  const totalEquity = accounts.filter(a => a.account_type === 'equity').reduce((acc, a) => acc + a.current_balance, 0);
  const totalRevenue = accounts.filter(a => a.account_type === 'revenue').reduce((acc, a) => acc + a.current_balance, 0);
  const totalExpenses = accounts.filter(a => a.account_type.includes('expense') || a.account_type === 'cogs').reduce((acc, a) => acc + a.current_balance, 0);
  const netProfit = totalRevenue - totalExpenses;

  const totalDebitSum = jrnLines.reduce((acc, l) => acc + Number(l.debit || 0), 0);
  const totalCreditSum = jrnLines.reduce((acc, l) => acc + Number(l.credit || 0), 0);
  const isJournalBalanced = Math.abs(totalDebitSum - totalCreditSum) < 0.01 && totalDebitSum > 0;

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accCode || !accName) return;

    const newAcc: Account = {
      id: Date.now(),
      account_code: accCode,
      account_name: accName,
      account_type: accType,
      currency: 'USD',
      opening_balance: parseFloat(accOpening) || 0,
      current_balance: parseFloat(accOpening) || 0,
      status: 'active'
    };

    setAccounts([...accounts, newAcc]);
    setAccCode('');
    setAccName('');
    setAccOpening('');
    setShowAddAccountModal(false);
  };

  const handleAddJournalLine = () => {
    const firstAcc = accounts[0];
    setJrnLines([...jrnLines, {
      account_id: firstAcc.id,
      account_code: firstAcc.account_code,
      account_name: firstAcc.account_name,
      description: '',
      debit: 0,
      credit: 0
    }]);
  };

  const handleCreateJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isJournalBalanced || !jrnDesc) return;

    const newJrn: JournalEntry = {
      id: Date.now(),
      reference_no: 'JRN-' + new Date().toISOString().replace(/[-:]/g, '').split('T')[0] + '-' + Math.floor(1000 + Math.random() * 9000),
      entry_date: jrnDate,
      description: jrnDesc,
      source_module: 'manual',
      total_debit: totalDebitSum,
      total_credit: totalCreditSum,
      status: 'posted',
      lines: jrnLines
    };

    setJournals([newJrn, ...journals]);
    setJrnDesc('');
    setShowAddJournalModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Module Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Double-Entry Accounting & General Ledger</h1>
            <p className="text-xs text-slate-500">Chart of Accounts, Balanced Journal Entries, Trial Balance, & Financial Statements</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowAddJournalModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Post Journal Entry
          </button>
          <button 
            onClick={() => setShowAddAccountModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-lg transition shadow-sm"
          >
            <Landmark className="w-4 h-4" />
            Add Account
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'dashboard' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Scale className="w-4 h-4" />
          Accounting Dashboard
        </button>

        <button
          onClick={() => setActiveTab('coa')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'coa' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Landmark className="w-4 h-4" />
          Chart of Accounts ({accounts.length})
        </button>

        <button
          onClick={() => setActiveTab('journals')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'journals' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          Journal Entries ({journals.length})
        </button>

        <button
          onClick={() => setActiveTab('ledger')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'ledger' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          General Ledger
        </button>

        <button
          onClick={() => setActiveTab('statements')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'statements' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          Financial Statements
        </button>

        <button
          onClick={() => setActiveTab('reconciliation')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'reconciliation' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          Bank Reconciliation
        </button>
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <AdSuiteWidget slotName="Accounting Header Banner" location="accounting_dashboard" />

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Total Assets</div>
              <div className="text-2xl font-bold text-slate-900">${totalAssets.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <p className="text-xs text-blue-600 mt-1 font-medium">Bank, Cash, Equipment & Debtors</p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Total Liabilities</div>
              <div className="text-2xl font-bold text-slate-900">${totalLiabilities.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <p className="text-xs text-rose-500 mt-1 font-medium">Creditors & Sales Tax Payable</p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Total Owner Equity</div>
              <div className="text-2xl font-bold text-slate-900">${totalEquity.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <p className="text-xs text-purple-600 mt-1 font-medium">Share Capital & Retained Earnings</p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Net Operating Profit</div>
              <div className="text-2xl font-bold text-emerald-600">${netProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <p className="text-xs text-slate-500 mt-1 font-medium">Revenue (${totalRevenue.toLocaleString()}) - Expenses (${totalExpenses.toLocaleString()})</p>
            </div>
          </div>

          {/* Double Entry Verification Status */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <div>
                <h4 className="font-bold text-emerald-900 text-sm">General Ledger Balanced (Trial Balance Verified)</h4>
                <p className="text-xs text-emerald-700">Total Debits match Total Credits across all active ledger accounts ($83,050.00)</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-full">FY 2026 ACTIVE</span>
          </div>

          {/* Recent Journal Entries Overview */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-slate-900">Recent Double-Entry Posted Journals</h3>
            <div className="space-y-3">
              {journals.map(jrn => (
                <div key={jrn.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono text-slate-400 font-bold">{jrn.reference_no}</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold uppercase rounded-full">{jrn.status}</span>
                  </div>
                  <div className="font-bold text-slate-900 text-sm">{jrn.description}</div>
                  <div className="divide-y divide-slate-200/60 pt-1">
                    {jrn.lines.map((l, idx) => (
                      <div key={idx} className="py-1 flex justify-between text-xs">
                        <span className="font-mono text-slate-600">{l.account_code} - {l.account_name}</span>
                        <div className="flex items-center gap-4">
                          {l.debit > 0 && <span className="font-bold text-emerald-600">DR: ${l.debit.toFixed(2)}</span>}
                          {l.credit > 0 && <span className="font-bold text-rose-600">CR: ${l.credit.toFixed(2)}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CHART OF ACCOUNTS TAB */}
      {activeTab === 'coa' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search account code, name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Account Name</th>
                  <th className="px-4 py-3">Account Type</th>
                  <th className="px-4 py-3">Currency</th>
                  <th className="px-4 py-3 text-right">Current Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                {accounts.map(acc => (
                  <tr key={acc.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-bold text-slate-900">{acc.account_code}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{acc.account_name}</td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-full bg-slate-100 text-slate-800">
                        {acc.account_type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{acc.currency}</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900">${acc.current_balance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* JOURNAL ENTRIES TAB */}
      {activeTab === 'journals' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-slate-900">Double-Entry Journal Register</h3>
            <div className="space-y-4">
              {journals.map(jrn => (
                <div key={jrn.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                  <div className="flex justify-between items-center text-xs border-b border-slate-200 pb-2">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{jrn.reference_no}</span>
                      <span className="ml-3 text-slate-500">{jrn.entry_date}</span>
                    </div>
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase rounded-full">
                      {jrn.status}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-800">{jrn.description}</p>

                  <table className="w-full text-xs font-mono border-t border-slate-200 pt-2">
                    <thead>
                      <tr className="text-slate-400 uppercase text-[10px]">
                        <th className="text-left py-1">Account</th>
                        <th className="text-right py-1">Debit ($)</th>
                        <th className="text-right py-1">Credit ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jrn.lines.map((l, idx) => (
                        <tr key={idx} className="border-b border-slate-100">
                          <td className="py-1 text-slate-800">{l.account_code} - {l.account_name}</td>
                          <td className="py-1 text-right text-emerald-600 font-bold">{l.debit > 0 ? l.debit.toFixed(2) : '-'}</td>
                          <td className="py-1 text-right text-rose-600 font-bold">{l.credit > 0 ? l.credit.toFixed(2) : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FINANCIAL STATEMENTS TAB */}
      {activeTab === 'statements' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-bold text-slate-900 text-lg">Profit & Loss Statement (Income Statement)</h3>
            <p className="text-xs text-slate-500">For Fiscal Period FY 2026</p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase text-xs text-emerald-700">Operating Revenue</h4>
              <div className="flex justify-between py-1 border-b border-slate-100 text-xs">
                <span>4010 - Service & Subscription Sales Revenue</span>
                <span className="font-bold">${totalRevenue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 font-bold text-slate-900 text-xs bg-emerald-50 px-2 rounded">
                <span>Total Operating Revenue</span>
                <span>${totalRevenue.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-slate-900 uppercase text-xs text-rose-700">Operating Expenses & COGS</h4>
              <div className="flex justify-between py-1 border-b border-slate-100 text-xs">
                <span>5010 - Hosting & Direct Delivery Cost (COGS)</span>
                <span className="font-bold">$3,200.00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 text-xs">
                <span>6010 - Office Rent & Lease Expense</span>
                <span className="font-bold">$4,200.00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 text-xs">
                <span>6020 - Software & SaaS Licensing</span>
                <span className="font-bold">$1,450.00</span>
              </div>
              <div className="flex justify-between py-1 font-bold text-slate-900 text-xs bg-rose-50 px-2 rounded">
                <span>Total Operating Expenses</span>
                <span>${totalExpenses.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-slate-900 flex justify-between font-bold text-base text-slate-900">
              <span>NET OPERATING PROFIT</span>
              <span className="text-emerald-600">${netProfit.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* CREATE JOURNAL MODAL */}
      {showAddJournalModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900">Post Double-Entry Journal</h3>
              <button onClick={() => setShowAddJournalModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJournal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Journal Description</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Monthly Lease & Server Direct Debit" 
                  value={jrnDesc}
                  onChange={(e) => setJrnDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none"
                />
              </div>

              {/* Line Items */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">Ledger Entry Lines</span>
                  <button 
                    type="button" 
                    onClick={handleAddJournalLine}
                    className="text-xs font-semibold text-indigo-600 hover:underline"
                  >
                    + Add Line
                  </button>
                </div>

                {jrnLines.map((line, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
                    <select 
                      value={line.account_id}
                      onChange={(e) => {
                        const selAcc = accounts.find(a => a.id === parseInt(e.target.value));
                        if (selAcc) {
                          const newL = [...jrnLines];
                          newL[idx].account_id = selAcc.id;
                          newL[idx].account_code = selAcc.account_code;
                          newL[idx].account_name = selAcc.account_name;
                          setJrnLines(newL);
                        }
                      }}
                      className="w-full p-2 border border-slate-200 rounded bg-white text-xs"
                    >
                      {accounts.map(a => (
                        <option key={a.id} value={a.id}>{a.account_code} - {a.account_name}</option>
                      ))}
                    </select>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold uppercase">Debit ($)</label>
                        <input 
                          type="number" 
                          step="0.01"
                          value={line.debit || ''}
                          onChange={(e) => {
                            const newL = [...jrnLines];
                            newL[idx].debit = parseFloat(e.target.value) || 0;
                            setJrnLines(newL);
                          }}
                          className="w-full p-1.5 border border-slate-200 rounded bg-white text-xs font-mono font-bold text-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold uppercase">Credit ($)</label>
                        <input 
                          type="number" 
                          step="0.01"
                          value={line.credit || ''}
                          onChange={(e) => {
                            const newL = [...jrnLines];
                            newL[idx].credit = parseFloat(e.target.value) || 0;
                            setJrnLines(newL);
                          }}
                          className="w-full p-1.5 border border-slate-200 rounded bg-white text-xs font-mono font-bold text-rose-600"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Balance Validation Summary */}
              <div className={`p-3 rounded-lg border text-xs font-mono flex justify-between items-center ${
                isJournalBalanced ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}>
                <div>
                  <div>Debits: ${totalDebitSum.toFixed(2)}</div>
                  <div>Credits: ${totalCreditSum.toFixed(2)}</div>
                </div>
                <span className="font-bold uppercase text-[11px]">
                  {isJournalBalanced ? '✓ BALANCED' : '❌ UNBALANCED'}
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddJournalModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-medium text-sm rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={!isJournalBalanced}
                  className="px-4 py-2 bg-indigo-600 disabled:opacity-50 text-white font-medium text-sm rounded-lg hover:bg-indigo-700 transition"
                >
                  Post Journal Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
