import React, { useState } from 'react';
import {
  GitMerge,
  Play,
  Pause,
  Plus,
  Zap,
  CheckCircle,
  XCircle,
  Clock,
  Layers,
  Settings,
  Shield,
  FileText,
  AlertTriangle,
  RefreshCw,
  Search,
  Database,
  Calendar,
  Send,
  Users,
  Building,
  DollarSign,
  Package,
  Cpu,
  Sliders,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Download,
  Upload,
  Copy,
  Trash2,
  Check,
  Megaphone,
  ListFilter,
  CheckSquare,
  Activity,
  Maximize2
} from 'lucide-react';

interface WorkflowItem {
  id: string;
  uuid: string;
  name: string;
  category: string;
  trigger: string;
  condition: string;
  actionsCount: number;
  status: 'active' | 'paused' | 'draft';
  version: number;
  executions: number;
  successRate: string;
}

interface ApprovalRequest {
  id: string;
  title: string;
  requester: string;
  category: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'escalated';
  time: string;
  approverRole: string;
}

export default function WorkflowModule() {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'builder' | 'templates' | 'triggers_actions' | 'approvals' | 'scheduler' | 'queue_logs' | 'ai_recommend' | 'super_admin'
  >('dashboard');

  // Workflows State
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([
    {
      id: '1',
      uuid: 'WF-INV-001',
      name: 'High Value Invoice Executive Approval (> €5,000)',
      category: 'Finance & Billing',
      trigger: 'Invoice Created',
      condition: 'Total Amount > €5,000.00',
      actionsCount: 3,
      status: 'active',
      version: 2,
      executions: 342,
      successRate: '99.4%'
    },
    {
      id: '2',
      uuid: 'WF-EXP-002',
      name: 'Unusual Expense Anomaly Detection & Flagging',
      category: 'Expenses',
      trigger: 'Expense Recorded',
      condition: 'Amount > €1,000 OR Category = Uncategorized',
      actionsCount: 2,
      status: 'active',
      version: 1,
      executions: 189,
      successRate: '98.8%'
    },
    {
      id: '3',
      uuid: 'WF-STK-003',
      name: 'Low Inventory Automated Supplier RFQ Generation',
      category: 'Warehouse & Inventory',
      trigger: 'Stock Below Minimum Threshold',
      condition: 'Stock Quantity <= Reorder Point',
      actionsCount: 4,
      status: 'active',
      version: 3,
      executions: 84,
      successRate: '100%'
    },
    {
      id: '4',
      uuid: 'WF-HR-004',
      name: 'Employee Onboarding & System Access Provisioning',
      category: 'HRMS & Payroll',
      trigger: 'User Registration Approved',
      condition: 'Department != Legal',
      actionsCount: 5,
      status: 'active',
      version: 1,
      executions: 52,
      successRate: '96.1%'
    }
  ]);

  // Approval Requests State
  const [approvals, setApprovals] = useState<ApprovalRequest[]>([
    {
      id: '101',
      title: 'AWS Cloud Hosting Invoice #INV-2026-9904',
      requester: 'John Doe (DevOps Lead)',
      category: 'Finance',
      amount: 1450.00,
      status: 'pending',
      time: '10:15 AM',
      approverRole: 'Finance Director'
    },
    {
      id: '102',
      title: 'Industrial Automation Controller Purchase Order #PO-8812',
      requester: 'Sarah Connor (Warehouse Mgr)',
      category: 'Procurement',
      amount: 8500.00,
      status: 'pending',
      time: '09:30 AM',
      approverRole: 'Executive Director'
    },
    {
      id: '103',
      title: 'Overtime Expense Claim - Munich Branch Staff',
      requester: 'Markus Weber (Engineering)',
      category: 'Expenses',
      amount: 620.00,
      status: 'pending',
      time: 'Yesterday',
      approverRole: 'Department Head'
    }
  ]);

  // Visual Builder Demo State
  const [builderTrigger, setBuilderTrigger] = useState('Invoice Created');
  const [builderCondition, setBuilderCondition] = useState('Amount > €2,500.00');
  const [builderAction, setBuilderAction] = useState('Send Email & WhatsApp Notification');
  const [newWorkflowName, setNewWorkflowName] = useState('');

  const handleApprove = (id: string) => {
    setApprovals(
      approvals.map((a) => (a.id === id ? { ...a, status: 'approved' } : a))
    );
  };

  const handleReject = (id: string) => {
    setApprovals(
      approvals.map((a) => (a.id === id ? { ...a, status: 'rejected' } : a))
    );
  };

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows(
      workflows.map((w) =>
        w.id === id
          ? { ...w, status: w.status === 'active' ? 'paused' : 'active' }
          : w
      )
    );
  };

  const handleCreateWorkflow = () => {
    if (!newWorkflowName.trim()) return;
    const newWf: WorkflowItem = {
      id: Date.now().toString(),
      uuid: `WF-CUSTOM-${randInt(100, 999)}`,
      name: newWorkflowName,
      category: 'Custom Automation',
      trigger: builderTrigger,
      condition: builderCondition,
      actionsCount: 3,
      status: 'active',
      version: 1,
      executions: 0,
      successRate: '100%'
    };
    setWorkflows([newWf, ...workflows]);
    setNewWorkflowName('');
    setActiveTab('dashboard');
  };

  function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto bg-slate-50 min-h-screen text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <GitMerge className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900">Workflow Automation & Rules Engine</h1>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-300 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Z-FINANCE 1.0.0
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Enterprise Process Orchestration, Drag-and-Drop Builder, Conditional Decision Matrix, Approvals & Cron Scheduler
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('builder')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            Create Workflow
          </button>
        </div>
      </div>

      {/* Super Admin Advertisement Placement Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-3 rounded-xl border border-indigo-900 text-white text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-amber-400" />
          <span>
            <strong className="text-amber-400">Super Admin Sponsored Announcement:</strong> Connect Z-FINANCE Workflow Engine to over 500+ ERP, CRM, and Bank API Webhooks.
          </span>
        </div>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Managed by Super Admin</span>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'dashboard', label: 'Automation Dashboard', icon: Activity },
          { id: 'builder', label: 'Visual Builder', icon: GitMerge },
          { id: 'templates', label: 'Workflow Templates', icon: Layers },
          { id: 'triggers_actions', label: 'Triggers & Actions', icon: Zap },
          { id: 'approvals', label: 'Approval Workflows', icon: CheckSquare },
          { id: 'scheduler', label: 'Cron Scheduler', icon: Calendar },
          { id: 'queue_logs', label: 'Job Queue & Logs', icon: Database },
          { id: 'ai_recommend', label: 'AI Workflow Engine', icon: Sparkles },
          { id: 'super_admin', label: 'Super Admin Control', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: AUTOMATION DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Active Workflows</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {workflows.filter((w) => w.status === 'active').length} Active
              </p>
              <span className="text-xs text-emerald-600 font-medium">100% Operational</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Successful Executions</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">1,420 Executed</p>
              <span className="text-xs text-blue-600 font-medium">Avg Latency: 312 ms</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Failed Jobs / Retries</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">12 Failed (0.8%)</p>
              <span className="text-xs text-amber-600 font-medium">Dead Letter Queue Active</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Pending Approvals</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {approvals.filter((a) => a.status === 'pending').length} Pending
              </p>
              <span className="text-xs text-indigo-600 font-medium">Action Required</span>
            </div>
          </div>

          {/* Active Workflows Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <GitMerge className="w-5 h-5 text-blue-600" />
                Active Workflows Matrix
              </h3>
              <span className="text-xs text-slate-500">{workflows.length} Total Rules</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                    <th className="p-3">UUID</th>
                    <th className="p-3">Workflow Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Trigger Event</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Executions</th>
                    <th className="p-3">Success Rate</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {workflows.map((w) => (
                    <tr key={w.id} className="hover:bg-slate-50 transition-all">
                      <td className="p-3 font-mono font-bold text-blue-600">{w.uuid}</td>
                      <td className="p-3 font-bold text-slate-900">{w.name}</td>
                      <td className="p-3 text-slate-600">{w.category}</td>
                      <td className="p-3">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                          {w.trigger}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleWorkflowStatus(w.id)}
                          className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                            w.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {w.status.toUpperCase()}
                        </button>
                      </td>
                      <td className="p-3 font-medium text-slate-700">{w.executions}</td>
                      <td className="p-3 font-bold text-emerald-600">{w.successRate}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleWorkflowStatus(w.id)}
                            className="p-1 hover:bg-slate-200 rounded text-slate-600"
                            title={w.status === 'active' ? 'Pause Workflow' : 'Resume Workflow'}
                          >
                            {w.status === 'active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VISUAL WORKFLOW BUILDER */}
      {activeTab === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form (4 cols) */}
          <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sliders className="w-5 h-5 text-blue-600" />
              Workflow Node Inspector
            </h3>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-600 uppercase">Workflow Name</label>
              <input
                type="text"
                placeholder="e.g. Executive Purchase Approval (> €10,000)"
                value={newWorkflowName}
                onChange={(e) => setNewWorkflowName(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-600 uppercase">Trigger Event</label>
              <select
                value={builderTrigger}
                onChange={(e) => setBuilderTrigger(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50"
              >
                <option>Invoice Created</option>
                <option>Expense Recorded</option>
                <option>Stock Below Minimum Threshold</option>
                <option>User Registration Approved</option>
                <option>Purchase Order Approved</option>
                <option>Support Ticket Opened</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-600 uppercase">Condition Rules</label>
              <input
                type="text"
                value={builderCondition}
                onChange={(e) => setBuilderCondition(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-600 uppercase">Target Action</label>
              <select
                value={builderAction}
                onChange={(e) => setBuilderAction(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50"
              >
                <option>Send Email & WhatsApp Notification</option>
                <option>Generate Purchase Order PDF & Email Vendor</option>
                <option>Create Approval Request for Executive Director</option>
                <option>Run AI Expense Anomaly Analysis</option>
              </select>
            </div>

            <button
              onClick={handleCreateWorkflow}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all"
            >
              Save & Activate Workflow Rule
            </button>
          </div>

          {/* Right Visual Canvas (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <GitMerge className="w-5 h-5 text-indigo-600" />
                Interactive Visual Diagram Canvas
              </h3>
              <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-mono font-bold">
                DRAG & DROP READY
              </span>
            </div>

            {/* Workflow Diagram Nodes */}
            <div className="space-y-4 max-w-md mx-auto py-4">
              {/* Node 1: Trigger */}
              <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded-xl shadow-sm space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold text-blue-800 uppercase tracking-wider">STEP 1: TRIGGER</span>
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <p className="font-bold text-slate-900 text-xs">{builderTrigger}</p>
                <p className="text-[11px] text-slate-500">System event fired in database layer</p>
              </div>

              <div className="w-0.5 h-6 bg-slate-300 mx-auto"></div>

              {/* Node 2: Condition */}
              <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-xl shadow-sm space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider">STEP 2: CONDITIONAL EVALUATION</span>
                  <Sliders className="w-4 h-4 text-amber-600" />
                </div>
                <p className="font-bold text-slate-900 text-xs">{builderCondition}</p>
                <p className="text-[11px] text-slate-500">Rules engine matches operand criteria</p>
              </div>

              <div className="w-0.5 h-6 bg-slate-300 mx-auto"></div>

              {/* Node 3: Action */}
              <div className="p-4 bg-emerald-50 border-l-4 border-emerald-600 rounded-xl shadow-sm space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider">STEP 3: ACTION DISPATCH</span>
                  <Send className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="font-bold text-slate-900 text-xs">{builderAction}</p>
                <p className="text-[11px] text-slate-500">Execution dispatched to queue worker</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: APPROVAL WORKFLOWS */}
      {activeTab === 'approvals' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-indigo-600" />
              Pending Multi-Level Approval Inbox
            </h2>
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded font-bold">
              {approvals.filter((a) => a.status === 'pending').length} Pending
            </span>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
            {approvals.map((a) => (
              <div key={a.id} className="p-4 hover:bg-slate-50 transition-all flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{a.title}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded">
                      {a.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Requested by <strong>{a.requester}</strong> • Required Role: <strong>{a.approverRole}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-slate-900">€{a.amount.toFixed(2)}</span>
                  {a.status === 'pending' ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApprove(a.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded shadow-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(a.id)}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded shadow-sm"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded ${
                        a.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {a.status.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: SUPER ADMIN CONTROL */}
      {activeTab === 'super_admin' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-600" />
                Super Administrator Automation Governance
              </h2>
              <p className="text-xs text-slate-500">Manage Queue Workers, Dead Letter Queues, Retry Limits, and Advertisement Placements</p>
            </div>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded">Super Admin Access</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Max Concurrent Jobs</span>
              <p className="text-xl font-bold text-slate-900">10 Workers</p>
              <button className="text-xs text-blue-600 font-bold hover:underline">Configure Queue</button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Dead Letter Queue</span>
              <p className="text-xl font-bold text-emerald-600">Active (0 Stuck)</p>
              <button className="text-xs text-blue-600 font-bold hover:underline">View Failed Jobs</button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Approval Overrides</span>
              <p className="text-xl font-bold text-slate-900">3 Logged Overrides</p>
              <button className="text-xs text-blue-600 font-bold hover:underline">View Audit Log</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
