import { users } from "./userState";

export function createUser(userId) {
  users[userId] = {
    currentSkill: "logic",
    skillProgress: {
      logic: 0,
      problem_solving: 0,
      debugging: 0,
    },
    completedSkills: [],
  };
}
