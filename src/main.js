import './style.css';
import { LocalStorageTaskRepository } from './repositories/LocalStorageTaskRepository.js';
import { TaskService } from './services/TaskService.js';
import { TaskListRenderer } from './ui/TaskListRenderer.js';
import { StatsRenderer } from './ui/StatsRenderer.js';
import { FilterController } from './ui/FilterController.js';
import { TaskFormController } from './ui/TaskFormController.js';
import { FILTERS } from './constants/filters.js';

window.onload = function () {
  const repository = new LocalStorageTaskRepository();
  const taskService = new TaskService(repository);

  const listRenderer = new TaskListRenderer(document.getElementById('taskList'), {
    onToggle: id => { taskService.toggleTask(id); refresh(); },
    onDelete: id => { taskService.deleteTask(id); refresh(); },
  });
  const statsRenderer = new StatsRenderer(document.getElementById('stats'));

  let currentFilter = FILTERS.ALL;

  function refresh() {
    listRenderer.render(taskService.getFilteredTasks(currentFilter));
    statsRenderer.render(taskService.getStats());
  }

  new FilterController(document.querySelectorAll('.filter-btn'), filter => {
    currentFilter = filter;
    refresh();
  });

  new TaskFormController(
    document.getElementById('taskInput'),
    document.getElementById('addBtn'),
    text => { taskService.addTask(text); refresh(); }
  );

  refresh();
};