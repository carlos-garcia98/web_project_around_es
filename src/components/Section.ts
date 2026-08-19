type RendererFunction<T> = (item: T) => void;

export class Section<T> {
  private _items: T[];
  private _renderer: RendererFunction<T>;
  private _containerSelector: HTMLElement;

  constructor(
    { items, renderer }: { items: T[], renderer: RendererFunction<T>}, containerSelector: string
  ) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector) as HTMLElement;
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element: HTMLElement) {
    this._containerSelector.append(element);
  }
}