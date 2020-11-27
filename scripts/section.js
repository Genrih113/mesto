export class Section {
  constructor({items, renderer}, containerSelector) {
    this.items = items;
    this.renderer = renderer;
    this.containerSelector = containerSelector;
  }

  addItem(item) {
    document.querySelector(this.containerSelector).prepend(item);
  }

  renderItems() {
    this.items.forEach(item => this.renderer(item, this.containerSelector));
  }
}
