import { createTask } from '../models/Task.js';
import { FILTERS } from '../constants/filters.js';

export class TaskService {
  constructor(taskRepository) {
    this.repository = taskRepository;
    this.tasks = this.repository.getAll();
    this.nextId = this.tasks.length > 0
      ? Math.max(...this.tasks.map(t => t.id)) + 1
      : 1;
  }

  addTask(text) {
    const task = createTask(this.nextId++, text);
    this.tasks.push(task);
    this.repository.save(this.tasks);
    return task;
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;
    task.completed = !task.completed;
    this.repository.save(this.tasks);
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.repository.save(this.tasks);
  }

  getFilteredTasks(filter) {
    if (filter === FILTERS.ACTIVE) return this.tasks.filter(t => !t.completed);
    if (filter === FILTERS.COMPLETED) return this.tasks.filter(t => t.completed);
    return this.tasks;
  }

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    return { total, completed, active: total - completed };
  }
}