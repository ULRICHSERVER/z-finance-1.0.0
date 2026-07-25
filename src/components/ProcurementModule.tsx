import React, { useState } from 'react';
import {
  ShoppingBag,
  Building2,
  FileText,
  FileSpreadsheet,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  DollarSign,
  Truck,
  ShieldCheck,
  Megaphone,
  UserCheck,
  Zap,
  Tag,
  Star,
  Layers,
  ArrowUpRight,
  Download,
  Eye,
  XCircle,
  FileCheck,
  RefreshCw
} from 'lucide-react';

export type ProcurementTab = 
  | 'overview'
  | 'suppliers'
  | 'requisitions'
  | 'rfq'
  | 'comparison'
  | 'purchase_orders'
  | 'receipts'
  | 'contracts'
  | 'performance';

interface SupplierItem {
  id: string;
  code: string;
  companyName: string;
  industry: string;
  country: string;
  email: string;
  phone: string;
  paymentTerms: string;
  rating: number;
  riskLevel: 'low' | 'medium' | 'high';
  status: 'active' | 'pending_approval' | 'suspended';
}

interface PurchaseOrderItem {
  id: string;
  poNumber: string;
  supplierName: string;
  totalAmount: number;
  expectedDelivery: string;
  status: 'approved' | 'sent' | 'partially_received' | 'fully_received' | 'pending_approval';
  signatureHash: string;
}

interface ContractItem {
  id: string;
  contractNumber: string;
  supplierName: string;
  title: string;
  type: string;
  value: number;
  endDate: string;
  status: 'active' | 'expiring_soon' | 'expired';
}

export default function ProcurementModule() {
  const [activeTab, setActiveTab] = useState<ProcurementTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddSupplierModalOpen, setIsAddSupplierModalOpen] = useState(false);
  const [isCreatePOModalOpen, setIsCreatePOModalOpen] = useState(false);

  // Sample Mock Suppliers
  const [suppliers] = useState<SupplierItem[]>([
    {
      id: 'SUP-001',
      code: 'SUP-OCTA-01',
      companyName: 'OctaTech Enterprise Hardware Solutions',
      industry: 'IT & Data Center Gear',
      country: 'Germany',
      email: 'procurement@octatech.de',
      phone: '+49 30 9823019',
      paymentTerms: 'Net 30',
      rating: 4.8,
      riskLevel: 'low',
      status: 'active'
    },
    {
      id: 'SUP-002',
      code: 'SUP-GLOBAL-02',
      companyName: 'Global Paper & Office Depot Direct',
      industry: 'Office Supplies & Consumables',
      country: 'United Kingdom',
      email: 'sales@globalpaper.co.uk',
      phone: '+44 20 79460912',
      paymentTerms: 'Net 15',
      rating: 4.5,
      riskLevel: 'low',
      status: 'active'
    },
    {
      id: 'SUP-003',
      code: 'SUP-BIOT-03',
      companyName: 'BioTech Precision Instruments GmbH',
      industry: 'Laboratory & Medical Tools',
      country: 'Switzerland',
      email: 'orders@biotech-precision.ch',
      phone: '+41 44 2341098',
      paymentTerms: 'Net 45',
      rating: 4.9,
      riskLevel: 'low',
      status: 'active'
    }
  ]);

  // Sample Purchase Orders
  const [purchaseOrders] = useState<PurchaseOrderItem[]>([
    {
      id: 'PO-1001',
      poNumber: 'PO-2026-0812',
      supplierName: 'OctaTech Enterprise Hardware Solutions',
      totalAmount: 48500.00,
      expectedDelivery: '2026-08-02',
      status: 'approved',
      signatureHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    },
    {
      id: 'PO-1002',
      poNumber: 'PO-2026-0813',
      supplierName: 'Global Paper & Office Depot Direct',
      totalAmount: 3250.00,
      expectedDelivery: '2026-07-30',
      status: 'partially_received',
      signatureHash: 'a89c3140d2382f7194f4c82b1307b233a1e27101e4649b934ca495991b7852b811'
    }
  ]);

  // Sample Contracts
  const [contracts] = useState<ContractItem[]>([
    {
      id: 'CTR-01',
      contractNumber: 'CTR-2026-001',
      supplierName: 'OctaTech Enterprise Hardware Solutions',
      title: 'Global Master Server & Network Gear SLA',
      type: 'Framework Agreement',
      value: 250000.00,
      endDate: '2027-12-31',
      status: 'active'
    },
    {
      id: 'CTR-02',
      contractNumber: 'CTR-2026-002',
      supplierName: 'BioTech Precision Instruments GmbH',
      title: 'Annual Lab Equipment Maintenance & Calibration SLA',
      type: 'Maintenance Contract',
      value: 45000.00,
      endDate: '2026-08-15',
      status: 'expiring_soon'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-lg shadow-xs">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Procurement & Supplier Management</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Vendor qualification, RFQ bidding, Purchase Orders, 3-way invoice matching, and SLA contract management.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCreatePOModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Purchase Order
          </button>
          <button
            onClick={() => setIsAddSupplierModalOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            <Building2 className="w-4 h-4" />
            Register Supplier
          </button>
        </div>
      </div>

      {/* Super Admin Advertisement Placement */}
      <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-200 p-3 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-blue-900 font-medium">
          <Megaphone className="w-4 h-4 text-blue-600" />
          <span><strong>Supplier Network:</strong> Connect with pre-vetted EU & Global B2B Hardware Distributors with instant credit lines.</span>
        </div>
        <span className="text-[10px] bg-blue-200 text-blue-800 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">Managed by Super Admin</span>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto pb-1">
        {[
          { id: 'overview', label: 'Procurement Dashboard', icon: TrendingUp },
          { id: 'suppliers', label: 'Supplier Directory', icon: Building2 },
          { id: 'requisitions', label: 'Purchase Requisitions', icon: FileText },
          { id: 'rfq', label: 'Requests for Quotation (RFQ)', icon: FileSpreadsheet },
          { id: 'comparison', label: 'Vendor Comparison', icon: Award },
          { id: 'purchase_orders', label: 'Purchase Orders (PO)', icon: ShoppingBag },
          { id: 'receipts', label: 'Goods Receipts & 3-Way Match', icon: Truck },
          { id: 'contracts', label: 'Supplier Contracts', icon: FileCheck },
          { id: 'performance', label: 'Supplier Performance', icon: Star },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ProcurementTab)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW DASHBOARD */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Pending Requisitions</span>
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">8 Requisitions</div>
              <div className="text-[11px] text-amber-600 mt-1">Awaiting Manager Approval</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Active Purchase Orders</span>
                <ShoppingBag className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">14 Orders</div>
              <div className="text-[11px] text-blue-600 mt-1">Total Value: $485,200.00</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Procurement Savings</span>
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">$42,100.00</div>
              <div className="text-[11px] text-emerald-600 mt-1">8.6% below initial budget</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Contracts Expiring</span>
                <AlertTriangle className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">3 Contracts</div>
              <div className="text-[11px] text-purple-600 mt-1">Action required within 30 days</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-blue-600" />
                Recent Purchase Orders Status
              </h2>

              <div className="space-y-3">
                {purchaseOrders.map(po => (
                  <div key={po.id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{po.poNumber}</div>
                      <div className="text-[11px] text-slate-500">{po.supplierName}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs font-bold text-slate-900">${po.totalAmount.toFixed(2)}</div>
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-semibold capitalize">
                        {po.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Procurement 3-Way Invoice Matching Ledger
              </h2>

              <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-lg space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-emerald-900">
                  <span>PO #PO-2026-0812 Matching Result</span>
                  <span className="three-way-match-badge">3-Way Matched</span>
                </div>
                <p className="text-[11px] text-emerald-800">
                  Purchase Order ($48,500.00), Goods Receipt Note (GRN-401), and Supplier Invoice #INV-881 match with zero discrepancies. Automated journal entries posted to General Ledger.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SUPPLIERS DIRECTORY */}
      {activeTab === 'suppliers' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search suppliers by name, code, or tax ID..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-600">
                  <th className="py-3 px-4">SUPPLIER CODE & NAME</th>
                  <th className="py-3 px-4">INDUSTRY & COUNTRY</th>
                  <th className="py-3 px-4">CONTACT & EMAIL</th>
                  <th className="py-3 px-4">PAYMENT TERMS</th>
                  <th className="py-3 px-4 text-center">RATING</th>
                  <th className="py-3 px-4 text-center">RISK LEVEL</th>
                  <th className="py-3 px-4 text-center">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {suppliers.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{s.companyName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{s.code}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div>{s.industry}</div>
                      <div className="text-[10px] text-slate-400">{s.country}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div>{s.email}</div>
                      <div className="text-[10px] text-slate-400">{s.phone}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{s.paymentTerms}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="vendor-rating-stars">★ {s.rating}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold uppercase">
                        {s.riskLevel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded capitalize">
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 8: SUPPLIER CONTRACTS */}
      {activeTab === 'contracts' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="p-4 border-b border-slate-200 font-bold text-sm text-slate-900 flex items-center justify-between">
            <span>Enterprise B2B Supplier Contracts & Framework SLAs</span>
            <span className="text-xs font-normal text-slate-500">2 Active Contracts</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-600">
                  <th className="py-3 px-4">CONTRACT # / TITLE</th>
                  <th className="py-3 px-4">SUPPLIER</th>
                  <th className="py-3 px-4">TYPE</th>
                  <th className="py-3 px-4 text-right">TOTAL VALUE</th>
                  <th className="py-3 px-4">EXPIRATION DATE</th>
                  <th className="py-3 px-4 text-center">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {contracts.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{c.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{c.contractNumber}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">{c.supplierName}</td>
                    <td className="py-3 px-4">{c.type}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">${c.value.toFixed(2)}</td>
                    <td className="py-3 px-4 text-slate-500">{c.endDate}</td>
                    <td className="py-3 px-4 text-center">
                      {c.status === 'active' && <span className="text-[10px] bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded">Active</span>}
                      {c.status === 'expiring_soon' && <span className="text-[10px] bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded">Expiring Soon</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
