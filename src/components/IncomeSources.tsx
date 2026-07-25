import React, { useState } from 'react';
import { Layers, Plus, Trash2, Repeat, CheckCircle } from 'lucide-react';
import { IncomeSource, IncomeCategory, SourceType } from '../types';

interface IncomeSourcesProps {
  sources: IncomeSource[];
  categories: IncomeCategory[];
  onAddSource: (source: Partial<IncomeSource>) => void;
  onDeleteSource: (id: number) => void;
}

export const IncomeSources: React.FC<IncomeSourcesProps> = ({
  sources,
  categories,
  onAddSource,
  onDeleteSource
}) => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<number>(categories[0]?.id || 1);
  const [type, setType] = useState<SourceType>('service_related');
  const [isRecurring, setIsRecurring] = useState(false);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const cat = categories.find(c => c.id === Number(categoryId));
    onAddSource({
      source_name: name,
      category_id: Number(categoryId),
      category_name: cat?.category_name,
      type,
      is_recurring: isRecurring,
      description,
      status: 'active',
      is_deleted: false
    });
    setName('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-blue-600" />
            <span>Unlimited Income Sources Directory</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure unlimited specific income sources linked to categories, services, customers, and projects.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Create Source Form */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">New Income Source</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Source Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. AWS Cloud Reseller Margin"
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Parent Category *</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.category_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Stream Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as SourceType)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800"
              >
                <option value="service_related">Service Related</option>
                <option value="customer_related">Customer Related</option>
                <option value="project_related">Project Related</option>
                <option value="general">General Activity</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="recur"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="recur" className="text-xs font-bold text-slate-700 cursor-pointer">
                Recurring Stream Flag
              </label>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Source contract details..."
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-3 text-slate-800"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 rounded-xl shadow-sm flex items-center justify-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Save Source</span>
            </button>
          </form>
        </div>

        {/* Sources Directory Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Configured Income Sources ({sources.length})</h3>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-md font-bold">
              Unlimited Streams Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200/80">
                <tr>
                  <th className="p-3 pl-5">Source Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Recurring</th>
                  <th className="p-3 pr-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sources.map((src) => (
                  <tr key={src.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3 pl-5">
                      <div className="font-bold text-slate-900">{src.source_name}</div>
                      <div className="text-[11px] text-slate-400">{src.description}</div>
                    </td>
                    <td className="p-3 font-medium text-slate-700">{src.category_name || 'Service Income'}</td>
                    <td className="p-3">
                      <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase">
                        {src.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3">
                      {src.is_recurring ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-md font-bold">
                          Yes
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">One-time</span>
                      )}
                    </td>
                    <td className="p-3 pr-5 text-right">
                      <button
                        onClick={() => onDeleteSource(src.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-lg"
                        title="Delete Source"
                      >
                        <Trash2 className="w-4 h-4" />
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
