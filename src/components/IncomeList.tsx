import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Printer, 
  Download, 
  Eye, 
  Edit3, 
  Trash2, 
  Paperclip, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileText,
  DollarSign,
  Tag
} from 'lucide-react';
import { IncomeRecord, CurrencyCode, IncomeCategory, IncomeSource } from '../types';

interface IncomeListProps {
  incomes: IncomeRecord[];
  categories: IncomeCategory[];
  sources: IncomeSource[];
  selectedCurrency: CurrencyCode;
  onOpenAddModal: () => void;
  onDeleteIncome: (id: number) => void;
}

export const IncomeList: React.FC<IncomeListProps> = ({
  incomes,
  categories,
  sources,
  selectedCurrency,
  onOpenAddModal,
  onDeleteIncome
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedIncome, setSelectedIncome] = useState<IncomeRecord | null>(null);

  // Currency Converter Utility
  const formatCurrency = (amountInXaf: number) => {
    let rate = 1;
    let symbol = 'XAF';

    if (selectedCurrency === 'USD') { rate = 0.00165; symbol = '$'; }
    else if (selectedCurrency === 'EUR') { rate = 0.00152; symbol = '€'; }
    else if (selectedCurrency === 'GBP') { rate = 0.00130; symbol = '£'; }
    else if (selectedCurrency === 'NGN') { rate = 2.45; symbol = '₦'; }

    const converted = amountInXaf * rate;
    return `${symbol} ${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  // Filter Logic
  const filteredIncomes = incomes.filter(inc => {
    const matchesSearch = 
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.reference_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inc.customer_name && inc.customer_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      inc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || inc.category_name === selectedCategory;
    const matchesPayment = selectedPaymentMethod === 'all' || inc.payment_method === selectedPaymentMethod;
    const matchesStatus = selectedStatus === 'all' || inc.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesPayment && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Income & Revenue Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Search, filter, view attachments, and manage income transactions across activities.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-slate-200 flex items-center space-x-1.5 shadow-xs transition"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print Ledger</span>
          </button>
          <button
            onClick={onOpenAddModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-lg shadow-sm flex items-center space-x-1.5 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Income Entry</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, ref #, customer, tags..."
              className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm rounded-lg pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.category_name}>{c.category_name}</option>
              ))}
            </select>
          </div>

          {/* Payment Method Filter */}
          <div>
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Payment Methods</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
              <option value="MTN Mobile Money">MTN Mobile Money</option>
              <option value="Orange Money">Orange Money</option>
              <option value="Express Union Mobile Money">Express Union Mobile Money</option>
              <option value="Cheque">Cheque</option>
              <option value="Credit">Credit</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="received">Received / Completed</option>
              <option value="pending">Pending</option>
              <option value="partially_received">Partially Received</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

        </div>
      </div>

      {/* Main Income Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5 pl-5">Ref No</th>
                <th className="p-3.5">Title & Source</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Customer / Service / Project</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Amount ({selectedCurrency})</th>
                <th className="p-3.5">Payment</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Docs</th>
                <th className="p-3.5 pr-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIncomes.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-slate-400">
                    No income entries found matching your search filters.
                  </td>
                </tr>
              ) : (
                filteredIncomes.map((inc) => (
                  <tr key={inc.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 pl-5 font-mono text-xs font-bold text-indigo-600">
                      {inc.reference_no}
                    </td>
                    <td className="p-3.5 max-w-[220px]">
                      <div className="font-bold text-slate-900 truncate">{inc.title}</div>
                      <div className="text-[11px] text-slate-400 truncate">{inc.source_name}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="bg-indigo-50 text-indigo-700 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-indigo-100">
                        {inc.category_name}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-800">{inc.customer_name || 'Walk-in Client'}</div>
                      <div className="text-[11px] text-slate-400">
                        {inc.service_name ? `Service: ${inc.service_name}` : inc.project_name ? `Project: ${inc.project_name}` : 'Direct Revenue'}
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-600 whitespace-nowrap">{inc.income_date}</td>
                    <td className="p-3.5 font-extrabold text-slate-900 whitespace-nowrap">
                      {formatCurrency(inc.base_amount)}
                      {inc.currency !== 'XAF' && (
                        <div className="text-[10px] text-slate-400 font-normal">
                          ({inc.currency} {inc.amount.toLocaleString()})
                        </div>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md text-[11px] font-medium">
                        {inc.payment_method}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          inc.status === 'received' || inc.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : inc.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {inc.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      {inc.attachments.length > 0 ? (
                        <span className="inline-flex items-center text-blue-600 font-bold text-xs bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                          <Paperclip className="w-3 h-3 mr-1" />
                          {inc.attachments.length}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="p-3.5 pr-5 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedIncome(inc)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="View Details & Receipt"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteIncome(inc.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Delete Income Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Income Detail & Receipt Modal */}
      {selectedIncome && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  {selectedIncome.reference_no}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedIncome.title}</h3>
              </div>
              <button
                onClick={() => setSelectedIncome(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium">Category</span>
                <p className="font-bold text-slate-800 mt-0.5">{selectedIncome.category_name}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium">Income Source</span>
                <p className="font-bold text-slate-800 mt-0.5">{selectedIncome.source_name}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium">Transaction Date</span>
                <p className="font-bold text-slate-800 mt-0.5">{selectedIncome.income_date}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium">Total Amount</span>
                <p className="font-bold text-emerald-600 text-sm mt-0.5">{formatCurrency(selectedIncome.base_amount)}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium">Payment Method</span>
                <p className="font-bold text-slate-800 mt-0.5">{selectedIncome.payment_method}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium">Status</span>
                <p className="font-bold text-blue-600 uppercase mt-0.5">{selectedIncome.status}</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-700">Description / Details:</span>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {selectedIncome.description || 'No description recorded.'}
              </p>
            </div>

            {/* Attachments Section */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700">Attachments & Receipts ({selectedIncome.attachments.length})</span>
              {selectedIncome.attachments.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No attachments uploaded for this record.</p>
              ) : (
                <div className="space-y-2">
                  {selectedIncome.attachments.map(att => (
                    <div key={att.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-slate-800">{att.file_name}</span>
                        <span className="text-slate-400 text-[10px]">({att.file_size})</span>
                      </div>
                      <button
                        onClick={() => alert(`Downloading attachment ${att.file_name}`)}
                        className="text-blue-600 font-semibold hover:underline flex items-center space-x-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button
                onClick={() => window.print()}
                className="bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center space-x-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Voucher</span>
              </button>
              <button
                onClick={() => setSelectedIncome(null)}
                className="bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl hover:bg-slate-200"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
