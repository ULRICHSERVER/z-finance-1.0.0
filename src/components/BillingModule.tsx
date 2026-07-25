import React, { useState } from 'react';
import { 
  FileText, Plus, Search, Filter, DollarSign, Calendar, CheckCircle2, AlertCircle, 
  Send, Eye, ArrowRight, RefreshCw, ShieldCheck, QrCode, PenTool, Image, Download, 
  Trash2, Copy, FileCheck, Landmark, Sparkles, Building, Layers, Check, X, Printer, Lock
} from 'lucide-react';
import { AdSuiteWidget } from './AdSuiteWidget';

interface InvoiceItem {
  id?: number;
  item_name: string;
  description: string;
  quantity: number;
  unit_price: number;
  discount: number;
  tax_rate: number;
  subtotal: number;
}

interface Invoice {
  id: number;
  invoice_number: string;
  customer_name: string;
  customer_email: string;
  issue_date: string;
  due_date: string;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  paid_amount: number;
  currency: string;
  status: 'draft' | 'sent' | 'viewed' | 'partially_paid' | 'paid' | 'overdue' | 'cancelled';
  signature_hash?: string;
  items: InvoiceItem[];
}

interface Quotation {
  id: number;
  reference_no: string;
  customer_name: string;
  customer_email: string;
  issue_date: string;
  expiry_date: string;
  total_amount: number;
  currency: string;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired' | 'converted';
  items: InvoiceItem[];
}

interface Receipt {
  id: number;
  receipt_number: string;
  invoice_number: string;
  customer_name: string;
  payment_amount: number;
  payment_method: string;
  payment_date: string;
  qr_code_hash: string;
  signer_name?: string;
}

interface DigitalSignature {
  id: number;
  signer_name: string;
  signer_title: string;
  signer_type: string;
  format: 'draw' | 'electronic';
  verification_hash: string;
  signed_at: string;
}

const DEFAULT_INVOICES: Invoice[] = [
  {
    id: 101,
    invoice_number: 'INV-20260723-4011',
    customer_name: 'Acme Enterprise Global',
    customer_email: 'billing@acmeglobal.com',
    issue_date: '2026-07-23',
    due_date: '2026-08-22',
    subtotal: 12500.00,
    tax_amount: 625.00,
    discount_amount: 0.00,
    total_amount: 13125.00,
    paid_amount: 13125.00,
    currency: 'USD',
    status: 'paid',
    signature_hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    items: [
      { id: 1, item_name: 'Enterprise Cloud SaaS License - Q3', description: 'Tier-1 enterprise access for 250 seats', quantity: 1, unit_price: 10000.00, discount: 0, tax_rate: 5, subtotal: 10000.00 },
      { id: 2, item_name: 'Dedicated Onboarding & Consulting', description: '25 hours architectural setup', quantity: 25, unit_price: 100.00, discount: 0, tax_rate: 5, subtotal: 2500.00 }
    ]
  },
  {
    id: 102,
    invoice_number: 'INV-20260722-1089',
    customer_name: 'Horizon Retail Logistics',
    customer_email: 'accounts@horizonlogistics.io',
    issue_date: '2026-07-22',
    due_date: '2026-08-21',
    subtotal: 4800.00,
    tax_amount: 240.00,
    discount_amount: 200.00,
    total_amount: 4840.00,
    paid_amount: 2000.00,
    currency: 'USD',
    status: 'partially_paid',
    items: [
      { id: 3, item_name: 'Warehouse ERP Module License', description: 'Annual barcode scanner integration', quantity: 1, unit_price: 4800.00, discount: 200, tax_rate: 5, subtotal: 4600.00 }
    ]
  }
];

const DEFAULT_QUOTATIONS: Quotation[] = [
  {
    id: 201,
    reference_no: 'QTN-20260723-0091',
    customer_name: 'Starlight Media Network',
    customer_email: 'procurement@starlightmedia.com',
    issue_date: '2026-07-23',
    expiry_date: '2026-08-23',
    total_amount: 8500.00,
    currency: 'USD',
    status: 'sent',
    items: [
      { id: 10, item_name: 'Custom AdSuite Monetization Integration', description: 'Custom ad slot configuration & analytics engine', quantity: 1, unit_price: 8500.00, discount: 0, tax_rate: 0, subtotal: 8500.00 }
    ]
  }
];

const DEFAULT_RECEIPTS: Receipt[] = [
  {
    id: 301,
    receipt_number: 'RCT-20260723-9901',
    invoice_number: 'INV-20260723-4011',
    customer_name: 'Acme Enterprise Global',
    payment_amount: 13125.00,
    payment_method: 'Ecobank Wire Transfer',
    payment_date: '2026-07-23',
    qr_code_hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    signer_name: 'Chief Financial Officer'
  }
];

const DEFAULT_SIGNATURES: DigitalSignature[] = [
  {
    id: 1,
    signer_name: 'Chief Financial Officer',
    signer_title: 'Global Financial Controller',
    signer_type: 'authorized',
    format: 'draw',
    verification_hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    signed_at: '2026-07-23 09:15:22'
  }
];

export default function BillingModule() {
  const [invoices, setInvoices] = useState<Invoice[]>(DEFAULT_INVOICES);
  const [quotations, setQuotations] = useState<Quotation[]>(DEFAULT_QUOTATIONS);
  const [receipts, setReceipts] = useState<Receipt[]>(DEFAULT_RECEIPTS);
  const [signatures, setSignatures] = useState<DigitalSignature[]>(DEFAULT_SIGNATURES);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'invoices' | 'quotations' | 'receipts' | 'signatures' | 'templates' | 'verify'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [showCreateInvoiceModal, setShowCreateInvoiceModal] = useState(false);
  const [showCreateQuotationModal, setShowCreateQuotationModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // New Invoice State
  const [custName, setCustName] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([
    { item_name: '', description: '', quantity: 1, unit_price: 0, discount: 0, tax_rate: 0, subtotal: 0 }
  ]);

  // Payment State
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState('Bank Transfer');

  // Digital Signature Pad State
  const [signerNameInput, setSignerNameInput] = useState('');
  const [signerTitleInput, setSignerTitleInput] = useState('');

  // Verification Hash State
  const [verifyHashInput, setVerifyHashInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);

  // Aggregates
  const totalInvoiced = invoices.reduce((acc, i) => acc + i.total_amount, 0);
  const totalCollected = invoices.reduce((acc, i) => acc + i.paid_amount, 0);
  const outstandingReceivables = totalInvoiced - totalCollected;

  const handleAddItem = () => {
    setItems([...items, { item_name: '', description: '', quantity: 1, unit_price: 0, discount: 0, tax_rate: 0, subtotal: 0 }]);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || items.length === 0) return;

    let sub = 0;
    let tax = 0;

    const formattedItems = items.map((it, idx) => {
      const lineSub = (it.quantity * it.unit_price) - it.discount;
      sub += lineSub;
      tax += lineSub * (it.tax_rate / 100);
      return { ...it, id: idx + 1, subtotal: lineSub };
    });

    const tot = sub + tax;

    const newInv: Invoice = {
      id: Date.now(),
      invoice_number: 'INV-' + new Date().toISOString().replace(/[-:]/g, '').split('T')[0] + '-' + Math.floor(1000 + Math.random() * 9000),
      customer_name: custName,
      customer_email: custEmail,
      issue_date: new Date().toISOString().split('T')[0],
      due_date: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      subtotal: sub,
      tax_amount: tax,
      discount_amount: 0,
      total_amount: tot,
      paid_amount: 0,
      currency: 'USD',
      status: 'sent',
      items: formattedItems
    };

    setInvoices([newInv, ...invoices]);
    setCustName('');
    setCustEmail('');
    setItems([{ item_name: '', description: '', quantity: 1, unit_price: 0, discount: 0, tax_rate: 0, subtotal: 0 }]);
    setShowCreateInvoiceModal(false);
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice || !payAmount) return;

    const amt = parseFloat(payAmount);
    const updatedInvoices = invoices.map(inv => {
      if (inv.id === selectedInvoice.id) {
        const newPaid = inv.paid_amount + amt;
        const status: Invoice['status'] = newPaid >= inv.total_amount ? 'paid' : 'partially_paid';
        return { ...inv, paid_amount: newPaid, status };
      }
      return inv;
    });

    // Create Payment Receipt
    const newReceipt: Receipt = {
      id: Date.now(),
      receipt_number: 'RCT-' + new Date().toISOString().replace(/[-:]/g, '').split('T')[0] + '-' + Math.floor(1000 + Math.random() * 9000),
      invoice_number: selectedInvoice.invoice_number,
      customer_name: selectedInvoice.customer_name,
      payment_amount: amt,
      payment_method: payMethod,
      payment_date: new Date().toISOString().split('T')[0],
      qr_code_hash: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
      signer_name: 'Authorized Signatory'
    };

    setInvoices(updatedInvoices);
    setReceipts([newReceipt, ...receipts]);
    setShowPaymentModal(false);
    setSelectedInvoice(null);
    setPayAmount('');
  };

  const handleConvertQuotation = (quotationId: number) => {
    const q = quotations.find(item => item.id === quotationId);
    if (!q) return;

    const newInv: Invoice = {
      id: Date.now(),
      invoice_number: 'INV-' + new Date().toISOString().replace(/[-:]/g, '').split('T')[0] + '-' + Math.floor(1000 + Math.random() * 9000),
      customer_name: q.customer_name,
      customer_email: q.customer_email,
      issue_date: new Date().toISOString().split('T')[0],
      due_date: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      subtotal: q.total_amount,
      tax_amount: 0,
      discount_amount: 0,
      total_amount: q.total_amount,
      paid_amount: 0,
      currency: q.currency,
      status: 'sent',
      items: q.items
    };

    setInvoices([newInv, ...invoices]);
    setQuotations(quotations.map(item => item.id === quotationId ? { ...item, status: 'converted' } : item));
  };

  const handleCreateSignature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerNameInput) return;

    const hashString = signerNameInput + '|' + signerTitleInput + '|' + Date.now();
    const verHash = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

    const newSig: DigitalSignature = {
      id: Date.now(),
      signer_name: signerNameInput,
      signer_title: signerTitleInput || 'Authorized Executive',
      signer_type: 'authorized',
      format: 'draw',
      verification_hash: verHash,
      signed_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    setSignatures([newSig, ...signatures]);
    setSignerNameInput('');
    setSignerTitleInput('');
  };

  const handleVerifyHash = () => {
    const match = signatures.find(s => s.verification_hash === verifyHashInput.trim()) || receipts.find(r => r.qr_code_hash === verifyHashInput.trim());
    if (match) {
      setVerificationResult({ valid: true, data: match });
    } else {
      setVerificationResult({ valid: false, message: 'Cryptographic hash not recognized in tenant signature ledger' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Billing, Invoices, Quotations & Digital Signatures</h1>
            <p className="text-xs text-slate-500">Professional Financial Documents, Automated Receipts, & Cryptographic Verification</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowCreateQuotationModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Quotation
          </button>
          <button 
            onClick={() => setShowCreateInvoiceModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Issue Invoice
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
          <FileCheck className="w-4 h-4" />
          Billing Overview
        </button>

        <button
          onClick={() => setActiveTab('invoices')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'invoices' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          Invoices ({invoices.length})
        </button>

        <button
          onClick={() => setActiveTab('quotations')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'quotations' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Send className="w-4 h-4" />
          Quotations ({quotations.length})
        </button>

        <button
          onClick={() => setActiveTab('receipts')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'receipts' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <QrCode className="w-4 h-4" />
          Receipts ({receipts.length})
        </button>

        <button
          onClick={() => setActiveTab('signatures')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'signatures' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <PenTool className="w-4 h-4" />
          Digital Signatures ({signatures.length})
        </button>

        <button
          onClick={() => setActiveTab('templates')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'templates' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          Template Studio
        </button>

        <button
          onClick={() => setActiveTab('verify')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'verify' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          QR Document Verification
        </button>
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <AdSuiteWidget slotName="Billing Banner Area" location="billing_dashboard" />

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Total Invoiced</div>
              <div className="text-2xl font-bold text-slate-900">${totalInvoiced.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <p className="text-xs text-blue-600 mt-1 font-medium">Issued across all clients</p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Total Collected</div>
              <div className="text-2xl font-bold text-emerald-600">${totalCollected.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <p className="text-xs text-emerald-700 mt-1 font-medium">Cleared payments in bank</p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Outstanding Receivables</div>
              <div className="text-2xl font-bold text-rose-600">${outstandingReceivables.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <p className="text-xs text-rose-500 mt-1 font-medium">Pending client collection</p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Active Quotations</div>
              <div className="text-2xl font-bold text-purple-600">${quotations.reduce((acc, q) => acc + q.total_amount, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <p className="text-xs text-purple-600 mt-1 font-medium">{quotations.length} Proposals sent</p>
            </div>
          </div>

          {/* Invoices List Preview */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Recent Financial Invoices</h3>
              <button onClick={() => setActiveTab('invoices')} className="text-xs font-bold text-blue-600 hover:underline">View All Invoices →</button>
            </div>

            <div className="space-y-3">
              {invoices.map(inv => (
                <div key={inv.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{inv.invoice_number}</span>
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                        inv.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {inv.status}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-700 mt-1">{inv.customer_name} ({inv.customer_email})</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right font-mono">
                      <div className="text-sm font-bold text-slate-900">${inv.total_amount.toFixed(2)}</div>
                      <div className="text-[10px] text-slate-500">Paid: ${inv.paid_amount.toFixed(2)}</div>
                    </div>

                    {inv.status !== 'paid' && (
                      <button 
                        onClick={() => { setSelectedInvoice(inv); setShowPaymentModal(true); }}
                        className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-700 transition"
                      >
                        Record Payment
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* INVOICES TAB */}
      {activeTab === 'invoices' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search invoice number, client name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Invoice Number</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Issue / Due Date</th>
                  <th className="px-4 py-3">Total Amount</th>
                  <th className="px-4 py-3">Paid Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">{inv.invoice_number}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{inv.customer_name}</td>
                    <td className="px-4 py-3 text-slate-500">{inv.issue_date} / {inv.due_date}</td>
                    <td className="px-4 py-3 font-bold font-mono text-slate-900">${inv.total_amount.toFixed(2)}</td>
                    <td className="px-4 py-3 font-bold font-mono text-emerald-600">${inv.paid_amount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full ${
                        inv.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {inv.status !== 'paid' && (
                        <button 
                          onClick={() => { setSelectedInvoice(inv); setShowPaymentModal(true); }}
                          className="px-2.5 py-1 bg-emerald-600 text-white font-bold text-[10px] rounded hover:bg-emerald-700 transition"
                        >
                          + Payment
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* QUOTATIONS TAB */}
      {activeTab === 'quotations' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-slate-900">Quotations & Proposals Register</h3>
            <div className="space-y-3">
              {quotations.map(q => (
                <div key={q.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{q.reference_no}</span>
                      <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold uppercase rounded-full">{q.status}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-700 mt-1">{q.customer_name} ({q.customer_email})</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right font-mono font-bold text-slate-900">${q.total_amount.toFixed(2)}</div>
                    {q.status !== 'converted' && (
                      <button 
                        onClick={() => handleConvertQuotation(q.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white font-bold text-xs rounded-lg hover:bg-indigo-700 transition"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Convert to Invoice
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RECEIPTS TAB */}
      {activeTab === 'receipts' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-slate-900">Official Payment Receipts & QR Hashes</h3>
            <div className="space-y-3">
              {receipts.map(r => (
                <div key={r.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-700">{r.receipt_number}</span>
                      <span className="text-xs text-slate-500">Ref: {r.invoice_number}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-800 mt-1">{r.customer_name} via {r.payment_method}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-1">QR Authenticity Hash: {r.qr_code_hash}</div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-base font-bold text-emerald-600">${r.payment_amount.toFixed(2)}</div>
                    <div className="text-[10px] text-slate-500">{r.payment_date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DIGITAL SIGNATURES TAB */}
      {activeTab === 'signatures' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <PenTool className="w-5 h-5 text-indigo-600" />
              Digital Signature Pad
            </h3>

            <form onSubmit={handleCreateSignature} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Signer Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Chief Executive Officer" 
                  value={signerNameInput}
                  onChange={(e) => setSignerNameInput(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title / Designation</label>
                <input 
                  type="text" 
                  placeholder="e.g. Global Financial Controller" 
                  value={signerTitleInput}
                  onChange={(e) => setSignerTitleInput(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div className="p-8 border-2 dashed border-slate-300 rounded-xl bg-slate-50 text-center text-slate-400 font-mono text-xs">
                [ Interactive Canvas Signature Pad Area - SHA-256 Anti-Tamper Hash Enabled ]
              </div>

              <button 
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
              >
                Log Digital Signature
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900">Signed Cryptographic Ledger</h3>
            <div className="space-y-3">
              {signatures.map(s => (
                <div key={s.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                  <div className="font-bold text-slate-900">{s.signer_name} ({s.signer_title})</div>
                  <div className="text-slate-500">{s.signed_at}</div>
                  <div className="font-mono text-[10px] text-indigo-600 break-all">Hash: {s.verification_hash}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* QR VERIFICATION TAB */}
      {activeTab === 'verify' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 max-w-lg mx-auto">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Document & Signature Authenticity Verification
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Enter QR Code or Verification Hash</label>
              <input 
                type="text" 
                placeholder="Paste SHA-256 verification hash..." 
                value={verifyHashInput}
                onChange={(e) => setVerifyHashInput(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none"
              />
            </div>

            <button 
              onClick={handleVerifyHash}
              className="w-full py-2 bg-emerald-600 text-white font-bold text-sm rounded-lg hover:bg-emerald-700 transition"
            >
              Verify Document
            </button>

            {verificationResult && (
              <div className={`p-4 rounded-xl border text-xs ${
                verificationResult.valid ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                {verificationResult.valid ? (
                  <div className="space-y-1">
                    <div className="font-bold uppercase text-emerald-800">✓ VERIFIED AUTHENTIC DOCUMENT</div>
                    <div>Signer: {verificationResult.data.signer_name || verificationResult.data.customer_name}</div>
                    <div className="font-mono text-[10px]">Hash: {verifyHashInput}</div>
                  </div>
                ) : (
                  <div>❌ {verificationResult.message}</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CREATE INVOICE MODAL */}
      {showCreateInvoiceModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900">Issue New Financial Invoice</h3>
              <button onClick={() => setShowCreateInvoiceModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Customer / Organization Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Acme Enterprise Global" 
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Email</label>
                <input 
                  type="email" 
                  placeholder="e.g. billing@acmeglobal.com" 
                  value={custEmail}
                  onChange={(e) => setCustEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none"
                />
              </div>

              {/* Line Items */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">Invoice Items</span>
                  <button type="button" onClick={handleAddItem} className="text-xs font-semibold text-blue-600 hover:underline">+ Add Line Item</button>
                </div>

                {items.map((it, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
                    <input 
                      type="text" 
                      placeholder="Item Name" 
                      value={it.item_name}
                      onChange={(e) => {
                        const newI = [...items];
                        newI[idx].item_name = e.target.value;
                        setItems(newI);
                      }}
                      className="w-full p-2 border border-slate-200 rounded bg-white"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="number" 
                        placeholder="Qty" 
                        value={it.quantity || ''}
                        onChange={(e) => {
                          const newI = [...items];
                          newI[idx].quantity = parseFloat(e.target.value) || 0;
                          setItems(newI);
                        }}
                        className="p-1.5 border border-slate-200 rounded bg-white"
                      />
                      <input 
                        type="number" 
                        placeholder="Unit Price ($)" 
                        value={it.unit_price || ''}
                        onChange={(e) => {
                          const newI = [...items];
                          newI[idx].unit_price = parseFloat(e.target.value) || 0;
                          setItems(newI);
                        }}
                        className="p-1.5 border border-slate-200 rounded bg-white font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowCreateInvoiceModal(false)} className="px-4 py-2 border border-slate-200 text-slate-600 font-medium text-sm rounded-lg hover:bg-slate-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition">Issue Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECORD PAYMENT MODAL */}
      {showPaymentModal && selectedInvoice && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900">Record Payment for {selectedInvoice.invoice_number}</h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Payment Amount ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg font-mono text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Payment Method</label>
                <select 
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                >
                  <option value="Bank Transfer">Bank Wire Transfer</option>
                  <option value="Credit Card">Credit Card Processing</option>
                  <option value="Cheque">Corporate Cheque</option>
                  <option value="Cash">Cash Vault</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowPaymentModal(false)} className="px-4 py-2 border border-slate-200 text-slate-600 font-medium text-sm rounded-lg hover:bg-slate-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white font-medium text-sm rounded-lg hover:bg-emerald-700 transition">Confirm Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
