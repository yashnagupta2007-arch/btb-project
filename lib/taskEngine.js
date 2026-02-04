// lib/taskEngine.js

// 🔹 Calculate readiness percentage
export function calculateReadiness(tasks) {
  const total = tasks.length;
  if (total === 0) return 0;

  let completed = 0;
  let inProgress = 0;

  tasks.forEach(task => {
    if (task.status === "completed") completed++;
    if (task.status === "in-progress") inProgress++;
  });

  return Math.round(((completed + 0.5 * inProgress) / total) * 100);
}

// 🔓 Unlock next task after completion
export function unlockNextTask(tasks, completedTaskId) {
  const index = tasks.findIndex(t => t.id === completedTaskId);

  if (index === -1) return tasks;

  // Mark current task as completed
  tasks[index].status = "completed";

  // Unlock next task if exists
  if (tasks[index + 1] && tasks[index + 1].status === "locked") {
    tasks[index + 1].status = "in-progress";
  }

  return tasks;
}
