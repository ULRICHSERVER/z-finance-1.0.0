/**
 * Z-FINANCE 1.0.0 - Financial Analytics & Charting Helpers
 * Utilities for rendering financial trends, KPI sparklines, and AI forecast charts.
 */

class ZFinanceAnalyticsEngine {
    static calculateMargin(income, expenses) {
        if (!income || income === 0) return 0;
        return (((income - expenses) / income) * 100).toFixed(2);
    }

    static calculateGrowth(current, previous) {
        if (!previous || previous === 0) return 0;
        return (((current - previous) / previous) * 100).toFixed(2);
    }

    static formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
    }
}

window.zfinanceAnalytics = ZFinanceAnalyticsEngine;
