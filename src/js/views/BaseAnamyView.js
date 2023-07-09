import { Container, Sprite } from "pixi.js";
import { BaseView } from "./BaseView.js";

export class BaseEnemyView extends BaseView {
    enemy = null;
    bomb = null;

    constructor(enemyTexture, bombTexture) {
        super();

        this.view = new Container();

        this.enemy = Sprite.from(enemyTexture);
        this.enemy.anchor.set(0.5);
        this.view.addChild(this.enemy);

        this.bomb = Sprite.from(bombTexture);
        this.bomb.anchor.set(0.5);
        this.view.addChild(this.bomb);
    }
}