export class Section {
  constructor(renderer, containerSelector) {
    //this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._containerElement = document.querySelector(this._containerSelector);
  }

  addItem(item) {
    this._containerElement.prepend(item);
  }

  renderItems(items) {
    items.reverse().forEach(item => this._renderer(item, this._containerSelector));
  }
}
