/**
 * Z-FINANCE 1.0.0 - Financial Reports & Custom Builder Engine
 * Client-side report compilation, PDF/Excel export triggers, and offline report caching.
 */

const ZFINANCE_REPORT_CACHE_KEY = 'zfinance_report_snapshots_cache';

class ZFinanceReportsEngine {
    constructor() {
        this.cache = this.loadCache();
    }

    loadCache() {
        try {
            const saved = localStorage.getItem(ZFINANCE_REPORT_CACHE_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            return {};
        }
    }

    saveCache() {
        localStorage.setItem(ZFINANCE_REPORT_CACHE_KEY, JSON.stringify(this.cache));
    }

    cacheReportSnapshot(type, data) {
        this.cache[type] = {
            timestamp: new Date().toISOString(),
            data: data
        };
        this.saveCache();
    }

    getCachedReport(type) {
        return this.cache[type] ? this.cache[type].data : null;
    }

    exportToCSV(reportName, rows) {
        if (!rows || !rows.length) return;
        const keys = Object.keys(rows[0]);
        let csvContent = "data:text/csv;charset=utf-8," + keys.join(",") + "\n";

        rows.forEach(row => {
            let rowValues = keys.map(k => `"${row[k]}"`);
            csvContent += rowValues.join(",") + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${reportName}_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

window.zfinanceReports = new ZFinanceReportsEngine();
