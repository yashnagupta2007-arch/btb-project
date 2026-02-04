const skillOrder = ["logic", "problem_solving", "debugging"];

export function unlockNextSkill(user) {
  const currentIndex = skillOrder.indexOf(user.currentSkill);

  if (currentIndex < skillOrder.length - 1) {
    user.currentSkill = skillOrder[currentIndex + 1];
  }
}
