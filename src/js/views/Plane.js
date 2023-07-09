import { BaseEnemyView } from "./BaseEnemyView.js";

export class Plane extends BaseEnemyView {
  constructor(enemyTexture, bombTexture, clearEnemyCb, flyBombCb, bombSector) {
    super(enemyTexture, bombTexture, clearEnemyCb, flyBombCb, bombSector);

    this.enemy.scale.set(0.6);
    this.bomb.scale.set(0.5);
    this.bomb.pivot.set(0.5);
    this.bomb.rotation = 0.7;

    this.bomb.x = this.enemy.x - this.enemy.width * 0.3;
    this.bomb.y = this.enemy.height * 0.4;
  }
}
