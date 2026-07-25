import React, { useState } from 'react';
import { Tag, Plus, Edit2, Trash2, CheckCircle, Power, RefreshCw } from 'lucide-react';
import { IncomeCategory } from '../types';

interface IncomeCategoriesProps {
  categories: IncomeCategory[];
  onAddCategory: (cat: Partial<IncomeCategory>) => void;
  onToggleStatus: (id: number) => void;
  onDeleteCategory: (id: number) => void;
}

export const IncomeCategories: React.FC<IncomeCategoriesProps> = ({
  categories,
  onAddCategory,
  onToggleStatus,
  onDeleteCategory
}) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#3B82F6');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    onAddCategory({
      category_name: name,
      category_code: code || `CAT-${name.substring(0, 3).toUpperCase()}`,
      description: description || 'New Category',
      color_code: color,
      icon: 'tag',
      status: 'active',
      is_deleted: false
    });
    setName('');
    setCode('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Tag className="w-6 h-6 text-indigo-600" />
            <span>Income Categories Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Organize income streams into structured activities (Service, Products, Consulting, Salary, Rental, etc.)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Create Form */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Create New Category</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Licensing Revenue"
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. CAT-LIC"
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Color Marker</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-9 rounded-lg border border-slate-200 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Scope of this income category..."
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs py-2.5 rounded-lg shadow-sm flex items-center justify-center space-x-1 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </form>
        </div>

        {/* Categories Directory Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Configured Categories ({categories.length})</h3>
            <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-md font-bold">13 Standard Stream Ready</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200/80">
                <tr>
                  <th className="p-3 pl-5">Category Name</th>
                  <th className="p-3">Code</th>
                  <th className="p-3">Color</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 pr-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3 pl-5">
                      <div className="font-bold text-slate-900">{cat.category_name}</div>
                      <div className="text-[11px] text-slate-400">{cat.description}</div>
                    </td>
                    <td className="p-3 font-mono text-xs text-slate-600">{cat.category_code}</td>
                    <td className="p-3">
                      <span className="inline-block w-4 h-4 rounded-full border border-slate-300" style={{ backgroundColor: cat.color_code }}></span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => onToggleStatus(cat.id)}
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          cat.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {cat.status.toUpperCase()}
                      </button>
                    </td>
                    <td className="p-3 pr-5 text-right space-x-1">
                      <button
                        onClick={() => onDeleteCategory(cat.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-lg"
                        title="Delete Category"
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
