/**
 * Z-FINANCE 1.0.0 - Enterprise Procurement & Offline Purchase Request Sync
 */

class ProcurementOfflineSync {
  constructor() {
    this.storageKey = 'zfinance_offline_purchase_requests';
  }

  queuePurchaseRequest(request) {
    const queue = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    queue.push({
      ...request,
      id: 'OFFLINE_PR_' + Date.now(),
      queued_at: new Date().toISOString()
    });
    localStorage.setItem(this.storageKey, JSON.stringify(queue));
    console.log('Purchase request queued offline:', request);
  }

  getQueuedRequests() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  clearQueue() {
    localStorage.removeItem(this.storageKey);
  }
}

window.procurementSync = new ProcurementOfflineSync();
