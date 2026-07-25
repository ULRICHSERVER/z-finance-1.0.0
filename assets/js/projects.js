/**
 * Z-FINANCE 1.0.0 - Project Management & Offline Cache Manager
 */

const ZFINANCE_PROJECTS_CACHE_KEY = 'zfinance_projects_offline_cache';

class ZFinanceProjectEngine {
    static calculateProfitability(revenue, cost) {
        const rev = parseFloat(revenue) || 0;
        const cst = parseFloat(cost) || 0;
        const profit = rev - cst;
        const margin = rev > 0 ? ((profit / rev) * 100).toFixed(2) : 0;
        return { profit, margin };
    }

    static cacheProjectOffline(projectData) {
        try {
            const current = JSON.parse(localStorage.getItem(ZFINANCE_PROJECTS_CACHE_KEY) || '[]');
            current.push({ ...projectData, synced: false, cachedAt: new Date().toISOString() });
            localStorage.setItem(ZFINANCE_PROJECTS_CACHE_KEY, JSON.stringify(current));
            return true;
        } catch (e) {
            return false;
        }
    }
}

window.zfinanceProjects = ZFinanceProjectEngine;
