/**
 * Z-FINANCE 1.0.0 - Employee & Organization JS Engine
 */

const ZFINANCE_EMPLOYEES_OFFLINE_CACHE_KEY = 'zfinance_employees_offline_cache';

class ZFinanceEmployeeEngine {
    static cacheEmployeesLocally(employeesList) {
        localStorage.setItem(ZFINANCE_EMPLOYEES_OFFLINE_CACHE_KEY, JSON.stringify(employeesList));
        console.log('[Z-FINANCE Employees] Directory cached locally for offline viewing.');
    }

    static getOfflineDirectory() {
        return JSON.parse(localStorage.getItem(ZFINANCE_EMPLOYEES_OFFLINE_CACHE_KEY) || '[]');
    }
}

window.zfinanceEmployees = ZFinanceEmployeeEngine;
