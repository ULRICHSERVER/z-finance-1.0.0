import React, { useState } from 'react';
import { Repeat, Play, Plus, Clock, CheckCircle2, Shield } from 'lucide-react';
import { RecurringSchedule, CurrencyCode } from '../types';

interface RecurringIncomeProps {
  schedules: RecurringSchedule[];
  selectedCurrency: CurrencyCode;
  onAddSchedule: (sched: Partial<RecurringSchedule>) => void;
  onTriggerRun: (id: number) => void;
}

export const RecurringIncome: React.FC<RecurringIncomeProps> = ({
  schedules,
  selectedCurrency,
  onAddSchedule,
  onTriggerRun
}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;
    onAddSchedule({
      title,
      category_name: 'Service Income',
      source_name: 'Managed IT Infrastructure',
      amount: parseFloat(amount) || 0,
      currency: 'XAF',
      frequency,
      start_date: new Date().toISOString().split('T')[0],
      next_run_date: '2026-08-01',
      status: 'active',
      auto_receive: true
    });
    setTitle('');
    setAmount('');
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Repeat className="w-6 h-6 text-blue-600" />
            <span>Recurring Income Engine</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Automate daily, weekly, monthly, yearly, or custom contracts, subscriptions, rent, and retainer feeds.
          </p>
        </div>
      </div>

      {/* Add & List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Create Schedule Form */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">New Recurring Automation</h3>
          <form onSubmit={handleAdd} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contract / Retainer Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Server Hosting Subscription"
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Amount (XAF) *</label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 rounded-xl shadow-sm flex items-center justify-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Create Schedule</span>
            </button>
          </form>
        </div>

        {/* Schedules Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Active Recurring Schedules ({schedules.length})</h3>
            <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md font-bold">
              Automated Generation Ready
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200/80">
                <tr>
                  <th className="p-3.5 pl-5">Schedule Title</th>
                  <th className="p-3.5">Frequency</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Next Generation</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schedules.map((sched) => (
                  <tr key={sched.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5 pl-5">
                      <div className="font-bold text-slate-900">{sched.title}</div>
                      <div className="text-[11px] text-slate-400">{sched.customer_name || 'General Client'}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                        {sched.frequency}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-emerald-600">
                      XAF {sched.amount.toLocaleString()}
                    </td>
                    <td className="p-3.5 font-mono text-xs font-semibold text-slate-700">
                      {sched.next_run_date}
                    </td>
                    <td className="p-3.5">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-md font-bold">
                        {sched.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3.5 pr-5 text-right">
                      <button
                        onClick={() => onTriggerRun(sched.id)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs px-2.5 py-1 rounded-lg border border-blue-200 flex items-center space-x-1 ml-auto"
                      >
                        <Play className="w-3 h-3" />
                        <span>Run Now</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
