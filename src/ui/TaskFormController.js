import { validateTaskText } from '../utils/validators.js';

export class TaskFormController {
  constructor(input, addButton, onAddTask) {
    this.input = input;
    this.onAddTask = onAddTask;
    addButton.addEventListener('click', () => this.handleAdd());
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') this.handleAdd();
    });
  }

  handleAdd() {
    const result = validateTaskText(this.input.value);
    if (!result.valid) {
      alert(result.message);
      return;
    }
    this.onAddTask(result.value);
    this.input.value = '';
  }
}