/**
 * Z-FINANCE 1.0.0 - Budget & Financial Goals Offline Engine
 * Handles offline budget queueing, goal contributions, and automatic reconnection synchronization.
 */

const ZFINANCE_BUDGET_QUEUE_KEY = 'zfinance_budgets_offline_queue';

class ZFinanceBudgetOfflineEngine {
    constructor() {
        this.queue = this.loadQueue();
        this.isOnline = navigator.onLine;
        this.initListeners();
    }

    loadQueue() {
        try {
            const saved = localStorage.getItem(ZFINANCE_BUDGET_QUEUE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    saveQueue() {
        localStorage.setItem(ZFINANCE_BUDGET_QUEUE_KEY, JSON.stringify(this.queue));
    }

    enqueue(action, endpoint, payload) {
        const item = {
            id: 'temp_bdg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            action: action, // 'create_budget', 'update_budget', 'contribute_goal', 'savings_tx'
            endpoint: endpoint,
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
            console.log('[Z-FINANCE Budget Engine] Re-established connection. Triggering auto-sync...');
            this.syncQueue();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.warn('[Z-FINANCE Budget Engine] Offline mode active. Budget operations will be queued locally.');
        });
    }

    async syncQueue() {
        if (this.queue.length === 0) return;

        console.log(`[Z-FINANCE Budget Engine] Synchronizing ${this.queue.length} offline budget items...`);
        const remaining = [];

        for (const item of this.queue) {
            try {
                const response = await fetch(item.endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item.payload)
                });

                if (response && response.ok) {
                    console.log(`[Z-FINANCE Budget Engine] Item ${item.id} synchronized successfully.`);
                } else {
                    remaining.push(item);
                }
            } catch (err) {
                console.error(`[Z-FINANCE Budget Engine] Error syncing item ${item.id}:`, err);
                remaining.push(item);
            }
        }

        this.queue = remaining;
        this.saveQueue();
    }
}

window.zfinanceBudgetOffline = new ZFinanceBudgetOfflineEngine();
