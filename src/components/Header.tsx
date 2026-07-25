import React from 'react';
import { 
  Wallet2, 
  Wifi, 
  WifiOff, 
  ShieldCheck, 
  UserCheck, 
  PlusCircle, 
  DollarSign, 
  Layers,
  Database
} from 'lucide-react';
import { CurrencyCode, UserRole } from '../types';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  selectedCurrency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  offlineQueueCount: number;
  onSyncOffline: () => void;
  onOpenAddModal: () => void;
  onOpenPhpInspector: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  selectedCurrency,
  onCurrencyChange,
  isOffline,
  onToggleOffline,
  offlineQueueCount,
  onSyncOffline,
  onOpenAddModal,
  onOpenPhpInspector
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Module Badge */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
              <Wallet2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
                  Z-FINANCE <span className="text-xs text-indigo-600 font-mono font-bold bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">1.0.0</span>
                </span>
                <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded-full font-medium border border-slate-200 hidden sm:inline-block">
                  Income Module
                </span>
              </div>
            </div>
          </div>

          {/* Controls & Tools Bar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Currency Selector */}
            <div className="flex items-center bg-slate-50 rounded-lg px-2.5 py-1.5 border border-slate-200 text-xs">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600 mr-1" />
              <select
                value={selectedCurrency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                className="bg-transparent font-semibold text-slate-700 focus:outline-none cursor-pointer pr-1"
                title="Select Base View Currency"
              >
                <option value="XAF">XAF (FCFA)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="NGN">NGN (₦)</option>
              </select>
            </div>

            {/* Offline Mode Switcher & Sync Button */}
            <div className="flex items-center space-x-1">
              <button
                onClick={onToggleOffline}
                className={`flex items-center space-x-1.5 text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                  isOffline
                    ? 'bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
                title={isOffline ? 'Switch to Online Mode' : 'Simulate Offline Mode'}
              >
                {isOffline ? (
                  <>
                    <WifiOff className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                    <span>Offline</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline">Online</span>
                  </>
                )}
              </button>

              {offlineQueueCount > 0 && (
                <button
                  onClick={onSyncOffline}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-2.5 py-1.5 rounded-lg font-semibold flex items-center space-x-1 shadow-sm"
                  title="Sync cached offline records now"
                >
                  <Database className="w-3 h-3" />
                  <span>Sync ({offlineQueueCount})</span>
                </button>
              )}
            </div>

            {/* Role Switcher */}
            <div className="hidden lg:flex items-center bg-slate-50 rounded-lg px-2.5 py-1.5 border border-slate-200 text-xs">
              <UserCheck className="w-3.5 h-3.5 text-indigo-600 mr-1" />
              <select
                value={currentRole}
                onChange={(e) => onRoleChange(e.target.value as UserRole)}
                className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer pr-1"
                title="Current User Role"
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Manager">Manager</option>
                <option value="Accountant">Accountant</option>
                <option value="Standard User">Standard User</option>
              </select>
            </div>

            {/* PHP Core Code Inspector Button */}
            <button
              onClick={onOpenPhpInspector}
              className="hidden sm:flex items-center space-x-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-xs px-3 py-1.5 rounded-lg border border-slate-200 transition"
              title="View & Export PHP Core Files & MySQL Schema"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>PHP Core</span>
            </button>

            {/* Quick Add Income Entry CTA */}
            <button
              onClick={onOpenAddModal}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-lg shadow-sm flex items-center space-x-1.5 transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Income</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
