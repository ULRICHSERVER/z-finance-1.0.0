/**
 * Z-FINANCE 1.0.0 - Double-Entry Accounting Offline Engine
 * Handles offline journal drafting, double-entry validation, and reconnection queue synchronization.
 */

const ZFINANCE_ACCOUNTING_QUEUE_KEY = 'zfinance_accounting_offline_queue';

class ZFinanceAccountingOfflineEngine {
    constructor() {
        this.queue = this.loadQueue();
        this.isOnline = navigator.onLine;
        this.initListeners();
    }

    loadQueue() {
        try {
            const saved = localStorage.getItem(ZFINANCE_ACCOUNTING_QUEUE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    saveQueue() {
        localStorage.setItem(ZFINANCE_ACCOUNTING_QUEUE_KEY, JSON.stringify(this.queue));
    }

    enqueueJournal(payload) {
        // Local balance check
        let debitSum = 0;
        let creditSum = 0;
        (payload.lines || []).forEach(line => {
            debitSum += Number(line.debit || 0);
            creditSum += Number(line.credit || 0);
        });

        if (Math.round(debitSum * 100) !== Math.round(creditSum * 100)) {
            throw new Error(`Double-entry unbalanced: Debits ($${debitSum}) != Credits ($${creditSum})`);
        }

        const item = {
            id: 'temp_jrn_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            endpoint: '/modules/accounting/api/journals.php',
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
            console.log('[Z-FINANCE Accounting Engine] Connection restored. Synchronizing journal drafts...');
            this.syncQueue();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.warn('[Z-FINANCE Accounting Engine] Offline mode active. Draft journals will be queued locally.');
        });
    }

    async syncQueue() {
        if (this.queue.length === 0) return;

        console.log(`[Z-FINANCE Accounting Engine] Synchronizing ${this.queue.length} journal drafts...`);
        const remaining = [];

        for (const item of this.queue) {
            try {
                const response = await fetch(item.endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item.payload)
                });

                if (response && response.ok) {
                    console.log(`[Z-FINANCE Accounting Engine] Journal ${item.id} posted successfully.`);
                } else {
                    remaining.push(item);
                }
            } catch (err) {
                console.error(`[Z-FINANCE Accounting Engine] Error syncing journal ${item.id}:`, err);
                remaining.push(item);
            }
        }

        this.queue = remaining;
        this.saveQueue();
    }
}

window.zfinanceAccountingOffline = new ZFinanceAccountingOfflineEngine();
