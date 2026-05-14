import { Injectable } from '@angular/core';
import { TodoItem, TaskCategory } from '../models/task.model';

@Injectable({
  providedIn: 'root' 
})

export class TaskService {

  private tasks: TodoItem[] = [];

  getTasks(): TodoItem[] {
    return this.tasks;
  }

  addTask(title: string, category: TaskCategory) 
  {
    if (title.trim() === '') return;

    const newTask: TodoItem = 
    {
      id: Date.now(),
      title: title,
      category: category,
      completed: false
    };
    this.tasks.push(newTask);
  }

  toggleComplete(taskId: number) 
  {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) 
    {
      task.completed = !task.completed;
    }
  }


  deleteTask(taskId: number) 
  {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
  }
}