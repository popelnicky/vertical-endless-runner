import { Container } from "pixi.js";

export class BaseScene {
  name = "unknown";
  view = null;

  constructor(sceneName, gameRef) {
    this.name = sceneName;
    this.game = gameRef;

    this.view = new Container();

    gameRef.stage.addChild(this.view);
  }

  start() {}

  stop() {}

  onUpdate() {}

  onResize(width, height) {}
}
