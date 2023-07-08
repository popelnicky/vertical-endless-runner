import { Application } from "pixi.js";
import { SceneNames } from "./constants/SceneNames.js";
import { PreloaderScene } from "./scenes/PreloaderScene.js";
import { ScenesManager } from "./scenes/ScenesManager.js";
import { IntroScene } from "./scenes/IntroScene.js";

export class App {
  #game = null;
  #scenesManager = null;

  constructor() {
    this.#game = new Application({
      // resolution: Math.max(window.devicePixelRatio, 2),
      backgroundColor: 0xffffff,
      resizeTo: window,
    });

    this.#scenesManager = new ScenesManager(this.#game);
    this.#scenesManager.register(PreloaderScene);
    this.#scenesManager.register(IntroScene);
  }

  start() {
    this.#initListeners();

    document.body.appendChild(this.#game.view);

    this.#scenesManager.moveTo(SceneNames.preloader);
  }

  #initListeners() {
    window.addEventListener("resize", () => {
      const { innerWidth: width, innerHeight: height } = window;

      this.#game.renderer.resize(width, height);
      this.#scenesManager.onResize(width, height);
    });
  }
}
