import { Injectable } from '@angular/core';
import { TodoItem, TaskCategory, TaskPriority } from '../models/task.model';

@Injectable({
  providedIn: 'root' 
})

export class TaskService {

  private readonly storageKey = 'smart-task-manager-tasks';
  private tasks: TodoItem[] = this.loadTasks();

  getTasks(): TodoItem[] {
    return this.tasks;
  }

  addTask(title: string, category: TaskCategory, priority: TaskPriority, dueDate?: string) 
  {
    if (title.trim() === '') return;

    const newTask: TodoItem = 
    {
      id: Date.now(),
      title: title.trim(),
      category: category,
      priority: priority,
      dueDate: dueDate || undefined,
      completed: false
    };
    this.tasks.push(newTask);
    this.saveTasks();
  }

  updateTask(taskId: number, title: string, category: TaskCategory, priority: TaskPriority, dueDate?: string)
  {
    const task = this.tasks.find(t => t.id === taskId);
    const trimmedTitle = title.trim();

    if (!task || trimmedTitle === '') return;

    task.title = trimmedTitle;
    task.category = category;
    task.priority = priority;
    task.dueDate = dueDate || undefined;
    this.saveTasks();
  }

  toggleComplete(taskId: number) 
  {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) 
    {
      task.completed = !task.completed;
      this.saveTasks();
    }
  }


  deleteTask(taskId: number) 
  {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.saveTasks();
  }

  clearCompleted()
  {
    this.tasks = this.tasks.filter(t => !t.completed);
    this.saveTasks();
  }

  private loadTasks(): TodoItem[]
  {
    const savedTasks = localStorage.getItem(this.storageKey);

    if (!savedTasks) return [];

    try
    {
      return JSON.parse(savedTasks).map((task: TodoItem) => ({
        ...task,
        priority: task.priority || 'Medium'
      }));
    }
    catch
    {
      return [];
    }
  }

  private saveTasks()
  {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }
}
