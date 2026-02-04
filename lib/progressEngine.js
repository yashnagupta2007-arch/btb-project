// lib/progressEngine.js

export function calculateReadiness(tasks) {
  const total = tasks.length;

  if (total === 0) return 0;

  let completed = 0;
  let inProgress = 0;

  tasks.forEach(task => {
    if (task.status === "completed") completed++;
    if (task.status === "in-progress") inProgress++;
  });

  // weight logic
  const score =
    (completed * 1 + inProgress * 0.5) / total;

  return Math.round(score * 100);
}
