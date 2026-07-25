import React, { useState } from 'react';
import {
  Code,
  Key,
  Webhook,
  Globe,
  Shield,
  Zap,
  Database,
  Layers,
  Settings,
  Activity,
  Terminal,
  Cpu,
  Copy,
  Plus,
  Check,
  Trash2,
  Download,
  RefreshCw,
  Play,
  CheckCircle,
  Megaphone,
  Lock,
  Server,
  Smartphone,
  Box,
  Share2,
  DollarSign,
  Send,
  MessageSquare,
  HardDrive,
  FileText,
  Sliders,
  Sparkles,
  Search,
  Eye,
  AlertTriangle
} from 'lucide-react';

interface ApiKey {
  id: string;
  uuid: string;
  name: string;
  environment: 'sandbox' | 'production';
  keyHash: string;
  rateLimit: string;
  status: 'active' | 'revoked';
  created: string;
}

interface WebhookItem {
  id: string;
  uuid: string;
  name: string;
  targetUrl: string;
  events: string[];
  status: 'active' | 'disabled';
  lastStatus: number;
}

interface PluginItem {
  id: string;
  code: string;
  name: string;
  version: string;
  author: string;
  status: 'active' | 'disabled';
  category: string;
}

export default function DeveloperModule() {
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'api_keys'
    | 'openapi'
    | 'webhooks'
    | 'gateways'
    | 'sdks'
    | 'plugins'
    | 'monitoring'
    | 'super_admin'
  >('dashboard');

  // API Keys state
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      uuid: 'ZF-KEY-9981',
      name: 'Mobile App Mobile-Money Gateway Key',
      environment: 'production',
      keyHash: 'zf_live_89a0b1c2d3e4f567890abcdef...',
      rateLimit: '5,000 req/min',
      status: 'active',
      created: '2026-01-10'
    },
    {
      id: '2',
      uuid: 'ZF-KEY-9982',
      name: 'E-Commerce WooCommerce Production Key',
      environment: 'production',
      keyHash: 'zf_live_12345678901234567890123...',
      rateLimit: '2,000 req/min',
      status: 'active',
      created: '2026-02-14'
    },
    {
      id: '3',
      uuid: 'ZF-KEY-9983',
      name: 'Dev Testing Sandbox Secret Key',
      environment: 'sandbox',
      keyHash: 'zf_sbx_98765432109876543210987...',
      rateLimit: '1,000 req/min',
      status: 'active',
      created: '2026-03-01'
    }
  ]);

  // Webhooks state
  const [webhooks, setWebhooks] = useState<WebhookItem[]>([
    {
      id: '101',
      uuid: 'WH-881',
      name: 'Stripe & Paystack Payment Real-Time Hook',
      targetUrl: 'https://api.merchant.com/v1/webhooks/zfinance',
      events: ['invoice.paid', 'payment.received'],
      status: 'active',
      lastStatus: 200
    },
    {
      id: '102',
      uuid: 'WH-882',
      name: 'MTN MoMo Settlement & Collection Notification',
      targetUrl: 'https://momo.momoapi.mtn.cm/callback/zfinance',
      events: ['momo.disbursement.success'],
      status: 'active',
      lastStatus: 200
    }
  ]);

  // Plugins state
  const [plugins, setPlugins] = useState<PluginItem[]>([
    {
      id: 'p1',
      code: 'plugin_vat_eu',
      name: 'EU OSS VAT & Automated Tax Calculator',
      version: '1.4.0',
      author: 'Z-Finance Core Team',
      status: 'active',
      category: 'Tax & Compliance'
    },
    {
      id: 'p2',
      code: 'plugin_crypto_treasury',
      name: 'Corporate USDT & Bitcoin Wallet Ledger Sync',
      version: '2.1.0',
      author: 'FinTech Labs',
      status: 'active',
      category: 'Treasury & Crypto'
    }
  ]);

  // Modal / Input State
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyEnv, setNewKeyEnv] = useState<'sandbox' | 'production'>('sandbox');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCreateApiKey = () => {
    if (!newKeyName.trim()) return;
    const newKey: ApiKey = {
      id: Date.now().toString(),
      uuid: `ZF-KEY-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newKeyName,
      environment: newKeyEnv,
      keyHash: `zf_${newKeyEnv === 'production' ? 'live' : 'sbx'}_${Math.random().toString(36).substring(2)}...`,
      rateLimit: '1,000 req/min',
      status: 'active',
      created: new Date().toISOString().split('T')[0]
    };
    setApiKeys([newKey, ...apiKeys]);
    setNewKeyName('');
  };

  const toggleKeyStatus = (id: string) => {
    setApiKeys(
      apiKeys.map((k) =>
        k.id === id ? { ...k, status: k.status === 'active' ? 'revoked' : 'active' } : k
      )
    );
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto bg-slate-50 min-h-screen text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Code className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900">Developer Portal, REST API & Webhooks</h1>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-300 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              API v1.0.0
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Enterprise OpenAPI 3.1 Platform, Webhook Dispatcher, Multi-Language SDKs, Payment Gateways & Plugin Marketplace
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('api_keys')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Key className="w-4 h-4" />
            Manage API Keys
          </button>
        </div>
      </div>

      {/* Super Admin Advertisement Placement Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-3 rounded-xl border border-indigo-900 text-white text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-amber-400" />
          <span>
            <strong className="text-amber-400">Super Admin Developer Ad:</strong> Connect Z-FINANCE API Gateway to AWS Cloud, Google Cloud Storage, MTN MoMo & Stripe Connect.
          </span>
        </div>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Managed by Super Admin</span>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'dashboard', label: 'Developer Dashboard', icon: Activity },
          { id: 'api_keys', label: 'API Keys & OAuth', icon: Key },
          { id: 'openapi', label: 'OpenAPI / Swagger Docs', icon: FileText },
          { id: 'webhooks', label: 'Webhook Engine', icon: Webhook },
          { id: 'gateways', label: 'Payment & Comm Connectors', icon: DollarSign },
          { id: 'sdks', label: 'Client SDKs', icon: Smartphone },
          { id: 'plugins', label: 'Plugin Registry', icon: Box },
          { id: 'monitoring', label: 'API Monitoring', icon: Server },
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
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: DEVELOPER DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">24h API Volume</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">124,500 Requests</p>
              <span className="text-xs text-emerald-600 font-medium">99.98% Success Rate</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Active API Keys</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">{apiKeys.length} Active Keys</p>
              <span className="text-xs text-blue-600 font-medium">Sandbox & Production</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Webhooks Dispatched</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">12,480 Events</p>
              <span className="text-xs text-indigo-600 font-medium">Avg Latency: 45 ms</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Installed Plugins</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">{plugins.length} Active Plugins</p>
              <span className="text-xs text-amber-600 font-medium">Sandboxed Environment</span>
            </div>
          </div>

          {/* Quick API Endpoints Summary */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Primary REST API v1 Endpoints
              </h3>
              <span className="text-xs text-slate-500">JSON Format • JWT / Bearer Auth</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {[
                { method: 'GET', path: '/api/v1/invoices', desc: 'List & Filter Invoices' },
                { method: 'POST', path: '/api/v1/invoices', desc: 'Create Invoice & Issue PDF' },
                { method: 'GET', path: '/api/v1/expenses', desc: 'Retrieve Ledger Expense Records' },
                { method: 'POST', path: '/api/v1/payments/momo', desc: 'Initiate MTN/Orange Money Push' },
                { method: 'GET', path: '/api/v1/inventory/stock', desc: 'Query Real-time Inventory Balances' },
                { method: 'POST', path: '/api/v1/pos/transactions', desc: 'Process POS Register Sale' }
              ].map((ep, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] ${
                        ep.method === 'GET'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="font-mono font-bold text-slate-800">{ep.path}</span>
                  </div>
                  <span className="text-slate-500">{ep.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: API KEYS & OAUTH */}
      {activeTab === 'api_keys' && (
        <div className="space-y-6">
          {/* Create Key Form */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
              <Key className="w-5 h-5 text-blue-600" />
              Issue New API Key
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-6 space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase">Application / Service Name</label>
                <input
                  type="text"
                  placeholder="e.g. WooCommerce E-Commerce Integration"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50"
                />
              </div>

              <div className="md:col-span-4 space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase">Environment Target</label>
                <select
                  value={newKeyEnv}
                  onChange={(e) => setNewKeyEnv(e.target.value as any)}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50"
                >
                  <option value="sandbox">Sandbox (Development)</option>
                  <option value="production">Production (Live Data)</option>
                </select>
              </div>

              <div className="md:col-span-2 flex items-end">
                <button
                  onClick={handleCreateApiKey}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Generate Key
                </button>
              </div>
            </div>
          </div>

          {/* Keys Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
              Active Application Secrets & API Keys
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                    <th className="p-3">UUID</th>
                    <th className="p-3">Key Name</th>
                    <th className="p-3">Environment</th>
                    <th className="p-3">Secret Key Hash</th>
                    <th className="p-3">Rate Limit</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {apiKeys.map((k) => (
                    <tr key={k.id} className="hover:bg-slate-50 transition-all">
                      <td className="p-3 font-mono font-bold text-blue-600">{k.uuid}</td>
                      <td className="p-3 font-bold text-slate-900">{k.name}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            k.environment === 'production'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {k.environment}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-slate-600">{k.keyHash}</td>
                      <td className="p-3 text-slate-700 font-medium">{k.rateLimit}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            k.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {k.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(k.id, k.keyHash)}
                            className="p-1 hover:bg-slate-200 rounded text-slate-600"
                            title="Copy Key"
                          >
                            {copiedId === k.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => toggleKeyStatus(k.id)}
                            className="p-1 hover:bg-slate-200 rounded text-rose-600"
                            title="Revoke / Reactivate Key"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: OPENAPI / SWAGGER */}
      {activeTab === 'openapi' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              OpenAPI 3.1 & Interactive Swagger Documentation
            </h3>
            <a
              href="/api/v1/index.php?resource=openapi"
              target="_blank"
              rel="noreferrer"
              className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded font-bold hover:bg-blue-700 flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> Download OpenAPI Specification
            </a>
          </div>

          <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs space-y-2 overflow-x-auto">
            <p className="text-emerald-400">// Z-FINANCE OpenAPI 3.1 Interactive Endpoint Testing</p>
            <p className="text-blue-300">GET /api/v1/invoices?status=paid&limit=10</p>
            <p className="text-slate-400">Host: api.zfinance.enterprise</p>
            <p className="text-slate-400">Authorization: Bearer zf_live_9981a2b3c4d5e6f...</p>
            <div className="border-t border-slate-800 pt-2 text-slate-300">
              <p>{"{"}</p>
              <p className="pl-4">"status": "success",</p>
              <p className="pl-4">"page": 1,</p>
              <p className="pl-4">"total_records": 1280,</p>
              <p className="pl-4">"data": [</p>
              <p className="pl-8">{"{ \"uuid\": \"INV-2026-001\", \"amount\": 1450.00, \"currency\": \"EUR\" }"}</p>
              <p className="pl-4">]</p>
              <p>{"}"}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: GATEWAYS & CONNECTORS */}
      {activeTab === 'gateways' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              Integrated Payment Gateways & External Connectors
            </h3>
            <p className="text-xs text-slate-500">Configure pre-built connectors for Mobile Money, Stripe, PayPal, Twilio, and Cloud Storage</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'MTN Mobile Money (MoMo API)', code: 'mtn_momo', status: 'Active', category: 'Mobile Money' },
              { name: 'Orange Money Web Payment', code: 'orange_money', status: 'Active', category: 'Mobile Money' },
              { name: 'PayUnit Aggregator', code: 'payunit', status: 'Active', category: 'Central Africa' },
              { name: 'Flutterwave v3 Global', code: 'flutterwave', status: 'Active', category: 'Card & Bank' },
              { name: 'Stripe Billing & Connect', code: 'stripe', status: 'Active', category: 'International' },
              { name: 'Twilio SMS & WhatsApp', code: 'twilio', status: 'Active', category: 'Communications' }
            ].map((gw, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{gw.category}</span>
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> {gw.status}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{gw.name}</h4>
                <p className="text-[11px] font-mono text-slate-500">Connector: {gw.code}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: SUPER ADMIN CONTROL */}
      {activeTab === 'super_admin' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-600" />
                Super Administrator API & Developer Governance
              </h2>
              <p className="text-xs text-slate-500">Global Rate Limit Overrides, Client Revocation, Cors Settings, and Developer Ad Management</p>
            </div>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded">Super Admin Access</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Global Gateway Rate Limit</span>
              <p className="text-xl font-bold text-slate-900">10,000 req/min</p>
              <button className="text-xs text-blue-600 font-bold hover:underline">Update Thresholds</button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">CORS Whitelist Domains</span>
              <p className="text-xl font-bold text-emerald-600">Strict Enforcement (*.zfinance.com)</p>
              <button className="text-xs text-blue-600 font-bold hover:underline">Manage Origins</button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Developer Ad Placements</span>
              <p className="text-xl font-bold text-indigo-600">Active Campaign</p>
              <button className="text-xs text-blue-600 font-bold hover:underline">Edit Banners</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
