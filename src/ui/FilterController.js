export class FilterController {
  constructor(buttons, onFilterChange) {
    this.buttons = buttons;
    this.onFilterChange = onFilterChange;
    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => this.selectFilter(btn));
    });
  }

  selectFilter(selectedBtn) {
    this.buttons.forEach(btn => btn.classList.remove('active'));
    selectedBtn.classList.add('active');
    this.onFilterChange(selectedBtn.getAttribute('data-filter'));
  }
}