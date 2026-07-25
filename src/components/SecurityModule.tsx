import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Smartphone,
  Key,
  Server,
  Activity,
  FileText,
  AlertTriangle,
  RefreshCw,
  Database,
  CheckCircle,
  XCircle,
  Settings,
  Megaphone,
  HardDrive,
  Eye,
  Sliders,
  Sparkles,
  Download,
  Trash2,
  Check,
  Plus,
  Search,
  Globe,
  Cpu,
  Zap,
  Users,
  Clock,
  Layers,
  ListFilter
} from 'lucide-react';

interface SecurityEvent {
  id: string;
  uuid: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  ip: string;
  time: string;
}

interface ActiveSession {
  id: string;
  user: string;
  device: string;
  ip: string;
  location: string;
  status: 'active' | 'revoked';
  lastActive: string;
}

interface BackupItem {
  id: string;
  uuid: string;
  type: string;
  size: string;
  status: 'completed' | 'in_progress' | 'failed';
  encryption: string;
  time: string;
}

export default function SecurityModule() {
  const [activeTab, setActiveTab] = useState<
    | 'soc'
    | 'mfa'
    | 'sessions'
    | 'policies'
    | 'encryption'
    | 'audit'
    | 'threats'
    | 'compliance'
    | 'backups'
    | 'health'
    | 'super_admin'
  >('soc');

  // Security Events State
  const [events, setEvents] = useState<SecurityEvent[]>([
    {
      id: '1',
      uuid: 'SEC-2026-901',
      type: 'Suspicious Failed Login Attempts',
      severity: 'medium',
      description: '5 consecutive invalid password attempts from unknown IP address.',
      ip: '198.51.100.44',
      time: '10:24 AM'
    },
    {
      id: '2',
      uuid: 'SEC-2026-902',
      type: 'Privilege Escalation Request',
      severity: 'high',
      description: 'Role escalation request to Super Admin by user John (DevOps).',
      ip: '10.0.4.12',
      time: '09:15 AM'
    },
    {
      id: '3',
      uuid: 'SEC-2026-903',
      type: 'High-Frequency API Burst',
      severity: 'low',
      description: 'Rate limit soft-warning threshold reached on /api/v1/invoices.',
      ip: '192.168.1.105',
      time: 'Yesterday'
    }
  ]);

  // Active Sessions State
  const [sessions, setSessions] = useState<ActiveSession[]>([
    {
      id: 's1',
      user: 'Super Administrator',
      device: 'MacBook Pro 16" (Chrome / macOS)',
      ip: '192.168.1.100',
      location: 'Paris, France (HQ)',
      status: 'active',
      lastActive: 'Just now'
    },
    {
      id: 's2',
      user: 'Sarah Connor (Accounting Lead)',
      device: 'Windows Workstation (Edge / Win11)',
      ip: '10.0.2.88',
      location: 'Munich Branch',
      status: 'active',
      lastActive: '5 mins ago'
    },
    {
      id: 's3',
      user: 'Markus Weber (Warehouse Mgr)',
      device: 'Android Mobile App (Z-FINANCE App)',
      ip: '198.51.100.12',
      location: 'Douala Warehouse',
      status: 'active',
      lastActive: '12 mins ago'
    }
  ]);

  // Backup Jobs State
  const [backups, setBackups] = useState<BackupItem[]>([
    {
      id: 'b1',
      uuid: 'BK-FULL-2026-001',
      type: 'Full System & Vault Snapshot',
      size: '248.5 MB',
      status: 'completed',
      encryption: 'AES-256-GCM',
      time: 'Today 03:00 AM'
    },
    {
      id: 'b2',
      uuid: 'BK-INC-2026-002',
      type: 'Incremental Transaction Log',
      size: '14.2 MB',
      status: 'completed',
      encryption: 'AES-256-GCM',
      time: 'Today 12:00 PM'
    }
  ]);

  const [blockedIpInput, setBlockedIpInput] = useState('');
  const [blockedIps, setBlockedIps] = useState<string[]>(['198.51.100.44', '203.0.113.99']);

  const handleRevokeSession = (id: string) => {
    setSessions(
      sessions.map((s) => (s.id === id ? { ...s, status: 'revoked' } : s))
    );
  };

  const handleBlockIp = () => {
    if (!blockedIpInput.trim()) return;
    setBlockedIps([blockedIpInput.trim(), ...blockedIps]);
    setBlockedIpInput('');
  };

  const handleTriggerBackup = () => {
    const newBk: BackupItem = {
      id: Date.now().toString(),
      uuid: `BK-MANUAL-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'Manual On-Demand Backup',
      size: '252.1 MB',
      status: 'completed',
      encryption: 'AES-256-GCM',
      time: new Date().toLocaleTimeString()
    };
    setBackups([newBk, ...backups]);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto bg-slate-50 min-h-screen text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-slate-900">Security Operations Center & Compliance</h1>
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded border border-emerald-300 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              SOC Grade A+
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Real-Time Threat Detection, MFA Governance, AES-256 Encryption, Disaster Recovery & GDPR Compliance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleTriggerBackup}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Database className="w-4 h-4" />
            Trigger Encrypted Backup
          </button>
        </div>
      </div>

      {/* Super Admin Advertisement Placement Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-3 rounded-xl border border-indigo-900 text-white text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-amber-400" />
          <span>
            <strong className="text-amber-400">Super Admin Security Alert:</strong> Zero-Trust Security Policies Active across all 18 Global ERP Nodes.
          </span>
        </div>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Managed by Super Admin</span>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'soc', label: 'SOC Dashboard', icon: Shield },
          { id: 'mfa', label: 'Authentication & MFA', icon: Lock },
          { id: 'sessions', label: 'Devices & Sessions', icon: Smartphone },
          { id: 'policies', label: 'Password Policies', icon: Key },
          { id: 'encryption', label: 'AES Encryption Vault', icon: HardDrive },
          { id: 'audit', label: 'Audit & Forensic Logs', icon: FileText },
          { id: 'threats', label: 'Threat Detection', icon: AlertTriangle },
          { id: 'compliance', label: 'GDPR Compliance', icon: CheckCircle },
          { id: 'backups', label: 'Backups & Recovery', icon: Database },
          { id: 'health', label: 'System Health', icon: Activity },
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

      {/* TAB 1: SOC DASHBOARD */}
      {activeTab === 'soc' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Security Health Score</span>
              <p className="text-2xl font-bold text-emerald-600 mt-1">98 / 100 (A+)</p>
              <span className="text-xs text-slate-500 font-medium">All Shield Protocols Active</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Current Threat Level</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">NORMAL</p>
              <span className="text-xs text-emerald-600 font-medium">Zero Active Attacks</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Active Sessions</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {sessions.filter((s) => s.status === 'active').length} Logged In
              </p>
              <span className="text-xs text-blue-600 font-medium">Device Fingerprinting On</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Blocked IP Addresses</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">{blockedIps.length} Blocked</p>
              <span className="text-xs text-rose-600 font-medium">Auto-Lockout Active</span>
            </div>
          </div>

          {/* Security Events Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Recent Security & Threat Logs
              </h3>
              <span className="text-xs text-slate-500">{events.length} Events Flagged</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                    <th className="p-3">UUID</th>
                    <th className="p-3">Event Description</th>
                    <th className="p-3">Severity</th>
                    <th className="p-3">Source IP</th>
                    <th className="p-3">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {events.map((e) => (
                    <tr key={e.id} className="hover:bg-slate-50 transition-all">
                      <td className="p-3 font-mono font-bold text-indigo-600">{e.uuid}</td>
                      <td className="p-3 font-bold text-slate-900">{e.type} - <span className="font-normal text-slate-600">{e.description}</span></td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            e.severity === 'high' || e.severity === 'critical'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {e.severity}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-slate-700">{e.ip}</td>
                      <td className="p-3 text-slate-500">{e.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DEVICES & SESSIONS */}
      {activeTab === 'sessions' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-indigo-600" />
              Active User Sessions & Registered Devices
            </h3>
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded font-bold">
              {sessions.filter((s) => s.status === 'active').length} Active
            </span>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden text-xs">
            {sessions.map((s) => (
              <div key={s.id} className="p-4 hover:bg-slate-50 transition-all flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-bold text-slate-900 text-sm">{s.user}</p>
                  <p className="text-slate-500">
                    Device: <strong>{s.device}</strong> • IP: <span className="font-mono">{s.ip}</span> • Location: {s.location}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-slate-500 text-xs">{s.lastActive}</span>
                  {s.status === 'active' ? (
                    <button
                      onClick={() => handleRevokeSession(s.id)}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded shadow-sm text-xs"
                    >
                      Revoke Session
                    </button>
                  ) : (
                    <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded font-bold">REVOKED</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: THREAT DETECTION & IP BLOCKING */}
      {activeTab === 'threats' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
              <Shield className="w-5 h-5 text-rose-600" />
              Blacklist & IP Blocklist Governance
            </h3>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="e.g. 198.51.100.22"
                value={blockedIpInput}
                onChange={(e) => setBlockedIpInput(e.target.value)}
                className="flex-1 text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50"
              />
              <button
                onClick={handleBlockIp}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-sm"
              >
                Block IP Address
              </button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase">Currently Blocked IP Addresses</h4>
            <div className="flex flex-wrap gap-2">
              {blockedIps.map((ip, idx) => (
                <span key={idx} className="bg-rose-100 text-rose-800 font-mono font-bold px-3 py-1 rounded-full text-xs flex items-center gap-2">
                  {ip}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: BACKUPS & RECOVERY */}
      {activeTab === 'backups' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              Encrypted Database Backups & Point-in-Time Recovery
            </h3>
            <button
              onClick={handleTriggerBackup}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Manual Backup
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                  <th className="p-3">UUID</th>
                  <th className="p-3">Backup Type</th>
                  <th className="p-3">File Size</th>
                  <th className="p-3">Encryption</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {backups.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-all">
                    <td className="p-3 font-mono font-bold text-indigo-600">{b.uuid}</td>
                    <td className="p-3 font-bold text-slate-900">{b.type}</td>
                    <td className="p-3 font-mono text-slate-700">{b.size}</td>
                    <td className="p-3 font-mono text-slate-600">{b.encryption}</td>
                    <td className="p-3">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                        {b.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500">{b.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 10: SYSTEM HEALTH */}
      {activeTab === 'health' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Server CPU Usage</span>
            <p className="text-2xl font-bold text-slate-900">18.4%</p>
            <span className="text-xs text-emerald-600 font-bold">Optimal Capacity</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase">RAM Memory Allocation</span>
            <p className="text-2xl font-bold text-slate-900">38.2% (6.1 GB / 16 GB)</p>
            <span className="text-xs text-emerald-600 font-bold">Healthy Memory State</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Storage Volume</span>
            <p className="text-2xl font-bold text-slate-900">24.1% (120 GB / 500 GB)</p>
            <span className="text-xs text-emerald-600 font-bold">NVMe SSD Array Active</span>
          </div>
        </div>
      )}

      {/* TAB 11: SUPER ADMIN CONTROL */}
      {activeTab === 'super_admin' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-600" />
                Super Administrator Security Governance
              </h2>
              <p className="text-xs text-slate-500">Global Threat Level Overrides, AES Key Rotation, System Lockout & Ad Placement Controls</p>
            </div>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded">Super Admin Access</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">AES Key Rotation</span>
              <p className="text-xl font-bold text-slate-900">Master Key Rotated 12d ago</p>
              <button className="text-xs text-indigo-600 font-bold hover:underline">Rotate Encryption Keys</button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Lockdown Mode</span>
              <p className="text-xl font-bold text-emerald-600">Inactive (System Nominal)</p>
              <button className="text-xs text-rose-600 font-bold hover:underline">Trigger Emergency Lockout</button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Security Ad Banner</span>
              <p className="text-xl font-bold text-indigo-600">Active Campaign</p>
              <button className="text-xs text-indigo-600 font-bold hover:underline">Manage Placements</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
