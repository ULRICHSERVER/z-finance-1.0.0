import React, { useState } from 'react';
import { 
  Receipt, Plus, Search, Filter, TrendingDown, DollarSign, Calendar, 
  CheckCircle2, XCircle, Clock, FileText, ArrowUpRight, Check, X, AlertTriangle,
  RefreshCw, Building, Tag, ShieldCheck, Download, Layers, Shield
} from 'lucide-react';
import { AdSuiteWidget } from './AdSuiteWidget';

interface ExpenseRecord {
  id: number;
  reference_no: string;
  title: string;
  category_name: string;
  category_id: number;
  supplier_name?: string;
  expense_date: string;
  amount: number;
  currency: string;
  payment_method: string;
  payment_status: 'unpaid' | 'partially_paid' | 'paid' | 'reimbursed';
  approval_status: 'draft' | 'pending' | 'approved' | 'rejected' | 'cancelled';
  receipt_no?: string;
  invoice_no?: string;
  description?: string;
  color_code?: string;
}

const DEFAULT_EXPENSES: ExpenseRecord[] = [
  {
    id: 1,
    reference_no: 'EXP-2026-0891',
    title: 'AWS Cloud Server Hosting & Bandwidth',
    category_name: 'Software & Subscriptions',
    category_id: 5,
    supplier_name: 'Amazon Web Services Inc.',
    expense_date: '2026-07-22',
    amount: 1450.00,
    currency: 'USD',
    payment_method: 'Credit Card',
    payment_status: 'paid',
    approval_status: 'approved',
    receipt_no: 'REC-AWS-9921',
    invoice_no: 'INV-2026-001',
    description: 'Monthly production Cloud Run & RDS Postgres instances',
    color_code: '#8B5CF6'
  },
  {
    id: 2,
    reference_no: 'EXP-2026-0892',
    title: 'Headquarters Office Monthly Lease',
    category_name: 'Rent & Lease',
    category_id: 2,
    supplier_name: 'Commercial Realty Trust',
    expense_date: '2026-07-20',
    amount: 4200.00,
    currency: 'USD',
    payment_method: 'Bank Transfer',
    payment_status: 'paid',
    approval_status: 'approved',
    receipt_no: 'REC-RENT-7712',
    description: 'Floor 4 Commercial office space rent for July 2026',
    color_code: '#F59E0B'
  },
  {
    id: 3,
    reference_no: 'EXP-2026-0893',
    title: 'High-Speed Fiber Internet & Static IPs',
    category_name: 'Internet & Telecom',
    category_id: 4,
    supplier_name: 'Camtel Telecom Services',
    expense_date: '2026-07-18',
    amount: 350.00,
    currency: 'USD',
    payment_method: 'MTN Mobile Money',
    payment_status: 'paid',
    approval_status: 'approved',
    receipt_no: 'MOMO-8823192',
    description: '500Mbps Dedicated Line Fiber Internet Connection',
    color_code: '#3B82F6'
  },
  {
    id: 4,
    reference_no: 'EXP-2026-0894',
    title: 'Executive Team Laptops Purchase',
    category_name: 'Office & Supplies',
    category_id: 1,
    supplier_name: 'TechMart Hardware Solutions',
    expense_date: '2026-07-15',
    amount: 3800.00,
    currency: 'USD',
    payment_method: 'Bank Transfer',
    payment_status: 'unpaid',
    approval_status: 'pending',
    invoice_no: 'INV-TM-4412',
    description: '2x MacBook Pro 16-inch M3 Max for engineering leads',
    color_code: '#EF4444'
  },
  {
    id: 5,
    reference_no: 'EXP-2026-0895',
    title: 'Q3 Global Marketing & PPC Ad Spend',
    category_name: 'Marketing & Advertising',
    category_id: 6,
    supplier_name: 'Google Ads EMEA',
    expense_date: '2026-07-10',
    amount: 2500.00,
    currency: 'USD',
    payment_method: 'Credit Card',
    payment_status: 'paid',
    approval_status: 'approved',
    receipt_no: 'GADS-102931',
    description: 'Search engine placement campaign for Z-FINANCE launch',
    color_code: '#EC4899'
  }
];

export default function ExpenseModule() {
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(DEFAULT_EXPENSES);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'list' | 'approvals' | 'categories' | 'reports'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Expense Form State
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('1');
  const [newSupplier, setNewSupplier] = useState('');
  const [newMethod, setNewMethod] = useState('Bank Transfer');
  const [newDescription, setNewDescription] = useState('');

  const filteredExpenses = expenses.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exp.reference_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (exp.supplier_name && exp.supplier_name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || exp.approval_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalSpent = expenses.reduce((acc, exp) => acc + (exp.approval_status === 'approved' ? exp.amount : 0), 0);
  const pendingAmount = expenses.reduce((acc, exp) => acc + (exp.approval_status === 'pending' ? exp.amount : 0), 0);
  const approvedCount = expenses.filter(e => e.approval_status === 'approved').length;
  const pendingCount = expenses.filter(e => e.approval_status === 'pending').length;

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAmount) return;

    const newExp: ExpenseRecord = {
      id: Date.now(),
      reference_no: 'EXP-2026-' + Math.floor(1000 + Math.random() * 9000),
      title: newTitle,
      category_name: newCategory === '1' ? 'Office & Supplies' : newCategory === '2' ? 'Rent & Lease' : 'Software & Subscriptions',
      category_id: parseInt(newCategory),
      supplier_name: newSupplier || 'General Vendor',
      expense_date: new Date().toISOString().split('T')[0],
      amount: parseFloat(newAmount),
      currency: 'USD',
      payment_method: newMethod,
      payment_status: 'paid',
      approval_status: 'pending',
      description: newDescription,
      color_code: '#EF4444'
    };

    setExpenses([newExp, ...expenses]);
    setNewTitle('');
    setNewAmount('');
    setNewSupplier('');
    setNewDescription('');
    setShowAddModal(false);
  };

  const handleApprove = (id: number) => {
    setExpenses(expenses.map(exp => exp.id === id ? { ...exp, approval_status: 'approved' } : exp));
  };

  const handleReject = (id: number) => {
    setExpenses(expenses.map(exp => exp.id === id ? { ...exp, approval_status: 'rejected' } : exp));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-600 rounded-lg">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Expense Management System</h1>
              <p className="text-xs text-slate-500">Record, categorize, approve, and analyze enterprise expenditure</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm rounded-lg transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Record Expense
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
          <TrendingDown className="w-4 h-4" />
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab('list')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'list' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          All Expenses ({expenses.length})
        </button>

        <button
          onClick={() => setActiveTab('approvals')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'approvals' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Approvals ({pendingCount})
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'categories' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          Categories
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'reports' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ArrowUpRight className="w-4 h-4" />
          Reports
        </button>
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Ad Suite Integration Banner */}
          <AdSuiteWidget slotName="Expense Dashboard Header" location="expense_dashboard" />

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Approved Expenses</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <p className="text-xs text-slate-500 mt-1">{approvedCount} approved disbursement records</p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Pending Approval</span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-bold text-amber-600">${pendingAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <p className="text-xs text-slate-500 mt-1">{pendingCount} requests awaiting manager review</p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Avg Transaction</span>
                <TrendingDown className="w-4 h-4 text-rose-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900">
                ${(expenses.length > 0 ? (totalSpent / expenses.length) : 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-slate-500 mt-1">Mean expense disbursement cost</p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Active Suppliers</span>
                <Building className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900">5</div>
              <p className="text-xs text-slate-500 mt-1">Verified vendor accounts</p>
            </div>
          </div>

          {/* Recent Expenses List */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-base font-bold text-slate-900 mb-4">Recent Expenditure Transactions</h2>
            <div className="divide-y divide-slate-100">
              {expenses.slice(0, 5).map(exp => (
                <div key={exp.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: exp.color_code || '#EF4444' }} />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{exp.title}</div>
                      <div className="text-xs text-slate-500">{exp.reference_no} • {exp.supplier_name || 'General Supplier'}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-900">${exp.amount.toFixed(2)}</div>
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                      exp.approval_status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                      exp.approval_status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {exp.approval_status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EXPENSE LIST TAB */}
      {activeTab === 'list' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search reference, title, supplier..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Reference & Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Supplier</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Approval</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredExpenses.map(exp => (
                  <tr key={exp.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">{exp.title}</div>
                      <div className="text-xs text-slate-400">{exp.reference_no}</div>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-700">{exp.category_name}</td>
                    <td className="px-4 py-3 text-slate-600">{exp.supplier_name || 'N/A'}</td>
                    <td className="px-4 py-3 text-slate-500">{exp.expense_date}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">${exp.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full ${
                        exp.approval_status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                        exp.approval_status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {exp.approval_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {exp.approval_status === 'pending' && (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleApprove(exp.id)}
                            className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-md transition"
                            title="Approve Expense"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleReject(exp.id)}
                            className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-md transition"
                            title="Reject Expense"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* APPROVALS TAB */}
      {activeTab === 'approvals' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <div>
                <h3 className="font-semibold text-sm">Manager Approval Queue</h3>
                <p className="text-xs text-amber-700">Review pending expense disbursement requests against corporate compliance policies.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 divide-y divide-slate-100">
            {expenses.filter(e => e.approval_status === 'pending').map(exp => (
              <div key={exp.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">{exp.reference_no}</span>
                    <h4 className="font-bold text-slate-900">{exp.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{exp.description || 'No detailed notes provided'}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                    <span>Category: {exp.category_name}</span>
                    <span>Supplier: {exp.supplier_name}</span>
                    <span>Date: {exp.expense_date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-900">${exp.amount.toFixed(2)}</div>
                    <div className="text-xs text-slate-400">{exp.payment_method}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleApprove(exp.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-lg transition"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Approve
                    </button>
                    <button 
                      onClick={() => handleReject(exp.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs rounded-lg transition"
                    >
                      <X className="w-3.5 h-3.5" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {expenses.filter(e => e.approval_status === 'pending').length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm">
                No pending expenses awaiting approval.
              </div>
            )}
          </div>
        </div>
      )}

      {/* CATEGORIES TAB */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Office & Supplies', code: 'EXP-OFFICE', color: '#EF4444', desc: 'Stationery, furniture, and office inventory' },
            { name: 'Rent & Lease', code: 'EXP-RENT', color: '#F59E0B', desc: 'Facility rent, leasing costs, and property fees' },
            { name: 'Utilities & Power', code: 'EXP-UTILITIES', color: '#10B981', desc: 'Electricity, water, gas, and waste disposal' },
            { name: 'Internet & Telecom', code: 'EXP-TELECOM', color: '#3B82F6', desc: 'ISP subscription, mobile airtime, data' },
            { name: 'Software & SaaS', code: 'EXP-SOFTWARE', color: '#8B5CF6', desc: 'SaaS subscriptions, cloud hosting, licenses' },
            { name: 'Marketing & Ads', code: 'EXP-MARKETING', color: '#EC4899', desc: 'Google Ads, social media campaigns, PR' }
          ].map((cat, idx) => (
            <div key={idx} className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2 py-0.5 bg-slate-100 rounded text-slate-600">{cat.code}</span>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
              </div>
              <h3 className="font-bold text-slate-900">{cat.name}</h3>
              <p className="text-xs text-slate-500">{cat.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* REPORTS TAB */}
      {activeTab === 'reports' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-900">Expense Breakdown Report</h3>
              <p className="text-xs text-slate-500">Aggregate expense disbursements by taxonomy category</p>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
              <Download className="w-3.5 h-3.5" /> Export PDF
            </button>
          </div>

          <div className="space-y-3">
            {[
              { category: 'Rent & Lease', total: 4200.00, percentage: 34 },
              { category: 'Office & Supplies', total: 3800.00, percentage: 31 },
              { category: 'Marketing & Advertising', total: 2500.00, percentage: 20 },
              { category: 'Software & Subscriptions', total: 1450.00, percentage: 11 },
              { category: 'Internet & Telecom', total: 350.00, percentage: 4 }
            ].map((rep, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{rep.category}</span>
                  <span className="text-slate-900">${rep.total.toFixed(2)} ({rep.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: `${rep.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECORD EXPENSE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900">Record Expense Transaction</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateExpense} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Title / Purpose</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. AWS Cloud Server Hosting" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Amount ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    placeholder="0.00" 
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none"
                  >
                    <option value="1">Office & Supplies</option>
                    <option value="2">Rent & Lease</option>
                    <option value="5">Software & SaaS</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Supplier Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Amazon Web Services" 
                  value={newSupplier}
                  onChange={(e) => setNewSupplier(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Method</label>
                <select 
                  value={newMethod}
                  onChange={(e) => setNewMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none"
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="MTN Mobile Money">MTN Mobile Money</option>
                  <option value="Orange Money">Orange Money</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notes / Description</label>
                <textarea 
                  rows={2}
                  placeholder="Additional context or bill details..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-medium text-sm rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-rose-600 text-white font-medium text-sm rounded-lg hover:bg-rose-700 transition"
                >
                  Submit Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
