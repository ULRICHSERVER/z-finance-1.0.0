import React from 'react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  PlusCircle, 
  Award,
  Wallet,
  Building2,
  PieChart as PieIcon,
  BarChart3,
  CalendarDays
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';
import { IncomeRecord, CurrencyCode } from '../types';

interface IncomeDashboardProps {
  incomes: IncomeRecord[];
  selectedCurrency: CurrencyCode;
  onOpenAddModal: () => void;
  onNavigateToList: () => void;
}

export const IncomeDashboard: React.FC<IncomeDashboardProps> = ({
  incomes,
  selectedCurrency,
  onOpenAddModal,
  onNavigateToList
}) => {
  // Format Currency Utility
  const formatCurrency = (amountInXaf: number) => {
    let rate = 1;
    let symbol = 'XAF';

    if (selectedCurrency === 'USD') { rate = 0.00165; symbol = '$'; }
    else if (selectedCurrency === 'EUR') { rate = 0.00152; symbol = '€'; }
    else if (selectedCurrency === 'GBP') { rate = 0.00130; symbol = '£'; }
    else if (selectedCurrency === 'NGN') { rate = 2.45; symbol = '₦'; }

    const converted = amountInXaf * rate;
    return `${symbol} ${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  // Calculations
  const totalIncomeXaf = incomes
    .filter(i => i.status === 'received' || i.status === 'completed' || i.status === 'partially_received')
    .reduce((sum, i) => sum + i.base_amount, 0);

  const pendingIncomeXaf = incomes
    .filter(i => i.status === 'pending')
    .reduce((sum, i) => sum + i.base_amount, 0);

  // Group by category for chart
  const categoryTotals: Record<string, number> = {};
  incomes.forEach(inc => {
    categoryTotals[inc.category_name] = (categoryTotals[inc.category_name] || 0) + inc.base_amount;
  });

  const pieColors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#06B6D4', '#6366F1'];
  const categoryChartData = Object.keys(categoryTotals).map((catName, idx) => ({
    name: catName,
    value: categoryTotals[catName],
    color: pieColors[idx % pieColors.length]
  }));

  // Monthly Trend Mock Data
  const monthlyTrendData = [
    { month: 'Jan', income: 6500000, net: 5800000 },
    { month: 'Feb', income: 7200000, net: 6400000 },
    { month: 'Mar', income: 8100000, net: 7300000 },
    { month: 'Apr', income: 7900000, net: 7000000 },
    { month: 'May', income: 9400000, net: 8500000 },
    { month: 'Jun', income: 10800000, net: 9700000 },
    { month: 'Jul', income: totalIncomeXaf || 12485000, net: (totalIncomeXaf || 12485000) * 0.9 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Wallet className="w-6 h-6 text-indigo-600" />
            <span>Income Management Dashboard</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time multi-currency revenue streams, category performance, and recurring growth analytics.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenAddModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-lg shadow-sm flex items-center space-x-2 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Record Income</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Income */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Gross Income</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {formatCurrency(totalIncomeXaf)}
            </div>
            <div className="flex items-center text-xs font-semibold text-emerald-600 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              <span>+14.2% Growth vs prior month</span>
            </div>
          </div>
        </div>

        {/* Monthly Income */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Monthly Revenue</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <CalendarDays className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {formatCurrency(totalIncomeXaf)}
            </div>
            <div className="flex items-center text-xs font-semibold text-slate-500 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1" />
              <span>92% of monthly target met</span>
            </div>
          </div>
        </div>

        {/* Pending Income */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Invoices</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {formatCurrency(pendingIncomeXaf)}
            </div>
            <div className="flex items-center text-xs font-semibold text-amber-600 mt-1">
              <span>{incomes.filter(i => i.status === 'pending').length} Unsettled invoices</span>
            </div>
          </div>
        </div>

        {/* Top Income Source */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Highest Source</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-sm font-bold text-slate-900 truncate">
              Managed IT Infrastructure
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">
              {formatCurrency(3500000)} (30.4% share)
            </div>
          </div>
        </div>

      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Income Trend Area Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                <span>Income Trend & Net Revenue Growth</span>
              </h3>
              <p className="text-[11px] text-slate-400">Monthly revenue accumulation in base currency</p>
            </div>
            <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md font-semibold border border-indigo-100">
              2026 YTD
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} />
                <Tooltip 
                  formatter={(val: number) => [formatCurrency(val), 'Income']} 
                  contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="income" stroke="#4F46E5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorIncome)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Pie Chart */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-emerald-600" />
                <span>Category Distribution</span>
              </h3>
              <p className="text-[11px] text-slate-400">Share by income stream category</p>
            </div>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: number) => formatCurrency(val)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 max-h-32 overflow-y-auto">
            {categoryChartData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-600 font-medium truncate max-w-[120px]">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Income Records Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Transactions</h3>
            <p className="text-[11px] text-slate-400">Latest recorded incoming revenues</p>
          </div>
          <button
            onClick={onNavigateToList}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            View All Transactions →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3 pl-5">Ref No</th>
                <th className="p-3">Title / Category</th>
                <th className="p-3">Customer / Service</th>
                <th className="p-3">Date</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Payment</th>
                <th className="p-3 pr-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {incomes.slice(0, 5).map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 pl-5 font-mono text-xs font-bold text-indigo-600">
                    {inc.reference_no}
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-slate-900">{inc.title}</div>
                    <div className="text-[11px] text-slate-400">{inc.category_name} • {inc.source_name}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-medium text-slate-800">{inc.customer_name || 'Walk-in Client'}</div>
                    <div className="text-[11px] text-slate-400">{inc.service_name || inc.project_name || '—'}</div>
                  </td>
                  <td className="p-3 text-slate-600 whitespace-nowrap">{inc.income_date}</td>
                  <td className="p-3 font-bold text-slate-900 whitespace-nowrap">
                    {formatCurrency(inc.base_amount)}
                  </td>
                  <td className="p-3">
                    <span className="inline-block bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md text-[11px] font-medium">
                      {inc.payment_method}
                    </span>
                  </td>
                  <td className="p-3 pr-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        inc.status === 'received' || inc.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : inc.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {inc.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
