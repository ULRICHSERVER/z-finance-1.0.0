/**
 * Z-FINANCE 1.0.0 - Customer Management Engine & Offline Synchronization
 */

window.ZFinanceCRM = {
    offlineKey: 'zfinance_customers_offline_queue',

    init: function() {
        window.addEventListener('online', this.syncOfflineQueue.bind(this));
    },

    getQueue: function() {
        return JSON.parse(localStorage.getItem(this.offlineKey) || '[]');
    },

    addToQueue: function(action, payload) {
        const queue = this.getQueue();
        queue.push({ action, payload, timestamp: new Date().toISOString() });
        localStorage.setItem(this.offlineKey, JSON.stringify(queue));
    },

    syncOfflineQueue: async function() {
        const queue = this.getQueue();
        if (queue.length === 0) return;

        console.log('Z-FINANCE CRM: Syncing offline items...', queue.length);

        const remainingQueue = [];

        for (const item of queue) {
            try {
                const response = await fetch('/modules/customers/api/customers.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item.payload)
                });
                if (!response.ok) {
                    remainingQueue.push(item);
                }
            } catch (err) {
                remainingQueue.push(item);
            }
        }

        localStorage.setItem(this.offlineKey, JSON.stringify(remainingQueue));
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.ZFinanceCRM.init();
});
