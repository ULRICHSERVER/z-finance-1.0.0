import React, { useState } from 'react';
import { 
  X, 
  DollarSign, 
  Calendar, 
  Link as LinkIcon, 
  CreditCard, 
  Paperclip, 
  Tag, 
  Check,
  Building,
  Briefcase,
  Layers,
  Globe
} from 'lucide-react';
import { 
  IncomeRecord, 
  IncomeCategory, 
  IncomeSource, 
  CustomerLink, 
  ServiceLink, 
  ProjectLink, 
  CurrencyCode, 
  PaymentMethod, 
  IncomeStatus 
} from '../types';

interface AddIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: IncomeCategory[];
  sources: IncomeSource[];
  customers: CustomerLink[];
  services: ServiceLink[];
  projects: ProjectLink[];
  onAddIncome: (record: Partial<IncomeRecord>) => void;
}

export const AddIncomeModal: React.FC<AddIncomeModalProps> = ({
  isOpen,
  onClose,
  categories,
  sources,
  customers,
  services,
  projects,
  onAddIncome
}) => {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<number>(categories[0]?.id || 1);
  const [sourceId, setSourceId] = useState<number>(sources[0]?.id || 1);
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<CurrencyCode>('XAF');
  const [exchangeRate, setExchangeRate] = useState<number>(1.0);
  const [incomeDate, setIncomeDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Bank Transfer');
  const [status, setStatus] = useState<IncomeStatus>('received');
  const [customerId, setCustomerId] = useState<string>('');
  const [serviceId, setServiceId] = useState<string>('');
  const [projectId, setProjectId] = useState<string>('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [fileName, setFileName] = useState('');

  if (!isOpen) return null;

  const handleCurrencyChange = (curr: CurrencyCode) => {
    setCurrency(curr);
    if (curr === 'USD') setExchangeRate(606.06);
    else if (curr === 'EUR') setExchangeRate(655.957);
    else if (curr === 'GBP') setExchangeRate(760.50);
    else if (curr === 'NGN') setExchangeRate(0.408);
    else setExchangeRate(1.0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount) || 0;
    if (!title || numAmount <= 0) {
      alert('Please enter a valid title and positive amount.');
      return;
    }

    const selectedCat = categories.find(c => c.id === Number(categoryId));
    const selectedSrc = sources.find(s => s.id === Number(sourceId));
    const selectedCust = customers.find(c => c.id === Number(customerId));
    const selectedSrv = services.find(s => s.id === Number(serviceId));
    const selectedProj = projects.find(p => p.id === Number(projectId));

    const calculatedBaseXaf = currency === 'XAF' ? numAmount : numAmount * exchangeRate;

    const newRecord: Partial<IncomeRecord> = {
      reference_no: `INC-${new Date().getFullYear()}${(new Date().getMonth()+1).toString().padStart(2,'0')}-${Math.floor(100+Math.random()*900)}`,
      title,
      category_id: Number(categoryId),
      category_name: selectedCat ? selectedCat.category_name : 'Service Income',
      source_id: Number(sourceId),
      source_name: selectedSrc ? selectedSrc.source_name : 'Managed IT Infrastructure',
      customer_id: customerId ? Number(customerId) : undefined,
      customer_name: selectedCust ? selectedCust.name : undefined,
      service_id: serviceId ? Number(serviceId) : undefined,
      service_name: selectedSrv ? selectedSrv.name : undefined,
      project_id: projectId ? Number(projectId) : undefined,
      project_name: selectedProj ? selectedProj.name : undefined,
      amount: numAmount,
      currency,
      exchange_rate: exchangeRate,
      base_amount: Math.round(calculatedBaseXaf),
      payment_method: paymentMethod,
      income_date: incomeDate,
      status,
      description,
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      attachments: fileName ? [
        {
          id: `att-${Date.now()}`,
          file_name: fileName,
          file_type: 'application/pdf',
          file_size: '1.4 MB',
          attachment_type: 'receipt',
          uploaded_at: new Date().toISOString()
        }
      ] : [],
      is_recurring: false,
      offline_synced: true,
      created_by: 'Super Admin',
      created_at: new Date().toISOString()
    };

    onAddIncome(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Add New Income Entry</h2>
            <p className="text-xs text-slate-500">Record a new revenue stream, multi-currency transaction, or invoice payment.</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Row 1: Title, Category, Source */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="block text-xs font-bold text-slate-700 mb-1">Income Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Enterprise Cloud Audit"
                className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.category_name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Income Source *</label>
              <select
                value={sourceId}
                onChange={(e) => setSourceId(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sources.map(s => (
                  <option key={s.id} value={s.id}>{s.source_name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Amount, Currency, FX, Date */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Amount *</label>
              <input
                type="number"
                step="any"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-white border border-slate-200 text-xs sm:text-sm font-bold text-emerald-600 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Currency</label>
              <select
                value={currency}
                onChange={(e) => handleCurrencyChange(e.target.value as CurrencyCode)}
                className="w-full bg-white border border-slate-200 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="XAF">XAF (FCFA)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="NGN">NGN (₦)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Exchange Rate (to XAF)</label>
              <input
                type="number"
                step="any"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 1)}
                className="w-full bg-white border border-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Income Date *</label>
              <input
                type="date"
                required
                value={incomeDate}
                onChange={(e) => setIncomeDate(e.target.value)}
                className="w-full bg-white border border-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 3: Linked Modules (CRM, Service, Project) */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
              <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>Link with Connected Z-FINANCE Modules</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Customer (CRM)</label>
                <select
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-xs rounded-xl px-3 py-1.5 text-slate-800"
                >
                  <option value="">None (Walk-in / Direct)</option>
                  {customers.map(cust => (
                    <option key={cust.id} value={cust.id}>{cust.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Service Package</label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-xs rounded-xl px-3 py-1.5 text-slate-800"
                >
                  <option value="">None</option>
                  {services.map(srv => (
                    <option key={srv.id} value={srv.id}>{srv.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Project Link</label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-xs rounded-xl px-3 py-1.5 text-slate-800"
                >
                  <option value="">None</option>
                  {projects.map(prj => (
                    <option key={prj.id} value={prj.id}>{prj.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Row 4: Payment Method & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2 text-slate-800"
              >
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
                <option value="MTN Mobile Money">MTN Mobile Money</option>
                <option value="Orange Money">Orange Money</option>
                <option value="Express Union Mobile Money">Express Union Mobile Money</option>
                <option value="Cheque">Cheque</option>
                <option value="Credit">Credit</option>
                <option value="Visa">Visa Card</option>
                <option value="Mastercard">Mastercard</option>
                <option value="PayPal">PayPal</option>
                <option value="Stripe">Stripe</option>
                <option value="Flutterwave">Flutterwave</option>
                <option value="PayUnit">PayUnit</option>
                <option value="Paystack">Paystack</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Transaction Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as IncomeStatus)}
                className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2 text-slate-800"
              >
                <option value="received">Received / Completed</option>
                <option value="pending">Pending</option>
                <option value="partially_received">Partially Received</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>

          {/* Attachments & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Simulate File Attachment</label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="e.g. Bank_Deposit_Receipt_Jul.pdf"
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tags (Comma Separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="e.g. Q3, Retainer, VIP"
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Description / Notes</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Additional income stream context..."
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-3 text-slate-800"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow-sm flex items-center space-x-1.5 transition"
            >
              <Check className="w-4 h-4" />
              <span>Save Income Entry</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
