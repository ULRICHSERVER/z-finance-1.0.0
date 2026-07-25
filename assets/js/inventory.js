/**
 * Z-FINANCE 1.0.0 - Enterprise Inventory & Offline Sync Helper
 */

class InventoryOfflineSync {
  constructor() {
    this.storageKey = 'zfinance_offline_inventory_adjustments';
  }

  queueAdjustment(adjustment) {
    const queue = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    queue.push({
      ...adjustment,
      id: 'OFFLINE_' + Date.now(),
      queued_at: new Date().toISOString()
    });
    localStorage.setItem(this.storageKey, JSON.stringify(queue));
    console.log('Inventory adjustment queued offline:', adjustment);
  }

  getQueuedAdjustments() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  clearQueue() {
    localStorage.removeItem(this.storageKey);
  }
}

window.inventorySync = new InventoryOfflineSync();
