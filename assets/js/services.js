/**
 * Z-FINANCE 1.0.0 - Service Management System JavaScript Engine
 * Handles offline synchronization, queueing, and AJAX communications.
 */

window.ZFinanceServices = {
    offlineQueueKey: 'zfinance_services_offline_queue',

    isOnline: function() {
        return navigator.onLine;
    },

    enqueueOfflineAction: function(actionType, payload) {
        let queue = JSON.parse(localStorage.getItem(this.offlineQueueKey) || '[]');
        queue.push({
            id: 'sync_' + Date.now(),
            action: actionType,
            payload: payload,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(this.offlineQueueKey, JSON.stringify(queue));
        console.log('[Z-FINANCE] Action queued offline:', actionType);
    },

    getOfflineQueue: function() {
        return JSON.parse(localStorage.getItem(this.offlineQueueKey) || '[]');
    },

    clearOfflineQueue: function() {
        localStorage.removeItem(this.offlineQueueKey);
    },

    syncOfflineQueue: async function() {
        if (!this.isOnline()) return;
        const queue = this.getOfflineQueue();
        if (queue.length === 0) return;

        console.log('[Z-FINANCE] Syncing ' + queue.length + ' queued offline operations...');

        for (const item of queue) {
            try {
                if (item.action === 'save_service') {
                    await fetch('/modules/services/api/services.php?action=save', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(item.payload)
                    });
                }
            } catch (err) {
                console.error('[Z-FINANCE] Failed sync for item:', item.id, err);
            }
        }

        this.clearOfflineQueue();
        console.log('[Z-FINANCE] Offline sync completed successfully.');
    }
};

window.addEventListener('online', function() {
    window.ZFinanceServices.syncOfflineQueue();
});
