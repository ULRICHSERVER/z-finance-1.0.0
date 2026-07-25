import React, { useState } from 'react';
import {
  ShieldCheck,
  Shield,
  Key,
  Users,
  Grid,
  Search,
  Plus,
  Copy,
  Trash2,
  Edit3,
  Check,
  X,
  FileCode2,
  Lock,
  Unlock,
  Sliders,
  History,
  AlertTriangle,
  RefreshCw,
  Eye,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';

interface Role {
  id: number;
  code: string;
  name: string;
  description: string;
  hierarchy_level: number;
  is_system: boolean;
  is_active: boolean;
  data_scope: string;
  user_count: number;
  permission_ids: number[];
}

interface Permission {
  id: number;
  code: string;
  name: string;
  action: string;
  description: string;
}

interface PermissionGroup {
  id: number;
  code: string;
  name: string;
  icon: string;
  description: string;
  permissions: Permission[];
}

export const RbacModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'matrix' | 'roles' | 'direct_users' | 'audit' | 'code'>('matrix');
  const [selectedRoleId, setSelectedRoleId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState('all');

  // Initial Mock State reflecting PHP backend defaults
  const [roles, setRoles] = useState<Role[]>([
    { id: 1, code: 'super_admin', name: 'Super Administrator', description: 'Full unmitigated platform control', hierarchy_level: 100, is_system: true, is_active: true, data_scope: 'global_access', user_count: 2, permission_ids: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] },
    { id: 2, code: 'administrator', name: 'Administrator', description: 'System administration & user control', hierarchy_level: 90, is_system: true, is_active: true, data_scope: 'company_records', user_count: 5, permission_ids: [1,2,3,4,5,6,7,8,9,10,11,12,13,14] },
    { id: 3, code: 'finance_manager', name: 'Finance Manager', description: 'Full financial oversight and approvals', hierarchy_level: 80, is_system: true, is_active: true, data_scope: 'company_records', user_count: 8, permission_ids: [1,2,3,6,7,8,9] },
    { id: 4, code: 'manager', name: 'Manager', description: 'Departmental management and reports', hierarchy_level: 70, is_system: true, is_active: true, data_scope: 'branch_records', user_count: 14, permission_ids: [1,2,3,6,9] },
    { id: 5, code: 'supervisor', name: 'Supervisor', description: 'Team operational supervision', hierarchy_level: 60, is_system: true, is_active: true, data_scope: 'department_records', user_count: 22, permission_ids: [1,2,6] },
    { id: 6, code: 'accountant', name: 'Accountant', description: 'Financial data entry and ledger audits', hierarchy_level: 50, is_system: true, is_active: true, data_scope: 'company_records', user_count: 11, permission_ids: [1,6,7,9] },
    { id: 7, code: 'employee', name: 'Employee', description: 'Staff member personal claim submissions', hierarchy_level: 40, is_system: true, is_active: true, data_scope: 'own_records', user_count: 120, permission_ids: [1,2,7] },
    { id: 8, code: 'standard_user', name: 'Standard User', description: 'Standard application user account', hierarchy_level: 30, is_system: true, is_active: true, data_scope: 'own_records', user_count: 450, permission_ids: [1,2] },
    { id: 9, code: 'guest', name: 'Guest', description: 'Read-only trial access', hierarchy_level: 10, is_system: true, is_active: true, data_scope: 'own_records', user_count: 35, permission_ids: [1] }
  ]);

  const [groups] = useState<PermissionGroup[]>([
    {
      id: 1, code: 'dashboard', name: 'Dashboard', icon: 'bi-speedometer2', description: 'Executive KPIs and analytics widgets',
      permissions: [
        { id: 1, code: 'dashboard.view', name: 'View Dashboard', action: 'view', description: 'Allows viewing executive dashboard' },
        { id: 2, code: 'dashboard.configure', name: 'Configure Widgets', action: 'configure', description: 'Customize dashboard widgets' }
      ]
    },
    {
      id: 2, code: 'users', name: 'User Management', icon: 'bi-people', description: 'User account management',
      permissions: [
        { id: 3, code: 'users.view', name: 'View Users', action: 'view', description: 'View user listing' },
        { id: 4, code: 'users.create', name: 'Create User', action: 'create', description: 'Create new user accounts' },
        { id: 5, code: 'users.edit', name: 'Edit User', action: 'edit', description: 'Modify existing user accounts' },
        { id: 6, code: 'users.delete', name: 'Delete User', action: 'delete', description: 'Delete or deactivate user accounts' }
      ]
    },
    {
      id: 3, code: 'income', name: 'Income Module', icon: 'bi-wallet2', description: 'Revenue and incoming transactions',
      permissions: [
        { id: 7, code: 'income.view', name: 'View Income', action: 'view', description: 'View income entries' },
        { id: 8, code: 'income.create', name: 'Create Income', action: 'create', description: 'Log new income' },
        { id: 9, code: 'income.approve', name: 'Approve Income', action: 'approve', description: 'Approve pending revenue' }
      ]
    },
    {
      id: 4, code: 'roles', name: 'RBAC Roles', icon: 'bi-shield-lock', description: 'Role and permission management',
      permissions: [
        { id: 10, code: 'roles.view', name: 'View Roles', action: 'view', description: 'View system roles' },
        { id: 11, code: 'roles.create', name: 'Create Role', action: 'create', description: 'Define custom roles' },
        { id: 12, code: 'roles.edit', name: 'Edit Role', action: 'edit', description: 'Update role matrix' },
        { id: 13, code: 'roles.delete', name: 'Delete Role', action: 'delete', description: 'Remove roles' }
      ]
    }
  ]);

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, action: 'ROLE_CREATED', module: 'roles', user: 'Alexander Vance (Super Admin)', time: '10 mins ago', details: 'Created custom role "Auditor"' },
    { id: 2, action: 'PERMISSIONS_SYNCED', module: 'roles', user: 'Alexander Vance (Super Admin)', time: '25 mins ago', details: 'Updated 14 permissions for Administrator' },
    { id: 3, action: 'USER_ROLE_ASSIGNED', module: 'user_roles', user: 'System Admin', time: '1 hour ago', details: 'Assigned "Finance Manager" role to Marcus Brody' },
    { id: 4, action: 'PERMISSION_OVERRIDE', module: 'user_permissions', user: 'Alexander Vance', time: '2 hours ago', details: 'Directly granted "income.approve" to User ID 88' }
  ]);

  // Direct User Override Simulator
  const [testUser, setTestUser] = useState({
    name: 'Marcus Brody',
    email: 'm.brody@zfinance.com',
    role: 'Employee (Hierarchy Level 40)',
    directOverrides: { 9: true, 6: false } as Record<number, boolean>
  });

  // Toggle Matrix Permission for selected role
  const togglePermission = (roleId: number, permId: number) => {
    if (roleId === 1) {
      alert("CRITICAL PROTECTION: Super Administrator role permissions cannot be revoked!");
      return;
    }
    setRoles(prev => prev.map(r => {
      if (r.id === roleId) {
        const has = r.permission_ids.includes(permId);
        const next = has ? r.permission_ids.filter(p => p !== permId) : [...r.permission_ids, permId];
        return { ...r, permission_ids: next };
      }
      return r;
    }));
  };

  // Clone Role Modal simulator
  const cloneRole = (role: Role) => {
    const newName = prompt(`Enter name for cloned copy of '${role.name}':`, `${role.name} Copy`);
    if (!newName) return;
    const newRole: Role = {
      id: Date.now(),
      code: newName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      name: newName,
      description: `Cloned from ${role.name}`,
      hierarchy_level: role.hierarchy_level,
      is_system: false,
      is_active: true,
      data_scope: role.data_scope,
      user_count: 0,
      permission_ids: [...role.permission_ids]
    };
    setRoles(prev => [...prev, newRole]);
    setAuditLogs(prev => [
      { id: Date.now(), action: 'ROLE_CLONED', module: 'roles', user: 'Alexander Vance', time: 'Just now', details: `Cloned role '${role.name}' -> '${newName}'` },
      ...prev
    ]);
  };

  const selectedRole = roles.find(r => r.id === selectedRoleId) || roles[0];

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-indigo-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <ShieldCheck className="w-64 h-64 text-indigo-400" />
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Phase 2 — STEP 2.3
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Central Security Engine
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <Shield className="w-8 h-8 text-indigo-400" />
              Enterprise Role-Based Access Control (RBAC)
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Centralized authorization matrix governing unlimited roles, granular permissions, multi-role assignments, direct user overrides, data scopes, menu visibility, and real-time security audit trails.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('matrix')}
              className={`px-4 py-2 rounded-xl font-medium text-xs flex items-center gap-2 transition-all ${
                activeSubTab === 'matrix' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Grid className="w-4 h-4" /> Visual Access Matrix
            </button>
            <button
              onClick={() => setActiveSubTab('roles')}
              className={`px-4 py-2 rounded-xl font-medium text-xs flex items-center gap-2 transition-all ${
                activeSubTab === 'roles' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Role Definitions ({roles.length})
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('matrix')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 ${
            activeSubTab === 'matrix' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Grid className="w-4 h-4" /> Permission Matrix
        </button>
        <button
          onClick={() => setActiveSubTab('roles')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 ${
            activeSubTab === 'roles' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Shield className="w-4 h-4" /> Role Management
        </button>
        <button
          onClick={() => setActiveSubTab('direct_users')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 ${
            activeSubTab === 'direct_users' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" /> Direct User Overrides
        </button>
        <button
          onClick={() => setActiveSubTab('audit')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 ${
            activeSubTab === 'audit' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <History className="w-4 h-4" /> Audit Logs
        </button>
        <button
          onClick={() => setActiveSubTab('code')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 ${
            activeSubTab === 'code' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <FileCode2 className="w-4 h-4" /> Architecture Code Inspector
        </button>
      </div>

      {/* TAB 1: VISUAL PERMISSION MATRIX */}
      {activeSubTab === 'matrix' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl text-indigo-600 dark:text-indigo-400">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Visual Role x Permission Matrix</h3>
                <p className="text-xs text-slate-500">Toggle checkboxes to instantly assign or revoke granular capabilities across default and custom system roles.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-medium">Selected Role Focus:</span>
              <select
                value={selectedRoleId}
                onChange={(e) => setSelectedRoleId(Number(e.target.value))}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 font-semibold"
              >
                {roles.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.name} (Level {r.hierarchy_level})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-800/80 uppercase text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
                  <tr>
                    <th className="p-3.5 w-64">Permission Group & Capability</th>
                    <th className="p-3.5 w-32">Action Type</th>
                    {roles.map(r => (
                      <th key={r.id} className="p-3.5 text-center min-w-[110px]">
                        <div className="font-bold text-slate-900 dark:text-slate-100">{r.name}</div>
                        <div className="text-[10px] normal-case text-indigo-600 dark:text-indigo-400 font-semibold">
                          Lvl {r.hierarchy_level}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {groups.map(group => (
                    <React.Fragment key={group.id}>
                      <tr className="bg-indigo-50/50 dark:bg-indigo-950/20 font-bold text-indigo-900 dark:text-indigo-200">
                        <td colSpan={2 + roles.length} className="p-3 text-xs flex items-center gap-2">
                          <Layers className="w-4 h-4 text-indigo-600" />
                          {group.name} — <span className="font-normal text-slate-500">{group.description}</span>
                        </td>
                      </tr>
                      {group.permissions.map(perm => (
                        <tr key={perm.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="p-3 font-medium text-slate-900 dark:text-slate-100 pl-6">
                            <div>{perm.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{perm.code}</div>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              {perm.action}
                            </span>
                          </td>
                          {roles.map(r => {
                            const isGranted = r.permission_ids.includes(perm.id);
                            const isSuper = r.code === 'super_admin';
                            return (
                              <td key={r.id} className="p-3 text-center">
                                <input
                                  type="checkbox"
                                  checked={isSuper || isGranted}
                                  disabled={isSuper}
                                  onChange={() => togglePermission(r.id, perm.id)}
                                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700 cursor-pointer disabled:opacity-60"
                                />
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ROLE MANAGEMENT DASHBOARD */}
      {activeSubTab === 'roles' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search roles by name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={() => {
                const name = prompt("Enter new role name:");
                if (!name) return;
                const newRole: Role = {
                  id: Date.now(),
                  code: name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
                  name,
                  description: 'Custom created user role',
                  hierarchy_level: 25,
                  is_system: false,
                  is_active: true,
                  data_scope: 'own_records',
                  user_count: 0,
                  permission_ids: [1]
                };
                setRoles(prev => [...prev, newRole]);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" /> Create Custom Role
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.code.includes(searchQuery.toLowerCase())).map(r => (
              <div key={r.id} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-3 relative">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base">{r.name}</h4>
                      {r.is_system && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-full">
                          System Protected
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">{r.code}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    Lvl {r.hierarchy_level}
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 min-h-[32px]">
                  {r.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Assigned Users</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-indigo-500" /> {r.user_count} Users
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Data Scope</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 uppercase text-[11px]">
                      {r.data_scope.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {r.permission_ids.length} Active Capabilities
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => cloneRole(r)}
                      title="Clone/Duplicate Role"
                      className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    {!r.is_system && (
                      <button
                        onClick={() => {
                          if (confirm(`Delete custom role '${r.name}'?`)) {
                            setRoles(prev => prev.filter(x => x.id !== r.id));
                          }
                        }}
                        title="Delete Role"
                        className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DIRECT USER PERMISSION OVERRIDES */}
      {activeSubTab === 'direct_users' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Direct User Permission Override Engine</h3>
                <p className="text-xs text-slate-500">
                  Grant or revoke explicit capabilities directly to individual users without altering their base assigned role.
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 ml-1">Priority Rule: Direct User Override &gt; Role Permission.</span>
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                Override Precedence Active
              </span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center">
                  MB
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{testUser.name}</h4>
                  <div className="text-xs text-slate-500">{testUser.email} — <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{testUser.role}</span></div>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg">
                Switch Target User
              </button>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Capability Overrides for Marcus Brody</h4>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {groups.flatMap(g => g.permissions).map(p => {
                  const overrideState = testUser.directOverrides[p.id];
                  return (
                    <div key={p.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200 text-xs">{p.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{p.code}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setTestUser(prev => ({
                            ...prev,
                            directOverrides: { ...prev.directOverrides, [p.id]: true }
                          }))}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            overrideState === true ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          Explicit Grant
                        </button>
                        <button
                          onClick={() => setTestUser(prev => ({
                            ...prev,
                            directOverrides: { ...prev.directOverrides, [p.id]: false }
                          }))}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            overrideState === false ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          Explicit Deny
                        </button>
                        {overrideState !== undefined && (
                          <button
                            onClick={() => setTestUser(prev => {
                              const next = { ...prev.directOverrides };
                              delete next[p.id];
                              return { ...prev, directOverrides: next };
                            })}
                            className="p-1 text-slate-400 hover:text-slate-600 text-xs"
                            title="Clear Override (Inherit Role)"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOGS */}
      {activeSubTab === 'audit' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-500" /> Security & RBAC Audit History
            </h3>
            <span className="text-xs text-slate-400">Recording all authorization events</span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {auditLogs.map(log => (
              <div key={log.id} className="p-4 flex items-start justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                      {log.action}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{log.user}</span>
                  </div>
                  <p className="text-slate-500">{log.details}</p>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ARCHITECTURE CODE INSPECTOR */}
      {activeSubTab === 'code' && (
        <div className="bg-slate-900 text-slate-200 rounded-2xl p-6 font-mono text-xs space-y-4 border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-indigo-400 font-bold flex items-center gap-2">
              <FileCode2 className="w-4 h-4" /> /modules/rbac/classes/RbacMiddleware.php
            </span>
            <span className="text-slate-500 text-[11px]">PHP 8+ Authorization Middleware</span>
          </div>
          <pre className="overflow-x-auto text-slate-300">
{`<?php
namespace ZFinance\\Rbac;

use PDO;

class RbacMiddleware {
    private RbacManager $rbac;
    private array $userContext;

    public function __construct(PDO $pdo, int $userId) {
        $this->rbac = new RbacManager($pdo);
        $this->userContext = $this->rbac->getUserPermissions($userId);
    }

    // Check specific permission with Super Admin wildcard support
    public function can(string $permissionCode): bool {
        if ($this->userContext['is_super_admin']) return true;
        return isset($this->userContext['permissions'][$permissionCode]) 
               && $this->userContext['permissions'][$permissionCode] === true;
    }

    // Enforce authorization or throw 403 Forbidden
    public function enforce(string $permissionCode): void {
        if (!$this->can($permissionCode)) {
            header('Content-Type: application/json; charset=utf-8');
            http_response_code(403);
            echo json_encode(['error' => 'ACCESS_DENIED', 'required' => $permissionCode]);
            exit;
        }
    }
}`}
          </pre>
        </div>
      )}
    </div>
  );
};
