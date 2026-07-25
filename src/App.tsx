import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { IncomeDashboard } from './components/IncomeDashboard';
import { IncomeList } from './components/IncomeList';
import { AddIncomeModal } from './components/AddIncomeModal';
import { IncomeCategories } from './components/IncomeCategories';
import { IncomeSources } from './components/IncomeSources';
import { RecurringIncome } from './components/RecurringIncome';
import { IncomeReports } from './components/IncomeReports';
import { IncomeAnalytics } from './components/IncomeAnalytics';
import { PhpInspector } from './components/PhpInspector';
import { InstallWizard } from './components/InstallWizard';
import { PublicWebsite } from './components/PublicWebsite';
import { AuthModule } from './components/AuthModule';
import { RbacModule } from './components/RbacModule';
import { UserModule } from './components/UserModule';
import { ServiceModule } from './components/ServiceModule';
import { CustomerModule } from './components/CustomerModule';
import ProjectManagementModule from './components/ProjectManagementModule';
import CommunicationCenterModule from './components/CommunicationCenterModule';
import EmployeeManagementModule from './components/EmployeeManagementModule';
import CalendarModule from './components/CalendarModule';
import DocumentManagementModule from './components/DocumentManagementModule';
import InventoryModule from './components/InventoryModule';
import HRMSModule from './components/HRMSModule';
import ProcurementModule from './components/ProcurementModule';
import CRMModule from './components/CRMModule';
import POSModule from './components/POSModule';
import AIModule from './components/AIModule';
import WorkflowModule from './components/WorkflowModule';
import DeveloperModule from './components/DeveloperModule';
import SecurityModule from './components/SecurityModule';
import SaaSModule from './components/SaaSModule';
import DevOpsModule from './components/DevOpsModule';
import ExpenseModule from './components/ExpenseModule';
import BudgetModule from './components/BudgetModule';
import AccountingModule from './components/AccountingModule';
import BillingModule from './components/BillingModule';
import FinancialReportsModule from './components/FinancialReportsModule';
import { SuperAdminModule } from './components/SuperAdminModule';
import { AdSuiteWidget } from './components/AdSuiteWidget';
import { OfflineSyncBanner } from './components/OfflineSyncBanner';

import { 
  CurrencyCode, 
  UserRole, 
  IncomeRecord, 
  IncomeCategory, 
  IncomeSource, 
  RecurringSchedule 
} from './types';

import { 
  INITIAL_INCOME_RECORDS, 
  INITIAL_CATEGORIES, 
  INITIAL_SOURCES, 
  INITIAL_CUSTOMERS, 
  INITIAL_SERVICES, 
  INITIAL_PROJECTS, 
  INITIAL_RECURRING_SCHEDULES 
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('super_admin');
  const [currentRole, setCurrentRole] = useState<UserRole>('Super Admin');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('XAF');
  const [isOffline, setIsOffline] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState<Partial<IncomeRecord>[]>([]);

  // Main State Arrays
  const [incomes, setIncomes] = useState<IncomeRecord[]>(() => {
    const saved = localStorage.getItem('zfinance_income_records');
    return saved ? JSON.parse(saved) : INITIAL_INCOME_RECORDS;
  });

  const [categories, setCategories] = useState<IncomeCategory[]>(() => {
    const saved = localStorage.getItem('zfinance_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [sources, setSources] = useState<IncomeSource[]>(() => {
    const saved = localStorage.getItem('zfinance_sources');
    return saved ? JSON.parse(saved) : INITIAL_SOURCES;
  });

  const [recurringSchedules, setRecurringSchedules] = useState<RecurringSchedule[]>(() => {
    const saved = localStorage.getItem('zfinance_recurring');
    return saved ? JSON.parse(saved) : INITIAL_RECURRING_SCHEDULES;
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('zfinance_income_records', JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem('zfinance_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('zfinance_sources', JSON.stringify(sources));
  }, [sources]);

  useEffect(() => {
    localStorage.setItem('zfinance_recurring', JSON.stringify(recurringSchedules));
  }, [recurringSchedules]);

  // Handlers
  const handleAddIncome = (newRecord: Partial<IncomeRecord>) => {
    if (isOffline) {
      setOfflineQueue(prev => [...prev, newRecord]);
      alert('Income record saved locally in offline queue! Synchronize when online.');
    } else {
      const fullRecord: IncomeRecord = {
        id: Date.now(),
        reference_no: newRecord.reference_no || `INC-${Date.now().toString().slice(-6)}`,
        title: newRecord.title || 'Income Record',
        category_id: newRecord.category_id || 1,
        category_name: newRecord.category_name || 'Service Income',
        source_id: newRecord.source_id || 1,
        source_name: newRecord.source_name || 'Managed IT Infrastructure',
        customer_id: newRecord.customer_id,
        customer_name: newRecord.customer_name,
        service_id: newRecord.service_id,
        service_name: newRecord.service_name,
        project_id: newRecord.project_id,
        project_name: newRecord.project_name,
        amount: newRecord.amount || 0,
        currency: newRecord.currency || 'XAF',
        exchange_rate: newRecord.exchange_rate || 1.0,
        base_amount: newRecord.base_amount || (newRecord.amount || 0),
        payment_method: newRecord.payment_method || 'Bank Transfer',
        income_date: newRecord.income_date || new Date().toISOString().split('T')[0],
        status: newRecord.status || 'received',
        description: newRecord.description || '',
        tags: newRecord.tags || [],
        attachments: newRecord.attachments || [],
        is_recurring: false,
        offline_synced: true,
        created_by: currentRole,
        created_at: new Date().toISOString()
      };
      setIncomes(prev => [fullRecord, ...prev]);
    }
  };

  const handleDeleteIncome = (id: number) => {
    if (confirm('Are you sure you want to delete this income entry?')) {
      setIncomes(prev => prev.filter(i => i.id !== id));
    }
  };

  const handleAddCategory = (newCat: Partial<IncomeCategory>) => {
    const cat: IncomeCategory = {
      id: Date.now(),
      category_name: newCat.category_name || 'New Category',
      category_code: newCat.category_code || `CAT-${Date.now().toString().slice(-4)}`,
      description: newCat.description || '',
      color_code: newCat.color_code || '#3B82F6',
      icon: 'tag',
      status: 'active',
      is_deleted: false
    };
    setCategories(prev => [...prev, cat]);
  };

  const handleToggleCategoryStatus = (id: number) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'disabled' : 'active' } : c));
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const handleAddSource = (newSrc: Partial<IncomeSource>) => {
    const src: IncomeSource = {
      id: Date.now(),
      category_id: newSrc.category_id || 1,
      category_name: newSrc.category_name || 'Service Income',
      source_name: newSrc.source_name || 'New Source',
      description: newSrc.description || '',
      type: newSrc.type || 'service_related',
      is_recurring: newSrc.is_recurring || false,
      status: 'active',
      is_deleted: false
    };
    setSources(prev => [...prev, src]);
  };

  const handleDeleteSource = (id: number) => {
    setSources(prev => prev.filter(s => s.id !== id));
  };

  const handleAddRecurringSchedule = (newSched: Partial<RecurringSchedule>) => {
    const sched: RecurringSchedule = {
      id: Date.now(),
      title: newSched.title || 'Recurring Contract',
      category_name: newSched.category_name || 'Service Income',
      source_name: newSched.source_name || 'Managed IT Infrastructure',
      amount: newSched.amount || 0,
      currency: newSched.currency || 'XAF',
      frequency: newSched.frequency || 'monthly',
      start_date: newSched.start_date || new Date().toISOString().split('T')[0],
      next_run_date: '2026-08-01',
      status: 'active',
      auto_receive: true
    };
    setRecurringSchedules(prev => [...prev, sched]);
  };

  const handleTriggerRecurringRun = (id: number) => {
    const sched = recurringSchedules.find(s => s.id === id);
    if (sched) {
      handleAddIncome({
        title: `[AUTO-RECURRING] ${sched.title}`,
        category_name: sched.category_name,
        source_name: sched.source_name,
        amount: sched.amount,
        currency: sched.currency,
        base_amount: sched.amount,
        payment_method: 'Bank Transfer',
        income_date: new Date().toISOString().split('T')[0],
        status: 'received',
        description: `Automated recurring run for ${sched.frequency} schedule.`
      });
      alert(`Recurring run executed for: ${sched.title}. Income transaction created!`);
    }
  };

  const handleSyncOffline = () => {
    if (offlineQueue.length === 0) return;
    offlineQueue.forEach(item => {
      handleAddIncome(item);
    });
    setOfflineQueue([]);
    alert('All offline cached income transactions synchronized successfully with the database!');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        selectedCurrency={selectedCurrency}
        onCurrencyChange={setSelectedCurrency}
        isOffline={isOffline}
        onToggleOffline={() => setIsOffline(!isOffline)}
        offlineQueueCount={offlineQueue.length}
        onSyncOffline={handleSyncOffline}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenPhpInspector={() => setActiveTab('php')}
      />

      <div className="flex-1 flex flex-col md:flex-row w-full mx-auto">
        
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          incomeCount={incomes.length}
          categoryCount={categories.length}
          sourceCount={sources.length}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 max-w-7xl mx-auto w-full">
          
          {/* Offline Sync Status Banner */}
          <OfflineSyncBanner
            isOffline={isOffline}
            offlineCount={offlineQueue.length}
            onSync={handleSyncOffline}
          />

          {/* Targeted Ad Suite Banner */}
          <AdSuiteWidget userRole={currentRole} currentModule={activeTab} />

          {/* Active View Router */}
          {activeTab === 'dashboard' && (
            <IncomeDashboard
              incomes={incomes}
              selectedCurrency={selectedCurrency}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onNavigateToList={() => setActiveTab('list')}
            />
          )}

          {activeTab === 'list' && (
            <IncomeList
              incomes={incomes}
              categories={categories}
              sources={sources}
              selectedCurrency={selectedCurrency}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onDeleteIncome={handleDeleteIncome}
            />
          )}

          {activeTab === 'categories' && (
            <IncomeCategories
              categories={categories}
              onAddCategory={handleAddCategory}
              onToggleStatus={handleToggleCategoryStatus}
              onDeleteCategory={handleDeleteCategory}
            />
          )}

          {activeTab === 'sources' && (
            <IncomeSources
              sources={sources}
              categories={categories}
              onAddSource={handleAddSource}
              onDeleteSource={handleDeleteSource}
            />
          )}

          {activeTab === 'recurring' && (
            <RecurringIncome
              schedules={recurringSchedules}
              selectedCurrency={selectedCurrency}
              onAddSchedule={handleAddRecurringSchedule}
              onTriggerRun={handleTriggerRecurringRun}
            />
          )}

          {activeTab === 'reports' && (
            <IncomeReports incomes={incomes} />
          )}

          {activeTab === 'analytics' && (
            <IncomeAnalytics selectedCurrency={selectedCurrency} />
          )}

          {activeTab === 'super_admin' && (
            <SuperAdminModule />
          )}

          {activeTab === 'website' && (
            <PublicWebsite />
          )}

          {activeTab === 'auth' && (
            <AuthModule />
          )}

          {activeTab === 'rbac' && (
            <RbacModule />
          )}

          {activeTab === 'users' && (
            <UserModule />
          )}

          {activeTab === 'services' && (
            <ServiceModule />
          )}

          {activeTab === 'customers' && (
            <CRMModule />
          )}

          {activeTab === 'pos' && (
            <POSModule />
          )}

          {activeTab === 'ai' && (
            <AIModule />
          )}

          {activeTab === 'workflows' && (
            <WorkflowModule />
          )}

          {activeTab === 'developer' && (
            <DeveloperModule />
          )}

          {activeTab === 'security' && (
            <SecurityModule />
          )}

          {activeTab === 'saas' && (
            <SaaSModule />
          )}

          {activeTab === 'devops' && (
            <DevOpsModule />
          )}

          {activeTab === 'projects' && (
            <ProjectManagementModule />
          )}

          {activeTab === 'communication' && (
            <CommunicationCenterModule />
          )}

          {activeTab === 'employees' && (
            <HRMSModule />
          )}

          {activeTab === 'calendar' && (
            <CalendarModule />
          )}

          {activeTab === 'documents' && (
            <DocumentManagementModule />
          )}

          {activeTab === 'inventory' && (
            <InventoryModule />
          )}

          {activeTab === 'procurement' && (
            <ProcurementModule />
          )}

          {activeTab === 'expenses' && (
            <ExpenseModule />
          )}

          {activeTab === 'budgets' && (
            <BudgetModule />
          )}

          {activeTab === 'accounting' && (
            <AccountingModule />
          )}

          {activeTab === 'billing' && (
            <BillingModule />
          )}

          {(activeTab === 'reports' || activeTab === 'analytics') && (
            <FinancialReportsModule />
          )}

          {activeTab === 'install' && (
            <InstallWizard />
          )}

          {activeTab === 'php' && (
            <PhpInspector />
          )}

          {activeTab === 'adsuite' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Z-FINANCE Advertising Management Suite</h2>
              <p className="text-xs text-slate-500">
                Configure contextual advertisements for Income Dashboard, Income List, Reports, and Analytics respecting user role, targeting rules, language, and subscription level.
              </p>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Current Targeting Rule:</span>
                  <span className="text-indigo-600">Active ({currentRole})</span>
                </div>
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Ad Placement Views:</span>
                  <span>Dashboard, List, Reports, Analytics</span>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* System Status Bottom Rail */}
      <footer className="bg-white border-t border-slate-200 px-6 py-3 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="font-medium text-slate-700">Z-FINANCE Income Management Engine</span>
          <span className="text-slate-400">• PHP 8.2 + MySQL / PDO Architecture</span>
        </div>
        <div className="flex items-center space-x-4 text-[11px] text-slate-400 font-mono">
          <span>Role: {currentRole}</span>
          <span>Currency: {selectedCurrency}</span>
          <span>Mode: {isOffline ? 'Offline Queue' : 'Live Sync'}</span>
        </div>
      </footer>

      {/* Add Income Form Modal */}
      <AddIncomeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        categories={categories}
        sources={sources}
        customers={INITIAL_CUSTOMERS}
        services={INITIAL_SERVICES}
        projects={INITIAL_PROJECTS}
        onAddIncome={handleAddIncome}
      />

    </div>
  );
}
