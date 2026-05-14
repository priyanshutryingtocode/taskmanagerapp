import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskCategory } from '../../models/task.model';
import { TaskService } from '../../services/taskservice';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './taskmanager.html',
  styleUrl: './taskmanager.scss'
})
export class TaskManagerComponent 
{

  taskService = inject(TaskService);

  newTaskTitle: string = '';
  newTaskCategory: TaskCategory = 'Personal';
  currentFilter: 'All' | TaskCategory = 'All';
  categories: TaskCategory[] = ['Work', 'Personal', 'Urgent'];

  onAddTask() 
  {
    this.taskService.addTask(this.newTaskTitle, this.newTaskCategory);
    this.newTaskTitle = ''; 
  }

  get filteredTasks() 
  {
    const allTasks = this.taskService.getTasks();
    if (this.currentFilter === 'All') 
    {
      return allTasks;
    }
    return allTasks.filter(t => t.category === this.currentFilter);
  }
}