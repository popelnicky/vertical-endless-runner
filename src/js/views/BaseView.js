export class BaseView {
  view = null;

  constructor() {}

  destroy() {
    this.view.destroy(true);
    this.view = null;
  }
}
