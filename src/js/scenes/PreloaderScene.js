import { Assets, Text } from "pixi.js";
import { SceneNames } from "../constants/SceneNames.js";
import { BaseScene } from "./BaseScene.js";

export class PreloaderScene extends BaseScene {
    #loadingBar = null;

    constructor(gameRef) {
        super(SceneNames.preloader, gameRef);

        this.#init(gameRef.screen.width, gameRef.screen.height);
    }

    #init(width, height) {
        this.#loadingBar = new Text("0%...", {
            fontFamily: "Arial",
            fontSize: 56,
            fill: 0x000000,
        });
        this.#loadingBar.anchor.set(0.5);

        this.view.addChild(this.#loadingBar);

        this.onResize(width, height);
    }

    async start() {
        const cfg = await Assets.load("/assets/data/assets.json");
        const assets = [];

        for (let asset of cfg.assets) {
            const [key, path] = Object.entries(asset).pop();
            
            Assets.add(key, path);
            assets.push(key);
        }

        const textures = await Assets.load(assets, (progress) => {
            this.#loadingBar.text = progress > 1 ? `${parseInt(progress * 100)}%...` : "100%";
        });
    }

    onResize(width, height) {
        this.view.x = width * 0.5;
        this.view.y = height * 0.5;
    }
}