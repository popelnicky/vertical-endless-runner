import { Sprite } from "pixi.js";
import { BaseView } from "./BaseView.js";

export class Background extends BaseView {
  #currentYPos = 0;

  constructor(texture) {
    super();

    this.view = Sprite.from(texture);
    this.view.anchor.set(0.5, 1.0);

    const { width, height } = texture;

    this.view.originalSize = { width, height };
  }

  onUpdate(deltaTime) {
    this.#currentYPos += 0.7;
    this.view.y += 0.7;
  }

  onResize(width, height) {
    const scaleX = width / this.view.originalSize.width;

    this.view.x = width * 0.5;
    this.view.y = height + this.#currentYPos;
    this.view.scale.x = scaleX;
  }
}
