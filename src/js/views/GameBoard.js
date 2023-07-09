import { Container, Sprite } from "pixi.js";
import { Background } from "./Background.js";
import { Balloon } from "./Balloon.js";
import { Alien } from "./Alien.js";
import { Bird } from "./Bird.js";
import { Plane } from "./Plane.js";
import { Utils } from "../servises/Utils.js";
import { GameBoardSector } from "../constants/GameBoardSector.js";

export class GameBoard {
  #currentWidth = 0;
  #currentHeight = 0;
  #currentSector = GameBoardSector.Middle;
  #direction = 0;

  #background = null;
  #balloon = null;
  #enemy = null;
  #enemies = null;
  #bomb = null;
  #gameOver = false;

  #onFinishHandler = null;

  #startSwapPoint = null;
  #endSwapPoint = null;

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
    this.#initListeners();

    this.#background = new Background(textures.background);
    this.view.addChild(this.#background.view);

    this.#balloon = new Balloon(textures.balloon);
    this.view.addChild(this.#balloon.view);
  }

  #initListeners() {
    document.addEventListener("touchstart", (event) => {
      const { pageX: x } = event.changedTouches[0];

      this.#startSwapPoint = { x };
    });

    document.addEventListener("touchmove", (event) => {
      const { pageX: x } = event.changedTouches[0];

      this.#endSwapPoint = { x };
    });

    document.addEventListener("touchend", (event) => {
      const diff = this.#endSwapPoint?.x - this.#startSwapPoint?.x || 0;

      if (diff === 0) {
        this.moveBalloonTo(0);

        return;
      }

      this.moveBalloonTo(diff > 0 ? 1 : -1);
    });

    document.addEventListener("keydown", (event) => {
      let direction = 0;

      switch (event.keyCode) {
        case 39: {
          direction = 1;
          break;
        }
        case 37: {
          direction = -1;
          break;
        }
      }

      this.moveBalloonTo(direction);
    });
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

  isObjectsIntersect(first, second) {
    const firstRect = first.getBounds();
    const secondRect = second.getBounds();
    const factor = 0.98;

    return (firstRect.x + firstRect.width) * factor > secondRect.x &&
           firstRect.x < (secondRect.x + secondRect.width) * factor &&
           (firstRect.y + firstRect.height) * factor > secondRect.y &&
           firstRect.y < (secondRect.y + secondRect.height) * factor;
  }

  moveBalloonTo(direction) {
    this.#direction = direction;

    if (this.#direction) {
      let nextSector = this.#direction > 0 ? GameBoardSector.Right : GameBoardSector.Left;

      if (nextSector === this.#currentSector) {
        return;
      }

      switch (this.#currentSector) {
        case GameBoardSector.Left:
          case GameBoardSector.Right: {
          this.#currentSector = GameBoardSector.Middle
          break;
        }
        case GameBoardSector.Middle: {
          this.#currentSector = nextSector;
          break;
        }
      }
    }
  }

  onUpdate(deltaTime) {
    if (this.#gameOver) {
      return;
    }

    if (this.#background.view.y > this.#background.view.height) {
      this.#onFinishHandler();

      return;
    }

    if (this.#balloon.view.y > this.#currentHeight * 0.6) {
      this.#balloon.onUpdate(deltaTime, this.#currentSector);

      return;
    }

    if (this.#balloon.view.x !== this.#currentWidth * this.#currentSector) {
      this.#balloon.view.x += this.#direction * 1.5;
    }

    this.#background.onUpdate(deltaTime);
    this.#enemy?.onUpdate(deltaTime, this.#currentWidth, this.#currentHeight);

    if (
      this.#background.view.y > this.#currentHeight * 1.2 &&
      !this.#enemy &&
      !this.#bomb
    ) {
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

      if (this.isObjectsIntersect(this.#balloon.view, this.#bomb)) {
        this.#gameOver = true;

        setTimeout(() => this.#onFinishHandler(), 3000);
      }
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
    this.view.removeChild(this.#balloon.view);

    this.view = null;
  }
}
