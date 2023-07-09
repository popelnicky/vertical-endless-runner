import { Container, Sprite } from "pixi.js";
import { Background } from "./Background.js";
import { Balloon } from "./Balloon.js";
import { Alien } from "./Alien.js";
import { Bird } from "./Bird.js";
import { Plane } from "./Plane.js";
import { Utils } from "../servises/Utils.js";

export class GameBoard {
  #currentWidth = 0;
  #currentHeight = 0;

  #background = null;
  #balloon = null;
  #enemy = null;
  #enemies = null;
  #bomb = null;

  #onFinishHandler = null;

  view = null;

  constructor(onFinishHandler, textures) {
    this.#onFinishHandler = onFinishHandler;

    this.view = new Container();
    this.#enemies = [
      {
        enemyCtor: Bird,
        enemyTexture: textures.bird,
        bombTexture: textures.oliveBranch,
      },
      {
        enemyCtor: Plane,
        enemyTexture: textures.plane,
        bombTexture: textures.bag,
      },
      {
        enemyCtor: Alien,
        enemyTexture: textures.alien,
        bombTexture: textures.cow,
      },
    ];
    this.#init(textures);
  }

  #init(textures) {
    this.#background = new Background(textures.background);
    this.view.addChild(this.#background.view);

    this.#balloon = new Balloon(textures.balloon);
    this.view.addChild(this.#balloon.view);
  }

  flyTheBomb(bomb, bombSector) {
    this.#bomb = bomb;
    this.view.addChild(this.#bomb);

    this.#bomb.x = this.#currentWidth * (0.25 * bombSector);
  }

  clearEnemy() {
    this.view.removeChild(this.#enemy.view);
    this.#enemy = null;
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
    this.#enemy?.onUpdate(deltaTime, this.#currentWidth, this.#currentHeight);

    if (this.#background.view.y > this.#currentHeight * 1.2 && !this.#enemy && !this.#bomb) {
      let random = Utils.random(1, 1000) % 3;
      const { enemyCtor, enemyTexture, bombTexture } = this.#enemies[random];

      random = Utils.random(1, 1000) % 3;

      this.#enemy = new enemyCtor(
        enemyTexture,
        bombTexture,
        () => this.clearEnemy(),
        (ref, bombSector) => this.flyTheBomb(ref, bombSector),
        random + 1
      );

      this.view.addChild(this.#enemy.view);
    }

    if (this.#bomb) {
      this.#bomb.y += 3.6;
    }

    if (this.#bomb?.y > this.#currentHeight + this.#bomb?.height * 0.5) {
      this.#bomb = null;
    }
  }

  onResize(width, height) {
    this.#currentWidth = width;
    this.#currentHeight = height;

    this.#background.onResize(width, height);
    this.#balloon.onResize(width, height);
    this.#enemy?.onResize(width, height);
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
