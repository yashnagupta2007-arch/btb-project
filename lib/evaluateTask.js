// lib/evaluateTask.js

export async function evaluateTask(taskPrompt, userAnswer) {
  let score = 50;

  if (userAnswer.length > 40) score += 10;
  if (userAnswer.toLowerCase().includes("step")) score += 10;
  if (userAnswer.toLowerCase().includes("understand")) score += 10;
  if (userAnswer.toLowerCase().includes("divide")) score += 10;

  if (score > 100) score = 100;

  return {
    score,
    strengths: ["Structured thinking", "Logical approach"],
    weaknesses: ["Needs clearer explanation"],
    overall_feedback:
      "Good attempt. Try to explain your steps more clearly.",
  };
}

