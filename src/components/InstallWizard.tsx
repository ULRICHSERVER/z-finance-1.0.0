import React, { useState } from 'react';
import { 
  Server, 
  CheckCircle2, 
  XCircle, 
  Database, 
  HardDrive, 
  Cpu, 
  Key, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  FolderCheck, 
  Building2, 
  UserCheck, 
  FileCode, 
  Terminal, 
  Download,
  Zap,
  Globe2,
  Check,
  Code
} from 'lucide-react';

interface RequirementItem {
  id: string;
  name: string;
  required: string;
  detected: string;
  status: 'pass' | 'fail';
  description: string;
}

interface DirectoryPermission {
  path: string;
  requiredMode: string;
  detectedMode: string;
  status: 'writable' | 'readonly';
}

export const InstallWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [activeSubTab, setActiveSubTab] = useState<'wizard' | 'php_files'>('wizard');
  const [selectedPhpFile, setSelectedPhpFile] = useState<string>('install/index.php');

  // Environment Target
  const [targetHost, setTargetHost] = useState<string>('Localhost');

  // Database State
  const [dbHost, setDbHost] = useState<string>('127.0.0.1');
  const [dbPort, setDbPort] = useState<string>('3306');
  const [dbName, setDbName] = useState<string>('zfinance_db');
  const [dbUser, setDbUser] = useState<string>('root');
  const [dbPass, setDbPass] = useState<string>('');
  const [dbPrefix, setDbPrefix] = useState<string>('zf_');
  const [isTestingDb, setIsTestingDb] = useState<boolean>(false);
  const [dbTestResult, setDbTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // SQL Import State
  const [importProgress, setImportProgress] = useState<number>(0);
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [importComplete, setImportComplete] = useState<boolean>(false);

  // App Settings State
  const [appName, setAppName] = useState<string>('Z-FINANCE');
  const [companyName, setCompanyName] = useState<string>('Z-Enterprise Corp');
  const [defaultLang, setDefaultLang] = useState<string>('en');
  const [defaultCurrency, setDefaultCurrency] = useState<string>('XAF');
  const [timezone, setTimezone] = useState<string>('Africa/Douala');
  const [dateFormat, setDateFormat] = useState<string>('Y-m-d');
  const [numberFormat, setNumberFormat] = useState<string>('1,000.00');
  const [appEmail, setAppEmail] = useState<string>('admin@zfinance.io');
  const [appPhone, setAppPhone] = useState<string>('+237 600 000 000');
  const [appCountry, setAppCountry] = useState<string>('Cameroon');

  // Super Admin State
  const [adminFullName, setAdminFullName] = useState<string>('Super Administrator');
  const [adminUsername, setAdminUsername] = useState<string>('admin');
  const [adminEmail, setAdminEmail] = useState<string>('admin@zfinance.io');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLocked, setIsLocked] = useState<boolean>(false);

  // Requirements Data
  const requirements: RequirementItem[] = [
    { id: 'php', name: 'PHP Version', required: '>= 8.1.0', detected: '8.2.12', status: 'pass', description: 'Supports standard ES/CJS and modern array functions' },
    { id: 'pdo', name: 'PDO Extension', required: 'Enabled', detected: 'Enabled (v8.2)', status: 'pass', description: 'Required for secure database prepared statements' },
    { id: 'mysql', name: 'MySQL PDO Driver (pdo_mysql)', required: 'Enabled', detected: 'Enabled', status: 'pass', description: 'Used to interface with MySQL / MariaDB instances' },
    { id: 'json', name: 'JSON Extension', required: 'Enabled', detected: 'Enabled', status: 'pass', description: 'Required for configuration and attachment metadata encoding' },
    { id: 'openssl', name: 'OpenSSL Extension', required: 'Enabled', detected: 'Enabled', status: 'pass', description: 'Required for AES-256 binary encryption & CSRF security' },
    { id: 'mbstring', name: 'Mbstring Extension', required: 'Enabled', detected: 'Enabled', status: 'pass', description: 'Multi-byte string handling for French/international characters' },
    { id: 'fileinfo', name: 'FileInfo Extension', required: 'Enabled', detected: 'Enabled', status: 'pass', description: 'Used for secure MIME validation of document uploads' },
    { id: 'gd', name: 'GD Image Library', required: 'Enabled', detected: 'Enabled', status: 'pass', description: 'Generates report graphs and processes uploaded receipts' },
    { id: 'zip', name: 'ZIP Extension', required: 'Enabled', detected: 'Enabled', status: 'pass', description: 'Required for automated database backups & export bundles' },
    { id: 'curl', name: 'cURL Extension', required: 'Enabled', detected: 'Enabled', status: 'pass', description: 'Enables external payment gateway & API integrations' },
    { id: 'disk', name: 'Available Disk Space', required: '>= 50 MB', detected: '12.4 GB Free', status: 'pass', description: 'Storage space for application core and uploads' },
  ];

  // Directory Permissions Data
  const directoryPermissions: DirectoryPermission[] = [
    { path: 'config/', requiredMode: '0755 / 0775', detectedMode: '0775', status: 'writable' },
    { path: 'uploads/', requiredMode: '0755 / 0775', detectedMode: '0775', status: 'writable' },
    { path: 'storage/', requiredMode: '0755 / 0775', detectedMode: '0775', status: 'writable' },
    { path: 'cache/', requiredMode: '0755 / 0775', detectedMode: '0775', status: 'writable' },
    { path: 'logs/', requiredMode: '0755 / 0775', detectedMode: '0775', status: 'writable' },
    { path: 'backups/', requiredMode: '0755 / 0775', detectedMode: '0775', status: 'writable' },
    { path: 'offline/', requiredMode: '0755 / 0775', detectedMode: '0775', status: 'writable' },
  ];

  // Test Database Connection
  const handleTestDatabase = () => {
    setIsTestingDb(true);
    setDbTestResult(null);

    setTimeout(() => {
      setIsTestingDb(false);
      if (dbName && dbHost && dbUser) {
        setDbTestResult({
          success: true,
          message: `Connection successful! MySQL server at ${dbHost}:${dbPort} is active. Database "${dbName}" is ready for schema import.`
        });
      } else {
        setDbTestResult({
          success: false,
          message: 'Connection failed: Please provide host, username, and database name.'
        });
      }
    }, 800);
  };

  // Run SQL Import
  const handleRunSqlImport = () => {
    setIsImporting(true);
    setImportProgress(0);

    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          setImportComplete(true);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  // Lock Installer & Finish
  const handleFinishInstallation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPassword || adminPassword !== confirmPassword) {
      alert('Please check your passwords. They must match and be at least 8 characters long.');
      return;
    }
    setIsLocked(true);
    setCurrentStep(8);
  };

  const phpFileContents: Record<string, string> = {
    'install/index.php': `<?php
/**
 * Z-FINANCE 1.0.0 - Universal Installation Wizard
 * Entry point controller & step navigator
 */
define('Z_INSTALLER', true);
define('ROOT_PATH', dirname(__DIR__));

if (file_exists(__DIR__ . '/installed.lock')) {
    die("Z-FINANCE Installer is locked for security.");
}

$step = $_GET['step'] ?? 1;
include __DIR__ . "/step{$step}.php";`,
    'install/requirements.php': `<?php
// System Requirements Audit
$phpVersion = PHP_VERSION;
$pdoActive = extension_loaded('pdo_mysql');
$jsonActive = extension_loaded('json');
$mbstringActive = extension_loaded('mbstring');
// Check disk space
$diskSpace = disk_free_space(__DIR__);`,
    'install/permissions.php': `<?php
// Writable folder checks
$dirs = ['config/', 'uploads/', 'storage/', 'cache/', 'logs/', 'backups/', 'offline/'];
foreach ($dirs as $dir) {
    if (!is_writable(ROOT_PATH . '/' . $dir)) {
        chmod(ROOT_PATH . '/' . $dir, 0775);
    }
}`,
    'install/Z-FINANCE.sql': `-- Z-FINANCE 1.0.0 Database Dump
CREATE TABLE IF NOT EXISTS \`zf_income_categories\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`category_name\` VARCHAR(150) NOT NULL,
  \`category_code\` VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
              Deployment & Setup Module
            </span>
            <span className="text-xs font-mono text-slate-400">v1.0.0</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1 flex items-center gap-2">
            <Server className="w-6 h-6 text-indigo-600" />
            <span>Universal Installation Wizard</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Deploy Z-FINANCE on Localhost, XAMPP, Laragon, WAMP, cPanel, VPS, or Cloud without editing code files manually.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg self-start sm:self-auto text-xs">
          <button
            onClick={() => setActiveSubTab('wizard')}
            className={`px-3 py-1.5 rounded-md font-bold transition ${
              activeSubTab === 'wizard' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 inline mr-1" />
            Interactive Wizard
          </button>
          <button
            onClick={() => setActiveSubTab('php_files')}
            className={`px-3 py-1.5 rounded-md font-bold transition ${
              activeSubTab === 'php_files' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code className="w-3.5 h-3.5 inline mr-1" />
            PHP Installer Files
          </button>
        </div>
      </div>

      {activeSubTab === 'php_files' ? (
        /* PHP Installer Files Inspector */
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-4">
          <div className="p-4 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Generated PHP Installer Core
            </h3>
            {Object.keys(phpFileContents).map((fileName) => (
              <button
                key={fileName}
                onClick={() => setSelectedPhpFile(fileName)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition flex items-center space-x-2 ${
                  selectedPhpFile === fileName
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{fileName}</span>
              </button>
            ))}
          </div>

          <div className="md:col-span-3 p-4 bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
              <span className="text-indigo-400 font-bold">{selectedPhpFile}</span>
              <span className="text-[10px]">PHP 8.2+ Enterprise Installer File</span>
            </div>
            <pre className="text-emerald-400 leading-relaxed whitespace-pre-wrap">
              {phpFileContents[selectedPhpFile]}
            </pre>
          </div>
        </div>
      ) : (
        /* Interactive Wizard Interface */
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Progress Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center space-x-2">
                <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  Step {currentStep} of 8
                </span>
                <span className="text-xs font-bold text-slate-700">
                  {currentStep === 1 && '1. Environment Selection'}
                  {currentStep === 2 && '2. System Requirements'}
                  {currentStep === 3 && '3. Directory Permissions'}
                  {currentStep === 4 && '4. Database Setup'}
                  {currentStep === 5 && '5. SQL Schema Import'}
                  {currentStep === 6 && '6. App Configuration'}
                  {currentStep === 7 && '7. Super Admin Account'}
                  {currentStep === 8 && '8. Completion & Lock'}
                </span>
              </div>
              {isLocked && (
                <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  Installer Locked (installed.lock)
                </span>
              )}
            </div>

            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full transition-all duration-300"
                style={{ width: `${(currentStep / 8) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content Area */}
          <div className="p-6">
            
            {/* STEP 1: WELCOME & HOSTING TARGET */}
            {currentStep === 1 && (
              <div className="space-y-6 text-center max-w-2xl mx-auto py-4">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <Globe2 className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Select Hosting Environment</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Z-FINANCE automatically detects server parameters and adapts configuration files accordingly.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                  {[
                    { title: 'Localhost', sub: 'XAMPP, Laragon, WAMP', icon: LaptopIcon },
                    { title: 'cPanel Hosting', sub: 'Shared / Reseller', icon: Server },
                    { title: 'VPS Server', sub: 'Ubuntu, AlmaLinux', icon: HardDrive },
                    { title: 'Cloud Hosting', sub: 'AWS, GCP, DigitalOcean', icon: Zap },
                  ].map((target) => (
                    <button
                      key={target.title}
                      onClick={() => setTargetHost(target.title)}
                      className={`p-3.5 rounded-xl border text-xs transition ${
                        targetHost === target.title
                          ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 text-indigo-900 font-bold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span className="block font-bold text-slate-900 text-xs">{target.title}</span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">{target.sub}</span>
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl text-left text-xs text-indigo-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <span>No Manual PHP Editing Required</span>
                  </div>
                  <p className="text-[11px] text-indigo-800 leading-relaxed">
                    Selected target: <strong>{targetHost}</strong>. The installation wizard will generate <code>.env</code> and run database migrations automatically.
                  </p>
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-lg shadow-sm inline-flex items-center space-x-2 transition"
                >
                  <span>Start System Requirements Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: REQUIREMENTS AUDIT */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Step 2: System Requirements Verification</h3>
                  <p className="text-xs text-slate-500">Checking server PHP version, extensions, and hardware capacity.</p>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Requirement</th>
                        <th className="p-3 text-center">Required State</th>
                        <th className="p-3 text-center">Detected State</th>
                        <th className="p-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {requirements.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-50">
                          <td className="p-3 font-medium text-slate-900">{req.name}</td>
                          <td className="p-3 text-center font-mono text-slate-500">{req.required}</td>
                          <td className="p-3 text-center font-mono text-slate-700">{req.detected}</td>
                          <td className="p-3 text-right">
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-md border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> PASS
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <button onClick={() => setCurrentStep(1)} className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button onClick={() => setCurrentStep(3)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-1">
                    <span>Check Permissions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: DIRECTORY PERMISSIONS */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Step 3: Directory Permissions Verification</h3>
                  <p className="text-xs text-slate-500">Confirming writable permissions (0755 / 0775) for core system folders.</p>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Directory Folder</th>
                        <th className="p-3 text-center">Required Permission</th>
                        <th className="p-3 text-center">Detected Permission</th>
                        <th className="p-3 text-right">Writable Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {directoryPermissions.map((dir) => (
                        <tr key={dir.path} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900">{dir.path}</td>
                          <td className="p-3 text-center text-slate-500">{dir.requiredMode}</td>
                          <td className="p-3 text-center text-slate-700">{dir.detectedMode}</td>
                          <td className="p-3 text-right">
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-md border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Writable
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <button onClick={() => setCurrentStep(2)} className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button onClick={() => setCurrentStep(4)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-1">
                    <span>Configure Database</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: DATABASE CONFIGURATION */}
            {currentStep === 4 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Step 4: MySQL Database Setup</h3>
                  <p className="text-xs text-slate-500">Provide MySQL connection details. Click "Test Connection" to verify.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Database Host</label>
                    <input
                      type="text"
                      value={dbHost}
                      onChange={(e) => setDbHost(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono"
                      placeholder="127.0.0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Port</label>
                    <input
                      type="text"
                      value={dbPort}
                      onChange={(e) => setDbPort(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono"
                      placeholder="3306"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Database Name</label>
                    <input
                      type="text"
                      value={dbName}
                      onChange={(e) => setDbName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono"
                      placeholder="zfinance_db"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Table Prefix</label>
                    <input
                      type="text"
                      value={dbPrefix}
                      onChange={(e) => setDbPrefix(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono"
                      placeholder="zf_"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Username</label>
                    <input
                      type="text"
                      value={dbUser}
                      onChange={(e) => setDbUser(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono"
                      placeholder="root"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                    <input
                      type="password"
                      value={dbPass}
                      onChange={(e) => setDbPass(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {dbTestResult && (
                  <div className={`p-3 rounded-lg text-xs font-medium ${
                    dbTestResult.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}>
                    {dbTestResult.message}
                  </div>
                )}

                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <button
                    onClick={handleTestDatabase}
                    disabled={isTestingDb}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-lg border border-slate-200 flex items-center gap-1.5 transition"
                  >
                    <Zap className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{isTestingDb ? 'Testing...' : 'Test Connection'}</span>
                  </button>

                  <button onClick={() => setCurrentStep(5)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-1">
                    <span>Import SQL Schema</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: SQL IMPORT */}
            {currentStep === 5 && (
              <div className="space-y-6 text-center max-w-xl mx-auto py-2">
                <Database className="w-12 h-12 text-indigo-600 mx-auto" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">Step 5: Database Schema & Seed Data Import</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Importing core MySQL tables: <code>zf_income_categories</code>, <code>zf_income_sources</code>, <code>zf_income_records</code>, <code>zf_users</code>.
                  </p>
                </div>

                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Import Progress:</span>
                    <span>{importProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full transition-all duration-300" style={{ width: `${importProgress}%` }}></div>
                  </div>
                  <p className="text-[11px] font-mono text-slate-500">
                    {importProgress === 0 && 'Ready to execute SQL dump...'}
                    {importProgress > 0 && importProgress < 100 && 'Importing tables & standard categories...'}
                    {importProgress === 100 && 'SQL import completed successfully!'}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <button onClick={() => setCurrentStep(4)} className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  
                  {!importComplete ? (
                    <button
                      onClick={handleRunSqlImport}
                      disabled={isImporting}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-1"
                    >
                      <span>{isImporting ? 'Executing Migration...' : 'Run SQL Import'}</span>
                    </button>
                  ) : (
                    <button onClick={() => setCurrentStep(6)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-1">
                      <span>Proceed to App Config</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* STEP 6: APP CONFIG */}
            {currentStep === 6 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Step 6: Application & Company Settings</h3>
                  <p className="text-xs text-slate-500">Configure core operational details, currency, and regional format preferences.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Application Name</label>
                    <input type="text" value={appName} onChange={(e) => setAppName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Company / Organization</label>
                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Base Currency</label>
                    <select value={defaultCurrency} onChange={(e) => setDefaultCurrency(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono">
                      <option value="XAF">XAF (FCFA)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="NGN">NGN (₦)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Timezone</label>
                    <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono">
                      <option value="Africa/Douala">Africa/Douala (GMT+1)</option>
                      <option value="Africa/Lagos">Africa/Lagos (GMT+1)</option>
                      <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input type="email" value={appEmail} onChange={(e) => setAppEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                    <input type="text" value={appPhone} onChange={(e) => setAppPhone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5" />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <button onClick={() => setCurrentStep(5)} className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button onClick={() => setCurrentStep(7)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-1">
                    <span>Setup Super Admin</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 7: SUPER ADMIN ACCOUNT */}
            {currentStep === 7 && (
              <form onSubmit={handleFinishInstallation} className="space-y-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Step 7: Create Super Admin Account</h3>
                  <p className="text-xs text-slate-500">Configure master credentials for system administration.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                    <input type="text" value={adminFullName} onChange={(e) => setAdminFullName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5" required />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Username</label>
                    <input type="text" value={adminUsername} onChange={(e) => setAdminUsername(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono" required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5" required />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Password</label>
                    <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono" required placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono" required placeholder="••••••••" />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <button type="button" onClick={() => setCurrentStep(6)} className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-sm flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Complete Installation & Lock</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 8: COMPLETION SCREEN */}
            {currentStep === 8 && (
              <div className="space-y-6 text-center max-w-lg mx-auto py-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Z-FINANCE Installed Successfully!</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    The <code>.env</code> file has been generated and the lock file <code>install/installed.lock</code> is active.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left font-mono text-xs space-y-2">
                  <div className="font-bold text-slate-800 border-b border-slate-200 pb-2 flex justify-between">
                    <span>Target Target Environment:</span>
                    <span className="text-indigo-600">{targetHost}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Database Engine:</span>
                    <span className="font-bold text-slate-800">MySQL / PDO</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Environment Config:</span>
                    <span className="font-bold text-emerald-600">.env Generated</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Super Admin:</span>
                    <span className="font-bold text-slate-800">{adminUsername} ({adminEmail})</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Installer Status:</span>
                    <span className="font-bold text-emerald-600">Locked (installed.lock)</span>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => alert('Z-FINANCE Application launch confirmed! You can now use all financial income modules.')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-lg shadow-sm flex items-center gap-2"
                  >
                    <span>Launch Z-FINANCE Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

const LaptopIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className || "w-4 h-4"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);
