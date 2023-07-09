import { Assets, Text } from "pixi.js";
import { SceneNames } from "../constants/SceneNames.js";
import { BaseScene } from "./BaseScene.js";

export class PreloaderScene extends BaseScene {
  #loadingBar = null;

  constructor(parent, gameRef) {
    super(SceneNames.preloader, parent, gameRef);
  }

  init() {
    this.#loadingBar = new Text("0%...", {
      fontFamily: "3Dventure",
      fontSize: 56,
      fill: 0x000000,
    });
    this.#loadingBar.anchor.set(0.5);

    this.view.addChild(this.#loadingBar);
  }

  async start() {
    super.start();

    const cfg = await Assets.load("/assets/data/images.json");
    const aliases = [];

    for (let image of cfg.images) {
      const [key, path] = Object.entries(image).pop();

      Assets.add(key, path);
      aliases.push(key);
    }

    this.parent.cache.textures = await Assets.load(aliases, (progress) => {
      this.#loadingBar.text =
        progress > 1 ? `${parseInt(progress * 100)}%...` : "100%";
    });

    this.parent.moveTo(SceneNames.intro);
  }

  stop() {
    this.view.removeChild(this.#loadingBar);

    this.#loadingBar.destroy();
    this.#loadingBar = null;

    super.destroy();
  }

  onResize(width, height) {
    this.view.x = width * 0.5;
    this.view.y = height * 0.5;
  }
}
