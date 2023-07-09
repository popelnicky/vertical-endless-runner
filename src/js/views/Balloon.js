import { Sprite } from "pixi.js";
import { BaseView } from "./BaseView.js";

export class Balloon extends BaseView {
  #currentYPos = 0;

  constructor(texture) {
    super();

    this.view = Sprite.from(texture);
    this.view.anchor.set(0.5);
    this.view.scale.set(0.4);
  }

  onUpdate(deltaTime) {
    this.#currentYPos -= 0.7;
    this.view.y -= 0.7;
  }

  onResize(width, height) {
    this.view.x = width * 0.5;

    if (this.view.y < height * 0.6) {
      const yPos = height * 0.75;

      this.view.y = this.#currentYPos < 1 ? yPos : yPos + this.#currentYPos;
    }
  }
}
