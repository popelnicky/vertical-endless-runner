import { Container } from "pixi.js";

export class BaseScene {
  #game = null;
  name = "unknown";
  parent = null;
  view = null;

  constructor(sceneName, parent, gameRef) {
    this.name = sceneName;
    this.parent = parent;
    this.#game = gameRef;

    this.view = new Container();

    this.#game.stage.addChild(this.view);
  }

  init(width, height) {}

  start() {}

  stop() {}

  onUpdate() {}

  onResize(width, height) {}

  destroy() {
    this.parent = null;

    this.#game.stage.removeChild(this.view);
    this.view.destroy(true);

    this.view = null;
  }
}
