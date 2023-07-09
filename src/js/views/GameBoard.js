import { Container } from "pixi.js";
import { Background } from "./Background.js";
import { Balloon } from "./Balloon.js";

export class GameBoard {
    #currentHeight = 0;

  #background = null;
  #balloon = null;

  #onFinishHandler = null;

  view = null;

  constructor(onFinishHandler, textures) {
    this.#onFinishHandler = onFinishHandler;

    this.view = new Container();

    this.#init(textures);
  }

  #init(textures) {
    this.#background = new Background(textures.background);
    this.view.addChild(this.#background.view);

    this.#balloon = new Balloon(textures.balloon);
    this.view.addChild(this.#balloon.view);
  }

  onUpdate(deltaTime) {
    if (this.#background.view.y > this.#background.view.height) {
        this.#onFinishHandler();

        return;
    }

    if (this.#balloon.view.y > this.#currentHeight * 0.6) {
        this.#balloon.onUpdate(deltaTime);

        return;
    }
    
    this.#background.onUpdate(deltaTime);
  }

  onResize(width, height) {
    this.#currentHeight = height;

    this.#background.onResize(width, height);
    this.#balloon.onResize(width, height);
  }

  destroy() {
    this.#onFinishHandler = null;

    this.view.removeChild(this.#background.view);
    this.#background.destroy();

    this.view.removeChild(this.#balloon.view);
    this.#balloon.destroy();
    
    this.view.destroy(true);
    this.view = null;
  }
}
