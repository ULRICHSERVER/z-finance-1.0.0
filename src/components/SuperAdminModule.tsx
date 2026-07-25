import React, { useState } from 'react';
import {
  ShieldAlert,
  Server,
  Activity,
  Cpu,
  Database,
  HardDrive,
  Users,
  Settings,
  Package,
  Megaphone,
  CreditCard,
  Download,
  RotateCcw,
  FileText,
  Lock,
  Wifi,
  Sparkles,
  Smartphone,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  Pause,
  Plus,
  RefreshCw,
  Globe,
  Sliders,
  DollarSign,
  Info,
  Clock
} from 'lucide-react';

export type SuperAdminTab =
  | 'dashboard'
  | 'settings'
  | 'modules'
  | 'ads'
  | 'payments'
  | 'backups'
  | 'logs'
  | 'ai_pwa';

export const SuperAdminModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SuperAdminTab>('dashboard');
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // System Settings State
  const [settings, setSettings] = useState({
    appName: 'Z-FINANCE Enterprise',
    companyName: 'Z-FINANCE Global Ltd',
    companyEmail: 'admin@zfinance.com',
    companyPhone: '+1 (800) 555-ZFIN',
    timezone: 'UTC',
    defaultCurrency: 'USD',
    defaultLanguage: 'en',
    sessionTimeoutMins: '30',
    maxFailedLogins: '5',
    require2FA: true
  });

  // Modules State
  const [modules, setModules] = useState([
    { code: 'core_auth', name: 'Authentication Suite', version: '1.0.0', category: 'Core', enabled: true, isCore: true },
    { code: 'core_rbac', name: 'RBAC Permission Engine', version: '1.0.0', category: 'Core', enabled: true, isCore: true },
    { code: 'user_mgmt', name: 'User Management System', version: '1.0.0', category: 'Core', enabled: true, isCore: true },
    { code: 'super_admin', name: 'Super Admin Control Center', version: '1.0.0', category: 'Core', enabled: true, isCore: true },
    { code: 'ad_suite', name: 'Advertisement Suite', version: '1.0.0', category: 'Ad Suite', enabled: true, isCore: false },
    { code: 'income_tracker', name: 'Income & Revenue Engine', version: '1.0.0', category: 'Finance', enabled: true, isCore: false }
  ]);

  // Advertisements State
  const [ads, setAds] = useState([
    {
      id: 1,
      title: 'Upgrade to Z-FINANCE Enterprise 2026',
      placement: 'dashboard_top',
      status: 'active',
      impressions: 14850,
      clicks: 1240,
      targetRole: 'Standard User',
      targetPlan: 'Starter'
    },
    {
      id: 2,
      title: 'Mobile Banking - Orange Money & MTN MoMo Integration',
      placement: 'sidebar',
      status: 'active',
      impressions: 8420,
      clicks: 610,
      targetRole: 'All Roles',
      targetPlan: 'All Plans'
    }
  ]);

  // Payment Gateways State
  const [gateways, setGateways] = useState([
    { code: 'mtn_momo', name: 'MTN Mobile Money', enabled: true, sandbox: true, currencies: 'XAF, XOF, GHS' },
    { code: 'orange_money', name: 'Orange Money', enabled: true, sandbox: true, currencies: 'XAF, XOF' },
    { code: 'payunit', name: 'PayUnit Mobile Aggregator', enabled: true, sandbox: true, currencies: 'XAF, USD, EUR' },
    { code: 'flutterwave', name: 'Flutterwave', enabled: true, sandbox: true, currencies: 'USD, NGN, GHS, XAF' },
    { code: 'paystack', name: 'Paystack', enabled: true, sandbox: true, currencies: 'USD, NGN, GHS, ZAR' },
    { code: 'stripe', name: 'Stripe Payments', enabled: true, sandbox: false, currencies: 'USD, EUR, GBP, CAD' },
    { code: 'paypal', name: 'PayPal Express', enabled: false, sandbox: true, currencies: 'USD, EUR, GBP' }
  ]);

  // Backups State
  const [backups, setBackups] = useState([
    { id: 102, name: 'zfinance_backup_full_database_2026-07-23_00-30-00.sql', type: 'Full Database', size: '18.45 MB', date: '2026-07-23 00:30', status: 'Completed' },
    { id: 101, name: 'zfinance_backup_schema_only_2026-07-20_12-00-00.sql', type: 'Schema Only', size: '2.10 MB', date: '2026-07-20 12:00', status: 'Completed' }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('System settings saved and synchronized successfully.');
  };

  const handleToggleModule = (code: string) => {
    setModules(prev =>
      prev.map(m => {
        if (m.code === code) {
          if (m.isCore) {
            showToast(`Core module '${m.name}' cannot be disabled.`);
            return m;
          }
          const nextState = !m.enabled;
          showToast(`Module '${m.name}' ${nextState ? 'enabled' : 'disabled'}.`);
          return { ...m, enabled: nextState };
        }
        return m;
      })
    );
  };

  const handleToggleAdStatus = (id: number) => {
    setAds(prev =>
      prev.map(ad => {
        if (ad.id === id) {
          const nextStatus = ad.status === 'active' ? 'paused' : 'active';
          showToast(`Ad campaign '${ad.title}' ${nextStatus}.`);
          return { ...ad, status: nextStatus };
        }
        return ad;
      })
    );
  };

  const handleToggleGateway = (code: string) => {
    setGateways(prev =>
      prev.map(gw => {
        if (gw.code === code) {
          const nextState = !gw.enabled;
          showToast(`Gateway '${gw.name}' ${nextState ? 'enabled' : 'disabled'}.`);
          return { ...gw, enabled: nextState };
        }
        return gw;
      })
    );
  };

  const handleCreateBackup = () => {
    const newId = backups.length + 101;
    const timestamp = new Date().toISOString().replace('T', '_').slice(0, 19);
    const newBk = {
      id: newId,
      name: `zfinance_backup_full_database_${timestamp}.sql`,
      type: 'Full Database',
      size: '19.20 MB',
      date: new Date().toLocaleString(),
      status: 'Completed'
    };
    setBackups([newBk, ...backups]);
    showToast(`New database backup archive created successfully.`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-gray-700 animate-bounce">
          <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Control Center Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md">
            <Server className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">Super Administrator Control Center</h1>
              <span className="px-2.5 py-1 text-xs font-bold uppercase bg-blue-100 text-blue-800 rounded-full">
                Root System #1
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Central Command Center • System Health, Configuration, Modules, Gateways & Security
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const next = !maintenanceMode;
              setMaintenanceMode(next);
              showToast(`Maintenance mode ${next ? 'ENABLED' : 'DISABLED'}.`);
            }}
            className={`px-4 py-2 text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-sm ${
              maintenanceMode
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            {maintenanceMode ? 'Maintenance Mode: ACTIVE' : 'Maintenance Mode: OFF'}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2 flex flex-wrap gap-1">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'dashboard'
              ? 'bg-blue-600 text-white shadow'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Activity className="w-4 h-4" />
          Dashboard & Health
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'settings'
              ? 'bg-blue-600 text-white shadow'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Settings className="w-4 h-4" />
          System Settings
        </button>

        <button
          onClick={() => setActiveTab('modules')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'modules'
              ? 'bg-blue-600 text-white shadow'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Package className="w-4 h-4" />
          Module Manager ({modules.length})
        </button>

        <button
          onClick={() => setActiveTab('ads')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'ads'
              ? 'bg-blue-600 text-white shadow'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          Ad Suite ({ads.length})
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'payments'
              ? 'bg-blue-600 text-white shadow'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          Payment Gateways
        </button>

        <button
          onClick={() => setActiveTab('backups')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'backups'
              ? 'bg-blue-600 text-white shadow'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Download className="w-4 h-4" />
          Backups & Recovery
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'logs'
              ? 'bg-blue-600 text-white shadow'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          System Logs
        </button>

        <button
          onClick={() => setActiveTab('ai_pwa')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'ai_pwa'
              ? 'bg-blue-600 text-white shadow'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          AI & PWA
        </button>
      </div>

      {/* TAB 1: DASHBOARD & METRICS */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Health Gauge Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">System Uptime</p>
                <p className="text-2xl font-extrabold text-gray-900 mt-1">99.98%</p>
                <p className="text-xs text-green-600 font-semibold mt-1 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-ping"></span>
                  Optimal Performance
                </p>
              </div>
              <div className="p-3 bg-green-100 text-green-700 rounded-xl">
                <Activity className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Database Size</p>
                <p className="text-2xl font-extrabold text-gray-900 mt-1">14.50 MB</p>
                <p className="text-xs text-gray-500 mt-1">MySQL InnoDB Engine</p>
              </div>
              <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
                <Database className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Sessions</p>
                <p className="text-2xl font-extrabold text-gray-900 mt-1">28 Tokens</p>
                <p className="text-xs text-blue-600 font-semibold mt-1">19 Users Online Now</p>
              </div>
              <div className="p-3 bg-purple-100 text-purple-700 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Memory & CPU</p>
                <p className="text-2xl font-extrabold text-gray-900 mt-1">18.4 MB / 12%</p>
                <p className="text-xs text-gray-500 mt-1">Server Load 0.14</p>
              </div>
              <div className="p-3 bg-amber-100 text-amber-700 rounded-xl">
                <Cpu className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Server Info & Activity Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-600" />
                Server Infrastructure Information
              </h3>
              <dl className="divide-y divide-gray-100 text-sm">
                <div className="py-3 flex justify-between">
                  <dt className="text-gray-500">PHP Version</dt>
                  <dd className="font-semibold text-gray-900">{`8.2.12 (CLI / CGI)`}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-gray-500">MySQL / MariaDB Version</dt>
                  <dd className="font-semibold text-gray-900">8.0.35-Enterprise</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-gray-500">Server Container Software</dt>
                  <dd className="font-semibold text-gray-900">Linux / Cloud Run Container</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-gray-500">Timezone</dt>
                  <dd className="font-semibold text-gray-900">UTC (Universal Coordinated Time)</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-gray-500">Max Execution Time</dt>
                  <dd className="font-semibold text-gray-900">120 seconds</dd>
                </div>
              </dl>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                Recent Security & Audit Logs
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-900">SUPER_ADMIN_LOGIN</p>
                    <p className="text-xs text-gray-600">Super Administrator logged in from IP 192.168.1.1</p>
                    <p className="text-[10px] text-gray-400 mt-1">2 minutes ago</p>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-start gap-3">
                  <RefreshCw className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-900">SETTINGS_UPDATED</p>
                    <p className="text-xs text-gray-600">Updated PWA Manifest Version to 1.0.4</p>
                    <p className="text-[10px] text-gray-400 mt-1">15 minutes ago</p>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-start gap-3">
                  <Download className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-900">BACKUP_CREATED</p>
                    <p className="text-xs text-gray-600">Generated Full Database Backup Archive (18.45 MB)</p>
                    <p className="text-[10px] text-gray-400 mt-1">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SYSTEM SETTINGS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-3 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-600" />
            Global Platform Configuration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Application Name</label>
              <input
                type="text"
                value={settings.appName}
                onChange={e => setSettings({ ...settings, appName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={e => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Support Email Address</label>
              <input
                type="email"
                value={settings.companyEmail}
                onChange={e => setSettings({ ...settings, companyEmail: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Support Phone Number</label>
              <input
                type="text"
                value={settings.companyPhone}
                onChange={e => setSettings({ ...settings, companyPhone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Default Timezone</label>
              <select
                value={settings.timezone}
                onChange={e => setSettings({ ...settings, timezone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="Africa/Douala">Africa/Douala (WAT +1)</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/Paris">Europe/Paris (CET)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Default Currency</label>
              <select
                value={settings.defaultCurrency}
                onChange={e => setSettings({ ...settings, defaultCurrency: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="USD">USD ($ - US Dollar)</option>
                <option value="XAF">XAF (FCFA - Central African Franc)</option>
                <option value="EUR">EUR (€ - Euro)</option>
                <option value="GBP">GBP (£ - British Pound)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm transition-colors"
            >
              Save All Settings
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: MODULE MANAGER */}
      {activeTab === 'modules' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">System Module Manager</h2>
              <p className="text-xs text-gray-500">Enable, disable, or repair core and feature modules</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Module Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Version</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {modules.map(mod => (
                  <tr key={mod.code} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-bold text-gray-900">{mod.name}</div>
                      <div className="text-xs text-gray-500 font-mono">{mod.code}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-800 rounded">
                        {mod.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{mod.version}</td>
                    <td className="px-4 py-3">
                      {mod.enabled ? (
                        <span className="px-2.5 py-1 text-xs font-bold text-green-800 bg-green-100 rounded-full flex items-center gap-1 w-fit">
                          <CheckCircle className="w-3 h-3" /> Enabled
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 text-xs font-bold text-gray-600 bg-gray-100 rounded-full flex items-center gap-1 w-fit">
                          <XCircle className="w-3 h-3" /> Disabled
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleToggleModule(mod.code)}
                        disabled={mod.isCore}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                          mod.isCore
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : mod.enabled
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                        }`}
                      >
                        {mod.isCore ? 'Core Module' : mod.enabled ? 'Disable' : 'Enable'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: AD SUITE */}
      {activeTab === 'ads' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Advertisement Management Suite</h2>
              <p className="text-xs text-gray-500">Manage promotional campaigns, targeting rules, and click metrics</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ads.map(ad => (
              <div key={ad.id} className="border border-gray-200 rounded-xl p-5 shadow-sm space-y-3 bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{ad.title}</h3>
                    <p className="text-xs text-gray-500">Placement: <span className="font-mono">{ad.placement}</span></p>
                  </div>
                  <button
                    onClick={() => handleToggleAdStatus(ad.id)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-full flex items-center gap-1 ${
                      ad.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {ad.status === 'active' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    {ad.status.toUpperCase()}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-white p-3 rounded-lg border border-gray-100">
                  <div>
                    <span className="text-gray-500">Impressions:</span> <strong className="text-gray-900">{ad.impressions.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500">Clicks:</span> <strong className="text-gray-900">{ad.clicks.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500">Role Target:</span> <strong className="text-gray-900">{ad.targetRole}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500">Plan Target:</span> <strong className="text-gray-900">{ad.targetPlan}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PAYMENT GATEWAYS */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Payment Gateway Integrations</h2>
            <p className="text-xs text-gray-500">Mobile Money, Card Processors & Webhook Configurations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gateways.map(gw => (
              <div key={gw.code} className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900 text-sm">{gw.name}</span>
                  <button
                    onClick={() => handleToggleGateway(gw.code)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                      gw.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {gw.enabled ? 'Active' : 'Disabled'}
                  </button>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Currencies: <span className="font-semibold text-gray-800">{gw.currencies}</span></p>
                  <p>Mode: <span className="font-semibold text-amber-700">{gw.sandbox ? 'Sandbox Mode' : 'Live Mode'}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: BACKUPS & RECOVERY */}
      {activeTab === 'backups' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Backup & Disaster Recovery</h2>
              <p className="text-xs text-gray-500">Generate MySQL database dumps, download snapshots, or restore system</p>
            </div>

            <button
              onClick={handleCreateBackup}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create New Backup Archive
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Archive Name</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Size</th>
                  <th className="px-4 py-3">Created At</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {backups.map(bk => (
                  <tr key={bk.id}>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-gray-900">{bk.name}</td>
                    <td className="px-4 py-3 text-xs">{bk.type}</td>
                    <td className="px-4 py-3 text-xs font-semibold">{bk.size}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{bk.date}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => showToast(`Restoring from '${bk.name}'...`)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg mr-2"
                      >
                        Restore
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: LOGS */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900">System & Security Logs</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-xs space-y-2 overflow-x-auto">
            <p>[2026-07-23 00:52:14] [INFO] [AuthSuite] Super Admin (User ID #1) session validated from 192.168.1.1.</p>
            <p>[2026-07-23 00:50:02] [INFO] [ModuleManager] Registered core module 'super_admin' v1.0.0 successfully.</p>
            <p>[2026-07-23 00:48:33] [INFO] [SystemBackup] Created backup archive 'zfinance_backup_full_database_2026-07-23_00-30-00.sql' (18.45 MB).</p>
            <p>[2026-07-23 00:45:10] [INFO] [PWA] ServiceWorker registered with scope '/'. Cache version v1.0.4 active.</p>
          </div>
        </div>
      )}

      {/* TAB 8: AI & PWA */}
      {activeTab === 'ai_pwa' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI Integration & PWA Configuration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-xl p-5 space-y-3 bg-purple-50">
              <h3 className="font-bold text-purple-900">Gemini AI Assistant Integration</h3>
              <p className="text-xs text-purple-700">Automated financial forecasts, expense insights, and anomaly detection</p>
              <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
                <CheckCircle className="w-4 h-4 text-purple-600" /> API Status: ONLINE (Gemini Flash 1.5)
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 space-y-3 bg-blue-50">
              <h3 className="font-bold text-blue-900">PWA & Offline Service Worker</h3>
              <p className="text-xs text-blue-700">Cache versioning and background synchronization queue</p>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                <Smartphone className="w-4 h-4 text-blue-600" /> Cache Version: v1.0.4 (Active)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
