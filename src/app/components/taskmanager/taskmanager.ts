import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskCategory, TaskPriority, TodoItem } from '../../models/task.model';
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
  newTaskPriority: TaskPriority = 'Medium';
  newTaskDueDate: string = '';
  currentFilter: 'All' | TaskCategory = 'All';
  statusFilter: 'All' | 'Active' | 'Completed' = 'All';
  searchTerm: string = '';
  editingTaskId: number | null = null;
  editTitle: string = '';
  editCategory: TaskCategory = 'Personal';
  editPriority: TaskPriority = 'Medium';
  editDueDate: string = '';
  categories: TaskCategory[] = ['Work', 'Personal', 'Urgent'];
  priorities: TaskPriority[] = ['Low', 'Medium', 'High'];

  onAddTask() 
  {
    this.taskService.addTask(
      this.newTaskTitle,
      this.newTaskCategory,
      this.newTaskPriority,
      this.newTaskDueDate
    );
    this.newTaskTitle = ''; 
    this.newTaskPriority = 'Medium';
    this.newTaskDueDate = '';
  }

  get filteredTasks() 
  {
    return this.taskService.getTasks()
      .filter(t => this.currentFilter === 'All' || t.category === this.currentFilter)
      .filter(t => this.statusFilter === 'All' || (this.statusFilter === 'Completed' ? t.completed : !t.completed))
      .filter(t => t.title.toLowerCase().includes(this.searchTerm.trim().toLowerCase()));
  }

  get activeCount()
  {
    return this.taskService.getTasks().filter(t => !t.completed).length;
  }

  get completedCount()
  {
    return this.taskService.getTasks().filter(t => t.completed).length;
  }

  get totalCount()
  {
    return this.taskService.getTasks().length;
  }

  get completionPercent()
  {
    return this.totalCount === 0 ? 0 : Math.round((this.completedCount / this.totalCount) * 100);
  }

  startEdit(task: TodoItem)
  {
    this.editingTaskId = task.id;
    this.editTitle = task.title;
    this.editCategory = task.category;
    this.editPriority = task.priority;
    this.editDueDate = task.dueDate || '';
  }

  saveEdit()
  {
    if (this.editingTaskId === null) return;

    this.taskService.updateTask(
      this.editingTaskId,
      this.editTitle,
      this.editCategory,
      this.editPriority,
      this.editDueDate
    );
    this.cancelEdit();
  }

  cancelEdit()
  {
    this.editingTaskId = null;
    this.editTitle = '';
    this.editCategory = 'Personal';
    this.editPriority = 'Medium';
    this.editDueDate = '';
  }

  isOverdue(task: TodoItem)
  {
    if (!task.dueDate || task.completed) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate < today;
  }
}
