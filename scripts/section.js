export class Section {
  constructor({items, renderer}, containerSelector) {
    this.items = items;
    this.renderer = renderer;
    this.containerSelector = containerSelector;
    console.log(this.containerSelector);
  }

  addItem(item) {
    document.querySelector(this.containerSelector).prepend(item);
  }

  renderItems() {
    console.log(this.items);
    this.items.forEach(item => this.renderer(item, this.containerSelector));
  }
}
