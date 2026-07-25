/**
 * Z-FINANCE 1.0.0 - Billing & Digital Signatures Offline Engine
 * Handles offline document draft queueing, offline signature captures, and reconnection auto-sync.
 */

const ZFINANCE_BILLING_QUEUE_KEY = 'zfinance_billing_offline_queue';

class ZFinanceBillingOfflineEngine {
    constructor() {
        this.queue = this.loadQueue();
        this.isOnline = navigator.onLine;
        this.initListeners();
    }

    loadQueue() {
        try {
            const saved = localStorage.getItem(ZFINANCE_BILLING_QUEUE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    saveQueue() {
        localStorage.setItem(ZFINANCE_BILLING_QUEUE_KEY, JSON.stringify(this.queue));
    }

    enqueueDocument(docType, endpoint, payload) {
        const item = {
            id: 'temp_doc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            docType: docType,
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
            console.log('[Z-FINANCE Billing Engine] Connection restored. Synchronizing queued documents & signatures...');
            this.syncQueue();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.warn('[Z-FINANCE Billing Engine] Offline mode active. Documents will be queued locally.');
        });
    }

    async syncQueue() {
        if (this.queue.length === 0) return;

        console.log(`[Z-FINANCE Billing Engine] Syncing ${this.queue.length} offline documents...`);
        const remaining = [];

        for (const item of this.queue) {
            try {
                const response = await fetch(item.endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item.payload)
                });

                if (response && response.ok) {
                    console.log(`[Z-FINANCE Billing Engine] Document ${item.id} posted successfully.`);
                } else {
                    remaining.push(item);
                }
            } catch (err) {
                console.error(`[Z-FINANCE Billing Engine] Sync error for ${item.id}:`, err);
                remaining.push(item);
            }
        }

        this.queue = remaining;
        this.saveQueue();
    }
}

window.zfinanceBillingOffline = new ZFinanceBillingOfflineEngine();
