import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Zap,
  FileText,
  Search,
  Settings,
  Database,
  BarChart2,
  Mic,
  Volume2,
  Shield,
  Layers,
  Send,
  RefreshCw,
  Sliders,
  DollarSign,
  PieChart,
  Brain,
  CheckCircle,
  Eye,
  SlidersHorizontal,
  Lock,
  Cpu,
  Globe,
  Plus,
  Trash2,
  Check,
  Building,
  Upload,
  BookOpen,
  Megaphone
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  tokens?: number;
}

interface AlertItem {
  id: string;
  type: 'unusual_expense' | 'low_cash' | 'late_payment' | 'declining_sales' | 'low_inventory' | 'expired_contract' | 'security_risk';
  severity: 'high' | 'medium' | 'critical';
  title: string;
  description: string;
  time: string;
}

export default function AIModule() {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'chat' | 'financial_analysis' | 'insights' | 'predictions' | 'alerts' | 'automation' | 'document_ai' | 'reports' | 'search' | 'permissions' | 'admin_control' | 'knowledge_base'
  >('dashboard');

  // AI Configuration State
  const [aiEnabled, setAiEnabled] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<'google_ai' | 'openai' | 'local' | 'custom'>('google_ai');
  const [selectedModel, setSelectedModel] = useState('gemini-3.6-flash');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [language, setLanguage] = useState<'en' | 'de' | 'fr' | 'es' | 'zh'>('en');

  // Chat State
  const [chatContext, setChatContext] = useState<'financial' | 'crm' | 'hrms' | 'documents' | 'inventory'>('financial');
  const [chatInput, setChatInput] = useState('');
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Hello! I am Z-FINANCE AI Assistant powered by Google Gemini 3.6 Flash. I have full read access to your General Ledger, CRM pipelines, HR workforce data, and warehouse inventories. How can I assist your financial decisions today?',
      time: '10:00 AM'
    }
  ]);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // OCR Document AI State
  const [ocrDocument, setOcrDocument] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<any | null>(null);

  // Sample Alerts
  const alerts: AlertItem[] = [
    {
      id: '1',
      type: 'unusual_expense',
      severity: 'high',
      title: 'Unusual Cloud Server Charge Detected',
      description: 'AWS billing spike of €1,450.00 detected on 2026-07-22 (+120% vs 30-day moving average).',
      time: '1 hour ago'
    },
    {
      id: '2',
      type: 'low_inventory',
      severity: 'critical',
      title: 'Low Stock Trigger - Munich Store',
      description: 'Barcode SKU-AC40 stock reached 8 units (Threshold: 15). Automated procurement RFQ queued.',
      time: '3 hours ago'
    },
    {
      id: '3',
      type: 'late_payment',
      severity: 'medium',
      title: 'Overdue Customer Invoice #INV-8812',
      description: 'TechCorp Berlin invoice of €14,500 is 12 days past due. Automated reminder draft prepared.',
      time: 'Yesterday'
    }
  ];

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    // Generate AI response
    setTimeout(() => {
      let aiText = `I have analyzed "${userMsg.text}" against your ${chatContext.toUpperCase()} ledger. Current cash reserves stand at €284,500 with a monthly growth trend of +14.2%. Gross operating margin is maintained at 64.2%.`;
      if (userMsg.text.toLowerCase().includes('forecast') || userMsg.text.toLowerCase().includes('predict')) {
        aiText = "Based on machine learning regression over 12 months of sales history, Q3 projected revenue is €212,000.00 (+14.9% growth) with an estimated net cashflow expansion of €61,000.00.";
      } else if (userMsg.text.toLowerCase().includes('risk') || userMsg.text.toLowerCase().includes('alert')) {
        aiText = "Risk Analysis Report: 1) Potential currency fluctuation impact on USD supplier contracts (€2,400 risk buffer). 2) Overdue receivables total €18,200.00 across 3 accounts.";
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tokens: 312
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  const handleVoiceInput = () => {
    if ('ZFinanceAI' in window && (window as any).ZFinanceAI) {
      setIsVoiceListening(true);
      (window as any).ZFinanceAI.listenVoiceInput((transcript: string) => {
        setChatInput(transcript);
        setIsVoiceListening(false);
      });
    } else {
      setIsVoiceListening(!isVoiceListening);
      if (!isVoiceListening) {
        setChatInput('Analyze expense reduction ideas for Q3');
      }
    }
  };

  const handleRunOCR = () => {
    setOcrResult({
      vendor: 'Acme Cloud Solutions Ltd.',
      invoiceNumber: 'INV-2026-9904',
      date: '2026-07-20',
      dueDate: '2026-08-19',
      subtotal: 1200.00,
      vat: 228.00,
      total: 1428.00,
      currency: 'EUR',
      confidence: '98.6%',
      category: 'IT Infrastructure & Hosting',
      matchedGLAccount: '6210 - Cloud & Software Subscriptions'
    });
  };

  const handleNaturalSearch = () => {
    if (!searchQuery.trim()) return;
    setSearchResults([
      { type: 'Transaction', id: 'TX-9011', title: 'AWS Cloud Hosting Invoice', amount: '€1,450.00', date: '2026-07-22' },
      { type: 'Customer', id: 'CUST-102', title: 'TechCorp Berlin GmbH', status: 'Active (ARR: €45,000)', date: '2026-01-15' },
      { type: 'Report', id: 'REP-2026-Q2', title: 'Q2 Executive Financial Performance', author: 'Z-FINANCE AI Engine', date: '2026-06-30' },
      { type: 'Contract', id: 'CNT-8821', title: 'Office Space Lease Agreement', expiry: '2027-12-31', date: '2024-01-01' }
    ]);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto bg-slate-50 min-h-screen text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900">AI Assistant & Business Intelligence</h1>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Z-FINANCE 1.0.0
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Artificial Intelligence Assistant, Financial Forecasting, Smart Alerts, Document AI, and BI Platform
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm text-xs font-semibold text-slate-700">
            <Cpu className="w-4 h-4 text-emerald-600" />
            <span>Model: {selectedModel}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <button
            onClick={() => setAiEnabled(!aiEnabled)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
              aiEnabled ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-200 text-slate-600'
            }`}
          >
            {aiEnabled ? 'AI Engine Active' : 'AI Engine Disabled'}
          </button>
        </div>
      </div>

      {/* Super Admin Advertisement Placement Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-3 rounded-xl border border-indigo-900 text-white text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-amber-400" />
          <span>
            <strong className="text-amber-400">Super Admin Sponsored Announcement:</strong> Upgrade to Z-FINANCE Dedicated Enterprise AI Clusters for zero latency and private LLM model deployment.
          </span>
        </div>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Managed by Super Admin</span>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'dashboard', label: 'AI Dashboard', icon: BarChart2 },
          { id: 'chat', label: 'AI Chat Assistant', icon: Bot },
          { id: 'financial_analysis', label: 'Financial Analysis', icon: PieChart },
          { id: 'insights', label: 'Business Insights', icon: Brain },
          { id: 'predictions', label: 'Predictions & Forecasting', icon: TrendingUp },
          { id: 'alerts', label: 'Smart Alerts', icon: AlertTriangle },
          { id: 'automation', label: 'Automation Engine', icon: Zap },
          { id: 'document_ai', label: 'Document AI / OCR', icon: FileText },
          { id: 'reports', label: 'AI Report Generator', icon: Sliders },
          { id: 'search', label: 'Intelligent AI Search', icon: Search },
          { id: 'permissions', label: 'AI Permissions', icon: Shield },
          { id: 'knowledge_base', label: 'Knowledge Base', icon: BookOpen },
          { id: 'admin_control', label: 'Super Admin Control', icon: Settings }
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

      {/* TAB 1: AI DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 uppercase">Today AI Queries</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">184 Requests</p>
              <span className="text-xs text-emerald-600 font-medium">100% Operational</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 uppercase">Token Usage</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">245,000 Tokens</p>
              <span className="text-xs text-blue-600 font-medium">Daily Limit: 1,000,000</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 uppercase">Average Latency</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">142.5 ms</p>
              <span className="text-xs text-emerald-600 font-medium">Google Gemini Cloud</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 uppercase">Active Automation Rules</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">12 Active Rules</p>
              <span className="text-xs text-indigo-600 font-medium">247 Triggered This Week</span>
            </div>
          </div>

          {/* Business Insights & Financial Predictions Quick Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Real-time Business Insights */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  Real-Time AI Business Insights
                </h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">Auto-Generated</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="flex justify-between text-xs font-bold text-blue-900">
                    <span>SALES & REVENUE</span>
                    <span className="text-emerald-600">+14.9% Forecast Expansion</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1">
                    SaaS subscription upgrade frequency in DACH region reached a 6-month high.
                  </p>
                </div>

                <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                  <div className="flex justify-between text-xs font-bold text-amber-900">
                    <span>EXPENSE REDUCTION</span>
                    <span className="text-amber-700">Potential Savings: €1,450/mo</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1">
                    Duplicate cloud server subscriptions detected in IT expense accounts.
                  </p>
                </div>

                <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <div className="flex justify-between text-xs font-bold text-emerald-900">
                    <span>CASH FLOW VELOCITY</span>
                    <span className="text-emerald-700">Healthy Buffer</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1">
                    Accounts receivable collection time decreased from 24 days to 18 days.
                  </p>
                </div>
              </div>
            </div>

            {/* Smart Alerts Feed */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Active Smart Alerts & Risk Detections
                </h3>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">3 Detections</span>
              </div>

              <div className="space-y-3">
                {alerts.map((a) => (
                  <div key={a.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 text-xs">{a.title}</span>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                          a.severity === 'critical'
                            ? 'bg-rose-100 text-rose-800'
                            : a.severity === 'high'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {a.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{a.description}</p>
                    <span className="text-[10px] text-slate-400 block">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI CHAT ASSISTANT */}
      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chat Configuration & Context (4 cols) */}
          <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sliders className="w-5 h-5 text-blue-600" />
              Chat Context & Settings
            </h3>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-600 uppercase">Data Access Scope</label>
              <select
                value={chatContext}
                onChange={(e) => setChatContext(e.target.value as any)}
                className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:border-blue-500"
              >
                <option value="financial">Financial & General Ledger</option>
                <option value="crm">CRM & Sales Pipeline</option>
                <option value="hrms">HRMS & Workforce Analytics</option>
                <option value="documents">Document Archive & Contracts</option>
                <option value="inventory">Warehouse Inventory & Stock</option>
              </select>
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold text-slate-600 uppercase">Assistant Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:border-blue-500"
              >
                <option value="en">English (US/UK)</option>
                <option value="de">German (Deutsch)</option>
                <option value="fr">French (Français)</option>
                <option value="es">Spanish (Español)</option>
                <option value="zh">Chinese (Mandarin)</option>
              </select>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 font-medium">Voice Synthesizer</span>
                <input
                  type="checkbox"
                  checked={voiceEnabled}
                  onChange={(e) => setVoiceEnabled(e.target.checked)}
                  className="rounded text-blue-600"
                />
              </div>
              <p className="text-[11px] text-slate-400">Reads AI assistant answers aloud using Web Speech API.</p>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-xs text-blue-900 space-y-1">
              <span className="font-bold block">Context Awareness Active</span>
              <p>The assistant reads live relational records securely based on your assigned user permission roles.</p>
            </div>
          </div>

          {/* Active Chat Interface (8 cols) */}
          <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-[600px]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-slate-900 text-sm">Z-FINANCE Assistant</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                  GEMINI-3.6-FLASH
                </span>
              </div>
              <button onClick={() => setMessages([])} className="text-xs text-slate-400 hover:text-rose-600 font-medium">
                Clear Chat
              </button>
            </div>

            {/* Chat Messages Feed */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-1 shadow-sm ${
                      m.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                    }`}
                  >
                    <p>{m.text}</p>
                    <div
                      className={`flex items-center justify-end gap-2 text-[10px] ${
                        m.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                      }`}
                    >
                      {m.tokens && <span>{m.tokens} tokens</span>}
                      <span>{m.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={handleVoiceInput}
                className={`p-2.5 rounded-lg border transition-all ${
                  isVoiceListening ? 'bg-rose-100 text-rose-600 border-rose-300 animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
                }`}
                title="Voice Input"
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder="Ask financial questions, demand predictions, or expense analysis..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-blue-500 bg-slate-50"
              />

              <button
                onClick={handleSendMessage}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                Ask AI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AI FINANCIAL ANALYSIS */}
      {activeTab === 'financial_analysis' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Profitability Index</span>
              <p className="text-2xl font-bold text-slate-900">64.2% Gross Margin</p>
              <p className="text-xs text-slate-600 leading-tight">
                AI evaluation confirms gross margin remains +3.8% above industry benchmark.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Cash Flow Velocity</span>
              <p className="text-2xl font-bold text-slate-900">€284,500 Buffer</p>
              <p className="text-xs text-emerald-600 font-medium">Zero liquidity risk over 90-day horizon.</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Expense Efficiency</span>
              <p className="text-2xl font-bold text-slate-900">91.4 / 100 Score</p>
              <p className="text-xs text-blue-600 font-medium">Recommended cost reduction: €1,450/mo.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BUSINESS INSIGHTS */}
      {activeTab === 'insights' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            AI Generated Business Insights Engine
          </h2>
          <p className="text-sm text-slate-500">
            Automated recommendations across Sales, Customers, Inventory, Expenses, Projects, and Employee Productivity.
          </p>
        </div>
      )}

      {/* TAB 5: PREDICTIONS */}
      {activeTab === 'predictions' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Predictive Machine Learning Forecasting
          </h2>
          <p className="text-sm text-slate-500">
            30-day, 90-day, and 1-year predictive regression models for Revenue, Expenses, Cash Flow, Sales Demand, Customer Growth, and Inventory Reorder thresholds.
          </p>
        </div>
      )}

      {/* TAB 8: DOCUMENT AI / OCR */}
      {activeTab === 'document_ai' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
              <Upload className="w-5 h-5 text-blue-600" />
              Document Upload & OCR Extraction
            </h3>

            <div className="border-2 border-dashed border-slate-200 p-8 rounded-xl text-center space-y-3 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer">
              <FileText className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-xs font-bold text-slate-700">Drop Invoice, Receipt, or Contract PDF/Image here</p>
              <p className="text-[11px] text-slate-400">Supports PDF, PNG, JPG, TIFF up to 25MB</p>
              <button onClick={handleRunOCR} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm">
                Simulate Optical Character Recognition (OCR)
              </button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Extracted Structured Data
            </h3>

            {ocrResult ? (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-slate-50 rounded border">
                    <span className="text-slate-400 text-[10px] block">VENDOR</span>
                    <span className="font-bold text-slate-900">{ocrResult.vendor}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded border">
                    <span className="text-slate-400 text-[10px] block">INVOICE #</span>
                    <span className="font-bold text-blue-600">{ocrResult.invoiceNumber}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded border">
                    <span className="text-slate-400 text-[10px] block">TOTAL AMOUNT</span>
                    <span className="font-bold text-slate-900">€{ocrResult.total.toFixed(2)}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded border">
                    <span className="text-slate-400 text-[10px] block">CONFIDENCE</span>
                    <span className="font-bold text-emerald-600">{ocrResult.confidence}</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 text-emerald-900 rounded border border-emerald-200">
                  <span className="font-bold block">Auto-Matched GL Account:</span>
                  <span>{ocrResult.matchedGLAccount}</span>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs">Upload a document to view AI extracted parameters.</div>
            )}
          </div>
        </div>
      )}

      {/* TAB 10: INTELLIGENT AI SEARCH */}
      {activeTab === 'search' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" />
            Natural Language AI Search Engine
          </h2>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Find all AWS invoices over €1,000 from last quarter or search TechCorp contract"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleNaturalSearch()}
              className="flex-1 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 bg-slate-50"
            />
            <button
              onClick={handleNaturalSearch}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-sm"
            >
              Search System
            </button>
          </div>

          {searchResults.length > 0 && (
            <div className="space-y-2 pt-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase">Search Results ({searchResults.length})</h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg">
                {searchResults.map((r, i) => (
                  <div key={i} className="p-3 hover:bg-slate-50 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-blue-600 font-mono mr-2">[{r.type}]</span>
                      <span className="font-bold text-slate-900">{r.title}</span>
                      <span className="text-slate-400 ml-2">ID: {r.id}</span>
                    </div>
                    <span className="text-slate-500">{r.amount || r.status || r.expiry || r.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 13: SUPER ADMIN AI CONTROL */}
      {activeTab === 'admin_control' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-600" />
                Super Admin AI & Machine Learning Governance
              </h2>
              <p className="text-xs text-slate-500">Configure AI Providers, Token Quotas, Permissions, and Advertisement Placements</p>
            </div>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded">Super Admin Access</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-700 uppercase">Primary AI Provider</label>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value as any)}
                className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50"
              >
                <option value="google_ai">Google AI (Gemini 3.6 Flash / Pro)</option>
                <option value="openai">OpenAI (GPT-4o)</option>
                <option value="local">Local On-Premise Llama 3 Cluster</option>
                <option value="custom">Custom Proprietary AI REST Gateway</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-700 uppercase">Active Model Blueprint</label>
              <input
                type="text"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 font-mono"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
