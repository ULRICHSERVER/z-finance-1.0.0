import React, { useState } from 'react';
import { 
  Users, UserCheck, UserX, Building, Shield, Key, Search, Filter, 
  Plus, Mail, Phone, Calendar, Briefcase, FileText, Activity, Clock, 
  CheckCircle, AlertCircle, Eye, Edit, Trash2, ShieldAlert, Award, 
  Download, UserPlus, Layers, Settings, Check, Lock, ChevronRight, BarChart2
} from 'lucide-react';
import { AdSuiteWidget } from './AdSuiteWidget';

interface Employee {
  id: number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  team: string;
  role: string;
  employmentType: 'full_time' | 'part_time' | 'contract' | 'temporary' | 'intern' | 'volunteer' | 'consultant' | 'freelancer';
  joiningDate: string;
  status: 'active' | 'inactive' | 'on_leave' | 'terminated';
  avatarBg: string;
}

interface Department {
  id: number;
  code: string;
  name: string;
  manager: string;
  memberCount: number;
  status: 'active' | 'inactive';
}

interface Team {
  id: number;
  name: string;
  department: string;
  teamLead: string;
  memberCount: number;
  status: 'active' | 'inactive';
}

interface Role {
  id: number;
  name: string;
  description: string;
  assignedCount: number;
  isSystemRole: boolean;
}

interface Invitation {
  id: number;
  email: string;
  role: string;
  department: string;
  status: 'pending' | 'accepted' | 'expired';
  expiresAt: string;
}

interface ActivityLog {
  id: number;
  employeeName: string;
  action: string;
  module: string;
  timestamp: string;
  ip: string;
}

export default function EmployeeManagementModule() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'directory' | 'departments' | 'teams' | 'roles' | 'invitations' | 'activity'>('dashboard');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample Employees
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, employeeCode: 'EMP-1001', firstName: 'Alexander', lastName: 'Vance', email: 'a.vance@zfinance.com', phone: '+237 690 11 22 33', jobTitle: 'IT Director & Cloud Architect', department: 'IT & Engineering', team: 'Cloud Infrastructure', role: 'Administrator', employmentType: 'full_time', joiningDate: '2024-01-15', status: 'active', avatarBg: 'bg-indigo-600' },
    { id: 2, employeeCode: 'EMP-1002', firstName: 'Sarah', lastName: 'Jenkins', email: 's.jenkins@zfinance.com', phone: '+237 670 44 55 66', jobTitle: 'Senior Financial Controller', department: 'Finance & Accounting', team: 'Corporate Audit', role: 'Manager', employmentType: 'full_time', joiningDate: '2024-03-01', status: 'active', avatarBg: 'bg-emerald-600' },
    { id: 3, employeeCode: 'EMP-1003', firstName: 'Jean-Paul', lastName: 'Mbida', email: 'jp.mbida@zfinance.com', phone: '+237 699 77 88 99', jobTitle: 'Lead Software Engineer', department: 'IT & Engineering', team: 'Frontend Core', role: 'Employee', employmentType: 'full_time', joiningDate: '2025-06-10', status: 'active', avatarBg: 'bg-amber-600' },
    { id: 4, employeeCode: 'EMP-1004', firstName: 'Claire', lastName: 'Dubois', email: 'c.dubois@zfinance.com', phone: '+237 650 12 34 56', jobTitle: 'HR & People Operations Manager', department: 'Human Resources', team: 'Talent Acquisition', role: 'Manager', employmentType: 'full_time', joiningDate: '2024-09-01', status: 'on_leave', avatarBg: 'bg-rose-600' },
    { id: 5, employeeCode: 'EMP-1005', firstName: 'David', lastName: 'Kono', email: 'd.kono@zfinance.com', phone: '+237 680 99 88 77', jobTitle: 'Financial Analyst Consultant', department: 'Finance & Accounting', team: 'Budget Planning', role: 'Accountant', employmentType: 'consultant', joiningDate: '2026-02-01', status: 'active', avatarBg: 'bg-blue-600' }
  ]);

  // Sample Departments
  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, code: 'DEPT-IT', name: 'IT & Engineering', manager: 'Alexander Vance', memberCount: 12, status: 'active' },
    { id: 2, code: 'DEPT-FIN', name: 'Finance & Accounting', manager: 'Sarah Jenkins', memberCount: 8, status: 'active' },
    { id: 3, code: 'DEPT-HR', name: 'Human Resources', manager: 'Claire Dubois', memberCount: 5, status: 'active' },
    { id: 4, code: 'DEPT-MKT', name: 'Marketing & Sales', manager: 'Marc Dupont', memberCount: 10, status: 'active' }
  ]);

  // Sample Teams
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: 'Cloud Infrastructure', department: 'IT & Engineering', teamLead: 'Alexander Vance', memberCount: 5, status: 'active' },
    { id: 2, name: 'Frontend Core', department: 'IT & Engineering', teamLead: 'Jean-Paul Mbida', memberCount: 4, status: 'active' },
    { id: 3, name: 'Corporate Audit', department: 'Finance & Accounting', teamLead: 'Sarah Jenkins', memberCount: 3, status: 'active' }
  ]);

  // Sample Roles
  const [roles] = useState<Role[]>([
    { id: 1, name: 'Super Administrator', description: 'Unrestricted system access across all tenants and modules', assignedCount: 1, isSystemRole: true },
    { id: 2, name: 'Administrator', description: 'Full access to employees, finances, and operational features', assignedCount: 2, isSystemRole: true },
    { id: 3, name: 'Manager', description: 'Department level management, project creation, and team control', assignedCount: 4, isSystemRole: false },
    { id: 4, name: 'Accountant', description: 'Financial ledger, invoicing, expenses, and tax auditing access', assignedCount: 3, isSystemRole: false },
    { id: 5, name: 'Employee', description: 'Standard access to personal tasks, time logging, and chat', assignedCount: 25, isSystemRole: false }
  ]);

  // Sample Invitations
  const [invitations, setInvitations] = useState<Invitation[]>([
    { id: 1, email: 'e.mendoza@zfinance.com', role: 'Employee', department: 'IT & Engineering', status: 'pending', expiresAt: '2026-07-30' },
    { id: 2, email: 'k.biya@zfinance.com', role: 'Accountant', department: 'Finance & Accounting', status: 'accepted', expiresAt: '2026-07-20' }
  ]);

  // Sample Activity Logs
  const [activities] = useState<ActivityLog[]>([
    { id: 101, employeeName: 'Alexander Vance', action: 'Created new team "Cloud Infrastructure"', module: 'Teams', timestamp: '2026-07-23 10:15', ip: '192.168.1.102' },
    { id: 102, employeeName: 'Sarah Jenkins', action: 'Approved expense claim #EXP-992', module: 'Expenses', timestamp: '2026-07-23 09:40', ip: '192.168.1.105' },
    { id: 103, employeeName: 'Claire Dubois', action: 'Updated employee profile for EMP-1003', module: 'Employees', timestamp: '2026-07-22 16:20', ip: '192.168.1.110' }
  ]);

  // Modal States
  const [showAddEmpModal, setShowAddEmpModal] = useState(false);
  const [newEmpData, setNewEmpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    department: 'IT & Engineering',
    team: 'Cloud Infrastructure',
    role: 'Employee',
    employmentType: 'full_time' as const
  });

  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptCode, setNewDeptCode] = useState('');

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmpData.firstName || !newEmpData.email) return;

    const newEmp: Employee = {
      id: Date.now(),
      employeeCode: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      firstName: newEmpData.firstName,
      lastName: newEmpData.lastName,
      email: newEmpData.email,
      phone: newEmpData.phone || '+237 600 00 00 00',
      jobTitle: newEmpData.jobTitle || 'Staff Member',
      department: newEmpData.department,
      team: newEmpData.team,
      role: newEmpData.role,
      employmentType: newEmpData.employmentType,
      joiningDate: new Date().toISOString().split('T')[0],
      status: 'active',
      avatarBg: 'bg-indigo-600'
    };

    setEmployees([newEmp, ...employees]);
    setShowAddEmpModal(false);
    setNewEmpData({
      firstName: '', lastName: '', email: '', phone: '', jobTitle: '',
      department: 'IT & Engineering', team: 'Cloud Infrastructure', role: 'Employee', employmentType: 'full_time'
    });
  };

  const handleCreateDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName) return;

    const newDept: Department = {
      id: Date.now(),
      code: newDeptCode || `DEPT-${newDeptName.substring(0, 3).toUpperCase()}`,
      name: newDeptName,
      manager: 'Unassigned',
      memberCount: 0,
      status: 'active'
    };

    setDepartments([...departments, newDept]);
    setShowAddDeptModal(false);
    setNewDeptName('');
    setNewDeptCode('');
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    const newInv: Invitation = {
      id: Date.now(),
      email: inviteEmail,
      role: 'Employee',
      department: 'IT & Engineering',
      status: 'pending',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setInvitations([newInv, ...invitations]);
    setShowInviteModal(false);
    setInviteEmail('');
  };

  // Filtered Employees
  const filteredEmployees = employees.filter(emp => {
    const matchesQuery = `${emp.firstName} ${emp.lastName} ${emp.email} ${emp.employeeCode} ${emp.jobTitle}`
      .toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === 'all' || emp.department === deptFilter;
    const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;
    return matchesQuery && matchesDept && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Employee, Team, Role & Permission Center</h1>
            <p className="text-xs text-slate-500">Manage Organizational Structure, Departments, Teams, RBAC Permissions & Audit Logs</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition"
          >
            <UserPlus className="w-4 h-4" />
            Invite Staff
          </button>
          <button 
            onClick={() => setShowAddEmpModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Employee
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
          <BarChart2 className="w-4 h-4" />
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab('directory')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'directory' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          Employee Directory
          <span className="px-1.5 py-0.5 text-[10px] bg-indigo-100 text-indigo-800 rounded-full font-bold">
            {employees.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('departments')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'departments' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building className="w-4 h-4" />
          Departments
        </button>

        <button
          onClick={() => setActiveTab('teams')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'teams' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          Teams
        </button>

        <button
          onClick={() => setActiveTab('roles')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'roles' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Shield className="w-4 h-4" />
          Roles & Permissions Matrix
        </button>

        <button
          onClick={() => setActiveTab('invitations')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'invitations' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Mail className="w-4 h-4" />
          Pending Invitations
        </button>

        <button
          onClick={() => setActiveTab('activity')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'activity' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-4 h-4" />
          Audit & Activity Logs
        </button>
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <AdSuiteWidget slotName="Employee Dashboard Top" location="employee_dashboard" />

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Total Employees</div>
              <div className="text-2xl font-bold text-slate-900">{employees.length}</div>
              <div className="text-xs text-emerald-600 font-medium mt-1">100% Active Workforce</div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Departments</div>
              <div className="text-2xl font-bold text-indigo-600">{departments.length}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Across IT, HR & Finance</div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Teams & Units</div>
              <div className="text-2xl font-bold text-emerald-600">{teams.length}</div>
              <div className="text-xs text-emerald-700 font-medium mt-1">Operational Units</div>
            </div>

            <div className="p-5 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-xl shadow-md">
              <div className="text-xs font-semibold uppercase text-indigo-200 mb-1">RBAC Security</div>
              <div className="text-2xl font-bold">5 Roles</div>
              <div className="text-xs text-indigo-300 font-medium mt-1">Granular Matrix Enabled</div>
            </div>
          </div>

          {/* Quick Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Department Breakdown */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Building className="w-4 h-4 text-indigo-600" />
                Department Headcount & Managers
              </h3>

              <div className="space-y-3">
                {departments.map(dept => (
                  <div key={dept.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{dept.name}</div>
                      <div className="text-[10px] text-slate-500">Manager: {dept.manager}</div>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-800">
                      {dept.memberCount} Staff
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Staff Activity */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                Recent System Activity
              </h3>

              <div className="space-y-3">
                {activities.map(act => (
                  <div key={act.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{act.employeeName}</div>
                      <div className="text-xs text-slate-600">{act.action}</div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{act.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EMPLOYEE DIRECTORY TAB */}
      {activeTab === 'directory' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          {/* Controls & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search employees by name, code, job title, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select 
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="p-2 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none"
              >
                <option value="all">All Departments</option>
                {departments.map(d => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>

              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="on_leave">On Leave</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Directory Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                  <th className="p-3">Employee</th>
                  <th className="p-3">Code</th>
                  <th className="p-3">Department & Team</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEmployees.map(emp => (
                  <tr key={emp.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${emp.avatarBg} text-white font-bold flex items-center justify-center text-xs shrink-0`}>
                          {emp.firstName.substring(0, 1)}{emp.lastName.substring(0, 1)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{emp.firstName} {emp.lastName}</div>
                          <div className="text-[10px] text-slate-500">{emp.jobTitle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-700">{emp.employeeCode}</td>
                    <td className="p-3">
                      <div className="font-semibold text-slate-800">{emp.department}</div>
                      <div className="text-[10px] text-slate-500">{emp.team}</div>
                    </td>
                    <td className="p-3 font-medium text-slate-700">{emp.role}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-100 text-slate-700">
                        {emp.employmentType.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                        emp.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                        emp.status === 'on_leave' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DEPARTMENTS TAB */}
      {activeTab === 'departments' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-900">Organizational Departments</h2>
            <button 
              onClick={() => setShowAddDeptModal(true)}
              className="px-3.5 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              + Create Department
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departments.map(dept => (
              <div key={dept.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <div className="font-mono text-xs font-bold text-indigo-600">{dept.code}</div>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 rounded-full">
                    {dept.status}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base">{dept.name}</h3>
                <div className="text-xs text-slate-600">Manager: <span className="font-semibold text-slate-800">{dept.manager}</span></div>
                <div className="text-xs text-slate-500 font-medium pt-1">{dept.memberCount} Assigned Members</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TEAMS TAB */}
      {activeTab === 'teams' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Operational Teams & Work Units</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teams.map(t => (
              <div key={t.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="text-xs font-semibold text-slate-500 uppercase">{t.department}</div>
                <h3 className="font-bold text-slate-900 text-sm">{t.name}</h3>
                <div className="text-xs text-slate-600">Team Lead: <span className="font-semibold text-slate-800">{t.teamLead}</span></div>
                <div className="text-xs text-indigo-600 font-bold">{t.memberCount} Members</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ROLES & PERMISSIONS MATRIX TAB */}
      {activeTab === 'roles' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <h2 className="text-base font-bold text-slate-900">Role-Based Access Control (RBAC) Matrix</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white uppercase font-semibold">
                  <th className="p-3">Module</th>
                  <th className="p-3 text-center">Super Admin</th>
                  <th className="p-3 text-center">Administrator</th>
                  <th className="p-3 text-center">Manager</th>
                  <th className="p-3 text-center">Accountant</th>
                  <th className="p-3 text-center">Employee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {['Dashboard', 'Employees & Teams', 'Projects & Tasks', 'Expenses', 'Accounting & Ledger', 'Communication Hub'].map((mod, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{mod}</td>
                    <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                    <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                    <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                    <td className="p-3 text-center">{mod.includes('Accounting') || mod.includes('Expenses') ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <Lock className="w-4 h-4 text-slate-300 mx-auto" />}</td>
                    <td className="p-3 text-center">{mod === 'Dashboard' || mod === 'Projects & Tasks' || mod === 'Communication Hub' ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <Lock className="w-4 h-4 text-slate-300 mx-auto" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PENDING INVITATIONS TAB */}
      {activeTab === 'invitations' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-900">Pending Employee Email Invitations</h2>
            <button 
              onClick={() => setShowInviteModal(true)}
              className="px-3.5 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              + Send New Invite
            </button>
          </div>

          <div className="space-y-3">
            {invitations.map(inv => (
              <div key={inv.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-xs">{inv.email}</div>
                  <div className="text-[10px] text-slate-500">Role: {inv.role} • Dept: {inv.department}</div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                    inv.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {inv.status}
                  </span>
                  <button className="text-xs font-bold text-rose-600 hover:underline">Revoke</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AUDIT LOGS TAB */}
      {activeTab === 'activity' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Employee Activity & System Audit Logs</h2>

          <div className="space-y-3">
            {activities.map(act => (
              <div key={act.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-slate-900">{act.employeeName}</span>
                  <span className="text-slate-600"> performed </span>
                  <span className="font-semibold text-slate-800">"{act.action}"</span>
                  <span className="text-slate-500"> in [{act.module}]</span>
                </div>
                <div className="text-right font-mono text-[10px] text-slate-400">
                  {act.timestamp} • IP: {act.ip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NEW EMPLOYEE MODAL */}
      {showAddEmpModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Create Employee Profile</h3>

            <form onSubmit={handleCreateEmployee} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    required
                    value={newEmpData.firstName}
                    onChange={(e) => setNewEmpData({ ...newEmpData, firstName: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    required
                    value={newEmpData.lastName}
                    onChange={(e) => setNewEmpData({ ...newEmpData, lastName: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={newEmpData.email}
                  onChange={(e) => setNewEmpData({ ...newEmpData, email: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Job Title</label>
                <input 
                  type="text" 
                  required
                  value={newEmpData.jobTitle}
                  onChange={(e) => setNewEmpData({ ...newEmpData, jobTitle: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                  placeholder="e.g. Senior Financial Analyst"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <select 
                    value={newEmpData.department}
                    onChange={(e) => setNewEmpData({ ...newEmpData, department: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Role</label>
                  <select 
                    value={newEmpData.role}
                    onChange={(e) => setNewEmpData({ ...newEmpData, role: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                  >
                    {roles.map(r => (
                      <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowAddEmpModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW DEPARTMENT MODAL */}
      {showAddDeptModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Create Department</h3>

            <form onSubmit={handleCreateDepartment} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Department Name</label>
                <input 
                  type="text" 
                  required
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                  placeholder="e.g. Operations & Procurement"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Department Code</label>
                <input 
                  type="text" 
                  value={newDeptCode}
                  onChange={(e) => setNewDeptCode(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none font-mono"
                  placeholder="e.g. DEPT-OPS"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowAddDeptModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INVITATION MODAL */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Send Staff Email Invitation</h3>

            <form onSubmit={handleSendInvite} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Recipient Email</label>
                <input 
                  type="email" 
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                  placeholder="colleague@zfinance.com"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                  Send Invite Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
