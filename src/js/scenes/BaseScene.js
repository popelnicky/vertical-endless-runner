import { Container } from "pixi.js";

export class BaseScene {
  #game = null;
  #onUpdateHandler = null;
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

  init() {}

  start() {
    this.init();
    this.onResize(this.#game.screen.width, this.#game.screen.height);

    this.#onUpdateHandler = () => this.onUpdate(parseInt(this.#game.ticker.deltaMS));
    this.#game.ticker.add(this.#onUpdateHandler);
  }

  stop() {}

  onUpdate(deltaTime) {}

  onResize(width, height) {}

  destroy() {
    this.#game.ticker.remove(this.#onUpdateHandler);
  }
}
