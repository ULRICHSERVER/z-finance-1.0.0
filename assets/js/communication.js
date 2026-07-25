/**
 * Z-FINANCE 1.0.0 - Communication, Messaging & Offline Queue Engine
 */

const ZFINANCE_MESSAGES_OFFLINE_QUEUE_KEY = 'zfinance_messages_offline_queue';

class ZFinanceCommunicationEngine {
    static sendOrQueueMessage(conversationId, text, type = 'text') {
        const payload = {
            conversationId,
            text,
            type,
            timestamp: new Date().toISOString()
        };

        if (navigator.onLine) {
            console.log('[Z-FINANCE Comms] Sending message live...', payload);
            return true;
        } else {
            console.log('[Z-FINANCE Comms] Offline. Queueing message locally...');
            const queue = JSON.parse(localStorage.getItem(ZFINANCE_MESSAGES_OFFLINE_QUEUE_KEY) || '[]');
            queue.push(payload);
            localStorage.setItem(ZFINANCE_MESSAGES_OFFLINE_QUEUE_KEY, JSON.stringify(queue));
            return false;
        }
    }

    static syncOfflineMessages() {
        const queue = JSON.parse(localStorage.getItem(ZFINANCE_MESSAGES_OFFLINE_QUEUE_KEY) || '[]');
        if (queue.length === 0) return;

        console.log(`[Z-FINANCE Comms] Syncing ${queue.length} offline messages...`);
        localStorage.removeItem(ZFINANCE_MESSAGES_OFFLINE_QUEUE_KEY);
    }
}

window.addEventListener('online', () => {
    ZFinanceCommunicationEngine.syncOfflineMessages();
});

window.zfinanceComms = ZFinanceCommunicationEngine;
