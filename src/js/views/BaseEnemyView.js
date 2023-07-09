import { Container, Sprite } from "pixi.js";
import { BaseView } from "./BaseView.js";

export class BaseEnemyView extends BaseView {
  #currentXPos = 0;
  #bombThrown = false;

  #clearEnemyCb = null;
  #flyBombCb = null;

  #bombSector = 1;

  enemy = null;
  bomb = null;

  constructor(...context) {
    super();

    const [enemyTexture, bombTexture, clearEnemyCb, flyBombCb, bombSector] =
      context;

    this.#clearEnemyCb = clearEnemyCb;
    this.#flyBombCb = flyBombCb;
    this.#bombSector = bombSector;

    this.view = new Container();

    this.enemy = Sprite.from(enemyTexture);
    this.enemy.anchor.set(0.5);
    this.view.addChild(this.enemy);

    this.bomb = Sprite.from(bombTexture);
    this.bomb.anchor.set(0.5);
    this.view.addChild(this.bomb);
  }

  #throwTheBomb() {
    if (this.#bombThrown) {
        return;
    }
    
    this.view.removeChild(this.bomb);
    
    this.#flyBombCb(this.bomb, this.#bombSector);

    this.bomb = null;

    this.#bombThrown = true;
  }

  onUpdate(deltaTime, currentWidth, currentHeight) {
    this.#currentXPos += 3.6;

    this.view.x = this.#currentXPos;
    this.view.y = currentHeight * 0.05;

    if (this.view.x >= currentWidth * (0.25 * this.#bombSector)) {
        this.#throwTheBomb();
    }

    const isUnvisible = currentWidth < this.view.x - this.view.width * 0.5;

    if (isUnvisible) {
      this.#clearEnemyCb();
    }
  }

  onResize(width, height) {
    if (this.#currentXPos < 1) {
      this.view.x = -this.view.width * 2.1;
    }

    this.view.y = height * 0.15;
  }
}
