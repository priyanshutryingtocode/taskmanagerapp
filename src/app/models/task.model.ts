export type TaskCategory = 'Work' | 'Personal' | 'Urgent';

export type TodoItem = {
  id: number;
  title: string;
  category: TaskCategory;
  completed: boolean;
};