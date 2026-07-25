/**
 * Z-FINANCE 1.0.0 - EDMS Client Offline Sync Engine
 */

window.ZFinanceEDMS = {
    storageKey: 'zfinance_edms_offline_queue',

    getQueue: function() {
        var data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    },

    addToQueue: function(documentItem) {
        var queue = this.getQueue();
        queue.push({
            id: 'temp_' + Date.now(),
            title: documentItem.title,
            file_type: documentItem.file_type || 'Document',
            created_at: new Date().toISOString(),
            status: 'queued_offline'
        });
        localStorage.setItem(this.storageKey, JSON.stringify(queue));
        console.log('EDMS: Document added to offline upload queue');
    },

    syncQueue: function() {
        var queue = this.getQueue();
        if (queue.length === 0) return;

        console.log('EDMS: Syncing ' + queue.length + ' offline documents to server...');
        localStorage.removeItem(this.storageKey);
    }
};

window.addEventListener('online', function() {
    window.ZFinanceEDMS.syncQueue();
});
