import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Clock,
  Calendar,
  DollarSign,
  Briefcase,
  Award,
  GraduationCap,
  UserCheck,
  ShieldAlert,
  FileCheck2,
  Settings,
  QrCode,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Megaphone,
  TrendingUp,
  AlertCircle,
  FileText,
  Lock,
  Unlock,
  RefreshCw,
  Building,
  CheckSquare,
  Sparkles
} from 'lucide-react';

export type HRMSTab =
  | 'overview'
  | 'employees'
  | 'recruitment'
  | 'attendance'
  | 'schedules'
  | 'leave'
  | 'payroll'
  | 'performance'
  | 'training'
  | 'ess'
  | 'disciplinary'
  | 'contracts'
  | 'admin_control';

interface EmployeeItem {
  id: string;
  code: string;
  name: string;
  department: string;
  jobTitle: string;
  type: string;
  joiningDate: string;
  salary: number;
  status: 'active' | 'probation' | 'suspended' | 'terminated';
}

interface LeaveItem {
  id: string;
  employeeName: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  status: 'pending' | 'approved' | 'rejected';
}

interface JobPositionItem {
  id: string;
  title: string;
  department: string;
  vacancies: number;
  applicantsCount: number;
  status: 'open' | 'closed';
}

export default function HRMSModule() {
  const [activeTab, setActiveTab] = useState<HRMSTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPayrollProcessing, setIsPayrollProcessing] = useState(false);
  const [payrollSuccess, setPayrollSuccess] = useState(false);

  // Sample Employees
  const [employees] = useState<EmployeeItem[]>([
    {
      id: 'EMP-101',
      code: 'EMP-0841',
      name: 'Dr. Sarah Jenkins',
      department: 'Finance & Accounting',
      jobTitle: 'Chief Financial Analyst',
      type: 'Full-time',
      joiningDate: '2022-03-15',
      salary: 8500.00,
      status: 'active'
    },
    {
      id: 'EMP-102',
      code: 'EMP-0842',
      name: 'Marcus Vance',
      department: 'Software Engineering',
      jobTitle: 'Lead DevOps Specialist',
      type: 'Full-time',
      joiningDate: '2023-01-10',
      salary: 7800.00,
      status: 'active'
    },
    {
      id: 'EMP-103',
      code: 'EMP-0843',
      name: 'Elena Rostova',
      department: 'Procurement & Logistics',
      jobTitle: 'Senior Vendor Relationship Manager',
      type: 'Full-time',
      joiningDate: '2025-09-01',
      salary: 6200.00,
      status: 'probation'
    }
  ]);

  // Sample Leave Requests
  const [leaveRequests] = useState<LeaveItem[]>([
    {
      id: 'LV-401',
      employeeName: 'Dr. Sarah Jenkins',
      department: 'Finance & Accounting',
      leaveType: 'Annual Leave',
      startDate: '2026-08-10',
      endDate: '2026-08-18',
      totalDays: 7,
      status: 'pending'
    },
    {
      id: 'LV-402',
      employeeName: 'Marcus Vance',
      department: 'Software Engineering',
      leaveType: 'Sick Leave',
      startDate: '2026-07-24',
      endDate: '2026-07-25',
      totalDays: 2,
      status: 'approved'
    }
  ]);

  // Sample Job Positions
  const [jobPositions] = useState<JobPositionItem[]>([
    {
      id: 'JOB-01',
      title: 'Senior SAP Financial Consultant',
      department: 'Finance & ERP',
      vacancies: 2,
      applicantsCount: 18,
      status: 'open'
    },
    {
      id: 'JOB-02',
      title: 'Global Procurement Officer',
      department: 'Supply Chain',
      vacancies: 1,
      applicantsCount: 12,
      status: 'open'
    }
  ]);

  const handleProcessPayroll = () => {
    setIsPayrollProcessing(true);
    setTimeout(() => {
      setIsPayrollProcessing(false);
      setPayrollSuccess(true);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-lg shadow-xs">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Human Resources & Payroll Management (HRMS)</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Complete employee lifecycle, recruitment ATS, QR/Biometric attendance, leave workflows, bulk payroll, ESS portal & GL posting.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('payroll')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <DollarSign className="w-4 h-4" />
            Process Monthly Payroll
          </button>
          <button
            onClick={() => setActiveTab('recruitment')}
            className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Post New Job Opening
          </button>
        </div>
      </div>

      {/* Super Admin Advertisement Placement */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-200 p-3 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-indigo-900 font-medium">
          <Megaphone className="w-4 h-4 text-indigo-600" />
          <span><strong>HR & Talent Portal:</strong> Access pre-vetted Finance & Engineering Talent across EU, UK, and North America.</span>
        </div>
        <span className="text-[10px] bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">Managed by Super Admin</span>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto pb-1">
        {[
          { id: 'overview', label: 'HR Dashboard', icon: TrendingUp },
          { id: 'employees', label: 'Employee Directory', icon: Users },
          { id: 'recruitment', label: 'Recruitment & ATS', icon: Briefcase },
          { id: 'attendance', label: 'Attendance & QR/Bio', icon: Clock },
          { id: 'schedules', label: 'Work Shifts', icon: Calendar },
          { id: 'leave', label: 'Leave Management', icon: Calendar },
          { id: 'payroll', label: 'Payroll & Payslips', icon: DollarSign },
          { id: 'performance', label: 'Performance & 360°', icon: Award },
          { id: 'training', label: 'Training & Skills', icon: GraduationCap },
          { id: 'ess', label: 'Employee Self-Service', icon: UserCheck },
          { id: 'disciplinary', label: 'Disciplinary Cases', icon: ShieldAlert },
          { id: 'contracts', label: 'Employment Contracts', icon: FileCheck2 },
          { id: 'admin_control', label: 'Super Admin Policies', icon: Settings },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as HRMSTab)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW DASHBOARD */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Total Workforce</span>
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">142 Employees</div>
              <div className="text-[11px] text-emerald-600 mt-1">+6 Hired This Month</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Attendance Today</span>
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">134 Present</div>
              <div className="text-[11px] text-amber-600 mt-1">3 Absent • 5 Late Arrivals</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Pending Leave Requests</span>
                <Calendar className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">7 Requests</div>
              <div className="text-[11px] text-amber-600 mt-1">Awaiting Manager Sign-off</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Monthly Payroll Spend</span>
                <DollarSign className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">$685,000.00</div>
              <div className="text-[11px] text-indigo-600 mt-1">Period: 2026-07 (Locked & Ready)</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                Active Employee Directory Snippet
              </h2>

              <div className="space-y-3">
                {employees.map(e => (
                  <div key={e.id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{e.name}</div>
                      <div className="text-[11px] text-slate-500">{e.jobTitle} • {e.department}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs font-bold text-slate-900">${e.salary.toFixed(2)}/mo</div>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold capitalize ${
                        e.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {e.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600" />
                Recruitment ATS & Vacancies
              </h2>

              <div className="space-y-3">
                {jobPositions.map(j => (
                  <div key={j.id} className="p-3 bg-purple-50/50 border border-purple-100 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-purple-900">{j.title}</div>
                      <div className="text-[11px] text-purple-700">{j.department} • {j.vacancies} Vacancies</div>
                    </div>
                    <span className="text-[11px] bg-purple-200 text-purple-900 font-bold px-2.5 py-1 rounded-full">
                      {j.applicantsCount} Applicants
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: PAYROLL & PAYSLIPS */}
      {activeTab === 'payroll' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Bulk Monthly Payroll & General Ledger Integration</h2>
              <p className="text-xs text-slate-500 mt-1">Period: July 2026 (2026-07) • 142 Active Employees</p>
            </div>

            <button
              onClick={handleProcessPayroll}
              disabled={isPayrollProcessing}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs disabled:opacity-50"
            >
              {isPayrollProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Processing Bulk Payroll & GL Posting...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Execute Bulk Payroll Run
                </>
              )}
            </button>
          </div>

          {payrollSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Bulk Payroll Run Completed & Posted to General Ledger!
              </div>
              <p>
                Processed $685,000.00 in gross salary, $68,500.00 statutory taxes, $54,800.00 pension contributions. Payslips dispatched to Employee Self-Service (ESS) portals.
              </p>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-600">
                  <th className="py-3 px-4">EMPLOYEE</th>
                  <th className="py-3 px-4 text-right">BASIC SALARY</th>
                  <th className="py-3 px-4 text-right">ALLOWANCES</th>
                  <th className="py-3 px-4 text-right">TAX DEDUCTION</th>
                  <th className="py-3 px-4 text-right">PENSION</th>
                  <th className="py-3 px-4 text-right">NET PAY</th>
                  <th className="py-3 px-4 text-center">PAYSLIP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {employees.map(e => {
                  const basic = e.salary;
                  const allowances = basic * 0.15;
                  const tax = (basic + allowances) * 0.10;
                  const pension = (basic + allowances) * 0.08;
                  const net = (basic + allowances) - (tax + pension);

                  return (
                    <tr key={e.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{e.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{e.code}</div>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">${basic.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right font-mono text-slate-600">${allowances.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right font-mono text-rose-600">-${tax.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right font-mono text-amber-600">-${pension.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700">${net.toFixed(2)}</td>
                      <td className="py-3 px-4 text-center">
                        <button className="flex items-center gap-1 mx-auto px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-medium">
                          <Download className="w-3 h-3" />
                          PDF Payslip
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 10: EMPLOYEE SELF-SERVICE (ESS) */}
      {activeTab === 'ess' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-base font-bold text-slate-900">Employee Self-Service (ESS) Portal View</h2>
            <p className="text-xs text-slate-500">Logged in as: Dr. Sarah Jenkins (Chief Financial Analyst)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-lg space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-indigo-900">
                <FileText className="w-4 h-4 text-indigo-600" />
                Latest Payslip Download
              </div>
              <p className="text-[11px] text-indigo-800">July 2026 Net Salary: $7,029.50</p>
              <button className="mt-2 text-xs text-indigo-700 font-bold underline flex items-center gap-1">
                <Download className="w-3 h-3" /> Download PDF
              </button>
            </div>

            <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-lg space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-amber-900">
                <Calendar className="w-4 h-4 text-amber-600" />
                Leave Balance
              </div>
              <p className="text-[11px] text-amber-800">Remaining Annual Leave: 13 Days</p>
              <button className="mt-2 text-xs text-amber-800 font-bold underline flex items-center gap-1">
                <Plus className="w-3 h-3" /> Request Leave
              </button>
            </div>

            <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-lg space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-emerald-900">
                <QrCode className="w-4 h-4 text-emerald-600" />
                Personal Attendance QR
              </div>
              <p className="text-[11px] text-emerald-800">Scan at Terminal / Kiosk</p>
              <span className="inline-block text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-mono font-bold">
                QR-EMP-841
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
