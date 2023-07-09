import { BaseEnemyView } from "./BaseEnemyView.js";

export class Bird extends BaseEnemyView {
  constructor(enemyTexture, bombTexture, clearEnemyCb, flyBombCb, bombSector) {
    super(enemyTexture, bombTexture, clearEnemyCb, flyBombCb, bombSector);

    this.enemy.scale.set(0.75);
    this.bomb.scale.set(0.9);
    this.bomb.pivot.set(0.5);
    this.bomb.rotation = 1.6;

    this.bomb.x = this.enemy.width * 0.85;
    this.bomb.y = this.enemy.height * 0.2;
  }
}
