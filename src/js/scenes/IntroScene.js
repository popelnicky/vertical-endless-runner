import { Graphics, Sprite, Text } from "pixi.js";
import { SceneNames } from "../constants/SceneNames.js";
import { BaseScene } from "./BaseScene.js";
import { ButtonContainer } from "@pixi/ui";

export class IntroScene extends BaseScene {
  #background = null;
  #title = null;
  #logo = null;
  #playButton = null;

  constructor(parent, gameRef) {
    super(SceneNames.intro, parent, gameRef);
  }

  init() {
    const textures = this.parent.cache.textures;
    
    this.#background = Sprite.from(textures.introBack);
    this.#background.anchor.set(0.5);
    this.view.addChild(this.#background);

    this.#logo = Sprite.from(textures.balloon);
    this.#logo.anchor.set(0.5);
    this.view.addChild(this.#logo);

    this.#title = new Text("Up!", {
      fontFamily: "Fipps-Regular",
      fontSize: 56,
      fill: 0x090534,
    });
    this.#title.anchor.set(0.5);
    this.view.addChild(this.#title);

    this.#playButton = new ButtonContainer(
      new Graphics()
      .beginFill(0x267F00)
      .drawRoundedRect(0, 0, 175, 50, 10)
    );
    this.#playButton.onPress.connect(() => this.#playTheGame());
    this.view.addChild(this.#playButton.view);

    const buttonLabel = new Text("Play", {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0x090534,
    });

    this.#playButton.view.addChild(buttonLabel);

    buttonLabel.x = this.#playButton.view.width * 0.5 - buttonLabel.width * 0.5;
    buttonLabel.y = this.#playButton.view.height * 0.5 - buttonLabel.height * 0.5;
  }

  stop() {
    this.view.removeChild(this.#background);
    this.#background = null;

    this.view.removeChild(this.#logo);
    this.#logo = null;

    this.view.removeChild(this.#title);
    this.#title = null;

    this.view.removeChild(this.#playButton.view);
    this.#playButton = null;

    super.destroy();
  }

  onResize(width, height) {
    const introBack = this.parent.cache.textures.introBack;
    const scale = Math.max(width / introBack.width, height / introBack.height);

    this.#background.x = width * 0.5;
    this.#background.y = height * 0.5;
    this.#background.scale.set(scale);

    this.#logo.x = width * 0.5;
    this.#logo.y = height * 0.55;
    this.#logo.scale.set(0.6);

    this.#title.x = width * 0.5;
    this.#title.y = height * 0.15;

    this.#playButton.view.x = width * 0.5 - this.#playButton.view.width * 0.5;
    this.#playButton.view.y = height * 0.85;
  }

  #playTheGame() {
    this.parent.moveTo(SceneNames.game);
  }
}
