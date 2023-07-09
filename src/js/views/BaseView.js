export class BaseView {
  view = null;

  constructor() {}

  destroy() {
    this.view.destroy();
    this.view = null;
  }
}
