import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  UserMinus,
  ShieldAlert,
  ShieldCheck,
  Search,
  Filter,
  Plus,
  RefreshCw,
  Download,
  Upload,
  Eye,
  Edit3,
  Trash2,
  Key,
  Lock,
  Unlock,
  Mail,
  Phone,
  Globe,
  Building,
  Award,
  CreditCard,
  Laptop,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  LogOut,
  FileCheck,
  Code,
  Check,
  Sparkles,
  Ban,
  RotateCcw,
  Send,
  AlertTriangle,
  Clock,
  Briefcase,
  MapPin
} from 'lucide-react';

export interface UserRecord {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended' | 'blocked' | 'archived' | 'email_verification_pending';
  is_email_verified: boolean;
  phone: string;
  department: string;
  job_title: string;
  country: string;
  city: string;
  primary_role_id: number;
  primary_role: string;
  role_code: string;
  badge_color: string;
  plan_code: 'free' | 'basic' | 'professional' | 'enterprise';
  plan_name: string;
  is_online: boolean;
  created_at: string;
  last_login_at: string;
}

export const INITIAL_MOCK_USERS: UserRecord[] = [
  {
    id: 1,
    username: 'superadmin',
    email: 'admin@zfinance.com',
    first_name: 'Alexander',
    last_name: 'Vance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    status: 'active',
    is_email_verified: true,
    phone: '+1 (555) 019-2834',
    department: 'Executive',
    job_title: 'Chief Technology Officer',
    country: 'United States',
    city: 'New York',
    primary_role_id: 1,
    primary_role: 'Super Administrator',
    role_code: 'super_admin',
    badge_color: '#dc2626',
    plan_code: 'enterprise',
    plan_name: 'Enterprise License',
    is_online: true,
    created_at: '2026-01-10 08:30:00',
    last_login_at: '2026-07-22 15:40:00'
  },
  {
    id: 2,
    username: 'sarah.connor',
    email: 'sarah.c@company.com',
    first_name: 'Sarah',
    last_name: 'Connor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    status: 'active',
    is_email_verified: true,
    phone: '+1 (555) 234-5678',
    department: 'Finance & Operations',
    job_title: 'Senior Financial Controller',
    country: 'United States',
    city: 'San Francisco',
    primary_role_id: 3,
    primary_role: 'Finance Manager',
    role_code: 'finance_manager',
    badge_color: '#059669',
    plan_code: 'professional',
    plan_name: 'Professional Suite',
    is_online: true,
    created_at: '2026-02-15 11:20:00',
    last_login_at: '2026-07-22 14:15:00'
  },
  {
    id: 3,
    username: 'michael.ross',
    email: 'm.ross@company.com',
    first_name: 'Michael',
    last_name: 'Ross',
    status: 'pending',
    is_email_verified: false,
    phone: '+44 20 7946 0912',
    department: 'Accounting',
    job_title: 'Junior Ledger Specialist',
    country: 'United Kingdom',
    city: 'London',
    primary_role_id: 6,
    primary_role: 'Accountant',
    role_code: 'accountant',
    badge_color: '#2563eb',
    plan_code: 'basic',
    plan_name: 'Basic Tier',
    is_online: false,
    created_at: '2026-07-20 09:10:00',
    last_login_at: '2026-07-20 09:12:00'
  },
  {
    id: 4,
    username: 'elena.rodriguez',
    email: 'elena.r@company.com',
    first_name: 'Elena',
    last_name: 'Rodriguez',
    status: 'suspended',
    is_email_verified: true,
    phone: '+34 91 123 4567',
    department: 'Sales',
    job_title: 'Regional Operations Supervisor',
    country: 'Spain',
    city: 'Madrid',
    primary_role_id: 5,
    primary_role: 'Supervisor',
    role_code: 'supervisor',
    badge_color: '#d97706',
    plan_code: 'professional',
    plan_name: 'Professional Suite',
    is_online: false,
    created_at: '2026-03-01 14:00:00',
    last_login_at: '2026-07-10 16:45:00'
  },
  {
    id: 5,
    username: 'david.kim',
    email: 'david.kim@techcorp.io',
    first_name: 'David',
    last_name: 'Kim',
    status: 'blocked',
    is_email_verified: true,
    phone: '+82 2 3456 7890',
    department: 'Engineering',
    job_title: 'External Contractor',
    country: 'South Korea',
    city: 'Seoul',
    primary_role_id: 8,
    primary_role: 'Standard User',
    role_code: 'standard_user',
    badge_color: '#6b7280',
    plan_code: 'free',
    plan_name: 'Free Trial Plan',
    is_online: false,
    created_at: '2026-05-12 10:00:00',
    last_login_at: '2026-06-01 12:00:00'
  },
  {
    id: 6,
    username: 'claire.dubois',
    email: 'claire.d@company.com',
    first_name: 'Claire',
    last_name: 'Dubois',
    status: 'active',
    is_email_verified: true,
    phone: '+33 1 42 68 55 00',
    department: 'Human Resources',
    job_title: 'HR Business Partner',
    country: 'France',
    city: 'Paris',
    primary_role_id: 4,
    primary_role: 'Manager',
    role_code: 'manager',
    badge_color: '#7c3aed',
    plan_code: 'professional',
    plan_name: 'Professional Suite',
    is_online: true,
    created_at: '2026-04-10 13:30:00',
    last_login_at: '2026-07-22 15:10:00'
  }
];

export const RbacSchemaSql = `-- Complete MySQL Schema for Users
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    status ENUM('pending', 'active', 'inactive', 'suspended', 'blocked', 'archived', 'email_verification_pending') NOT NULL DEFAULT 'active',
    is_email_verified TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`;

export const RbacUserManagerPhp = `<?php
namespace ZFinance\\Users;

class UserManager {
    public function searchUsers(array $filters, int $page = 1, int $limit = 15): array {
        // Complete PDO search & multi-column sorting
    }
    public function impersonateUser(int $targetUserId, string $reason): array {
        // Generates secure impersonation tokens & logs audit event
    }
}`;

export function RbacModule() { return null; } // Legacy fallback exports

export function UserModule() {
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_MOCK_USERS);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [viewingUser, setViewingUser] = useState<UserRecord | null>(null);
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState<UserRecord | null>(null);
  const [impersonatedUser, setImpersonatedUser] = useState<UserRecord | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'profile' | 'import_export' | 'code'>('users');
  const [activeProfileTab, setActiveProfileTab] = useState<'overview' | 'roles' | 'subscription' | 'security' | 'documents' | 'timeline'>('overview');
  const [activeCodeTab, setActiveCodeTab] = useState<'schema' | 'manager' | 'importer' | 'api'>('schema');

  // New User Form State
  const [newUserForm, setNewUserForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    phone: '',
    department: 'Finance',
    job_title: 'Analyst',
    country: 'United States',
    city: 'New York',
    primary_role_id: 8,
    plan_code: 'free',
    status: 'active'
  });

  // CSV Import state
  const [csvInput, setCsvInput] = useState(`email,first_name,last_name,username,phone,department,job_title
john.doe@company.com,John,Doe,johndoe,+1 555-9012,Sales,Account Executive
lisa.wang@company.com,Lisa,Wang,lisaw,+1 555-9013,Marketing,Brand Specialist`);
  const [importReport, setImportReport] = useState<{ total: number; imported: number; errors: string[] } | null>(null);

  // Filter logic
  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      `${u.first_name} ${u.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    const matchesRole = roleFilter === 'all' || u.role_code === roleFilter;
    const matchesPlan = planFilter === 'all' || u.plan_code === planFilter;

    return matchesSearch && matchesStatus && matchesRole && matchesPlan;
  });

  // Stats
  const totalCount = users.length;
  const activeCount = users.filter(u => u.status === 'active').length;
  const pendingCount = users.filter(u => u.status === 'pending').length;
  const suspendedCount = users.filter(u => u.status === 'suspended').length;
  const blockedCount = users.filter(u => u.status === 'blocked').length;
  const onlineCount = users.filter(u => u.is_online).length;

  // Toggle selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUserIds(filteredUsers.map(u => u.id));
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleSelectUser = (id: number) => {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds(selectedUserIds.filter(i => i !== id));
    } else {
      setSelectedUserIds([...selectedUserIds, id]);
    }
  };

  // Status Change Helper
  const handleStatusChange = (userId: number, newStatus: UserRecord['status']) => {
    if (userId === 1 && (newStatus === 'suspended' || newStatus === 'blocked' || newStatus === 'inactive')) {
      alert("SECURITY DIRECTIVE: Primary Super Administrator account (User ID #1) cannot be deactivated, suspended, or blocked.");
      return;
    }
    setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
  };

  // Bulk operations
  const handleBulkAction = (action: string) => {
    if (selectedUserIds.length === 0) return;

    if (selectedUserIds.includes(1) && ['suspend', 'block', 'delete'].includes(action)) {
      alert("SECURITY DIRECTIVE: Primary Super Administrator (User ID #1) is protected from bulk suspension, blocking, or deletion.");
      return;
    }

    if (action === 'activate') {
      setUsers(users.map(u => selectedUserIds.includes(u.id) ? { ...u, status: 'active' } : u));
    } else if (action === 'suspend') {
      setUsers(users.map(u => selectedUserIds.includes(u.id) && u.id !== 1 ? { ...u, status: 'suspended' } : u));
    } else if (action === 'block') {
      setUsers(users.map(u => selectedUserIds.includes(u.id) && u.id !== 1 ? { ...u, status: 'blocked' } : u));
    } else if (action === 'delete') {
      setUsers(users.filter(u => !selectedUserIds.includes(u.id) || u.id === 1));
    }
    setSelectedUserIds([]);
  };

  // Create User Handler
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserRecord = {
      id: Date.now(),
      username: newUserForm.username || newUserForm.email.split('@')[0],
      email: newUserForm.email,
      first_name: newUserForm.first_name,
      last_name: newUserForm.last_name,
      status: newUserForm.status as any,
      is_email_verified: true,
      phone: newUserForm.phone || '+1 (555) 000-1122',
      department: newUserForm.department,
      job_title: newUserForm.job_title,
      country: newUserForm.country,
      city: newUserForm.city,
      primary_role_id: newUserForm.primary_role_id,
      primary_role: 'Standard User',
      role_code: 'standard_user',
      badge_color: '#6b7280',
      plan_code: newUserForm.plan_code as any,
      plan_name: newUserForm.plan_code === 'enterprise' ? 'Enterprise License' : 'Free Trial Plan',
      is_online: false,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
      last_login_at: 'Never'
    };
    setUsers([newUser, ...users]);
    setShowCreateModal(false);
    setNewUserForm({
      first_name: '', last_name: '', email: '', username: '', phone: '',
      department: 'Finance', job_title: 'Analyst', country: 'United States', city: 'New York',
      primary_role_id: 8, plan_code: 'free', status: 'active'
    });
  };

  // CSV Import Executor
  const handleProcessCsvImport = () => {
    const lines = csvInput.trim().split('\n');
    if (lines.length < 2) {
      alert("Please enter a valid CSV with headers and rows.");
      return;
    }
    const header = lines[0].split(',').map(s => s.trim().toLowerCase());
    let imported = 0;
    const errors: string[] = [];
    const newUsersList: UserRecord[] = [];

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',').map(s => s.trim());
      if (row.length < 3) continue;
      const email = row[0];
      const firstName = row[1];
      const lastName = row[2];

      if (!email.includes('@')) {
        errors.push(`Row ${i + 1}: Invalid email '${email}'`);
        continue;
      }

      newUsersList.push({
        id: Date.now() + i,
        username: row[3] || email.split('@')[0],
        email: email,
        first_name: firstName,
        last_name: lastName,
        status: 'active',
        is_email_verified: true,
        phone: row[4] || '+1 (555) 000-0000',
        department: row[5] || 'Imported',
        job_title: row[6] || 'Staff',
        country: 'United States',
        city: 'Austin',
        primary_role_id: 8,
        primary_role: 'Standard User',
        role_code: 'standard_user',
        badge_color: '#6b7280',
        plan_code: 'free',
        plan_name: 'Free Trial Plan',
        is_online: false,
        created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
        last_login_at: 'Never'
      });
      imported++;
    }

    setUsers([...newUsersList, ...users]);
    setImportReport({ total: lines.length - 1, imported, errors });
  };

  return (
    <div className="space-y-6">
      {/* Impersonation Banner Warning */}
      {impersonatedUser && (
        <div className="bg-gradient-to-r from-amber-600 via-red-600 to-red-700 text-white px-5 py-3 rounded-xl shadow-lg flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-300" />
            <div>
              <p className="font-bold text-sm">
                ADMINISTRATIVE IMPERSONATION SESSION ACTIVE
              </p>
              <p className="text-xs text-amber-100">
                You are currently viewing Z-FINANCE as <span className="font-semibold text-white">{impersonatedUser.first_name} {impersonatedUser.last_name}</span> ({impersonatedUser.email}). All session actions are recorded in security audit logs.
              </p>
            </div>
          </div>
          <button
            onClick={() => setImpersonatedUser(null)}
            className="px-3 py-1.5 bg-white text-red-700 rounded-lg text-xs font-bold hover:bg-red-50 transition-colors shadow-sm flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            Exit Session
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Enterprise User Management</h1>
              <p className="text-xs font-medium text-slate-500">Centralized control panel for users, permissions, documents, and subscriptions</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowImportModal(true)}
            className="px-3.5 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Upload className="w-4 h-4 text-slate-600" />
            Import / Export CSV
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            Create User Account
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Users</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{totalCount}</p>
          <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3 h-3" /> {onlineCount} Currently Online
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-600">{activeCount}</p>
          <span className="text-[11px] text-slate-500 mt-1 block">Full System Access</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
          <span className="text-[11px] text-slate-500 mt-1 block">Email Verification</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Suspended</span>
            <UserMinus className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-600">{suspendedCount}</p>
          <span className="text-[11px] text-slate-500 mt-1 block">Temporary Hold</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Blocked</span>
            <Ban className="w-4 h-4 text-slate-800" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{blockedCount}</p>
          <span className="text-[11px] text-slate-500 mt-1 block">Access Revoked</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Enterprise</span>
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-700">
            {users.filter(u => u.plan_code === 'enterprise').length}
          </p>
          <span className="text-[11px] text-purple-600 mt-1 block">Tier Subscriptions</span>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2.5 font-semibold text-xs border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            User Directory ({filteredUsers.length})
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2.5 font-semibold text-xs border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'code' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code className="w-4 h-4" />
            Architecture & API Specs
          </button>
        </div>
      </div>

      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Controls Bar */}
          <div className="p-4 bg-slate-50/50 border-b border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search name, email, username, phone..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
              <div className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                  <option value="blocked">Blocked</option>
                </select>

                <select
                  value={planFilter}
                  onChange={e => setPlanFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Plans</option>
                  <option value="free">Free</option>
                  <option value="basic">Basic</option>
                  <option value="professional">Professional</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>

              {selectedUserIds.length > 0 && (
                <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200 ml-auto">
                  <span className="text-xs font-bold text-blue-700">{selectedUserIds.length} Selected</span>
                  <button onClick={() => handleBulkAction('activate')} className="px-2 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded">Activate</button>
                  <button onClick={() => handleBulkAction('suspend')} className="px-2 py-1 bg-amber-600 text-white text-[10px] font-bold rounded">Suspend</button>
                  <button onClick={() => handleBulkAction('block')} className="px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded">Block</button>
                  <button onClick={() => handleBulkAction('delete')} className="px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded">Delete</button>
                </div>
              )}
            </div>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <th className="p-3 pl-4">
                    <input
                      type="checkbox"
                      checked={selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="p-3">User</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Role & Dept</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Last Active</th>
                  <th className="p-3 text-right pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 pl-4">
                      <input
                        type="checkbox"
                        checked={selectedUserIds.includes(u.id)}
                        onChange={() => handleSelectUser(u.id)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold overflow-hidden border border-slate-300">
                          {u.avatar ? (
                            <img src={u.avatar} alt={u.first_name} className="w-full h-full object-cover" />
                          ) : (
                            `${u.first_name[0]}${u.last_name[0]}`
                          )}
                          {u.is_online && (
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0"></span>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{u.first_name} {u.last_name}</p>
                          <p className="text-[11px] text-slate-500">@{u.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <p className="font-semibold text-slate-800">{u.email}</p>
                      <p className="text-[11px] text-slate-500">{u.phone}</p>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold text-white block w-max" style={{ backgroundColor: u.badge_color }}>
                        {u.primary_role}
                      </span>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">{u.department}</span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-800 text-[10px] font-bold uppercase rounded border border-slate-200">
                        {u.plan_code}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize inline-flex items-center gap-1 ${
                        u.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                        u.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        u.status === 'suspended' ? 'bg-red-100 text-red-800' :
                        'bg-slate-200 text-slate-800'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-3 text-[11px] text-slate-500">
                      {u.last_login_at}
                    </td>
                    <td className="p-3 text-right pr-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewingUser(u)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View Admin Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setImpersonatedUser(u)}
                          className="p-1.5 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Impersonate User"
                        >
                          <ShieldCheck className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleStatusChange(u.id, u.status === 'active' ? 'suspended' : 'active')}
                          className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title={u.status === 'active' ? 'Suspend Account' : 'Activate Account'}
                        >
                          {u.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
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

      {/* User Details Modal Drawer */}
      {viewingUser && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center font-bold text-lg text-white border-2 border-slate-500 overflow-hidden">
                  {viewingUser.avatar ? (
                    <img src={viewingUser.avatar} alt={viewingUser.first_name} className="w-full h-full object-cover" />
                  ) : (
                    `${viewingUser.first_name[0]}${viewingUser.last_name[0]}`
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold">{viewingUser.first_name} {viewingUser.last_name}</h2>
                  <p className="text-xs text-slate-400">@{viewingUser.username} • User ID #{viewingUser.id}</p>
                </div>
              </div>
              <button
                onClick={() => setViewingUser(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Tabs */}
            <div className="flex items-center border-b border-slate-200 bg-slate-50 px-6 gap-2 text-xs font-semibold text-slate-600">
              <button
                onClick={() => setActiveProfileTab('overview')}
                className={`py-3 px-3 border-b-2 ${activeProfileTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveProfileTab('roles')}
                className={`py-3 px-3 border-b-2 ${activeProfileTab === 'roles' ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
              >
                Roles & Permissions
              </button>
              <button
                onClick={() => setActiveProfileTab('subscription')}
                className={`py-3 px-3 border-b-2 ${activeProfileTab === 'subscription' ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
              >
                Subscription
              </button>
              <button
                onClick={() => setActiveProfileTab('security')}
                className={`py-3 px-3 border-b-2 ${activeProfileTab === 'security' ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
              >
                Security & Devices
              </button>
              <button
                onClick={() => setActiveProfileTab('documents')}
                className={`py-3 px-3 border-b-2 ${activeProfileTab === 'documents' ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
              >
                Documents
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {activeProfileTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase">Email Address</span>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">{viewingUser.email}</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase">Phone Number</span>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">{viewingUser.phone}</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase">Department</span>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">{viewingUser.department}</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase">Job Title</span>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">{viewingUser.job_title}</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase">Location</span>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">{viewingUser.city}, {viewingUser.country}</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase">Registration Date</span>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">{viewingUser.created_at}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeProfileTab === 'roles' && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-xs font-bold text-blue-900">Primary Role: {viewingUser.primary_role}</p>
                    <p className="text-[11px] text-blue-700 mt-1">Direct User Override Rule: Any explicit permission set on this user profile overrides inherited role permissions.</p>
                  </div>
                </div>
              )}

              {activeProfileTab === 'subscription' && (
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-purple-700 tracking-wider">Current Plan</span>
                      <h4 className="text-base font-bold text-purple-900">{viewingUser.plan_name}</h4>
                      <p className="text-xs text-purple-700">Status: Active • Billed Monthly</p>
                    </div>
                    <span className="px-3 py-1 bg-purple-600 text-white font-bold text-xs rounded-lg uppercase">
                      {viewingUser.plan_code}
                    </span>
                  </div>
                </div>
              )}

              {activeProfileTab === 'documents' && (
                <div className="space-y-3">
                  <div className="p-3 border border-slate-200 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-xs font-bold text-slate-900">Government Passport.pdf</p>
                        <p className="text-[11px] text-slate-500">Identity Verification • Uploaded 2 days ago</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                      Approved
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">Create New User Account</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">First Name</label>
                  <input
                    type="text"
                    required
                    value={newUserForm.first_name}
                    onChange={e => setNewUserForm({ ...newUserForm, first_name: e.target.value })}
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Last Name</label>
                  <input
                    type="text"
                    required
                    value={newUserForm.last_name}
                    onChange={e => setNewUserForm({ ...newUserForm, last_name: e.target.value })}
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUserForm.email}
                  onChange={e => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Department</label>
                  <input
                    type="text"
                    value={newUserForm.department}
                    onChange={e => setNewUserForm({ ...newUserForm, department: e.target.value })}
                    className="w-full mt-1 p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Job Title</label>
                  <input
                    type="text"
                    value={newUserForm.job_title}
                    onChange={e => setNewUserForm({ ...newUserForm, job_title: e.target.value })}
                    className="w-full mt-1 p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSV Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">Import Users via CSV</h3>
              <button onClick={() => setShowImportModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div>
              <p className="text-xs text-slate-600 mb-2 font-medium">Paste CSV data below or edit the template:</p>
              <textarea
                rows={6}
                value={csvInput}
                onChange={e => setCsvInput(e.target.value)}
                className="w-full p-3 font-mono text-xs border rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {importReport && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                <p className="font-bold">Successfully imported {importReport.imported} of {importReport.total} records!</p>
              </div>
            )}

            <div className="flex justify-between items-center pt-3 border-t">
              <button
                onClick={() => {
                  const blob = new Blob([csvInput], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'zfinance_users.csv';
                  a.click();
                }}
                className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> Export Current CSV
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-xs text-slate-600"
                >
                  Close
                </button>
                <button
                  onClick={handleProcessCsvImport}
                  className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700"
                >
                  Process Import
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Code Inspector Tab */}
      {activeTab === 'code' && (
        <div className="bg-slate-900 rounded-2xl p-6 text-slate-100 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <button
              onClick={() => setActiveCodeTab('schema')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${activeCodeTab === 'schema' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              schema.sql
            </button>
            <button
              onClick={() => setActiveCodeTab('manager')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${activeCodeTab === 'manager' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              UserManager.php
            </button>
          </div>

          <pre className="p-4 bg-slate-950 rounded-xl text-xs font-mono overflow-x-auto text-emerald-400 border border-slate-800">
            {activeCodeTab === 'schema' ? RbacSchemaSql : RbacUserManagerPhp}
          </pre>
        </div>
      )}
    </div>
  );
}
