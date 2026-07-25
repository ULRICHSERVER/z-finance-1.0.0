import React, { useState } from 'react';
import { 
  Briefcase, CheckSquare, Users, Clock, DollarSign, Calendar, AlertTriangle, 
  Plus, Search, Filter, Play, Square, Download, FileText, CheckCircle2, 
  TrendingUp, ArrowUpRight, ArrowDownRight, Paperclip, MessageSquare, ShieldAlert,
  Layers, FolderPlus, Tag, BarChart3, RefreshCw, Eye, Sparkles, Building
} from 'lucide-react';
import { AdSuiteWidget } from './AdSuiteWidget';

interface Project {
  id: number;
  projectRef: string;
  projectName: string;
  customerName: string;
  serviceName: string;
  projectType: string;
  manager: string;
  priority: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
  status: 'draft' | 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  budget: number;
  actualCost: number;
  actualRevenue: number;
  progressPercent: number;
  deadline: string;
}

interface Task {
  id: number;
  taskNumber: string;
  taskTitle: string;
  projectName: string;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
  status: 'new' | 'assigned' | 'in_progress' | 'waiting' | 'review' | 'completed' | 'cancelled';
  progressPercent: number;
  estimatedHours: number;
  actualHours: number;
  deadline: string;
}

interface TimeLog {
  id: number;
  taskTitle: string;
  projectName: string;
  durationMinutes: number;
  billableAmount: number;
  loggedAt: string;
}

export default function ProjectManagementModule() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'tasks' | 'time_tracking' | 'profitability' | 'milestones' | 'documents'>('dashboard');

  // Timer State
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerTaskTitle, setTimerTaskTitle] = useState('Frontend UI Optimization for Mobile App');
  const [timerSeconds, setTimerSeconds] = useState(1420); // 23 mins 40 sec

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // New Project Form State
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectCustomer, setNewProjectCustomer] = useState('Acme Enterprise Global');
  const [newProjectType, setNewProjectType] = useState('Client Project');
  const [newProjectBudget, setNewProjectBudget] = useState('25000');
  const [newProjectEstRevenue, setNewProjectEstRevenue] = useState('35000');
  const [newProjectDeadline, setNewProjectDeadline] = useState('2026-09-30');

  // Sample Projects
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      projectRef: 'PRJ-20260723-01',
      projectName: 'Enterprise SaaS Cloud Migration',
      customerName: 'Acme Enterprise Global',
      serviceName: 'IT Cloud Architecture',
      projectType: 'Client Project',
      manager: 'Alexander Vance',
      priority: 'high',
      status: 'active',
      budget: 45000.00,
      actualCost: 18200.00,
      actualRevenue: 52000.00,
      progressPercent: 68,
      deadline: '2026-08-15'
    },
    {
      id: 2,
      projectRef: 'PRJ-20260723-02',
      projectName: 'Mobile Logistics Tracking App v2',
      customerName: 'Horizon Retail Logistics',
      serviceName: 'Mobile Software Development',
      projectType: 'IT Project',
      manager: 'Sarah Jenkins',
      priority: 'urgent',
      status: 'active',
      budget: 28000.00,
      actualCost: 12400.00,
      actualRevenue: 32000.00,
      progressPercent: 45,
      deadline: '2026-09-01'
    },
    {
      id: 3,
      projectRef: 'PRJ-20260723-03',
      projectName: 'Corporate HQ Network Infrastructure',
      customerName: 'Starlight Media Network',
      serviceName: 'Network Engineering',
      projectType: 'Construction Project',
      manager: 'David Chen',
      priority: 'medium',
      status: 'completed',
      budget: 18000.00,
      actualCost: 14200.00,
      actualRevenue: 22500.00,
      progressPercent: 100,
      deadline: '2026-07-10'
    }
  ]);

  // Sample Tasks
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 101,
      taskNumber: 'TSK-84210',
      taskTitle: 'Database Schema Design & Migration Scripts',
      projectName: 'Enterprise SaaS Cloud Migration',
      assignedTo: 'Alexander Vance',
      priority: 'high',
      status: 'in_progress',
      progressPercent: 75,
      estimatedHours: 40,
      actualHours: 28,
      deadline: '2026-07-28'
    },
    {
      id: 102,
      taskNumber: 'TSK-84211',
      taskTitle: 'API Gateway OAuth2 Authorization Flow',
      projectName: 'Mobile Logistics Tracking App v2',
      assignedTo: 'Sarah Jenkins',
      priority: 'urgent',
      status: 'review',
      progressPercent: 90,
      estimatedHours: 24,
      actualHours: 22,
      deadline: '2026-07-25'
    },
    {
      id: 103,
      taskNumber: 'TSK-84212',
      taskTitle: 'Client Acceptance Sign-off & Final Invoicing',
      projectName: 'Corporate HQ Network Infrastructure',
      assignedTo: 'David Chen',
      priority: 'medium',
      status: 'completed',
      progressPercent: 100,
      estimatedHours: 12,
      actualHours: 10,
      deadline: '2026-07-10'
    }
  ]);

  // Sample Time Logs
  const timeLogs: TimeLog[] = [
    { id: 1, taskTitle: 'Database Schema Design', projectName: 'Enterprise SaaS Cloud Migration', durationMinutes: 180, billableAmount: 225.00, loggedAt: 'Today, 10:30 AM' },
    { id: 2, taskTitle: 'API Gateway OAuth2 Testing', projectName: 'Mobile Logistics Tracking App v2', durationMinutes: 120, billableAmount: 150.00, loggedAt: 'Yesterday, 02:15 PM' }
  ];

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName) return;

    const newPrj: Project = {
      id: Date.now(),
      projectRef: `PRJ-${dateToRef()}`,
      projectName: newProjectName,
      customerName: newProjectCustomer,
      serviceName: 'Consulting Services',
      projectType: newProjectType,
      manager: 'Alexander Vance',
      priority: 'medium',
      status: 'active',
      budget: parseFloat(newProjectBudget) || 0,
      actualCost: 0,
      actualRevenue: parseFloat(newProjectEstRevenue) || 0,
      progressPercent: 0,
      deadline: newProjectDeadline
    };

    setProjects([newPrj, ...projects]);
    setShowNewProjectModal(false);
    setNewProjectName('');
  };

  const dateToRef = () => {
    return `${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  // Profitability Calculations
  const totalRevenue = projects.reduce((acc, p) => acc + p.actualRevenue, 0);
  const totalCost = projects.reduce((acc, p) => acc + p.actualCost, 0);
  const totalProfit = totalRevenue - totalCost;
  const overallMargin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-lg">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Project & Task Management Suite</h1>
            <p className="text-xs text-slate-500">Track Projects, Tasks, Teams, Deadlines, Time Logs, and Financial Profitability</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowNewProjectModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Create Project
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'dashboard' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Project Dashboard
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'projects' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          All Projects ({projects.length})
        </button>

        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'tasks' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          Task Board ({tasks.length})
        </button>

        <button
          onClick={() => setActiveTab('time_tracking')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'time_tracking' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          Time Tracker
        </button>

        <button
          onClick={() => setActiveTab('profitability')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'profitability' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          Project Profitability
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'documents' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Paperclip className="w-4 h-4" />
          Documents & Contracts
        </button>
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <AdSuiteWidget slotName="Project Dashboard Header" location="project_dashboard" />

          {/* Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Total Projects</div>
              <div className="text-2xl font-bold text-slate-900">{projects.length}</div>
              <div className="text-xs text-indigo-600 font-medium mt-1">2 Active, 1 Completed</div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Project Revenue</div>
              <div className="text-2xl font-bold text-emerald-600">${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <div className="text-xs text-emerald-700 font-medium mt-1">Billed & Contracted</div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Project Expenses</div>
              <div className="text-2xl font-bold text-rose-600">${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <div className="text-xs text-rose-700 font-medium mt-1">Direct Labor & Materials</div>
            </div>

            <div className="p-5 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-xl shadow-md">
              <div className="text-xs font-semibold uppercase text-indigo-200 mb-1">Net Project Profit</div>
              <div className="text-2xl font-bold">${totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <div className="text-xs text-indigo-300 font-medium mt-1">Profit Margin: {overallMargin}%</div>
            </div>
          </div>

          {/* Active Projects List */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Active Projects & Completion Status</h3>
            <div className="space-y-4">
              {projects.map(p => (
                <div key={p.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded border border-indigo-100 mr-2">
                        {p.projectRef}
                      </span>
                      <span className="font-bold text-slate-900 text-sm">{p.projectName}</span>
                      <span className="text-xs text-slate-500 ml-2">({p.customerName})</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-semibold text-slate-600">Deadline: {p.deadline}</span>
                      <span className={`px-2.5 py-0.5 font-bold uppercase rounded-full text-[10px] ${
                        p.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Progress</span>
                      <span className="font-bold">{p.progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${p.progressPercent}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PROJECTS LIST TAB */}
      {activeTab === 'projects' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-base font-bold text-slate-900">All Enterprise Projects</h2>

            <div className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Reference</th>
                  <th className="p-3">Project Name</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Budget</th>
                  <th className="p-3">Actual Profit</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map(p => {
                  const profit = p.actualRevenue - p.actualCost;
                  return (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-indigo-600">{p.projectRef}</td>
                      <td className="p-3 font-bold text-slate-900">{p.projectName}</td>
                      <td className="p-3 text-slate-600">{p.customerName}</td>
                      <td className="p-3 text-slate-500">{p.projectType}</td>
                      <td className="p-3 font-bold text-slate-800">${p.budget.toLocaleString()}</td>
                      <td className="p-3 font-bold text-emerald-600">${profit.toLocaleString()}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 font-bold rounded text-[10px] uppercase">
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">{p.deadline}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TASKS TAB */}
      {activeTab === 'tasks' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Task Board & Milestone Deliverables</h2>

          <div className="space-y-3">
            {tasks.map(t => (
              <div key={t.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-slate-500 px-2 py-0.5 bg-slate-200 rounded">
                      {t.taskNumber}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{t.taskTitle}</span>
                  </div>
                  <div className="text-xs text-slate-500">Project: {t.projectName} | Assigned: {t.assignedTo}</div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-600">Est: {t.estimatedHours}h | Act: {t.actualHours}h</span>
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-full bg-emerald-100 text-emerald-800">
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TIME TRACKER TAB */}
      {activeTab === 'time_tracking' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="p-5 bg-slate-900 text-white rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-indigo-300 font-semibold uppercase">Active Timer Widget</div>
              <div className="font-bold text-sm">{timerTaskTitle}</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-3xl font-mono font-extrabold text-amber-400">
                00:23:40
              </div>
              <button 
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-4 py-2 font-bold text-xs rounded-lg transition flex items-center gap-1.5 ${
                  isTimerRunning ? 'bg-rose-600 text-white hover:bg-rose-700' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {isTimerRunning ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isTimerRunning ? 'Stop Timer' : 'Start Timer'}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-xs">Recent Worked Time Logs</h3>
            {timeLogs.map(log => (
              <div key={log.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-slate-800">{log.taskTitle}</div>
                  <div className="text-slate-500">{log.projectName} • {log.loggedAt}</div>
                </div>
                <div className="text-right font-mono">
                  <div className="font-bold text-slate-900">{log.durationMinutes} Mins</div>
                  <div className="text-emerald-600 font-bold">+${log.billableAmount.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROJECT PROFITABILITY TAB */}
      {activeTab === 'profitability' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <h2 className="text-base font-bold text-slate-900">Project Financial Profitability Engine</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Project Name</th>
                  <th className="p-3">Contract Revenue</th>
                  <th className="p-3">Direct Cost</th>
                  <th className="p-3">Net Profit</th>
                  <th className="p-3">Profit Margin</th>
                  <th className="p-3">Cost Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map(p => {
                  const profit = p.actualRevenue - p.actualCost;
                  const margin = p.actualRevenue > 0 ? ((profit / p.actualRevenue) * 100).toFixed(1) : '0';
                  const variance = p.budget - p.actualCost;
                  return (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">{p.projectName}</td>
                      <td className="p-3 font-bold text-emerald-600">${p.actualRevenue.toLocaleString()}</td>
                      <td className="p-3 font-bold text-rose-600">${p.actualCost.toLocaleString()}</td>
                      <td className="p-3 font-bold text-indigo-700">${profit.toLocaleString()}</td>
                      <td className="p-3 font-bold text-slate-800">{margin}%</td>
                      <td className="p-3 text-slate-500">${variance.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE NEW PROJECT MODAL */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Create New Project</h3>

            <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Project Name</label>
                <input 
                  type="text" 
                  required
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                  placeholder="e.g. Cloud Security Audit"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Customer</label>
                  <input 
                    type="text" 
                    value={newProjectCustomer}
                    onChange={(e) => setNewProjectCustomer(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Type</label>
                  <select 
                    value={newProjectType}
                    onChange={(e) => setNewProjectType(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                  >
                    <option value="Client Project">Client Project</option>
                    <option value="IT Project">IT Project</option>
                    <option value="Internal Project">Internal Project</option>
                    <option value="Construction Project">Construction Project</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Budget ($)</label>
                  <input 
                    type="number" 
                    value={newProjectBudget}
                    onChange={(e) => setNewProjectBudget(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Est. Revenue ($)</label>
                  <input 
                    type="number" 
                    value={newProjectEstRevenue}
                    onChange={(e) => setNewProjectEstRevenue(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
