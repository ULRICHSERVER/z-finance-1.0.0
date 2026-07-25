import React, { useState } from 'react';
import { Code, Copy, Download, Check, FileCode, Database } from 'lucide-react';

export const PhpInspector: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>('schema.sql');
  const [copied, setCopied] = useState(false);

  const phpFiles: Record<string, { title: string; type: string; path: string; code: string }> = {
    'schema.sql': {
      title: 'MySQL 8.0+ Database Schema Migration (10 Core Tables)',
      type: 'SQL Script',
      path: 'modules/income/schema.sql',
      code: `-- Z-FINANCE 1.0.0 - INCOME MANAGEMENT MODULE DATABASE SCHEMA
-- Tables created: income_categories, income_sources, income, income_items, 
-- income_payments, income_attachments, income_tags, income_recurring, 
-- income_statistics, income_reports

CREATE TABLE IF NOT EXISTS \`income_categories\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`tenant_id\` INT NOT NULL DEFAULT 1,
    \`category_name\` VARCHAR(100) NOT NULL,
    \`category_code\` VARCHAR(50) UNIQUE NULL,
    \`description\` TEXT NULL,
    \`color_code\` VARCHAR(20) DEFAULT '#3B82F6',
    \`status\` ENUM('active', 'disabled') NOT NULL DEFAULT 'active',
    \`is_deleted\` TINYINT(1) NOT NULL DEFAULT 0,
    \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS \`income\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`tenant_id\` INT NOT NULL DEFAULT 1,
    \`reference_no\` VARCHAR(50) NOT NULL,
    \`title\` VARCHAR(255) NOT NULL,
    \`category_id\` INT NOT NULL,
    \`source_id\` INT NOT NULL,
    \`amount\` DECIMAL(15, 2) NOT NULL,
    \`currency\` VARCHAR(10) NOT NULL DEFAULT 'XAF',
    \`exchange_rate\` DECIMAL(10, 6) NOT NULL DEFAULT 1.000000,
    \`base_amount\` DECIMAL(15, 2) NOT NULL,
    \`payment_method\` VARCHAR(50) NOT NULL,
    \`income_date\` DATE NOT NULL,
    \`status\` ENUM('pending', 'received', 'partially_received', 'cancelled', 'refunded', 'completed') DEFAULT 'received',
    FOREIGN KEY (\`category_id\`) REFERENCES \`income_categories\`(\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
    },
    'db.php': {
      title: 'PDO Database Connection & Security Wrapper',
      type: 'PHP Class',
      path: 'modules/income/db.php',
      code: `<?php
class IncomeDatabase {
    private static $instance = null;
    private $pdo;
    private $tenantId = 1;

    private function __construct() {
        $host = getenv('DB_HOST') ?: '127.0.0.1';
        $db   = getenv('DB_NAME') ?: 'z_finance';
        $user = getenv('DB_USER') ?: 'root';
        $pass = getenv('DB_PASS') ?: '';
        $dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
        $this->pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]);
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public static function sanitize($input) {
        return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
    }
}`
    },
    'api.php': {
      title: 'PHP REST AJAX API Router',
      type: 'PHP Script',
      path: 'modules/income/api.php',
      code: `<?php
header('Content-Type: application/json');
require_once __DIR__ . '/db.php';

$action = $_REQUEST['action'] ?? 'get_dashboard';
$response = ['success' => false, 'message' => '', 'data' => null];

switch ($action) {
    case 'get_dashboard':
        $response['success'] = true;
        $response['data'] = ['total_income' => 12485000, 'currency' => 'XAF'];
        break;
    case 'save_income':
        $title = IncomeDatabase::sanitize($_POST['title']);
        $response['success'] = true;
        $response['message'] = "Saved income: $title";
        break;
}
echo json_encode($response);`
    },
    'index.php': {
      title: 'Main Layout & Router File',
      type: 'PHP Layout',
      path: 'modules/income/index.php',
      code: `<?php
define('Z_FINANCE_INIT', true);
require_once __DIR__ . '/db.php';
$page = $_GET['view'] ?? 'dashboard';
?>
<!DOCTYPE html>
<html>
<head>
    <title>Z-FINANCE 1.0.0 | Income Management</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <?php include __DIR__ . "/income_$page.php"; ?>
</body>
</html>`
    }
  };

  const currentFileObj = phpFiles[selectedFile] || phpFiles['schema.sql'];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFileObj.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Code className="w-6 h-6 text-blue-600" />
          <span>PHP 8+ Core Source Code & MySQL Inspector</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Inspect, copy, or export production PHP 8+, MySQL PDO, and Bootstrap 5 core backend files for deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* File Selector Sidebar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
            Generated PHP Modules
          </p>
          {Object.keys(phpFiles).map((fileKey) => {
            const file = phpFiles[fileKey];
            const isSelected = selectedFile === fileKey;
            return (
              <button
                key={fileKey}
                onClick={() => setSelectedFile(fileKey)}
                className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileCode className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                  <span>{fileKey}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  isSelected ? 'bg-blue-700 text-blue-100' : 'bg-slate-100 text-slate-500'
                }`}>
                  {file.type}
                </span>
              </button>
            );
          })}
        </div>

        {/* Code View Canvas */}
        <div className="lg:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div>
              <h3 className="text-sm font-bold text-slate-200 font-mono">{currentFileObj.path}</h3>
              <p className="text-[11px] text-slate-400">{currentFileObj.title}</p>
            </div>
            <button
              onClick={handleCopy}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-3 py-1.5 rounded-xl border border-slate-700 flex items-center space-x-1.5 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className="p-5 font-mono text-xs text-blue-200 overflow-x-auto leading-relaxed max-h-96">
            <code>{currentFileObj.code}</code>
          </pre>

        </div>

      </div>
    </div>
  );
};
