import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  TrendingUp,
  CreditCard,
  Crown,
  Award,
  Share2,
  Headphones,
  Mail,
  Search,
  Filter,
  Plus,
  CheckCircle,
  XCircle,
  BarChart2,
  Clock,
  DollarSign,
  Shield,
  Zap,
  Tag,
  Star,
  Layers,
  Sparkles,
  Download,
  Send,
  FileText,
  UserCheck,
  AlertTriangle,
  Gift
} from 'lucide-react';

interface Customer {
  id: string;
  code: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: 'standard' | 'vip' | 'wholesale' | 'partner';
  status: 'active' | 'inactive';
  creditLimit: number;
  revenue: number;
  lifetimeValue: number;
}

interface Lead {
  id: string;
  code: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
}

interface Opportunity {
  id: string;
  name: string;
  customer: string;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  amount: number;
  probability: number;
  closeDate: string;
}

interface Subscription {
  id: string;
  subNumber: string;
  customer: string;
  plan: string;
  cycle: 'monthly' | 'annual';
  price: number;
  status: 'active' | 'paused' | 'cancelled';
  nextBilling: string;
}

interface Ticket {
  id: string;
  ticketNumber: string;
  customer: string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved';
}

export default function CRMModule() {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'leads' | 'customers' | 'pipeline' | 'subscriptions' | 'memberships' | 'loyalty' | 'affiliates' | 'support' | 'marketing' | 'portal'
  >('dashboard');

  const [searchTerm, setSearchTerm] = useState('');

  // Sample State
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      code: 'CUST-1001',
      companyName: 'Siemens Logistics GmbH',
      contactPerson: 'Hans Weber',
      email: 'h.weber@siemens.de',
      phone: '+49 89 123456',
      category: 'vip',
      status: 'active',
      creditLimit: 50000,
      revenue: 125000,
      lifetimeValue: 340000
    },
    {
      id: '2',
      code: 'CUST-1002',
      companyName: 'Bavaria Motor Works AG',
      contactPerson: 'Claudia Muller',
      email: 'c.muller@bmw.de',
      phone: '+49 89 987654',
      category: 'partner',
      status: 'active',
      creditLimit: 100000,
      revenue: 280000,
      lifetimeValue: 650000
    },
    {
      id: '3',
      code: 'CUST-1003',
      companyName: 'Stuttgart Automation Systems',
      contactPerson: 'Karl Fischer',
      email: 'karl@stuttgart-auto.de',
      phone: '+49 711 445566',
      category: 'standard',
      status: 'active',
      creditLimit: 25000,
      revenue: 45000,
      lifetimeValue: 98000
    }
  ]);

  const [leads, setLeads] = useState<Lead[]>([
    { id: '1', code: 'LD-801', name: 'Markus Vance', company: 'Berlin Cloud Tech', email: 'm.vance@berlincloud.io', source: 'Website', score: 85, status: 'qualified' },
    { id: '2', code: 'LD-802', name: 'Elena Rostova', company: 'Frankfurt Digital Solutions', email: 'elena@fksolutions.de', source: 'LinkedIn', score: 92, status: 'qualified' },
    { id: '3', code: 'LD-803', name: 'Sven Lindner', company: 'Hamburg Maritime Logistics', email: 'sven@hamburg-ml.de', source: 'Referral', score: 60, status: 'new' }
  ]);

  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    { id: '1', name: 'Enterprise ERP Upgrade', customer: 'Siemens Logistics GmbH', stage: 'proposal', amount: 120000, probability: 75, closeDate: '2026-08-15' },
    { id: '2', name: 'AI Analytics Subscription', customer: 'Bavaria Motor Works AG', stage: 'negotiation', amount: 85000, probability: 90, closeDate: '2026-08-01' },
    { id: '3', name: 'Cloud Infrastructure Migration', customer: 'Stuttgart Automation Systems', stage: 'qualified', amount: 45000, probability: 50, closeDate: '2026-09-10' }
  ]);

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { id: '1', subNumber: 'SUB-9901', customer: 'Siemens Logistics GmbH', plan: 'Enterprise Unlimited', cycle: 'annual', price: 24000, status: 'active', nextBilling: '2027-01-15' },
    { id: '2', subNumber: 'SUB-9902', customer: 'Bavaria Motor Works AG', plan: 'VIP Cloud Suite', cycle: 'annual', price: 48000, status: 'active', nextBilling: '2027-03-01' }
  ]);

  const [tickets, setTickets] = useState<Ticket[]>([
    { id: '1', ticketNumber: 'TICK-401', customer: 'Siemens Logistics GmbH', subject: 'API Rate Limit Upgrade Request', category: 'technical', priority: 'high', status: 'open' },
    { id: '2', ticketNumber: 'TICK-402', customer: 'Stuttgart Automation Systems', subject: 'Invoice Receipt Reconciliation', category: 'billing', priority: 'medium', status: 'in_progress' }
  ]);

  // Modal / Form trigger
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ companyName: '', contactPerson: '', email: '', phone: '', creditLimit: 25000, category: 'standard' as const });

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Customer = {
      id: Date.now().toString(),
      code: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      companyName: newCustomer.companyName,
      contactPerson: newCustomer.contactPerson,
      email: newCustomer.email,
      phone: newCustomer.phone,
      category: newCustomer.category,
      status: 'active',
      creditLimit: Number(newCustomer.creditLimit),
      revenue: 0,
      lifetimeValue: 0
    };
    setCustomers([created, ...customers]);
    setShowAddCustomerModal(false);
    setNewCustomer({ companyName: '', contactPerson: '', email: '', phone: '', creditLimit: 25000, category: 'standard' });
  };

  const totalPipelineValue = opportunities.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto bg-slate-50 min-h-screen text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900">CRM & Sales Automation Suite</h1>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-200">
              Z-FINANCE 1.0.0
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            End-to-End Customer Journey, Pipeline, Subscriptions, Memberships, Loyalty & Support
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddCustomerModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Customer
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
          { id: 'leads', label: 'Leads & Prospects', icon: Sparkles },
          { id: 'customers', label: 'Customers 360°', icon: Users },
          { id: 'pipeline', label: 'Sales Pipeline', icon: TrendingUp },
          { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
          { id: 'memberships', label: 'Memberships', icon: Crown },
          { id: 'loyalty', label: 'Loyalty & Rewards', icon: Award },
          { id: 'affiliates', label: 'Affiliate Program', icon: Share2 },
          { id: 'support', label: 'Support Helpdesk', icon: Headphones },
          { id: 'marketing', label: 'Marketing Auto', icon: Mail },
          { id: 'portal', label: 'Customer Portal', icon: Shield }
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

      {/* TAB 1: DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Active Customers</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{customers.length}</p>
                <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +12% this month
                </span>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sales Pipeline Value</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">€{totalPipelineValue.toLocaleString()}</p>
                <span className="text-xs text-blue-600 font-medium flex items-center gap-1 mt-1">
                  {opportunities.length} Active Deals
                </span>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recurring Subscriptions</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{subscriptions.length}</p>
                <span className="text-xs text-slate-500 mt-1 block">€72,000 / Annual ARR</span>
              </div>
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Open Support Tickets</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{tickets.length}</p>
                <span className="text-xs text-amber-600 font-medium flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" /> Avg resolution 1.2 hrs
                </span>
              </div>
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                <Headphones className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Quick Overview Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Deals */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Top Active Opportunities
                </h3>
                <button onClick={() => setActiveTab('pipeline')} className="text-xs text-blue-600 hover:underline font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {opportunities.map((opp) => (
                  <div key={opp.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{opp.name}</p>
                      <p className="text-xs text-slate-500">{opp.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900 text-sm">€{opp.amount.toLocaleString()}</p>
                      <span className="text-xs font-medium text-blue-600">{opp.probability}% Win Probability</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Health */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-amber-600" />
                  Recent Support Desk Tickets
                </h3>
                <button onClick={() => setActiveTab('support')} className="text-xs text-blue-600 hover:underline font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {tickets.map((t) => (
                  <div key={t.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-700">{t.ticketNumber}</span>
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">{t.priority}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-1">{t.subject}</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full font-semibold">{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LEADS */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Lead Prospecting & AI Qualification
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-600">
                <tr>
                  <th className="py-3 px-4">Lead Code</th>
                  <th className="py-3 px-4">Contact Person</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Source</th>
                  <th className="py-3 px-4">AI Score</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-bold text-blue-600">{lead.code}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{lead.name}</td>
                    <td className="py-3 px-4 text-slate-600">{lead.company}</td>
                    <td className="py-3 px-4 text-slate-600">{lead.source}</td>
                    <td className="py-3 px-4">
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded">
                        {lead.score} / 100
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded">
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-xs text-blue-600 font-semibold hover:underline">Convert to Deal</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOMERS 360 */}
      {activeTab === 'customers' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Customer 360° Directory
            </h2>
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-600">
                <tr>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Company Name</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Email / Phone</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Credit Limit</th>
                  <th className="py-3 px-4">Total Revenue</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customers
                  .filter((c) => c.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono text-xs font-bold text-slate-600">{c.code}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{c.companyName}</td>
                      <td className="py-3 px-4 text-slate-700">{c.contactPerson}</td>
                      <td className="py-3 px-4 text-slate-500 text-xs">
                        <div>{c.email}</div>
                        <div>{c.phone}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded uppercase">
                          {c.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">€{c.creditLimit.toLocaleString()}</td>
                      <td className="py-3 px-4 font-bold text-emerald-600">€{c.revenue.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-0.5 rounded">
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: SALES PIPELINE */}
      {activeTab === 'pipeline' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Visual Sales Pipeline & Opportunity Management
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {opportunities.map((opp) => (
              <div key={opp.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded uppercase">{opp.stage}</span>
                  <span className="text-xs text-slate-500 font-medium">Close: {opp.closeDate}</span>
                </div>
                <h3 className="font-bold text-slate-900">{opp.name}</h3>
                <p className="text-xs text-slate-600">{opp.customer}</p>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-sm font-extrabold text-slate-900">€{opp.amount.toLocaleString()}</span>
                  <span className="text-xs font-semibold text-emerald-600">{opp.probability}% Win Probability</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SUBSCRIPTIONS */}
      {activeTab === 'subscriptions' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-indigo-600" />
            Subscription & Recurring Revenue Plans
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-600">
                <tr>
                  <th className="py-3 px-4">Sub #</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Plan Name</th>
                  <th className="py-3 px-4">Billing Cycle</th>
                  <th className="py-3 px-4">Annual Price</th>
                  <th className="py-3 px-4">Next Billing Date</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600">{sub.subNumber}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{sub.customer}</td>
                    <td className="py-3 px-4 text-slate-700">{sub.plan}</td>
                    <td className="py-3 px-4 capitalize text-slate-600">{sub.cycle}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">€{sub.price.toLocaleString()}</td>
                    <td className="py-3 px-4 text-slate-600">{sub.nextBilling}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded">
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: MEMBERSHIPS */}
      {activeTab === 'memberships' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-500" />
            Enterprise Membership & VIP Club Management
          </h2>
          <p className="text-sm text-slate-500">Manage VIP memberships, annual renewals, and physical digital membership cards.</p>
        </div>
      )}

      {/* TAB 7: LOYALTY */}
      {activeTab === 'loyalty' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            Customer Loyalty & Rewards Engine
          </h2>
          <p className="text-sm text-slate-500">Tier-based points calculation (Bronze, Silver, Gold, Platinum) with reward vouchers.</p>
        </div>
      )}

      {/* TAB 8: AFFILIATES */}
      {activeTab === 'affiliates' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-600" />
            Affiliate & Partner Referral Program
          </h2>
          <p className="text-sm text-slate-500">Track partner referral commissions, payout requests, and multi-tier commission structures.</p>
        </div>
      )}

      {/* TAB 9: SUPPORT */}
      {activeTab === 'support' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Headphones className="w-5 h-5 text-amber-600" />
            Support Helpdesk & SLA Escalation
          </h2>
          <p className="text-sm text-slate-500">Integrated ticketing system with SLA response timers and automatic agent assignments.</p>
        </div>
      )}

      {/* TAB 10: MARKETING */}
      {activeTab === 'marketing' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-purple-600" />
            Omnichannel Marketing Automation
          </h2>
          <p className="text-sm text-slate-500">Automated email drip campaigns, SMS, WhatsApp triggers, and open-rate analytics.</p>
        </div>
      )}

      {/* TAB 11: CUSTOMER PORTAL PREVIEW */}
      {activeTab === 'portal' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Self-Service Customer Portal Simulator
          </h2>
          <p className="text-sm text-slate-500">Client view for accessing paid invoices, support tickets, and loyalty point redemptions.</p>
        </div>
      )}

      {/* Modal: Create Customer */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-lg">Add New Customer</h3>
              <button onClick={() => setShowAddCustomerModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={newCustomer.companyName}
                  onChange={(e) => setNewCustomer({ ...newCustomer, companyName: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Contact Person</label>
                <input
                  type="text"
                  required
                  value={newCustomer.contactPerson}
                  onChange={(e) => setNewCustomer({ ...newCustomer, contactPerson: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCustomerModal(false)}
                  className="w-1/2 py-2 border rounded-lg text-sm text-slate-600 font-medium"
                >
                  Cancel
                </button>
                <button type="submit" className="w-1/2 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700">
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
