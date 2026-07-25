import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, LineChart, ShieldAlert, 
  Sparkles, Download, Printer, Share2, Filter, Calendar, ArrowUpRight, ArrowDownRight, 
  CheckCircle2, AlertTriangle, Layers, Building, Users, FileText, Cpu, RefreshCw, Eye, Plus
} from 'lucide-react';
import { AdSuiteWidget } from './AdSuiteWidget';

interface KPIItem {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  category: string;
}

interface AIInsight {
  id: number;
  category: 'cost_reduction' | 'income_opportunity' | 'cash_warning' | 'profit_strategy';
  headline: string;
  detail: string;
  impactAmount: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface ForecastItem {
  period: string;
  revenue: number;
  expenses: number;
  profit: number;
  confidence: number;
}

export default function FinancialReportsModule() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pnl' | 'balance_sheet' | 'cash_flow' | 'kpis' | 'ai_insights' | 'forecast' | 'custom_builder'>('dashboard');

  // Date Filter State
  const [dateRange, setDateRange] = useState('year_to_date');
  const [customStartDate, setCustomStartDate] = useState('2026-01-01');
  const [customEndDate, setCustomEndDate] = useState('2026-12-31');

  // Custom Report Builder State
  const [builderDataSource, setBuilderDataSource] = useState('income');
  const [builderChartType, setBuilderChartType] = useState('bar');
  const [builderReportName, setBuilderReportName] = useState('Q3 Revenue & Profit Analysis');
  const [savedReports, setSavedReports] = useState<string[]>(['Monthly Profitability Breakdown', 'Q2 Expense Reduction Target']);

  // Executive Dashboard Data
  const totalIncome = 185400.00;
  const totalExpenses = 84200.00;
  const netProfit = totalIncome - totalExpenses;
  const profitMargin = ((netProfit / totalIncome) * 100).toFixed(1);
  const healthScore = 92;

  // KPI List
  const kpis: KPIItem[] = [
    { label: 'Revenue Growth Rate', value: '+18.5%', change: '+3.2% vs last Q', isPositive: true, category: 'Growth' },
    { label: 'Expense Growth Rate', value: '+6.2%', change: '-1.4% vs last Q', isPositive: true, category: 'Efficiency' },
    { label: 'Net Profit Margin', value: `${profitMargin}%`, change: '+4.1% YoY', isPositive: true, category: 'Profitability' },
    { label: 'Operating Cost Ratio', value: '45.4%', change: 'Optimal range', isPositive: true, category: 'Cost' },
    { label: 'Avg Transaction Value', value: '$3,850.00', change: '+$240.00', isPositive: true, category: 'Sales' },
    { label: 'Cash Flow Ratio', value: '2.45x', change: 'Strong liquidity', isPositive: true, category: 'Liquidity' },
    { label: 'Savings Rate', value: '24.8%', change: 'Above 20% target', isPositive: true, category: 'Savings' },
    { label: 'Budget Utilization', value: '78.4%', change: 'Under control', isPositive: true, category: 'Budget' }
  ];

  // AI Insights List
  const aiInsights: AIInsight[] = [
    {
      id: 1,
      category: 'cost_reduction',
      headline: 'Optimize Cloud & SaaS Recurring Subscriptions',
      detail: 'Cloud infrastructure and software expenses grew 14% this quarter. Consolidating 3 unused developer seats can save ~$850/month.',
      impactAmount: 10200.00,
      priority: 'high'
    },
    {
      id: 2,
      category: 'income_opportunity',
      headline: 'Upsell Enterprise SLA to Horizon Logistics',
      detail: 'Horizon Logistics API usage has reached 92% of current limits. Propose the Tier-2 Enterprise SLA Package.',
      impactAmount: 15000.00,
      priority: 'medium'
    },
    {
      id: 3,
      category: 'cash_warning',
      headline: 'Receivables Delay Alert - $4,840.00 Overdue',
      detail: 'Invoice INV-20260722-1089 is 5 days beyond standard 30-day payment terms. Auto-trigger reminder email.',
      impactAmount: 4840.00,
      priority: 'urgent'
    },
    {
      id: 4,
      category: 'profit_strategy',
      headline: 'Net Profit Margin Target Exceeded (+4.1%)',
      detail: 'Operational expenses dropped to 45.4% of total revenue. Reinvest 10% of profit into digital client acquisition.',
      impactAmount: 8500.00,
      priority: 'low'
    }
  ];

  // Forecast Data
  const forecastData: ForecastItem[] = [
    { period: 'Aug 2026', revenue: 33200, expenses: 15200, profit: 18000, confidence: 95 },
    { period: 'Sep 2026', revenue: 35100, expenses: 15800, profit: 19300, confidence: 92 },
    { period: 'Oct 2026', revenue: 37400, expenses: 16400, profit: 21000, confidence: 89 },
    { period: 'Nov 2026', revenue: 39800, expenses: 17100, profit: 22700, confidence: 86 },
    { period: 'Dec 2026', revenue: 42500, expenses: 18000, profit: 24500, confidence: 84 },
    { period: 'Jan 2027', revenue: 45000, expenses: 18800, profit: 26200, confidence: 80 }
  ];

  const handleExportCSV = () => {
    const csvRows = [
      ['Metric', 'Value'],
      ['Total Income', totalIncome],
      ['Total Expenses', totalExpenses],
      ['Net Profit', netProfit],
      ['Profit Margin', `${profitMargin}%`],
      ['Financial Health Score', healthScore]
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ZFinance_Executive_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-lg">
            <PieChart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Financial Intelligence & Analytics Platform</h1>
            <p className="text-xs text-slate-500">Executive Dashboards, Accounting Reports, AI Insights & Predictive Forecasting</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg transition"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-lg transition shadow-sm"
          >
            <Printer className="w-4 h-4" />
            Print Report
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
          <BarChart3 className="w-4 h-4" />
          Executive Dashboard
        </button>

        <button
          onClick={() => setActiveTab('pnl')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'pnl' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          Profit & Loss
        </button>

        <button
          onClick={() => setActiveTab('balance_sheet')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'balance_sheet' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building className="w-4 h-4" />
          Balance Sheet
        </button>

        <button
          onClick={() => setActiveTab('cash_flow')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'cash_flow' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Cash Flow Statement
        </button>

        <button
          onClick={() => setActiveTab('kpis')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'kpis' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <LineChart className="w-4 h-4" />
          Financial KPIs ({kpis.length})
        </button>

        <button
          onClick={() => setActiveTab('ai_insights')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'ai_insights' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          AI Recommendations
        </button>

        <button
          onClick={() => setActiveTab('forecast')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'forecast' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Cpu className="w-4 h-4" />
          AI Forecast
        </button>

        <button
          onClick={() => setActiveTab('custom_builder')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'custom_builder' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          Custom Report Builder
        </button>
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <AdSuiteWidget slotName="Executive Financial Report Header" location="reports_dashboard" />

          {/* Top Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Total Revenue</div>
              <div className="text-2xl font-bold text-slate-900">${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +18.5% YoY Growth
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Total Operating Expenses</div>
              <div className="text-2xl font-bold text-slate-900">${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <div className="flex items-center gap-1 text-xs text-rose-500 font-semibold mt-1">
                <ArrowDownRight className="w-3.5 h-3.5" /> 45.4% Operating Ratio
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-xl shadow-md">
              <div className="text-xs font-semibold uppercase text-indigo-100 mb-1">Net Operating Profit</div>
              <div className="text-2xl font-bold">${netProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <div className="text-xs text-indigo-200 font-medium mt-1">Net Margin: {profitMargin}%</div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Financial Health Score</div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-emerald-600">{healthScore}</span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
              <div className="text-xs text-emerald-700 font-medium mt-1">Excellent Financial Health</div>
            </div>
          </div>

          {/* Key Analytics & Top Performers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900">Top Revenue Clients</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg">
                  <span className="font-semibold text-slate-800">Acme Enterprise Global</span>
                  <span className="font-mono font-bold text-slate-900">$45,000.00</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg">
                  <span className="font-semibold text-slate-800">Horizon Retail Logistics</span>
                  <span className="font-mono font-bold text-slate-900">$28,500.00</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg">
                  <span className="font-semibold text-slate-800">Starlight Media Network</span>
                  <span className="font-mono font-bold text-slate-900">$18,200.00</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900">Top Expense Categories</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg">
                  <span className="font-semibold text-slate-800">Cloud & Infrastructure</span>
                  <span className="font-mono font-bold text-rose-600">$12,400.00</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg">
                  <span className="font-semibold text-slate-800">Payroll & Consulting</span>
                  <span className="font-mono font-bold text-rose-600">$42,000.00</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg">
                  <span className="font-semibold text-slate-800">Marketing & Acquisition</span>
                  <span className="font-mono font-bold text-rose-600">$8,200.00</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                AI Quick Summary
              </h3>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 space-y-2">
                <p className="font-semibold">✓ Business profitability is up +18.5% year-over-year.</p>
                <p>Cash reserves stand at $125,400.00 with zero default risk detected across active receivables.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROFIT & LOSS TAB */}
      {activeTab === 'pnl' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Profit & Loss Statement (Income Statement)</h2>
              <p className="text-xs text-slate-500">Period: Jan 01, 2026 – Dec 31, 2026 (Accrual Basis)</p>
            </div>
          </div>

          <div className="space-y-4 text-xs font-mono">
            {/* Income Section */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-100 px-4 py-2.5 font-bold text-slate-800 flex justify-between uppercase">
                <span>REVENUE / OPERATING INCOME</span>
                <span>AMOUNT ($)</span>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between text-slate-700">
                  <span>SaaS Enterprise Subscriptions</span>
                  <span>125,400.00</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Professional Onboarding & Consulting</span>
                  <span>42,000.00</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Custom AdSuite Monetization Revenue</span>
                  <span>18,000.00</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-700 border-t border-slate-200 pt-2 text-sm">
                  <span>TOTAL GROSS REVENUE</span>
                  <span>$185,400.00</span>
                </div>
              </div>
            </div>

            {/* Expenses Section */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-100 px-4 py-2.5 font-bold text-slate-800 flex justify-between uppercase">
                <span>OPERATING EXPENSES</span>
                <span>AMOUNT ($)</span>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between text-slate-700">
                  <span>Cloud Server Hosting & Infrastructure</span>
                  <span>12,400.00</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Payroll, Contracting & Salaries</span>
                  <span>54,000.00</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Digital Marketing & Advertising</span>
                  <span>12,800.00</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Office Operations & Administrative</span>
                  <span>5,000.00</span>
                </div>
                <div className="flex justify-between font-bold text-rose-700 border-t border-slate-200 pt-2 text-sm">
                  <span>TOTAL OPERATING EXPENSES</span>
                  <span>$84,200.00</span>
                </div>
              </div>
            </div>

            {/* Net Profit Bar */}
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex justify-between items-center text-sm font-bold text-indigo-900">
              <span>NET OPERATING PROFIT</span>
              <span className="text-base">${netProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      )}

      {/* BALANCE SHEET TAB */}
      {activeTab === 'balance_sheet' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Balance Sheet (Statement of Financial Position)</h2>
          <p className="text-xs text-slate-500">As of July 23, 2026</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
            {/* Assets */}
            <div className="border border-slate-200 rounded-lg p-4 space-y-3">
              <div className="font-bold text-slate-900 border-b pb-2 text-sm">CURRENT ASSETS</div>
              <div className="flex justify-between text-slate-700">
                <span>Operating Bank Accounts (Ecobank)</span>
                <span>$82,900.00</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Cash Reserve Vault</span>
                <span>$42,500.00</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Accounts Receivable (Invoices)</span>
                <span>$15,240.00</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-700 border-t pt-2 text-sm">
                <span>TOTAL ASSETS</span>
                <span>$140,640.00</span>
              </div>
            </div>

            {/* Liabilities & Equity */}
            <div className="border border-slate-200 rounded-lg p-4 space-y-3">
              <div className="font-bold text-slate-900 border-b pb-2 text-sm">LIABILITIES & EQUITY</div>
              <div className="flex justify-between text-slate-700">
                <span>Accounts Payable</span>
                <span>$14,500.00</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Retained Earnings & Equity</span>
                <span>$126,140.00</span>
              </div>
              <div className="flex justify-between font-bold text-indigo-700 border-t pt-2 text-sm">
                <span>TOTAL LIABILITIES & EQUITY</span>
                <span>$140,640.00</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CASH FLOW TAB */}
      {activeTab === 'cash_flow' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Cash Flow Statement</h2>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs font-mono">
            <div className="flex justify-between font-bold text-slate-800">
              <span>Operating Cash Inflow</span>
              <span className="text-emerald-600">+$125,400.00</span>
            </div>
            <div className="flex justify-between font-bold text-slate-800">
              <span>Operating Cash Outflow</span>
              <span className="text-rose-600">-$68,200.00</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2 text-sm text-indigo-900">
              <span>NET CASH POSITION</span>
              <span>+$57,200.00</span>
            </div>
          </div>
        </div>
      )}

      {/* KPIS TAB */}
      {activeTab === 'kpis' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm space-y-1">
              <div className="text-[10px] font-bold uppercase text-slate-400">{kpi.category}</div>
              <div className="text-sm font-semibold text-slate-700">{kpi.label}</div>
              <div className="text-2xl font-bold text-slate-900">{kpi.value}</div>
              <div className="text-xs text-emerald-600 font-medium">{kpi.change}</div>
            </div>
          ))}
        </div>
      )}

      {/* AI RECOMMENDATIONS TAB */}
      {activeTab === 'ai_insights' && (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
              <div>
                <h3 className="font-bold text-sm">Z-FINANCE AI Financial Intelligence Engine</h3>
                <p className="text-xs text-indigo-200">Real-time cost reduction ideas, revenue opportunities, and risk warnings</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {aiInsights.map(insight => (
              <div key={insight.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                      insight.priority === 'urgent' ? 'bg-rose-100 text-rose-800' : 'bg-indigo-100 text-indigo-800'
                    }`}>
                      {insight.priority} Priority
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{insight.headline}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{insight.detail}</p>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">Potential Impact</div>
                  <div className="text-base font-bold font-mono text-emerald-600">+${insight.impactAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI FORECAST TAB */}
      {activeTab === 'forecast' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-600" />
              6-Month Predictive AI Financial Forecast
            </h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">Model Confidence: 92%</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Period</th>
                  <th className="p-3">Projected Revenue</th>
                  <th className="p-3">Projected Expenses</th>
                  <th className="p-3">Projected Net Profit</th>
                  <th className="p-3">Confidence Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {forecastData.map((f, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{f.period}</td>
                    <td className="p-3 font-bold text-emerald-600">${f.revenue.toLocaleString()}</td>
                    <td className="p-3 font-bold text-rose-500">${f.expenses.toLocaleString()}</td>
                    <td className="p-3 font-bold text-indigo-700">${f.profit.toLocaleString()}</td>
                    <td className="p-3 text-slate-500">{f.confidence}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CUSTOM REPORT BUILDER TAB */}
      {activeTab === 'custom_builder' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Custom Financial Report Builder</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Report Title</label>
              <input 
                type="text" 
                value={builderReportName}
                onChange={(e) => setBuilderReportName(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Data Source</label>
              <select 
                value={builderDataSource}
                onChange={(e) => setBuilderDataSource(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
              >
                <option value="income">Income Transactions</option>
                <option value="expenses">Expense Records</option>
                <option value="invoices">Invoices & Receivables</option>
                <option value="journal">General Ledger Journal Entries</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Chart Visualization Type</label>
              <select 
                value={builderChartType}
                onChange={(e) => setBuilderChartType(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Trend Line Chart</option>
                <option value="pie">Pie Chart Distribution</option>
              </select>
            </div>
          </div>

          <button 
            onClick={() => setSavedReports([...savedReports, builderReportName])}
            className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-lg hover:bg-indigo-700 transition"
          >
            Save Custom Report Template
          </button>

          <div className="pt-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-800 text-xs mb-2">Saved Custom Report Templates</h4>
            <div className="flex flex-wrap gap-2">
              {savedReports.map((rep, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200">
                  {rep}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
