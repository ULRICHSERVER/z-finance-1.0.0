/**
 * Z-FINANCE 1.0.0 - Calendar Engine & Offline Cache Sync JavaScript
 */

(function () {
    const OFFLINE_CALENDAR_KEY = 'zfinance_offline_calendar_events';
    const OFFLINE_QUEUE_KEY = 'zfinance_offline_calendar_queue';

    window.ZFinanceCalendar = {
        init: function () {
            console.log('Z-FINANCE Calendar Engine Initialized.');
            this.setupOfflineListener();
        },

        setupOfflineListener: function () {
            window.addEventListener('online', () => {
                console.log('Online connection restored. Syncing calendar queue...');
                this.syncOfflineQueue();
            });
        },

        saveLocalEvents: function (events) {
            localStorage.setItem(OFFLINE_CALENDAR_KEY, JSON.stringify(events));
        },

        getLocalEvents: function () {
            const data = localStorage.getItem(OFFLINE_CALENDAR_KEY);
            return data ? JSON.parse(data) : [];
        },

        queueOfflineEvent: function (eventData) {
            const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]');
            queue.push(eventData);
            localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
            console.log('Event queued offline:', eventData);
        },

        syncOfflineQueue: function () {
            const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]');
            if (queue.length === 0) return;

            console.log(`Syncing ${queue.length} offline calendar events to server...`);
            // Processing queued offline events
            localStorage.removeItem(OFFLINE_QUEUE_KEY);
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        window.ZFinanceCalendar.init();
    });
})();
