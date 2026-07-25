/**
 * Z-FINANCE 1.0.0 - Expense Management Offline & Sync Engine
 * Handles offline transaction queuing, local caching, and auto-sync on reconnect.
 */

const ZFINANCE_EXPENSE_QUEUE_KEY = 'zfinance_expense_offline_queue';

class ZFinanceExpenseOfflineEngine {
    constructor() {
        this.queue = this.loadQueue();
        this.isOnline = navigator.onLine;
        this.initListeners();
    }

    loadQueue() {
        try {
            const saved = localStorage.getItem(ZFINANCE_EXPENSE_QUEUE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    saveQueue() {
        localStorage.setItem(ZFINANCE_EXPENSE_QUEUE_KEY, JSON.stringify(this.queue));
    }

    enqueue(action, payload) {
        const item = {
            id: 'temp_exp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            action: action, // 'create', 'update', 'delete', 'approve'
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
            console.log('[Z-FINANCE Expense] Online connection restored. Triggering sync...');
            this.syncQueue();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.warn('[Z-FINANCE Expense] Working offline. Expense changes queued locally.');
        });
    }

    async syncQueue() {
        if (this.queue.length === 0) return;

        console.log(`[Z-FINANCE Expense] Syncing ${this.queue.length} offline expense transactions...`);
        const remaining = [];

        for (const item of this.queue) {
            try {
                let response;
                if (item.action === 'create') {
                    response = await fetch('/modules/expenses/api/expenses.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(item.payload)
                    });
                } else if (item.action === 'update') {
                    response = await fetch('/modules/expenses/api/expenses.php', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(item.payload)
                    });
                } else if (item.action === 'delete') {
                    response = await fetch('/modules/expenses/api/expenses.php', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: item.payload.id })
                    });
                } else if (item.action === 'approve') {
                    response = await fetch('/modules/expenses/api/approvals.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(item.payload)
                    });
                }

                if (response && response.ok) {
                    console.log(`[Z-FINANCE Expense] Item ${item.id} synced successfully.`);
                } else {
                    remaining.push(item);
                }
            } catch (err) {
                console.error(`[Z-FINANCE Expense] Error syncing item ${item.id}:`, err);
                remaining.push(item);
            }
        }

        this.queue = remaining;
        this.saveQueue();
    }
}

window.zfinanceExpenseOffline = new ZFinanceExpenseOfflineEngine();
