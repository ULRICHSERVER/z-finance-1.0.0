import React, { useState } from 'react';
import { 
  PiggyBank, Plus, Search, Filter, TrendingUp, TrendingDown, DollarSign, Calendar, 
  CheckCircle2, AlertTriangle, Target, Wallet, BarChart3, ArrowUpRight, ArrowDownRight,
  Shield, Layers, Clock, RefreshCw, Download, FileText, Check, X, ShieldAlert, Sparkles, Building
} from 'lucide-react';
import { AdSuiteWidget } from './AdSuiteWidget';

interface BudgetRecord {
  id: number;
  reference_no: string;
  budget_name: string;
  budget_type: string;
  category_name: string;
  currency: string;
  budget_amount: number;
  expected_income: number;
  expected_expenses: number;
  actual_expenses: number;
  actual_income: number;
  budget_remaining: number;
  percentage_used: number;
  start_date: string;
  end_date: string;
  status: 'draft' | 'active' | 'completed' | 'exceeded' | 'cancelled';
  notes?: string;
}

interface GoalRecord {
  id: number;
  reference_no: string;
  goal_name: string;
  goal_type: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'in_progress' | 'achieved' | 'behind' | 'cancelled';
}

interface SavingsRecord {
  id: number;
  account_name: string;
  account_number: string;
  bank_institution: string;
  current_balance: number;
  target_balance: number;
  interest_rate: number;
  status: 'active' | 'frozen' | 'closed';
}

const DEFAULT_BUDGETS: BudgetRecord[] = [
  {
    id: 1,
    reference_no: 'BDG-2026-0012',
    budget_name: 'Q3 Cloud Infrastructure & Server Scale',
    budget_type: 'business',
    category_name: 'Software & Subscriptions',
    currency: 'USD',
    budget_amount: 5000.00,
    expected_income: 0.00,
    expected_expenses: 5000.00,
    actual_expenses: 3250.00,
    actual_income: 0.00,
    budget_remaining: 1750.00,
    percentage_used: 65,
    start_date: '2026-07-01',
    end_date: '2026-09-30',
    status: 'active',
    notes: 'Allocated for AWS Cloud Run and PostgreSQL compute resources'
  },
  {
    id: 2,
    reference_no: 'BDG-2026-0013',
    budget_name: 'Headquarters Office Operational Budget',
    budget_type: 'department',
    category_name: 'Operating Overhead',
    currency: 'USD',
    budget_amount: 12000.00,
    expected_income: 0.00,
    expected_expenses: 12000.00,
    actual_expenses: 11800.00,
    actual_income: 0.00,
    budget_remaining: 200.00,
    percentage_used: 98.3,
    start_date: '2026-07-01',
    end_date: '2026-07-31',
    status: 'active',
    notes: 'Includes rent, electricity, water, internet fiber line'
  },
  {
    id: 3,
    reference_no: 'BDG-2026-0014',
    budget_name: 'Global PPC & Ad Suite Promotion',
    budget_type: 'monthly',
    category_name: 'Marketing & Growth',
    currency: 'USD',
    budget_amount: 4000.00,
    expected_income: 18000.00,
    expected_expenses: 4000.00,
    actual_expenses: 4250.00,
    actual_income: 16500.00,
    budget_remaining: 0.00,
    percentage_used: 106.25,
    start_date: '2026-07-01',
    end_date: '2026-07-31',
    status: 'exceeded',
    notes: 'Exceeded budget due to high-converting campaign surge'
  }
];

const DEFAULT_GOALS: GoalRecord[] = [
  {
    id: 1,
    reference_no: 'GOAL-2026-001',
    goal_name: '6-Month Enterprise Emergency Liquidity Reserve',
    goal_type: 'emergency_fund',
    target_amount: 50000.00,
    current_amount: 38500.00,
    deadline: '2026-12-31',
    priority: 'critical',
    status: 'in_progress'
  },
  {
    id: 2,
    reference_no: 'GOAL-2026-002',
    goal_name: 'Secondary Regional Office Hardware Procurement',
    goal_type: 'equipment',
    target_amount: 15000.00,
    current_amount: 15000.00,
    deadline: '2026-08-15',
    priority: 'high',
    status: 'achieved'
  },
  {
    id: 3,
    reference_no: 'GOAL-2026-003',
    goal_name: 'Q4 Product Line Expansion & R&D Grant',
    goal_type: 'expansion',
    target_amount: 30000.00,
    current_amount: 12000.00,
    deadline: '2026-11-30',
    priority: 'medium',
    status: 'behind'
  }
];

const DEFAULT_SAVINGS: SavingsRecord[] = [
  {
    id: 1,
    account_name: 'Corporate High-Yield Treasury Vault',
    account_number: 'SAV-88239102',
    bank_institution: 'Ecobank Central Vault',
    current_balance: 45000.00,
    target_balance: 100000.00,
    interest_rate: 4.25,
    status: 'active'
  },
  {
    id: 2,
    account_name: 'Tax Reserve & Payroll Cushion',
    account_number: 'SAV-33109281',
    bank_institution: 'UBA Commercial Reserve',
    current_balance: 18500.00,
    target_balance: 25000.00,
    interest_rate: 2.10,
    status: 'active'
  }
];

export default function BudgetModule() {
  const [budgets, setBudgets] = useState<BudgetRecord[]>(DEFAULT_BUDGETS);
  const [goals, setGoals] = useState<GoalRecord[]>(DEFAULT_GOALS);
  const [savings, setSavings] = useState<SavingsRecord[]>(DEFAULT_SAVINGS);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'budgets' | 'goals' | 'savings' | 'forecast' | 'reports'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  // Modals
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showGoalContributionModal, setShowGoalContributionModal] = useState<number | null>(null);

  // New Budget State
  const [budgetName, setBudgetName] = useState('');
  const [budgetType, setBudgetType] = useState('monthly');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [budgetCategory, setBudgetCategory] = useState('Operating Overhead');

  // New Goal State
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalType, setGoalType] = useState('emergency_fund');
  const [goalDeadline, setGoalDeadline] = useState('2026-12-31');

  // Goal Contribution State
  const [contributionAmount, setContributionAmount] = useState('');

  const totalAllocated = budgets.reduce((acc, b) => acc + b.budget_amount, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.actual_expenses, 0);
  const totalRemaining = budgets.reduce((acc, b) => acc + Math.max(0, b.budget_remaining), 0);
  const totalSavingsBalance = savings.reduce((acc, s) => acc + s.current_balance, 0);

  const handleCreateBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!budgetName || !budgetAmount) return;

    const newBdg: BudgetRecord = {
      id: Date.now(),
      reference_no: 'BDG-2026-' + Math.floor(1000 + Math.random() * 9000),
      budget_name: budgetName,
      budget_type: budgetType,
      category_name: budgetCategory,
      currency: 'USD',
      budget_amount: parseFloat(budgetAmount),
      expected_income: 0,
      expected_expenses: parseFloat(budgetAmount),
      actual_expenses: 0,
      actual_income: 0,
      budget_remaining: parseFloat(budgetAmount),
      percentage_used: 0,
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      status: 'active'
    };

    setBudgets([newBdg, ...budgets]);
    setBudgetName('');
    setBudgetAmount('');
    setShowAddBudgetModal(false);
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalName || !goalTarget) return;

    const newG: GoalRecord = {
      id: Date.now(),
      reference_no: 'GOAL-2026-' + Math.floor(100 + Math.random() * 900),
      goal_name: goalName,
      goal_type: goalType,
      target_amount: parseFloat(goalTarget),
      current_amount: 0,
      deadline: goalDeadline,
      priority: 'high',
      status: 'in_progress'
    };

    setGoals([newG, ...goals]);
    setGoalName('');
    setGoalTarget('');
    setShowAddGoalModal(false);
  };

  const handleGoalContribution = (goalId: number) => {
    if (!contributionAmount) return;
    const amount = parseFloat(contributionAmount);

    setGoals(goals.map(g => {
      if (g.id === goalId) {
        const newCurr = g.current_amount + amount;
        return {
          ...g,
          current_amount: newCurr,
          status: newCurr >= g.target_amount ? 'achieved' : g.status
        };
      }
      return g;
    }));

    setContributionAmount('');
    setShowGoalContributionModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg">
            <PiggyBank className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Budget Planning & Financial Goals</h1>
            <p className="text-xs text-slate-500">Formulate budgets, track variances, manage savings vaults, and forecast cash flow</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowAddBudgetModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Create Budget
          </button>
          <button 
            onClick={() => setShowAddGoalModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg transition shadow-sm"
          >
            <Target className="w-4 h-4" />
            Set Goal
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
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab('budgets')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'budgets' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Wallet className="w-4 h-4" />
          Budgets ({budgets.length})
        </button>

        <button
          onClick={() => setActiveTab('goals')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'goals' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Target className="w-4 h-4" />
          Financial Goals ({goals.length})
        </button>

        <button
          onClick={() => setActiveTab('savings')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'savings' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <PiggyBank className="w-4 h-4" />
          Savings Vaults ({savings.length})
        </button>

        <button
          onClick={() => setActiveTab('forecast')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'forecast' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Cash Flow Forecast
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            activeTab === 'reports' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          Reports
        </button>
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Ad Suite Placeholder */}
          <AdSuiteWidget slotName="Budget Dashboard Header Banner" location="budget_dashboard" />

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Budget Allocated</span>
                <DollarSign className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">${totalAllocated.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <p className="text-xs text-slate-500 mt-1">{budgets.length} active budget commitments</p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Spent to Date</span>
                <TrendingDown className="w-4 h-4 text-rose-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900">${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <p className="text-xs text-slate-500 mt-1">{((totalSpent / (totalAllocated || 1)) * 100).toFixed(1)}% total utilization</p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Available Cushion</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-emerald-600">${totalRemaining.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <p className="text-xs text-slate-500 mt-1">Remaining budget allowance</p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Savings Liquidity</span>
                <PiggyBank className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600">${totalSavingsBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <p className="text-xs text-slate-500 mt-1">Total across {savings.length} reserve vaults</p>
            </div>
          </div>

          {/* Active Budgets Overview */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Active Budget Tracking Overview</h2>
              <span className="text-xs font-medium text-slate-500">Live Realized Variance</span>
            </div>

            <div className="space-y-4">
              {budgets.map(bdg => (
                <div key={bdg.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-400">{bdg.reference_no}</span>
                        <h3 className="font-bold text-slate-900 text-sm">{bdg.budget_name}</h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{bdg.category_name} • {bdg.budget_type.toUpperCase()} Budget</p>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900">
                        ${bdg.actual_expenses.toFixed(2)} / <span className="text-slate-500">${bdg.budget_amount.toFixed(2)}</span>
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        bdg.percentage_used > 100 ? 'bg-rose-100 text-rose-800' :
                        bdg.percentage_used > 85 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {bdg.percentage_used.toFixed(1)}% Used
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        bdg.percentage_used > 100 ? 'bg-rose-600' :
                        bdg.percentage_used > 85 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, bdg.percentage_used)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BUDGETS LIST TAB */}
      {activeTab === 'budgets' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search budget name, reference..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Reference & Name</th>
                  <th className="px-4 py-3">Type & Category</th>
                  <th className="px-4 py-3">Allocated Amount</th>
                  <th className="px-4 py-3">Actual Spent</th>
                  <th className="px-4 py-3">Remaining</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {budgets.map(bdg => (
                  <tr key={bdg.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">{bdg.budget_name}</div>
                      <div className="text-xs text-slate-400">{bdg.reference_no}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-slate-800">{bdg.category_name}</span>
                      <div className="text-xs text-slate-400 uppercase">{bdg.budget_type}</div>
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-900">${bdg.budget_amount.toFixed(2)}</td>
                    <td className="px-4 py-3 font-semibold text-rose-600">${bdg.actual_expenses.toFixed(2)}</td>
                    <td className="px-4 py-3 font-bold text-emerald-600">${Math.max(0, bdg.budget_remaining).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full ${
                        bdg.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                        bdg.status === 'exceeded' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {bdg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FINANCIAL GOALS TAB */}
      {activeTab === 'goals' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {goals.map(goal => {
              const progressPct = Math.min(100, (goal.current_amount / goal.target_amount) * 100);
              return (
                <div key={goal.id} className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">{goal.reference_no}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      goal.status === 'achieved' ? 'bg-emerald-100 text-emerald-800' :
                      goal.status === 'behind' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {goal.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{goal.goal_name}</h3>
                    <p className="text-xs text-slate-500 mt-1">Deadline: {goal.deadline}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-600">${goal.current_amount.toFixed(2)}</span>
                      <span className="text-slate-900">${goal.target_amount.toFixed(2)} ({progressPct.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${goal.status === 'achieved' ? 'bg-emerald-500' : 'bg-blue-600'}`} 
                        style={{ width: `${progressPct}%` }} 
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowGoalContributionModal(goal.id)}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition"
                  >
                    + Log Contribution
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SAVINGS VAULTS TAB */}
      {activeTab === 'savings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savings.map(sav => (
            <div key={sav.id} className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900">{sav.account_name}</h3>
                  <p className="text-xs text-slate-500">{sav.bank_institution} • {sav.account_number}</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase rounded-full">
                  {sav.interest_rate}% Yield p.a.
                </span>
              </div>

              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Vault Balance</span>
                  <div className="text-2xl font-bold text-slate-900">${sav.current_balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-400 uppercase">Target Balance</span>
                  <div className="text-base font-semibold text-slate-600">${sav.target_balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CASH FLOW FORECAST TAB */}
      {activeTab === 'forecast' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-900">6-Month Predictive Cash Flow Forecast</h3>
              <p className="text-xs text-slate-500">Anticipated revenue vs projected expense disbursements trajectory</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {[
              { month: 'Aug 2026', income: 18500, expenses: 11200, net: 7300 },
              { month: 'Sep 2026', income: 19100, expenses: 11420, net: 7680 },
              { month: 'Oct 2026', income: 19670, expenses: 11650, net: 8020 },
              { month: 'Nov 2026', income: 20260, expenses: 11880, net: 8380 },
              { month: 'Dec 2026', income: 20870, expenses: 12110, net: 8760 },
              { month: 'Jan 2027', income: 21500, expenses: 12350, net: 9150 }
            ].map((f, i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{f.month}</span>
                <div className="flex items-center gap-6 text-xs">
                  <span className="text-emerald-600 font-semibold">+${f.income.toLocaleString()}</span>
                  <span className="text-rose-600 font-semibold">-${f.expenses.toLocaleString()}</span>
                  <span className="font-bold text-slate-900">Net: +${f.net.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REPORTS TAB */}
      {activeTab === 'reports' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-900">Budget Performance & Variance Statement</h3>
              <p className="text-xs text-slate-500">Comprehensive audit statement for corporate budgeting</p>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
              <Download className="w-3.5 h-3.5" /> Export PDF
            </button>
          </div>

          <div className="space-y-2">
            {budgets.map(b => (
              <div key={b.id} className="p-3 bg-slate-50 rounded-lg flex justify-between text-xs">
                <span className="font-semibold text-slate-800">{b.budget_name}</span>
                <span className="font-bold text-slate-900">Variance: ${(b.budget_amount - b.actual_expenses).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE BUDGET MODAL */}
      {showAddBudgetModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900">Formulate Budget Plan</h3>
              <button onClick={() => setShowAddBudgetModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBudget} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Budget Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Q3 R&D Engineering Budget" 
                  value={budgetName}
                  onChange={(e) => setBudgetName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Allocated Amount ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    placeholder="0.00" 
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Type</label>
                  <select 
                    value={budgetType}
                    onChange={(e) => setBudgetType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                    <option value="project">Project</option>
                    <option value="department">Department</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select 
                  value={budgetCategory}
                  onChange={(e) => setBudgetCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none"
                >
                  <option value="Operating Overhead">Operating Overhead</option>
                  <option value="Marketing & Growth">Marketing & Growth</option>
                  <option value="Software & Subscriptions">Software & Subscriptions</option>
                  <option value="Capital Expenditure">Capital Expenditure</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddBudgetModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-medium text-sm rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition"
                >
                  Save Budget Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE GOAL MODAL */}
      {showAddGoalModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900">Define Financial Goal</h3>
              <button onClick={() => setShowAddGoalModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Goal Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Equipment Expansion Reserve" 
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Amount ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    placeholder="0.00" 
                    value={goalTarget}
                    onChange={(e) => setGoalTarget(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Deadline Date</label>
                  <input 
                    type="date"
                    required
                    value={goalDeadline}
                    onChange={(e) => setGoalDeadline(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddGoalModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-medium text-sm rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white font-medium text-sm rounded-lg hover:bg-emerald-700 transition"
                >
                  Save Financial Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LOG CONTRIBUTION MODAL */}
      {showGoalContributionModal !== null && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900">Log Goal Contribution</h3>
              <button onClick={() => setShowGoalContributionModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contribution Amount ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  placeholder="0.00" 
                  value={contributionAmount}
                  onChange={(e) => setContributionAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowGoalContributionModal(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-medium text-sm rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={() => handleGoalContribution(showGoalContributionModal)}
                  className="px-4 py-2 bg-emerald-600 text-white font-medium text-sm rounded-lg hover:bg-emerald-700 transition"
                >
                  Add Contribution
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
