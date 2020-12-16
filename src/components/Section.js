export class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._containerElement = document.querySelector(this._containerSelector);
  }

  addItem(item) {
    this._containerElement.prepend(item);
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item, this._containerSelector));
  }
}
