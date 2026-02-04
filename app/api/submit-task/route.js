import { evaluateTask } from "@/lib/evaluateTask";
import {
  calculateReadiness,
  unlockNextTask,
} from "@/lib/taskEngine";
import { domainTasks } from "@/lib/domainLogic";

export async function POST(req) {
  try {
    const body = await req.json();
    const { taskPrompt, answer, taskId } = body;

    if (!taskPrompt || !answer || !taskId) {
      return Response.json(
        { success: false, message: "Missing input" },
        { status: 400 }
      );
    }

    const evaluation = await evaluateTask(taskPrompt, answer);

    // Unlock logic
    unlockNextTask(domainTasks, taskId);

    const readiness = calculateReadiness(domainTasks);

    return Response.json({
      success: true,
      evaluation,
      readiness,
      tasks: domainTasks,
    });
  } catch (error) {
    console.error("API ERROR:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
