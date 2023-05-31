// отрисовка элементов на странице
class Section {
  constructor({ items, renderer }, selector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = selector;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    items.forEach((item) => {
    this._renderer(item);
    });
  }
}

export default Section;
