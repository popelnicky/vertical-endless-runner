import { Application } from "pixi.js";
import { SceneNames } from "./constants/SceneNames.js";
import { PreloaderScene } from "./scenes/PreloaderScene.js";
import { ScenesManager } from "./scenes/ScenesManager.js";

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
        this.#scenesManager.register(new PreloaderScene(this.#game));
    }

    start() {
        document.body.appendChild(this.#game.view);

        this.#scenesManager.moveTo(SceneNames.preloader);

    }
}