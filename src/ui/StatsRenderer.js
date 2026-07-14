export class StatsRenderer {
  constructor(element) {
    this.element = element;
  }

  render({ total, completed, active }) {
    this.element.textContent = `Total: ${total} | Completadas: ${completed} | Activas: ${active}`;
  }
}