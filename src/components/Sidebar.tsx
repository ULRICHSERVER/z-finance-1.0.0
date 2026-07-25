import React from 'react';
import { 
  LayoutDashboard, 
  ListFilter, 
  PlusSquare, 
  Tag, 
  Layers, 
  Repeat, 
  FileSpreadsheet, 
  TrendingUp, 
  Code, 
  Megaphone,
  MessageSquare,
  Server,
  Globe,
  Link,
  ShieldAlert,
  ShieldCheck,
  Key,
  Briefcase,
  PiggyBank,
  BookOpen,
  FileText,
  Users as UsersIcon,
  Calendar as CalendarIcon,
  Folder,
  Boxes,
  ShoppingBag,
  Bot,
  GitMerge
} from 'lucide-react';

export type ActiveTab = 
  | 'super_admin'
  | 'website'
  | 'auth'
  | 'rbac'
  | 'users'
  | 'services'
  | 'customers'
  | 'pos'
  | 'ai'
  | 'workflows'
  | 'developer'
  | 'security'
  | 'saas'
  | 'devops'
  | 'projects'
  | 'communication'
  | 'employees'
  | 'calendar'
  | 'documents'
  | 'inventory'
  | 'procurement'
  | 'expenses'
  | 'budgets'
  | 'accounting'
  | 'billing'
  | 'dashboard' 
  | 'list' 
  | 'categories' 
  | 'sources' 
  | 'recurring' 
  | 'reports' 
  | 'analytics' 
  | 'php' 
  | 'adsuite'
  | 'install';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  incomeCount: number;
  categoryCount: number;
  sourceCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  incomeCount,
  categoryCount,
  sourceCount
}) => {
  const navItems = [
    { id: 'super_admin', label: 'Super Admin Control', icon: Server, badge: 'Root' },
    { id: 'website', label: 'Public Website', icon: Globe, badge: 'PWA' },
    { id: 'auth', label: 'Authentication Suite', icon: ShieldCheck, badge: 'Auth' },
    { id: 'rbac', label: 'RBAC Matrix & Security', icon: Key, badge: 'RBAC' },
    { id: 'users', label: 'User Management', icon: UsersIcon, badge: 'Admin' },
    { id: 'services', label: 'Service Management', icon: Briefcase, badge: 'v1.0' },
    { id: 'customers', label: 'CRM / Customers', icon: UsersIcon, badge: 'CRM' },
    { id: 'pos', label: 'POS & Omnichannel', icon: ShoppingBag, badge: 'POS' },
    { id: 'ai', label: 'AI & Business Intelligence', icon: Bot, badge: 'AI' },
    { id: 'workflows', label: 'Workflow & Automation', icon: GitMerge, badge: 'Flow' },
    { id: 'developer', label: 'Developer & REST API', icon: Code, badge: 'API' },
    { id: 'security', label: 'SOC Security & SOC', icon: ShieldAlert, badge: 'SOC' },
    { id: 'saas', label: 'Multi-Tenant SaaS', icon: Globe, badge: 'SaaS' },
    { id: 'devops', label: 'DevOps & Deployment', icon: Server, badge: 'DevOps' },
    { id: 'projects', label: 'Projects & Tasks', icon: Briefcase, badge: 'Projects' },
    { id: 'communication', label: 'Communication Hub', icon: MessageSquare, badge: 'Comms' },
    { id: 'employees', label: 'Employees & Teams', icon: UsersIcon, badge: 'HR' },
    { id: 'calendar', label: 'Calendar & Scheduling', icon: CalendarIcon, badge: 'Calendar' },
    { id: 'documents', label: 'Documents & EDMS', icon: Folder, badge: 'EDMS' },
    { id: 'inventory', label: 'Inventory & Assets', icon: Boxes, badge: 'Stock' },
    { id: 'procurement', label: 'Procurement & Suppliers', icon: ShoppingBag, badge: 'Procure' },
    { id: 'expenses', label: 'Expense Management', icon: FileSpreadsheet, badge: 'Expenses' },
    { id: 'budgets', label: 'Budget & Goals', icon: PiggyBank, badge: 'Budgets' },
    { id: 'accounting', label: 'Accounting & Ledger', icon: BookOpen, badge: 'General Ledger' },
    { id: 'billing', label: 'Billing & Invoices', icon: FileText, badge: 'Invoices' },
    { id: 'dashboard', label: 'Income Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'list', label: 'Income List', icon: ListFilter, badge: incomeCount },
    { id: 'categories', label: 'Categories', icon: Tag, badge: categoryCount },
    { id: 'sources', label: 'Income Sources', icon: Layers, badge: sourceCount },
    { id: 'recurring', label: 'Recurring Income', icon: Repeat, badge: 'Auto' },
    { id: 'reports', label: 'Financial Reports', icon: FileSpreadsheet, badge: 'PDF' },
    { id: 'analytics', label: 'Revenue Analytics', icon: TrendingUp, badge: 'AI' },
    { id: 'install', label: 'Installation Wizard', icon: Server, badge: 'Setup' },
    { id: 'php', label: 'PHP & SQL Core', icon: Code, badge: 'v8.2' },
    { id: 'adsuite', label: 'Advertising Suite', icon: Megaphone, badge: 'Ads' },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-900 text-slate-300 shrink-0 flex flex-col justify-between border-r border-slate-800">
      
      {/* Top Branding Section */}
      <div>
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black shadow-md shadow-indigo-600/30">
              Z
            </div>
            <div>
              <span className="font-extrabold text-white tracking-tight text-base block leading-none">
                Z-FINANCE
              </span>
              <span className="text-[10px] text-slate-400 font-mono">v1.0.0 Enterprise</span>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Online"></span>
        </div>

        {/* Navigation Items */}
        <div className="p-4 space-y-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">
              Income Module
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id as ActiveTab)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== null && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Connected Systems Panel */}
          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center space-x-1.5 font-bold text-slate-200">
              <Link className="w-3.5 h-3.5 text-indigo-400" />
              <span>Connected Modules</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li className="flex justify-between items-center">
                <span>Customer CRM</span>
                <span className="text-emerald-400 font-bold text-[10px]">● Active</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Services Suite</span>
                <span className="text-emerald-400 font-bold text-[10px]">● Active</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Supplier Portal</span>
                <span className="text-emerald-400 font-bold text-[10px]">● Active</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-xs">
            SA
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">Super Admin</p>
            <p className="text-[10px] text-slate-400 truncate">admin@zfinance.io</p>
          </div>
        </div>
        <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" title="CSRF & PDO Protected" />
      </div>

    </aside>
  );
};
