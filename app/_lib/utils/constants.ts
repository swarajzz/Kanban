export const placeholders: string[] = [
  "Make coffee",
  "Drink coffee & smile",
  "Write down a creative idea",
  "Organize your workspace",
  "Go for a short jog",
  "Practice a new recipe",
  "Create a vision board",
  "Review meeting notes",
  "Respond to emails",
  "Declutter your desk",
  "Watch an inspiring TED talk",
  "Take a 5-minute stretch break",
  "Read an article from a favorite blog",
  "Write a thank-you note",
  "Try a new meditation technique",
  "Sketch out your next project",
  "Plan a mini self-care day",
  "Attend a virtual workshop",
  "Check off a long-standing item from your to-do list",
  "Prepare a healthy snack",
  "Listen to a podcast episode",
  "Spend 10 minutes journaling",
  "Practice a new language",
  "Send a motivational message to a friend",
  "Explore a new hobby (like painting or knitting)",
  "Set a timer and clean for 15 minutes",
  "Make a list of goals for the month",
  "Connect with an old friend over video chat",
  "Create a playlist for motivation",
  "Reflect on the week and set intentions for the next",
];

export const columnPlaceholders: string[] = [
  "Backlog",
  "In Review",
  "Blocked",
  "On Hold",
  "In Progress",
  "Ready for Testing",
  "Waiting on Feedback",
  "Scheduled",
  "Ideas",
  "To Discuss",
  "Next Up",
  "Sprint Goals",
  "Follow-Up",
  "Under Review",
];

export const defaultSubtasks = [
  { id: crypto.randomUUID(), title: "", placeholder: "Make Coffee" },
  { id: crypto.randomUUID(), title: "", placeholder: "Drink coffee & smile" },
];

export const defaultColumns = [
  { id: crypto.randomUUID(), title: "", placeholder: "Todo" },
  { id: crypto.randomUUID(), title: "", placeholder: "Doing" },
  { id: crypto.randomUUID(), title: "", placeholder: "Done" },
];

export function getRandomPlaceholder() {
  const randomIndex = Math.floor(Math.random() * placeholders.length);
  return placeholders[randomIndex];
}

export function getRandomPlaceholderColumn(usedColumnPlaceholders: string[]) {
  const availablePlaceholders = columnPlaceholders.filter(
    (placeholder) => !usedColumnPlaceholders.includes(placeholder),
  );

  const newPlaceholder =
    availablePlaceholders[
      Math.floor(Math.random() * availablePlaceholders.length)
    ];

  return newPlaceholder;
}
