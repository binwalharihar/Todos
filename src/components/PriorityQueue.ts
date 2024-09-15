// PriorityQueue.ts
export const getPriorityOrder = (priority: string) => {
  switch (priority) {
    case 'High':
      return 3;
    case 'Medium':
      return 2;
    case 'Low':
      return 1;
    default:
      return 0;
  }
};

// Function to sort tasks based on priority
export const sortByPriority = (todos: any[]) => {
  return todos.sort((a, b) => getPriorityOrder(b.priority) - getPriorityOrder(a.priority));
};
