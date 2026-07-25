import React from 'react';
import { Megaphone, ExternalLink, ShieldCheck, Star } from 'lucide-react';
import { UserRole } from '../types';

interface AdSuiteWidgetProps {
  userRole: UserRole;
  currentModule: string;
}

export const AdSuiteWidget: React.FC<AdSuiteWidgetProps> = ({ userRole, currentModule }) => {
  return (
    <div className="bg-indigo-900 rounded-xl p-5 sm:p-6 text-white relative overflow-hidden my-4 border border-indigo-800 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 bg-white/10 rounded-lg shrink-0">
            <Megaphone className="w-5 h-5 text-indigo-200" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-white/90 font-bold uppercase tracking-wider">
                Sponsored Ad
              </span>
              <span className="text-[10px] bg-indigo-800/80 text-indigo-200 px-2 py-0.5 rounded font-mono">
                Target: {userRole}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-1">
              Upgrade to Z-FINANCE Corporate POS & Automated Tax Filing Suite
            </h4>
            <p className="text-xs text-indigo-200 mt-0.5 max-w-2xl">
              Seamlessly handle OHADA compliance, automated VAT/TVA calculations, and direct bank reconciliation for Central & West Africa.
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('Redirecting to Z-FINANCE Corporate POS & Tax Suite...')}
          className="bg-white text-indigo-900 hover:bg-indigo-50 font-extrabold text-xs px-4 py-2.5 rounded-lg shadow-md shrink-0 flex items-center justify-center space-x-1.5 transition"
        >
          <span>Explore Corporate Suite</span>
          <ExternalLink className="w-3.5 h-3.5 text-indigo-900" />
        </button>
      </div>
    </div>
  );
};
