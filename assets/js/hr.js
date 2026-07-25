/**
 * Z-FINANCE 1.0.0 - HRMS Offline Attendance & Leave Sync Manager
 */

class HROfflineManager {
  constructor() {
    this.storageKey = 'zfinance_offline_attendance';
  }

  queueAttendanceCheckIn(employeeId, method = 'qr_code') {
    const queue = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    queue.push({
      employee_id: employeeId,
      method: method,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(this.storageKey, JSON.stringify(queue));
    console.log('Attendance queued offline for employee:', employeeId);
  }

  getQueuedAttendance() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  clearQueue() {
    localStorage.removeItem(this.storageKey);
  }
}

window.hrOffline = new HROfflineManager();
