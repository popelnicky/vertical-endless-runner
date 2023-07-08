import { SceneNames } from "../constants/SceneNames.js";
import { BaseScene } from "./BaseScene.js";

export class IntroScene extends BaseScene {
  #background = null;
  #title = null;
  #logo = null;
  #playButton = null;

  constructor(parent, gameRef) {
    super(SceneNames.intro, parent, gameRef);

    this.init(gameRef.screen.width, gameRef.screen.height);
  }

  init(width, height) {}

  start() {}

  stop() {
    super.destroy();
  }

  onResize(width, height) {
    this.view.x = width * 0.5;
    this.view.y = height * 0.5;
  }
}
