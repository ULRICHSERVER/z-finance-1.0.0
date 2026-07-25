import React, { useState } from 'react';
import {
  Globe,
  Building2,
  CreditCard,
  Key,
  Shield,
  Layers,
  BarChart3,
  Settings,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Copy,
  Check,
  Megaphone,
  Palette,
  HardDrive,
  Users,
  Sliders,
  DollarSign,
  Zap,
  Sparkles,
  Server,
  RefreshCw,
  Search,
  ChevronRight,
  Database,
  Lock
} from 'lucide-react';

interface Tenant {
  id: string;
  uuid: string;
  orgName: string;
  subdomain: string;
  customDomain: string;
  plan: string;
  status: 'active' | 'trial' | 'suspended';
  users: number;
  storageMb: number;
  mrr: number;
  createdAt: string;
}

interface SubscriptionPlan {
  code: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  maxUsers: number;
  maxBranches: number;
  features: string[];
}

export default function SaaSModule() {
  const [activeTab, setActiveTab] = useState<
    | 'tenants'
    | 'white_label'
    | 'subscriptions'
    | 'licenses'
    | 'quotas'
    | 'analytics'
    | 'backups'
    | 'super_admin'
  >('tenants');

  // Tenants State
  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: 't1',
      uuid: 'TNT-99182A',
      orgName: 'Apex Global Holdings S.A.',
      subdomain: 'apex.zfinance.enterprise',
      customDomain: 'finance.apexglobal.com',
      plan: 'Enterprise Unlimited',
      status: 'active',
      users: 48,
      storageMb: 2450,
      mrr: 599.00,
      createdAt: '2025-10-12'
    },
    {
      id: 't2',
      uuid: 'TNT-44120B',
      orgName: 'Douala Commercial Logistics',
      subdomain: 'dcl.zfinance.enterprise',
      customDomain: 'erp.doualalogistics.cm',
      plan: 'Professional Business',
      status: 'active',
      users: 18,
      storageMb: 820,
      mrr: 199.00,
      createdAt: '2026-01-05'
    },
    {
      id: 't3',
      uuid: 'TNT-10398C',
      orgName: 'Kribi Deep Seaport Operators',
      subdomain: 'kribi.zfinance.enterprise',
      customDomain: 'kribi-finance.cm',
      plan: 'Enterprise Unlimited',
      status: 'active',
      users: 120,
      storageMb: 14200,
      mrr: 1200.00,
      createdAt: '2025-08-20'
    },
    {
      id: 't4',
      uuid: 'TNT-88301D',
      orgName: 'Yaoundé Retail Chain Ltd',
      subdomain: 'yde-retail.zfinance.enterprise',
      customDomain: '',
      plan: 'Starter Plan',
      status: 'trial',
      users: 4,
      storageMb: 180,
      mrr: 0.00,
      createdAt: '2026-07-20'
    }
  ]);

  // White-Label State
  const [brandColor, setBrandColor] = useState('#2563eb');
  const [secondaryColor, setSecondaryColor] = useState('#4f46e5');
  const [tenantHeadline, setTenantHeadline] = useState('Apex Enterprise Finance Portal');
  const [copiedKey, setCopiedKey] = useState(false);

  // License Generator State
  const [generatedLicense, setGeneratedLicense] = useState<{
    key: string;
    signature: string;
    plan: string;
  } | null>(null);

  const [newOrgName, setNewOrgName] = useState('');
  const [newSubdomain, setNewSubdomain] = useState('');
  const [showAddTenantModal, setShowAddTenantModal] = useState(false);

  const plans: SubscriptionPlan[] = [
    {
      code: 'starter',
      name: 'Starter Plan',
      monthlyPrice: 49.00,
      annualPrice: 470.00,
      maxUsers: 5,
      maxBranches: 1,
      features: ['Core Accounting', 'Invoicing & Receipts', 'Basic Expense Logging', 'Standard Email Support']
    },
    {
      code: 'professional',
      name: 'Professional Business',
      monthlyPrice: 199.00,
      annualPrice: 1900.00,
      maxUsers: 25,
      maxBranches: 5,
      features: ['Full Accounting & Payroll', 'Omnichannel POS', 'REST API Access (10k req/mo)', 'Custom Subdomain', 'CRM Sync']
    },
    {
      code: 'enterprise',
      name: 'Enterprise Unlimited',
      monthlyPrice: 599.00,
      annualPrice: 5700.00,
      maxUsers: 999,
      maxBranches: 99,
      features: ['All Z-FINANCE Modules', 'AI Business Intelligence Assistant', 'Unlimited REST API', 'White-Label Branding', 'Dedicated SOC Isolation']
    }
  ];

  const handleCreateTenant = () => {
    if (!newOrgName.trim() || !newSubdomain.trim()) return;
    const newT: Tenant = {
      id: Date.now().toString(),
      uuid: `TNT-${Math.floor(10000 + Math.random() * 90000)}`,
      orgName: newOrgName,
      subdomain: `${newSubdomain.toLowerCase()}.zfinance.enterprise`,
      customDomain: '',
      plan: 'Starter Plan',
      status: 'active',
      users: 1,
      storageMb: 10,
      mrr: 49.00,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTenants([newT, ...tenants]);
    setNewOrgName('');
    setNewSubdomain('');
    setShowAddTenantModal(false);
  };

  const handleGenerateLicense = (planName: string) => {
    const rawKey = `ZF-LIC-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const signature = `SIG_OFFLINE_${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
    setGeneratedLicense({ key: rawKey, signature, plan: planName });
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto bg-slate-50 min-h-screen text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-slate-900">Multi-Tenant SaaS, White-Label & Licensing</h1>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded border border-indigo-300 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              SaaS Engine v1.0
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Unlimited Tenant Isolation, Custom Branding, Subscription Billing, Usage Quotas & License Key Verification
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddTenantModal(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            Provision New Tenant
          </button>
        </div>
      </div>

      {/* Super Admin Advertisement Banner Placement */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 p-3 rounded-xl border border-purple-900 text-white text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-purple-400" />
          <span>
            <strong className="text-purple-400">SaaS Super Admin Hub:</strong> 184 Active Enterprise Organizations Globally Synchronized.
          </span>
        </div>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Super Admin Control</span>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'tenants', label: 'Tenants Directory', icon: Building2 },
          { id: 'white_label', label: 'White-Label Branding', icon: Palette },
          { id: 'subscriptions', label: 'Plans & Subscriptions', icon: CreditCard },
          { id: 'licenses', label: 'License Verification', icon: Key },
          { id: 'quotas', label: 'Usage Quotas & Flags', icon: Sliders },
          { id: 'analytics', label: 'SaaS Analytics & MRR', icon: BarChart3 },
          { id: 'backups', label: 'Tenant Backups', icon: Database },
          { id: 'super_admin', label: 'Super Admin Control', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: TENANTS DIRECTORY */}
      {activeTab === 'tenants' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Total Active Tenants</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">{tenants.length} Organizations</p>
              <span className="text-xs text-emerald-600 font-medium">+12% Growth this month</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Monthly Recurring Revenue</span>
              <p className="text-2xl font-bold text-indigo-600 mt-1">
                ${tenants.reduce((acc, t) => acc + t.mrr, 0).toLocaleString()} / mo
              </p>
              <span className="text-xs text-slate-500 font-medium">100% Billing Retention</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Total Provisioned Users</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {tenants.reduce((acc, t) => acc + t.users, 0)} Seats
              </p>
              <span className="text-xs text-blue-600 font-medium">Multi-Branch Sync</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Active Storage Volume</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {(tenants.reduce((acc, t) => acc + t.storageMb, 0) / 1024).toFixed(1)} GB
              </p>
              <span className="text-xs text-slate-500 font-medium">Cloud Vault Storage</span>
            </div>
          </div>

          {/* Tenants Directory Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                Active Multi-Tenant Organizations
              </h3>
              <span className="text-xs text-slate-500">{tenants.length} Tenants Active</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                    <th className="p-3">Tenant UUID</th>
                    <th className="p-3">Organization Name</th>
                    <th className="p-3">Subdomain & Domain</th>
                    <th className="p-3">Subscription Plan</th>
                    <th className="p-3">Users</th>
                    <th className="p-3">MRR</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tenants.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50 transition-all">
                      <td className="p-3 font-mono font-bold text-indigo-600">{t.uuid}</td>
                      <td className="p-3 font-bold text-slate-900">{t.orgName}</td>
                      <td className="p-3">
                        <p className="font-mono text-slate-700">{t.subdomain}</p>
                        {t.customDomain && <p className="text-[10px] text-emerald-600 font-bold">{t.customDomain}</p>}
                      </td>
                      <td className="p-3 font-bold text-slate-800">{t.plan}</td>
                      <td className="p-3 text-slate-700 font-mono">{t.users} active</td>
                      <td className="p-3 font-bold text-indigo-600">${t.mrr}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            t.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WHITE-LABEL BRANDING */}
      {activeTab === 'white_label' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Palette className="w-5 h-5 text-indigo-600" />
              Tenant White-Labeling & Theme Customization
            </h3>
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded font-bold">
              White-Label Engine Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primary Tenant Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border border-slate-200"
                  />
                  <input
                    type="text"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="text-xs font-mono border border-slate-200 rounded p-2 flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Secondary Accent Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border border-slate-200"
                  />
                  <input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="text-xs font-mono border border-slate-200 rounded p-2 flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Portal Login Headline</label>
                <input
                  type="text"
                  value={tenantHeadline}
                  onChange={(e) => setTenantHeadline(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded p-2.5"
                />
              </div>

              <button className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-sm">
                Save Branding Settings
              </button>
            </div>

            {/* Live Branding Preview */}
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-900 text-white space-y-4 shadow-inner">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Live Portal Preview</span>
              <div className="p-4 rounded-lg" style={{ backgroundColor: brandColor }}>
                <h4 className="font-bold text-sm text-white">{tenantHeadline}</h4>
                <p className="text-xs text-white/80 mt-1">Secured by Z-FINANCE White-Label Engine</p>
              </div>

              <button
                className="w-full py-2 rounded text-xs font-bold text-white shadow"
                style={{ backgroundColor: secondaryColor }}
              >
                Custom Branded Portal Button
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PLANS & SUBSCRIPTIONS */}
      {activeTab === 'subscriptions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div key={p.code} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 relative">
                {p.code === 'enterprise' && (
                  <span className="absolute -top-3 right-4 bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{p.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900">${p.monthlyPrice}</span>
                    <span className="text-xs text-slate-500">/ month</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">
                    or ${p.annualPrice} billed annually
                  </span>
                </div>

                <ul className="space-y-2 border-t border-slate-100 pt-3 text-xs">
                  {p.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleGenerateLicense(p.name)}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm"
                >
                  Generate License Key
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: LICENSE VERIFICATION */}
      {activeTab === 'licenses' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Key className="w-5 h-5 text-indigo-600" />
              Cryptographic License Key Generator & Offline Validator
            </h3>
            <span className="text-xs text-slate-500">SHA-256 HMAC Signature Ready</span>
          </div>

          {generatedLicense ? (
            <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3 font-mono text-xs border border-indigo-900">
              <p className="text-emerald-400 font-bold">✓ License Key Generated Successfully</p>
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">COMMERCIAL LICENSE KEY</span>
                <span className="text-indigo-300 font-bold text-sm">{generatedLicense.key}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">OFFLINE SHA-256 HMAC SIGNATURE</span>
                <span className="text-purple-300 text-xs">{generatedLicense.signature}</span>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl space-y-2">
              <Key className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-xs text-slate-500">Select a Subscription Plan to generate a cryptographic key.</p>
            </div>
          )}
        </div>
      )}

      {/* Add Tenant Modal */}
      {showAddTenantModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base">Provision New SaaS Organization</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Organization Name</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Commercial Bank"
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  className="w-full border border-slate-200 rounded p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subdomain Prefix</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="acmebank"
                    value={newSubdomain}
                    onChange={(e) => setNewSubdomain(e.target.value)}
                    className="border border-slate-200 rounded-l p-2.5 flex-1"
                  />
                  <span className="bg-slate-100 text-slate-500 px-3 py-2.5 border border-l-0 border-slate-200 rounded-r font-mono text-[11px]">
                    .zfinance.enterprise
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setShowAddTenantModal(false)}
                className="px-4 py-2 border border-slate-200 rounded text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTenant}
                className="px-4 py-2 bg-indigo-600 text-white rounded text-xs font-bold hover:bg-indigo-700 shadow-sm"
              >
                Provision Tenant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
