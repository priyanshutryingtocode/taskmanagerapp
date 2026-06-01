export type TaskCategory = 'Work' | 'Personal' | 'Urgent';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export type TodoItem = {
  id: number;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  completed: boolean;
  dueDate?: string;
};
