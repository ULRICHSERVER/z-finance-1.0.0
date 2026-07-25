/**
 * Z-FINANCE 1.0.0 - Income Management Offline & Sync Engine
 * Handles offline transaction queuing, local caching, and auto-sync on reconnect.
 */

const ZFINANCE_INCOME_QUEUE_KEY = 'zfinance_income_offline_queue';

class ZFinanceIncomeOfflineEngine {
    constructor() {
        this.queue = this.loadQueue();
        this.isOnline = navigator.onLine;
        this.initListeners();
    }

    loadQueue() {
        try {
            const saved = localStorage.getItem(ZFINANCE_INCOME_QUEUE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    saveQueue() {
        localStorage.setItem(ZFINANCE_INCOME_QUEUE_KEY, JSON.stringify(this.queue));
    }

    enqueue(action, payload) {
        const item = {
            id: 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            action: action, // 'create', 'update', 'delete'
            payload: payload,
            timestamp: new Date().toISOString()
        };
        this.queue.push(item);
        this.saveQueue();
        if (this.isOnline) {
            this.syncQueue();
        }
        return item;
    }

    initListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            console.log('[Z-FINANCE Income] Online connection restored. Triggering sync...');
            this.syncQueue();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.warn('[Z-FINANCE Income] Working offline. Income changes queued locally.');
        });
    }

    async syncQueue() {
        if (this.queue.length === 0) return;

        console.log(`[Z-FINANCE Income] Syncing ${this.queue.length} offline transactions...`);
        const remaining = [];

        for (const item of this.queue) {
            try {
                let response;
                if (item.action === 'create') {
                    response = await fetch('/modules/income/api/income.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(item.payload)
                    });
                } else if (item.action === 'update') {
                    response = await fetch('/modules/income/api/income.php', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(item.payload)
                    });
                } else if (item.action === 'delete') {
                    response = await fetch('/modules/income/api/income.php', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: item.payload.id })
                    });
                }

                if (response && response.ok) {
                    console.log(`[Z-FINANCE Income] Item ${item.id} synced successfully.`);
                } else {
                    remaining.push(item);
                }
            } catch (err) {
                console.error(`[Z-FINANCE Income] Error syncing item ${item.id}:`, err);
                remaining.push(item);
            }
        }

        this.queue = remaining;
        this.saveQueue();
    }
}

window.zfinanceIncomeOffline = new ZFinanceIncomeOfflineEngine();
