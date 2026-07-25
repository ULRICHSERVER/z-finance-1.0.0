import React, { useState } from 'react';
import { 
  ShieldCheck, 
  KeyRound, 
  UserPlus, 
  Lock, 
  Mail, 
  Smartphone, 
  RefreshCw, 
  Laptop, 
  Smartphone as PhoneIcon, 
  WifiOff, 
  Wifi, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  EyeOff, 
  Clock, 
  ShieldAlert, 
  Code2, 
  LogOut, 
  User, 
  Sliders,
  Database,
  Layers,
  Sparkles,
  FileText
} from 'lucide-react';

interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  platform: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

interface ActivityLog {
  id: string;
  event: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
  ip: string;
  details: string;
}

export const AuthModule: React.FC = () => {
  // Modal Trigger States
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Auth User State Simulation
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState({
    firstName: 'Alexander',
    lastName: 'Vance',
    username: 'alex_vance',
    email: 'a.vance@zfinance.com',
    phone: '+1 (555) 234-5678',
    role: 'Super Administrator',
    status: 'active',
    language: 'English (EN)',
    currency: 'USD ($)',
    timezone: 'UTC'
  });

  // Offline Simulator State
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);

  // Form Fields & Interactive Simulators
  const [loginIdent, setLoginIdent] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register Form Fields
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPass, setRegConfirmPass] = useState('');
  const [showRegPass, setShowRegPass] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [newsletter, setNewsletter] = useState(true);

  // Verification & Reset inputs
  const [verifyToken, setVerifyToken] = useState('zfin_tok_984a12f901b2c4');
  const [resetToken, setResetToken] = useState('zfin_reset_7721bc901a88d');
  const [newPassword, setNewPassword] = useState('');

  // Rate Limiting Simulator
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isAccountLocked, setIsAccountLocked] = useState(false);

  // Feedback Banners
  const [feedback, setFeedback] = useState<{ type: 'success' | 'danger' | 'warning' | 'info'; msg: string } | null>({
    type: 'info',
    msg: 'Enterprise Authentication Suite initialized. Click any modal trigger below to launch responsive auth windows.'
  });

  // Sessions State
  const [sessions, setSessions] = useState<ActiveSession[]>([
    { id: 'sess_1', device: 'Desktop Workstation', browser: 'Chrome 126.0', platform: 'macOS Sonoma', ip: '192.168.1.102', lastActive: 'Just now', isCurrent: true },
    { id: 'sess_2', device: 'iPhone 15 Pro', browser: 'Safari Mobile', platform: 'iOS 17.5', ip: '172.56.21.9', lastActive: '14 mins ago', isCurrent: false },
    { id: 'sess_3', device: 'ThinkPad X1 Carbon', browser: 'Firefox 127', platform: 'Windows 11', ip: '10.0.4.55', lastActive: '2 hours ago', isCurrent: false }
  ]);

  // Activity Logs
  const [logs, setLogs] = useState<ActivityLog[]>([
    { id: 'log_101', event: 'login', severity: 'info', timestamp: '2026-07-22 15:20:11', ip: '192.168.1.102', details: 'Successful sign-in via Username (remember_me=true)' },
    { id: 'log_100', event: 'email_verification', severity: 'info', timestamp: '2026-07-22 14:10:05', ip: '192.168.1.102', details: 'Account status upgraded to ACTIVE via token zfin_tok_984a...' },
    { id: 'log_099', event: 'registration', severity: 'info', timestamp: '2026-07-22 14:05:00', ip: '192.168.1.102', details: 'Auto-provisioned Profile, Preferences, Executive Dashboard, and Default Workspace' }
  ]);

  // Inspector Active Tab
  const [codeTab, setCodeTab] = useState<'schema' | 'auth_php' | 'security_php' | 'session_php'>('schema');

  // Password Strength Calculation
  const calculateStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-slate-300' };
    let score = 0;
    if (pass.length >= 8) score += 20;
    if (pass.length >= 12) score += 20;
    if (/[a-z]/.test(pass)) score += 15;
    if (/[A-Z]/.test(pass)) score += 15;
    if (/[0-9]/.test(pass)) score += 15;
    if (/[^a-zA-Z0-9]/.test(pass)) score += 15;

    if (score >= 80) return { score, label: 'Very Strong', color: 'bg-emerald-500' };
    if (score >= 60) return { score, label: 'Strong', color: 'bg-teal-500' };
    if (score >= 40) return { score, label: 'Fair', color: 'bg-amber-500' };
    return { score, label: 'Weak', color: 'bg-rose-500' };
  };

  const str = calculateStrength(regPassword);

  // Actions
  const handleSimulatedLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOfflineMode) {
      setFeedback({ type: 'warning', msg: 'Offline Mode Active: Authentication requires a live network connection.' });
      return;
    }

    if (isAccountLocked) {
      setFeedback({ type: 'danger', msg: 'Account Locked! Multiple failed attempts detected. Try again in 15 minutes.' });
      return;
    }

    if (!loginIdent || !loginPass) {
      setFeedback({ type: 'danger', msg: 'Please fill in both Username/Email and Password.' });
      return;
    }

    // Simulate login success
    setIsAuthenticated(true);
    setFailedAttempts(0);
    setActiveModal(null);
    setFeedback({ type: 'success', msg: `Welcome back, ${currentUser.firstName}! Login verified using PDO Prepared Statements.` });

    const newLog: ActivityLog = {
      id: `log_${Date.now()}`,
      event: 'login',
      severity: 'info',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ip: '192.168.1.102',
      details: `Successful AJAX login for identifier: ${loginIdent}`
    };
    setLogs([newLog, ...logs]);
  };

  const handleSimulatedFailedLogin = () => {
    if (isOfflineMode) {
      setFeedback({ type: 'warning', msg: 'Offline Mode Active: Cannot record login attempt.' });
      return;
    }

    const nextCount = failedAttempts + 1;
    setFailedAttempts(nextCount);

    if (nextCount >= 5) {
      setIsAccountLocked(true);
      setFeedback({ type: 'danger', msg: 'Security Alert: Account temporarily locked due to 5 consecutive failed attempts (Rate Limit Active).' });
    } else {
      setFeedback({ type: 'warning', msg: `Invalid credentials. Attempt ${nextCount}/5 recorded in Rate Limiter.` });
    }

    const newLog: ActivityLog = {
      id: `log_${Date.now()}`,
      event: 'failed_login',
      severity: nextCount >= 5 ? 'critical' : 'warning',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ip: '192.168.1.102',
      details: `Failed authentication attempt ${nextCount}/5. Rate limiter incremented.`
    };
    setLogs([newLog, ...logs]);
  };

  const handleSimulatedRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOfflineMode) {
      setFeedback({ type: 'warning', msg: 'Offline Mode Active: Registration requires network connectivity.' });
      return;
    }

    if (!regFirstName || !regLastName || !regUsername || !regEmail || !regPassword) {
      setFeedback({ type: 'danger', msg: 'Please fill in all mandatory registration fields.' });
      return;
    }

    if (regPassword !== regConfirmPass) {
      setFeedback({ type: 'danger', msg: 'Password confirmation does not match.' });
      return;
    }

    setCurrentUser({
      ...currentUser,
      firstName: regFirstName,
      lastName: regLastName,
      username: regUsername,
      email: regEmail,
      phone: regPhone || currentUser.phone
    });

    setIsAuthenticated(true);
    setActiveModal(null);
    setFeedback({ 
      type: 'success', 
      msg: `Account created for ${regFirstName} ${regLastName}! Automatically created Profile, Preferences, Executive Dashboard, and Default Workspace.` 
    });

    const newLog: ActivityLog = {
      id: `log_${Date.now()}`,
      event: 'registration',
      severity: 'info',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ip: '192.168.1.102',
      details: `New account registered: @${regUsername} (${regEmail}). Verification token generated.`
    };
    setLogs([newLog, ...logs]);
  };

  const handleLogoutOtherSessions = () => {
    setSessions(sessions.filter(s => s.isCurrent));
    setFeedback({ type: 'success', msg: 'Revoked 2 secondary device sessions. Logout completed on remote devices.' });

    const newLog: ActivityLog = {
      id: `log_${Date.now()}`,
      event: 'session_revoked',
      severity: 'info',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ip: '192.168.1.102',
      details: 'Terminated all active sessions except current device.'
    };
    setLogs([newLog, ...logs]);
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold tracking-tight">Enterprise Authentication Suite</h2>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/30">
                  Phase 1 Complete
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-1">
                Bootstrap 5 Modals • AJAX Engine • PDO & MySQL • Secure Sessions • Rate Limiting & Brute Force Lock
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Offline Simulator Switcher */}
            <button
              onClick={() => {
                const nextState = !isOfflineMode;
                setIsOfflineMode(nextState);
                setFeedback({
                  type: nextState ? 'warning' : 'info',
                  msg: nextState 
                    ? 'Offline Simulator Enabled: Network connection severed. Auth modals will inform users.' 
                    : 'Online Connection Restored.'
                });
              }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                isOfflineMode 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
              }`}
            >
              {isOfflineMode ? <WifiOff className="w-4 h-4 text-amber-400" /> : <Wifi className="w-4 h-4 text-emerald-400" />}
              <span>{isOfflineMode ? 'Network Offline' : 'Network Online'}</span>
            </button>

            {/* Auth Status Badge */}
            <div className="flex items-center space-x-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700 text-xs font-semibold">
              <div className={`w-2.5 h-2.5 rounded-full ${isAuthenticated ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span className="text-slate-300">{isAuthenticated ? `@${currentUser.username}` : 'Guest User'}</span>
              {isAuthenticated && (
                <button 
                  onClick={() => {
                    setIsAuthenticated(false);
                    setFeedback({ type: 'info', msg: 'Logged out. Session destroyed securely.' });
                  }}
                  className="ml-2 text-slate-400 hover:text-rose-400 transition"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Feedback Alert */}
      {feedback && (
        <div className={`p-4 rounded-xl border text-sm flex items-start space-x-3 shadow-sm ${
          feedback.type === 'success' ? 'bg-emerald-50 text-emerald-900 border-emerald-200' :
          feedback.type === 'danger' ? 'bg-rose-50 text-rose-900 border-rose-200' :
          feedback.type === 'warning' ? 'bg-amber-50 text-amber-900 border-amber-200' :
          'bg-blue-50 text-blue-900 border-blue-200'
        }`}>
          {feedback.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
          {feedback.type === 'danger' && <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
          {feedback.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />}
          {feedback.type === 'info' && <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />}
          <div className="flex-1">{feedback.msg}</div>
        </div>
      )}

      {/* Modal Triggers Grid */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Responsive Bootstrap 5 Authentication Modals</h3>
            <p className="text-slate-500 text-xs">Launch modal windows without page redirects. Full AJAX integration.</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">7 Modals Available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <button
            onClick={() => setActiveModal('login')}
            className="flex items-center space-x-3 p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition text-left group"
          >
            <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-105 transition">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-slate-900">Login Modal</div>
              <div className="text-slate-500 text-xs">Username/Email/Phone</div>
            </div>
          </button>

          <button
            onClick={() => setActiveModal('register')}
            className="flex items-center space-x-3 p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition text-left group"
          >
            <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-lg group-hover:scale-105 transition">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-slate-900">Register Modal</div>
              <div className="text-slate-500 text-xs">Full Account Creation</div>
            </div>
          </button>

          <button
            onClick={() => setActiveModal('forgot')}
            className="flex items-center space-x-3 p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 transition text-left group"
          >
            <div className="p-2.5 bg-amber-100 text-amber-600 rounded-lg group-hover:scale-105 transition">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-slate-900">Forgot Password</div>
              <div className="text-slate-500 text-xs">Email Token Request</div>
            </div>
          </button>

          <button
            onClick={() => setActiveModal('reset')}
            className="flex items-center space-x-3 p-3.5 rounded-xl border border-slate-200 hover:border-rose-500 hover:bg-rose-50/50 transition text-left group"
          >
            <div className="p-2.5 bg-rose-100 text-rose-600 rounded-lg group-hover:scale-105 transition">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-slate-900">Reset Password</div>
              <div className="text-slate-500 text-xs">Token & New Password</div>
            </div>
          </button>

          <button
            onClick={() => setActiveModal('verifyEmail')}
            className="flex items-center space-x-3 p-3.5 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 transition text-left group"
          >
            <div className="p-2.5 bg-teal-100 text-teal-600 rounded-lg group-hover:scale-105 transition">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-slate-900">Email Verify</div>
              <div className="text-slate-500 text-xs">Token Validation</div>
            </div>
          </button>

          <button
            onClick={() => setActiveModal('resendVerify')}
            className="flex items-center space-x-3 p-3.5 rounded-xl border border-slate-200 hover:border-cyan-500 hover:bg-cyan-50/50 transition text-left group"
          >
            <div className="p-2.5 bg-cyan-100 text-cyan-600 rounded-lg group-hover:scale-105 transition">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-slate-900">Resend Verification</div>
              <div className="text-slate-500 text-xs">Dispatch New Email</div>
            </div>
          </button>

          <button
            onClick={() => setActiveModal('verifyPhone')}
            className="flex items-center space-x-3 p-3.5 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition text-left group"
          >
            <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-lg group-hover:scale-105 transition">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-slate-900">Phone Verify</div>
              <div className="text-slate-500 text-xs">SMS 6-Digit Code</div>
            </div>
          </button>

          {/* Test Failed Attempts Button */}
          <button
            onClick={handleSimulatedFailedLogin}
            className="flex items-center space-x-3 p-3.5 rounded-xl border border-dashed border-rose-300 bg-rose-50/30 hover:bg-rose-100/50 transition text-left group"
          >
            <div className="p-2.5 bg-rose-200 text-rose-700 rounded-lg group-hover:scale-105 transition">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-rose-900">Test Brute Force</div>
              <div className="text-rose-600 text-xs">Simulate Failed Attempt ({failedAttempts}/5)</div>
            </div>
          </button>
        </div>
      </div>

      {/* Main Grid: User Profile, Active Sessions, and Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Account Overview */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h4 className="font-bold text-slate-900 flex items-center space-x-2">
              <User className="w-4 h-4 text-blue-600" />
              <span>Provisioned Profile</span>
            </h4>
            <span className="text-xs px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-medium">
              {currentUser.status.toUpperCase()}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Full Name</span>
              <span className="font-semibold text-slate-800">{currentUser.firstName} {currentUser.lastName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Username</span>
              <span className="font-semibold text-slate-800">@{currentUser.username}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Email</span>
              <span className="font-semibold text-slate-800">{currentUser.email}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Phone</span>
              <span className="font-semibold text-slate-800">{currentUser.phone}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Role</span>
              <span className="font-semibold text-blue-600">{currentUser.role}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Preferences</span>
              <span className="font-semibold text-slate-800">{currentUser.language} • {currentUser.currency}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-bold text-slate-800 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Auto-Provisioned Assets</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-slate-500">
              <li>Executive Dashboard (#dash_default)</li>
              <li>Personal Workspace (#ws_default)</li>
              <li>Password History Record</li>
            </ul>
          </div>
        </div>

        {/* Multi-Device Session Management */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h4 className="font-bold text-slate-900 flex items-center space-x-2">
                <Laptop className="w-4 h-4 text-indigo-600" />
                <span>Active Device Sessions ({sessions.length})</span>
              </h4>
              <p className="text-slate-500 text-xs">Track signed-in devices and revoke remote access</p>
            </div>
            {sessions.length > 1 && (
              <button
                onClick={handleLogoutOtherSessions}
                className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-lg text-xs font-semibold transition"
              >
                Revoke Other Sessions
              </button>
            )}
          </div>

          <div className="space-y-3">
            {sessions.map((s) => (
              <div 
                key={s.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between text-xs transition ${
                  s.isCurrent 
                    ? 'border-emerald-300 bg-emerald-50/30' 
                    : 'border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${s.isCurrent ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                    {s.device.includes('iPhone') ? <PhoneIcon className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 flex items-center space-x-2">
                      <span>{s.device}</span>
                      {s.isCurrent && (
                        <span className="bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Current Device</span>
                      )}
                    </div>
                    <div className="text-slate-500 mt-0.5">
                      {s.browser} • {s.platform} • <span className="font-monospace">{s.ip}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-slate-400 text-[11px] flex items-center justify-end space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{s.lastActive}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Activity Log Inspector */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h4 className="font-bold text-slate-900 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-purple-600" />
            <span>Security Activity Logs</span>
          </h4>
          <span className="text-xs text-slate-500">Stored in <code className="text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">activity_logs</code></span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-2.5">Event Type</th>
                <th className="p-2.5">Severity</th>
                <th className="p-2.5">Timestamp</th>
                <th className="p-2.5">IP Address</th>
                <th className="p-2.5">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-2.5 font-bold text-slate-800 font-monospace">{log.event}</td>
                  <td className="p-2.5">
                    <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                      log.severity === 'critical' ? 'bg-rose-100 text-rose-800' :
                      log.severity === 'warning' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {log.severity.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-2.5 text-slate-500 font-monospace">{log.timestamp}</td>
                  <td className="p-2.5 font-monospace text-slate-700">{log.ip}</td>
                  <td className="p-2.5 text-slate-700">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Backend Code & Schema Inspector */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-slate-300 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-3 gap-3">
          <div className="flex items-center space-x-2">
            <Code2 className="w-5 h-5 text-blue-400" />
            <h4 className="font-bold text-white text-base">PHP & MySQL Backend Architecture Inspector</h4>
          </div>

          <div className="flex space-x-1 bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setCodeTab('schema')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${codeTab === 'schema' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              schema.sql
            </button>
            <button
              onClick={() => setCodeTab('auth_php')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${codeTab === 'auth_php' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Auth.php
            </button>
            <button
              onClick={() => setCodeTab('security_php')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${codeTab === 'security_php' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Security.php
            </button>
            <button
              onClick={() => setCodeTab('session_php')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${codeTab === 'session_php' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              SessionManager.php
            </button>
          </div>
        </div>

        <pre className="bg-slate-950 p-4 rounded-xl text-xs font-monospace overflow-x-auto text-slate-300 max-h-96 border border-slate-800 leading-relaxed">
          {codeTab === 'schema' && `
-- MySQL Authentication Tables Overview
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  uuid CHAR(36) NOT NULL UNIQUE,
  role_id INT NOT NULL DEFAULT 5,
  username VARCHAR(60) NOT NULL UNIQUE,
  email VARCHAR(191) NOT NULL UNIQUE,
  phone VARCHAR(30) NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  status ENUM('pending', 'email_verification_pending', 'active', 'inactive', 'suspended', 'blocked', 'deleted'),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
          `}
          {codeTab === 'auth_php' && `
namespace ZFinance\\Auth;

class Auth {
    public function login(string $identifier, string $password, bool $rememberMe = false): array {
        // Rate limiting check
        $rateLimit = Security::isRateLimited($this->pdo, $identifier, $ip);
        if ($rateLimit['is_locked']) return ['success' => false, 'message' => $rateLimit['message']];

        // PDO Query for Username, Email, OR Phone
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE username = :id OR email = :id OR phone = :id");
        $stmt->execute(['id' => $identifier]);
        ...
    }
}
          `}
          {codeTab === 'security_php' && `
namespace ZFinance\\Auth;

class Security {
    public static function hashPassword(string $password): string {
        return password_hash($password, PASSWORD_ARGON2ID, ['cost' => 12]);
    }

    public static function verifyPassword(string $password, string $hash): bool {
        return password_verify($password, $hash);
    }
}
          `}
          {codeTab === 'session_php' && `
namespace ZFinance\\Auth;

class SessionManager {
    public static function startSecureSession(): void {
        ini_set('session.cookie_httponly', '1');
        ini_set('session.cookie_samesite', 'Lax');
        session_start();
    }
}
          `}
        </pre>
      </div>

      {/* RENDER ACTIVE MODAL OVERLAY IN REACT */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
            >
              <XCircle className="w-6 h-6" />
            </button>

            {/* LOGIN MODAL PREVIEW */}
            {activeModal === 'login' && (
              <form onSubmit={handleSimulatedLogin} className="space-y-4">
                <div className="flex items-center space-x-2 text-blue-600 font-bold text-lg">
                  <KeyRound className="w-6 h-6" />
                  <span>Sign In to Z-FINANCE</span>
                </div>
                <p className="text-slate-500 text-xs">Supports Username, Email, or Phone Number authentication.</p>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Username / Email / Phone</label>
                  <input
                    type="text"
                    value={loginIdent}
                    onChange={(e) => setLoginIdent(e.target.value)}
                    placeholder="e.g. alex_vance or alex@zfinance.com"
                    className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>

                  <div className="relative">
                    <input
                      type={showLoginPass ? 'text' : 'password'}
                      value={loginPass}
                      onChange={(e) => setLoginPass(e.target.value)}
                      placeholder="Enter password"
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-none pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPass(!showLoginPass)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showLoginPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={rememberMe} 
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded text-blue-600" 
                    />
                    <span className="text-slate-600">Remember me (30 days)</span>
                  </label>
                  <button type="button" onClick={() => setActiveModal('forgot')} className="text-blue-600 hover:underline">
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition shadow-lg shadow-blue-500/20"
                >
                  Sign In (AJAX)
                </button>
              </form>
            )}

            {/* REGISTER MODAL PREVIEW */}
            {activeModal === 'register' && (
              <form onSubmit={handleSimulatedRegistration} className="space-y-4 max-h-[80vh] overflow-y-auto pr-1">
                <div className="flex items-center space-x-2 text-emerald-600 font-bold text-lg">
                  <UserPlus className="w-6 h-6" />
                  <span>Create Account</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
                    <input 
                      type="text" 
                      value={regFirstName} 
                      onChange={(e) => setRegFirstName(e.target.value)}
                      placeholder="John" 
                      className="w-full px-3 py-2 border rounded-xl text-xs" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
                    <input 
                      type="text" 
                      value={regLastName} 
                      onChange={(e) => setRegLastName(e.target.value)}
                      placeholder="Doe" 
                      className="w-full px-3 py-2 border rounded-xl text-xs" 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Username *</label>
                    <input 
                      type="text" 
                      value={regUsername} 
                      onChange={(e) => setRegUsername(e.target.value)}
                      placeholder="johndoe88" 
                      className="w-full px-3 py-2 border rounded-xl text-xs" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input 
                      type="email" 
                      value={regEmail} 
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="john@example.com" 
                      className="w-full px-3 py-2 border rounded-xl text-xs" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password *</label>
                  <input 
                    type="password" 
                    value={regPassword} 
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="At least 8 characters" 
                    className="w-full px-3 py-2 border rounded-xl text-xs" 
                    required 
                  />
                  {/* Live Password Strength Bar */}
                  <div className="mt-2 space-y-1">
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${str.color}`} style={{ width: `${str.score}%` }} />
                    </div>
                    <div className="text-[11px] text-slate-500 flex justify-between">
                      <span>Password Strength: <strong className="text-slate-800">{str.label}</strong></span>
                      <span>{str.score}/100</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password *</label>
                  <input 
                    type="password" 
                    value={regConfirmPass} 
                    onChange={(e) => setRegConfirmPass(e.target.value)}
                    placeholder="Re-enter password" 
                    className="w-full px-3 py-2 border rounded-xl text-xs" 
                    required 
                  />
                </div>

                <div className="space-y-2 text-xs">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={acceptTerms} 
                      onChange={(e) => setAcceptTerms(e.target.checked)} 
                      required 
                    />
                    <span className="text-slate-600">I accept Terms & Conditions and Privacy Policy</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={newsletter} 
                      onChange={(e) => setNewsletter(e.target.checked)} 
                    />
                    <span className="text-slate-500">Subscribe to system security updates</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs transition shadow-lg shadow-emerald-500/20"
                >
                  Complete Registration
                </button>
              </form>
            )}

            {/* FORGOT PASSWORD PREVIEW */}
            {activeModal === 'forgot' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-amber-600 font-bold text-lg">
                  <Lock className="w-6 h-6" />
                  <span>Reset Password Request</span>
                </div>
                <p className="text-slate-500 text-xs">Enter your email to receive a password reset token.</p>
                <input type="email" defaultValue="a.vance@zfinance.com" className="w-full px-3 py-2 border rounded-xl text-xs" />
                <button
                  onClick={() => {
                    setActiveModal(null);
                    setFeedback({ type: 'success', msg: 'Password reset link sent to email! Check token in Reset Modal.' });
                  }}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl text-xs transition"
                >
                  Send Reset Token
                </button>
              </div>
            )}

            {/* RESET PASSWORD PREVIEW */}
            {activeModal === 'reset' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-rose-600 font-bold text-lg">
                  <RefreshCw className="w-6 h-6" />
                  <span>Set New Password</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Reset Token</label>
                  <input type="text" value={resetToken} onChange={(e) => setResetToken(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs font-monospace" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="At least 8 chars" className="w-full px-3 py-2 border rounded-xl text-xs" />
                </div>
                <button
                  onClick={() => {
                    setActiveModal(null);
                    setFeedback({ type: 'success', msg: 'Password reset completed! You can now sign in with your new password.' });
                  }}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl text-xs transition"
                >
                  Update Password
                </button>
              </div>
            )}

            {/* EMAIL VERIFY PREVIEW */}
            {activeModal === 'verifyEmail' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-teal-600 font-bold text-lg">
                  <Mail className="w-6 h-6" />
                  <span>Verify Email Address</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Verification Token</label>
                  <input type="text" value={verifyToken} onChange={(e) => setVerifyToken(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs font-monospace" />
                </div>
                <button
                  onClick={() => {
                    setActiveModal(null);
                    setFeedback({ type: 'success', msg: 'Email token verified! User account status set to ACTIVE.' });
                  }}
                  className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-xs transition"
                >
                  Verify Email Address
                </button>
              </div>
            )}

            {/* RESEND VERIFY PREVIEW */}
            {activeModal === 'resendVerify' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-cyan-600 font-bold text-lg">
                  <RefreshCw className="w-6 h-6" />
                  <span>Resend Email Verification</span>
                </div>
                <input type="email" defaultValue="a.vance@zfinance.com" className="w-full px-3 py-2 border rounded-xl text-xs" />
                <button
                  onClick={() => {
                    setActiveModal(null);
                    setFeedback({ type: 'success', msg: 'New email verification link dispatched.' });
                  }}
                  className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl text-xs transition"
                >
                  Resend Verification Email
                </button>
              </div>
            )}

            {/* PHONE VERIFY PREVIEW */}
            {activeModal === 'verifyPhone' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-indigo-600 font-bold text-lg">
                  <Smartphone className="w-6 h-6" />
                  <span>Phone SMS Verification</span>
                </div>
                <p className="text-slate-500 text-xs">Enter 6-digit SMS code sent to {currentUser.phone}.</p>
                <input type="text" maxLength={6} defaultValue="882104" className="w-full px-3 py-2 border rounded-xl text-center text-lg font-monospace font-bold tracking-widest" />
                <button
                  onClick={() => {
                    setActiveModal(null);
                    setFeedback({ type: 'success', msg: 'Phone number verified via SMS.' });
                  }}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition"
                >
                  Confirm SMS Code
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
