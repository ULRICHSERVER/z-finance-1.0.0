/**
 * Z-FINANCE 1.0.0 - Task Timer & Productivity Tracking
 */

class ZFinanceTaskTimer {
    constructor() {
        this.activeTimer = null;
        this.startTime = null;
    }

    startTimer(taskId, taskTitle) {
        this.activeTimer = taskId;
        this.startTime = new Date();
        console.log(`[Timer Started] Task #${taskId}: ${taskTitle}`);
    }

    stopTimer() {
        if (!this.startTime) return null;
        const endTime = new Date();
        const durationMinutes = Math.round((endTime - this.startTime) / 60000);
        const log = {
            taskId: this.activeTimer,
            startTime: this.startTime.toISOString(),
            endTime: endTime.toISOString(),
            durationMinutes
        };
        this.activeTimer = null;
        this.startTime = null;
        return log;
    }
}

window.zfinanceTaskTimer = new ZFinanceTaskTimer();
