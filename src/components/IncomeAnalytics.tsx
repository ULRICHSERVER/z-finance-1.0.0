import React from 'react';
import { TrendingUp, Sparkles, Target, BarChart2, Zap, ArrowUpRight, Award, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { CurrencyCode } from '../types';

interface IncomeAnalyticsProps {
  selectedCurrency: CurrencyCode;
}

export const IncomeAnalytics: React.FC<IncomeAnalyticsProps> = ({ selectedCurrency }) => {
  const comparisonData = [
    { source: 'Managed IT', q1: 18000000, q2: 22000000, q3_forecast: 28000000 },
    { source: 'Software Subscriptions', q1: 12000000, q2: 15500000, q3_forecast: 19000000 },
    { source: 'Consulting', q1: 8500000, q2: 9800000, q3_forecast: 12000000 },
    { source: 'Rack Lease', q1: 3500000, q2: 4200000, q3_forecast: 5000000 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <span>Income Growth & Revenue Forecast Analytics</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Revenue forecast ready models, income comparison trends, and performance indicators.
        </p>
      </div>

      {/* Forecast & Growth Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Predictive Revenue Model */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-6 rounded-2xl border border-slate-700 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Revenue Forecast Ready Model</span>
            </span>
            <span className="text-[10px] bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 px-2 py-0.5 rounded-full font-mono">
              Q3/Q4 Projection
            </span>
          </div>

          <div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              28,500,000 XAF
            </div>
            <p className="text-xs text-indigo-200 mt-1">
              Projected Q3 2026 Gross Revenue based on active recurring contracts & customer retention.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-indigo-900/80 text-xs">
            <div className="flex justify-between text-indigo-200">
              <span>Confidence Score</span>
              <span className="font-bold text-emerald-400">78% High Probability</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Includes 3 active monthly enterprise retainers</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Adjusted for seasonal Q3 tech infrastructure audits</span>
            </div>
          </div>
        </div>

        {/* Growth KPIs */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-blue-600" />
              <span>Source Performance & Quarter Comparison</span>
            </h3>
            <span className="text-xs font-semibold text-slate-500">Q1 vs Q2 vs Q3 Forecast</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="source" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} />
                <Tooltip formatter={(val: number) => `XAF ${val.toLocaleString()}`} />
                <Bar dataKey="q1" name="Q1 Actual" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="q2" name="Q2 Actual" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="q3_forecast" name="Q3 Forecast" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
