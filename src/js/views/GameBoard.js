import { Container } from "pixi.js";
import { Background } from "./Background.js";
import { Balloon } from "./Balloon.js";
import { Alien } from "./Alien.js";
import { Bird } from "./Bird.js";
import { Plane } from "./Plane.js";

export class GameBoard {
  #currentHeight = 0;

  #background = null;
  #balloon = null;
  #enemies = [];

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

    // this.#enemies.push(new Alien(textures.alien, textures.cow));
    // this.#enemies.push(new Bird(textures.bird, textures.oliveBranch));
    // this.#enemies.push(new Plane(textures.plane, textures.bag));

    // for (let enemy of this.#enemies) {
    //     this.view.addChild(enemy.view);

    //     enemy.view.x = 200;
    //     enemy.view.y = 150;
    // }
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
