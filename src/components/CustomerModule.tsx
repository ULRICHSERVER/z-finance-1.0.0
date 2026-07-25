import React, { useState, useEffect } from 'react';
import { 
  Users, UserPlus, Building2, UserCheck, Award, Search, Filter, Plus, 
  FileText, Phone, Mail, Calendar, MessageSquare, Download, Upload, Trash2, 
  Tag, Layers, RefreshCw, Globe, DollarSign, CheckCircle, Eye, Edit, 
  Briefcase, Send, ShieldAlert, ShieldCheck, FileSpreadsheet, X
} from 'lucide-react';
import { AdSuiteWidget } from './AdSuiteWidget';

interface Customer {
  id: number;
  customer_code: string;
  customer_type: 'individual' | 'company' | 'organization' | 'association' | 'school' | 'government' | 'ngo' | 'partner' | 'custom';
  first_name?: string;
  last_name?: string;
  display_name: string;
  company_name?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  country?: string;
  city?: string;
  profession?: string;
  is_vip: boolean;
  status: 'active' | 'inactive' | 'lead' | 'archived';
  visibility: 'private' | 'public' | 'invitation_only';
  total_income_generated?: number;
  outstanding_balance?: number;
  total_payments_received?: number;
  created_at?: string;
}

interface Group {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color: string;
  member_count?: number;
}

interface Communication {
  id: number;
  type: 'call' | 'email' | 'meeting' | 'message' | 'whatsapp' | 'note';
  subject: string;
  details: string;
  created_at: string;
}

export const CustomerModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'list' | 'groups' | 'directory' | 'import'>('dashboard');
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      customer_code: 'CUST-8832A1',
      customer_type: 'company',
      display_name: 'Apex Global Enterprises',
      company_name: 'Apex Global Ltd',
      email: 'contact@apexglobal.com',
      phone: '+1 (555) 019-2834',
      whatsapp: '+15550192834',
      country: 'United States',
      city: 'New York',
      profession: 'Enterprise Software',
      is_vip: true,
      status: 'active',
      visibility: 'public',
      total_income_generated: 45000,
      outstanding_balance: 5000,
      total_payments_received: 40000,
      created_at: '2026-01-15'
    },
    {
      id: 2,
      customer_code: 'CUST-1049B2',
      customer_type: 'individual',
      first_name: 'Sophia',
      last_name: 'Chen',
      display_name: 'Sophia Chen',
      email: 'sophia.chen@example.com',
      phone: '+44 7700 900077',
      whatsapp: '+447700900077',
      country: 'United Kingdom',
      city: 'London',
      profession: 'Financial Analyst',
      is_vip: false,
      status: 'active',
      visibility: 'private',
      total_income_generated: 12500,
      outstanding_balance: 0,
      total_payments_received: 12500,
      created_at: '2026-02-10'
    },
    {
      id: 3,
      customer_code: 'CUST-9921C3',
      customer_type: 'ngo',
      display_name: 'Global Horizon Foundation',
      company_name: 'Global Horizon NGO',
      email: 'info@globalhorizon.org',
      phone: '+237 670 000 111',
      country: 'Cameroon',
      city: 'Douala',
      profession: 'Community Development',
      is_vip: true,
      status: 'lead',
      visibility: 'public',
      total_income_generated: 0,
      outstanding_balance: 0,
      total_payments_received: 0,
      created_at: '2026-03-01'
    }
  ]);

  const [groups, setGroups] = useState<Group[]>([
    { id: 1, name: 'VIP Clients', slug: 'vip-clients', description: 'High-value priority accounts', color: '#7c3aed', member_count: 2 },
    { id: 2, name: 'Corporate Accounts', slug: 'corporate-accounts', description: 'Enterprise business partners', color: '#2563eb', member_count: 1 },
    { id: 3, name: 'Regular Retail', slug: 'regular-retail', description: 'Standard individual buyers', color: '#059669', member_count: 5 }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCommModal, setShowCommModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    display_name: '',
    customer_type: 'individual',
    company_name: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: 'United States',
    city: '',
    profession: '',
    is_vip: false,
    status: 'active',
    visibility: 'private'
  });

  const [commData, setCommData] = useState({
    type: 'call',
    subject: '',
    details: ''
  });

  const [communications, setCommunications] = useState<Communication[]>([
    { id: 1, type: 'call', subject: 'Initial Consultation', details: 'Discussed annual retainer agreement.', created_at: '2026-03-15 10:30' },
    { id: 2, type: 'email', subject: 'Proposal Delivered', details: 'Sent updated pricing guide.', created_at: '2026-03-18 14:15' }
  ]);

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const newCust: Customer = {
      id: Date.now(),
      customer_code: `CUST-${Math.floor(100000 + Math.random() * 900000)}`,
      customer_type: formData.customer_type as any,
      display_name: formData.display_name,
      company_name: formData.company_name,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      country: formData.country,
      city: formData.city,
      profession: formData.profession,
      is_vip: formData.is_vip,
      status: formData.status as any,
      visibility: formData.visibility as any,
      total_income_generated: 0,
      outstanding_balance: 0,
      total_payments_received: 0,
      created_at: new Date().toISOString().split('T')[0]
    };

    setCustomers([newCust, ...customers]);
    setShowAddModal(false);
    setFormData({
      display_name: '',
      customer_type: 'individual',
      company_name: '',
      email: '',
      phone: '',
      whatsapp: '',
      country: 'United States',
      city: '',
      profession: '',
      is_vip: false,
      status: 'active',
      visibility: 'private'
    });
  };

  const handleLogComm = (e: React.FormEvent) => {
    e.preventDefault();
    const newComm: Communication = {
      id: Date.now(),
      type: commData.type as any,
      subject: commData.subject,
      details: commData.details,
      created_at: new Date().toLocaleString()
    };
    setCommunications([newComm, ...communications]);
    setShowCommModal(false);
    setCommData({ type: 'call', subject: '', details: '' });
  };

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.customer_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || c.customer_type === selectedType;
    const matchesStatus = selectedStatus === 'all' || c.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalIncome = customers.reduce((sum, c) => sum + (c.total_income_generated || 0), 0);
  const totalOutstanding = customers.reduce((sum, c) => sum + (c.outstanding_balance || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Users className="w-8 h-8 text-sky-200" />
            <h1 className="text-2xl font-bold tracking-tight">Customer Relationship Management (CRM)</h1>
          </div>
          <p className="text-blue-100 text-sm max-w-2xl">
            Enterprise multi-tenant client ecosystem. Manage customers, organizations, NGOs, partners, communication histories, documents, and financial metrics.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-white text-blue-700 hover:bg-blue-50 px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center space-x-2 shadow-md transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Ad Suite Placeholder Top */}
      <AdSuiteWidget position="top" title="CRM Sponsor Banner" />

      {/* Tabs Bar */}
      <div className="flex space-x-1 border-b border-gray-200 bg-white p-1.5 rounded-xl shadow-sm">
        <button
          onClick={() => { setActiveTab('dashboard'); setSelectedCustomer(null); }}
          className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center space-x-2 transition-colors ${
            activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('list')}
          className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center space-x-2 transition-colors ${
            activeTab === 'list' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>All Customers ({customers.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center space-x-2 transition-colors ${
            activeTab === 'groups' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Customer Groups ({groups.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('directory')}
          className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center space-x-2 transition-colors ${
            activeTab === 'directory' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Public Directory</span>
        </button>
      </div>

      {/* TAB 1: DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Total Customers</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{customers.length}</h3>
                <span className="inline-block mt-1 text-xs text-emerald-600 font-medium">+12% this month</span>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">VIP Customers</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {customers.filter(c => c.is_vip).length}
                </h3>
                <span className="inline-block mt-1 text-xs text-purple-600 font-medium">Priority accounts</span>
              </div>
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                <Award className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Total Income Generated</p>
                <h3 className="text-2xl font-bold text-emerald-600 mt-1">${totalIncome.toLocaleString()}</h3>
                <span className="inline-block mt-1 text-xs text-gray-400">All-time revenue</span>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Outstanding Balances</p>
                <h3 className="text-2xl font-bold text-rose-600 mt-1">${totalOutstanding.toLocaleString()}</h3>
                <span className="inline-block mt-1 text-xs text-rose-500">Pending collections</span>
              </div>
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                <FileText className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Quick Recent Activity & VIP Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Recent Customers</h2>
                <button 
                  onClick={() => setActiveTab('list')}
                  className="text-sm text-blue-600 font-medium hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {customers.slice(0, 5).map(cust => (
                  <div key={cust.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                        {cust.display_name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-900 text-sm">{cust.display_name}</h4>
                          {cust.is_vip && <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">VIP</span>}
                        </div>
                        <p className="text-xs text-gray-500">{cust.email || cust.phone || 'No direct contact'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-900">${cust.total_income_generated?.toLocaleString()}</span>
                      <p className="text-xs text-gray-400">{cust.customer_type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions & Group Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Quick Operations</h2>
              <div className="space-y-2">
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 p-3 rounded-xl font-medium text-sm flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center space-x-2">
                    <UserPlus className="w-4 h-4" />
                    <span>Create Customer Record</span>
                  </span>
                  <Plus className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setActiveTab('groups')}
                  className="w-full bg-purple-50 text-purple-700 hover:bg-purple-100 p-3 rounded-xl font-medium text-sm flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center space-x-2">
                    <Layers className="w-4 h-4" />
                    <span>Manage Groups & Segmentation</span>
                  </span>
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Group Distribution</h3>
                <div className="space-y-2">
                  {groups.map(grp => (
                    <div key={grp.id} className="flex justify-between items-center text-sm">
                      <span className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: grp.color }}></span>
                        <span className="text-gray-700">{grp.name}</span>
                      </span>
                      <span className="font-semibold text-gray-900">{grp.member_count || 0}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CUSTOMER LIST & PROFILE VIEW */}
      {activeTab === 'list' && (
        <div className="space-y-6">
          {selectedCustomer ? (
            /* DETAILED PROFILE VIEW */
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                    {selectedCustomer.display_name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedCustomer.display_name}</h2>
                      {selectedCustomer.is_vip && (
                        <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-bold flex items-center space-x-1">
                          <Award className="w-3 h-3" />
                          <span>VIP Client</span>
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 font-mono mt-0.5">{selectedCustomer.customer_code} • {selectedCustomer.customer_type.toUpperCase()}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowCommModal(true)}
                    className="bg-blue-600 text-white hover:bg-blue-700 px-3.5 py-2 rounded-xl font-semibold text-xs flex items-center space-x-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Log Communication</span>
                  </button>
                  <button 
                    onClick={() => setSelectedCustomer(null)}
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3.5 py-2 rounded-xl font-semibold text-xs transition-colors"
                  >
                    Back to List
                  </button>
                </div>
              </div>

              {/* Profile Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Information</h4>
                  <p className="text-sm text-gray-800 flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{selectedCustomer.email || 'N/A'}</span>
                  </p>
                  <p className="text-sm text-gray-800 flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{selectedCustomer.phone || 'N/A'}</span>
                  </p>
                  <p className="text-sm text-gray-800 flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-emerald-500" />
                    <span>{selectedCustomer.whatsapp || 'N/A'}</span>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location & Industry</h4>
                  <p className="text-sm text-gray-800">Country: <span className="font-semibold">{selectedCustomer.country || 'N/A'}</span></p>
                  <p className="text-sm text-gray-800">City: <span className="font-semibold">{selectedCustomer.city || 'N/A'}</span></p>
                  <p className="text-sm text-gray-800">Profession/Industry: <span className="font-semibold">{selectedCustomer.profession || 'N/A'}</span></p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Financial Overview</h4>
                  <p className="text-sm text-gray-800">Total Income: <span className="font-bold text-emerald-600">${selectedCustomer.total_income_generated?.toLocaleString()}</span></p>
                  <p className="text-sm text-gray-800">Outstanding Balance: <span className="font-bold text-rose-600">${selectedCustomer.outstanding_balance?.toLocaleString()}</span></p>
                  <p className="text-sm text-gray-800">Total Paid: <span className="font-bold text-blue-600">${selectedCustomer.total_payments_received?.toLocaleString()}</span></p>
                </div>
              </div>

              {/* Communication Logs */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Communication History</h3>
                <div className="space-y-3">
                  {communications.map(comm => (
                    <div key={comm.id} className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                            {comm.type}
                          </span>
                          <h5 className="font-semibold text-gray-900 text-sm">{comm.subject}</h5>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{comm.details}</p>
                      </div>
                      <span className="text-[11px] text-gray-400 font-mono">{comm.created_at}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* CUSTOMERS LIST WITH FILTERS */
            <div className="space-y-4">
              {/* Search & Filter Bar */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search by name, code, email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="all">All Customer Types</option>
                    <option value="individual">Individual</option>
                    <option value="company">Company</option>
                    <option value="organization">Organization</option>
                    <option value="ngo">NGO</option>
                  </select>

                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="lead">Lead</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Customers Table */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-xs font-bold uppercase text-gray-500 border-b border-gray-100">
                      <tr>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Income</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredCustomers.map(cust => (
                        <tr key={cust.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                                {cust.display_name.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div className="flex items-center space-x-1.5">
                                  <span className="font-semibold text-gray-900">{cust.display_name}</span>
                                  {cust.is_vip && <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-bold">VIP</span>}
                                </div>
                                <span className="text-xs text-gray-400 font-mono">{cust.customer_code}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="capitalize bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-medium">
                              {cust.customer_type}
                            </span>
                          </td>
                          <td className="p-4 text-xs">
                            <p className="text-gray-900 font-medium">{cust.email || 'N/A'}</p>
                            <p className="text-gray-400">{cust.phone || 'N/A'}</p>
                          </td>
                          <td className="p-4 text-xs text-gray-700">
                            {cust.city ? `${cust.city}, ${cust.country}` : cust.country}
                          </td>
                          <td className="p-4 text-xs font-bold text-emerald-600">
                            ${cust.total_income_generated?.toLocaleString()}
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              cust.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                              cust.status === 'lead' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {cust.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => setSelectedCustomer(cust)}
                              className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                            >
                              View Profile
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CUSTOMER GROUPS */}
      {activeTab === 'groups' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {groups.map(grp => (
              <div key={grp.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: grp.color }}></span>
                    <h3 className="font-bold text-gray-900">{grp.name}</h3>
                  </div>
                  <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full font-semibold">
                    {grp.member_count || 0} Members
                  </span>
                </div>
                <p className="text-xs text-gray-500">{grp.description || 'No description provided.'}</p>
                <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-[11px] text-gray-400 font-mono">Slug: {grp.slug}</span>
                  <button className="text-xs text-blue-600 font-semibold hover:underline">Manage Members</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PUBLIC DIRECTORY */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Public Business Directory</h2>
            <p className="text-sm text-gray-500 mb-6">
              Searchable client directory for public partners, verified corporate entities, and verified institutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customers.filter(c => c.visibility === 'public').map(c => (
                <div key={c.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-gray-900 text-sm">{c.display_name}</h4>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Verified</span>
                  </div>
                  <p className="text-xs text-gray-600">{c.company_name || c.profession || 'Public Partner'}</p>
                  <p className="text-xs text-gray-500 flex items-center space-x-1">
                    <Globe className="w-3 h-3 text-gray-400" />
                    <span>{c.country}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD CUSTOMER */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-bold text-lg text-gray-900">Add New Customer</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateCustomer} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Display Name *</label>
                <input
                  type="text"
                  required
                  value={formData.display_name}
                  onChange={e => setFormData({ ...formData, display_name: e.target.value })}
                  placeholder="e.g. Acme Corp or John Doe"
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Customer Type</label>
                  <select
                    value={formData.customer_type}
                    onChange={e => setFormData({ ...formData, customer_type: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="individual">Individual</option>
                    <option value="company">Company</option>
                    <option value="organization">Organization</option>
                    <option value="ngo">NGO</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@domain.com"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">WhatsApp</label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="is_vip_check"
                  checked={formData.is_vip}
                  onChange={e => setFormData({ ...formData, is_vip: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="is_vip_check" className="text-xs font-semibold text-gray-700">Mark as VIP Priority Customer</label>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: LOG COMMUNICATION */}
      {showCommModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-bold text-lg text-gray-900">Log Interaction</h3>
              <button onClick={() => setShowCommModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleLogComm} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Channel / Type</label>
                <select
                  value={commData.type}
                  onChange={e => setCommData({ ...commData, type: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white"
                >
                  <option value="call">Phone Call</option>
                  <option value="email">Email</option>
                  <option value="meeting">In-Person Meeting</option>
                  <option value="message">SMS / Chat</option>
                  <option value="whatsapp">WhatsApp Message</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={commData.subject}
                  onChange={e => setCommData({ ...commData, subject: e.target.value })}
                  placeholder="e.g. Contract Discussion"
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Details & Notes</label>
                <textarea
                  rows={3}
                  value={commData.details}
                  onChange={e => setCommData({ ...commData, details: e.target.value })}
                  placeholder="Summary of the conversation..."
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCommModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                  Log Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ad Suite Placeholder Bottom */}
      <AdSuiteWidget position="bottom" title="CRM Footer Ad Space" />
    </div>
  );
};
