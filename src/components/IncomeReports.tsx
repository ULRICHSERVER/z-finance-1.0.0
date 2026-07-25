import React, { useState } from 'react';
import { FileSpreadsheet, Download, Printer, FileText, Calendar, Filter } from 'lucide-react';
import { IncomeRecord } from '../types';

interface IncomeReportsProps {
  incomes: IncomeRecord[];
}

export const IncomeReports: React.FC<IncomeReportsProps> = ({ incomes }) => {
  const [reportType, setReportType] = useState('Monthly Income Report');
  const [startDate, setStartDate] = useState('2026-07-01');
  const [endDate, setEndDate] = useState('2026-07-31');
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel' | 'csv'>('pdf');

  const handleGenerate = (fmt: 'pdf' | 'excel' | 'csv' | 'print') => {
    if (fmt === 'print') {
      window.print();
    } else {
      alert(`Generating ${reportType} in ${fmt.toUpperCase()} format...\nPeriod: ${startDate} to ${endDate}\nFile ready for download!`);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <FileSpreadsheet className="w-6 h-6 text-blue-600" />
          <span>Income Reports & Statements Generator</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Export executive income reports in PDF, Excel, CSV, or direct printable financial statements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Report Config Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Report Parameters</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Report Module Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2 text-slate-800"
              >
                <option>Daily Income Report</option>
                <option>Weekly Income Report</option>
                <option>Monthly Income Report</option>
                <option>Yearly Income Report</option>
                <option>Category Breakdown Report</option>
                <option>Source Performance Report</option>
                <option>Customer Revenue Report</option>
                <option>Service Income Report</option>
                <option>Project Revenue Report</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs rounded-xl p-2 text-slate-800"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs rounded-xl p-2 text-slate-800"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-2">Export Format</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setExportFormat('pdf')}
                  className={`py-2 text-xs font-bold rounded-xl border flex items-center justify-center space-x-1 ${
                    exportFormat === 'pdf' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-slate-50 text-slate-600'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-rose-600" />
                  <span>PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setExportFormat('excel')}
                  className={`py-2 text-xs font-bold rounded-xl border flex items-center justify-center space-x-1 ${
                    exportFormat === 'excel' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-600'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Excel</span>
                </button>
                <button
                  type="button"
                  onClick={() => setExportFormat('csv')}
                  className={`py-2 text-xs font-bold rounded-xl border flex items-center justify-center space-x-1 ${
                    exportFormat === 'csv' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-50 text-slate-600'
                  }`}
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>CSV</span>
                </button>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => handleGenerate(exportFormat)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 rounded-xl shadow-sm flex items-center justify-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Export {exportFormat.toUpperCase()} Statement</span>
              </button>
              <button
                onClick={() => handleGenerate('print')}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs py-2 rounded-xl flex items-center justify-center space-x-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Copy</span>
              </button>
            </div>

          </div>
        </div>

        {/* Generated Reports Preview / Audit Log */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Saved Financial Auditing Reports</h3>
              <p className="text-[11px] text-slate-400">Archived report downloads and compliance records</p>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-md">
              Audit Verified
            </span>
          </div>

          <div className="space-y-2">
            {[
              { name: 'July 2026 Executive Income Summary', period: '2026-07-01 to 2026-07-31', type: 'PDF Statement', date: '2026-07-22 10:14' },
              { name: 'Q2 2026 Category Breakdown Report', period: '2026-04-01 to 2026-06-30', type: 'Excel Spreadsheet', date: '2026-07-01 09:00' },
              { name: 'Cameroon Telecom S.A. Customer Revenue Ledger', period: '2026-01-01 to 2026-07-20', type: 'PDF Audit', date: '2026-07-20 15:45' },
              { name: 'Project Alpha Revenue & Profit Contribution', period: '2026-01-01 to 2026-07-18', type: 'CSV Export', date: '2026-07-18 11:20' }
            ].map((rep, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{rep.name}</div>
                    <div className="text-[11px] text-slate-400">{rep.period} • {rep.type}</div>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Downloading archived report: ${rep.name}`)}
                  className="bg-white hover:bg-slate-100 text-slate-700 font-semibold px-3 py-1.5 rounded-lg border border-slate-200 flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
