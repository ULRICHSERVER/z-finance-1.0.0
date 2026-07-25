/**
 * Z-FINANCE 1.0.0 - User Management System Client Script
 * Provides AJAX table rendering, bulk select toggles, offline user caching,
 * impersonation state handling, and CSV export utilities.
 */

window.ZFinanceUsers = {
    cacheKey: 'zfinance_cached_users_list',

    init: function() {
        console.log("Z-FINANCE User Management Engine Initialized.");
    },

    saveOfflineCache: function(usersData) {
        try {
            localStorage.setItem(this.cacheKey, JSON.stringify({
                timestamp: new Date().toISOString(),
                data: usersData
            }));
        } catch (e) {
            console.warn("Unable to save offline user cache:", e);
        }
    },

    getOfflineCache: function() {
        try {
            const raw = localStorage.getItem(this.cacheKey);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    },

    parseCsvText: function(text) {
        const lines = text.split("\n");
        return lines.map(line => line.split(",").map(cell => cell.trim().replace(/^"|"$/g, '')));
    }
};

document.addEventListener('DOMContentLoaded', function() {
    window.ZFinanceUsers.init();
});
