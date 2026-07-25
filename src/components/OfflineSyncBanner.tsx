import React from 'react';
import { WifiOff, Database, RefreshCw } from 'lucide-react';

interface OfflineSyncBannerProps {
  isOffline: boolean;
  offlineCount: number;
  onSync: () => void;
}

export const OfflineSyncBanner: React.FC<OfflineSyncBannerProps> = ({
  isOffline,
  offlineCount,
  onSync
}) => {
  if (!isOffline && offlineCount === 0) return null;

  return (
    <div className={`p-3 rounded-2xl border shadow-sm text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
      isOffline 
        ? 'bg-amber-50 text-amber-900 border-amber-200' 
        : 'bg-blue-50 text-blue-900 border-blue-200'
    }`}>
      <div className="flex items-center space-x-2.5">
        <div className={`p-1.5 rounded-lg ${isOffline ? 'bg-amber-200 text-amber-800' : 'bg-blue-200 text-blue-800'}`}>
          {isOffline ? <WifiOff className="w-4 h-4" /> : <Database className="w-4 h-4" />}
        </div>
        <div>
          <span className="font-bold">
            {isOffline ? 'Offline Mode Active' : 'Cached Offline Transactions Ready'}
          </span>
          <p className="text-[11px] opacity-80">
            {isOffline 
              ? 'New income entries will be cached safely in browser storage and auto-synced upon reconnect.' 
              : `${offlineCount} local transaction(s) queued for server synchronization.`}
          </p>
        </div>
      </div>

      {offlineCount > 0 && (
        <button
          onClick={onSync}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-sm flex items-center space-x-1.5 shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          <span>Synchronize Now ({offlineCount})</span>
        </button>
      )}
    </div>
  );
};
