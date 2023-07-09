import { BaseEnemyView } from "./BaseAnamyView.js";

export class Alien extends BaseEnemyView {
  
    constructor(enemyTexture, bombTexture) {
    super(enemyTexture, bombTexture);

    this.enemy.scale.set(0.75);
    this.bomb.scale.set(0.2);

    this.bomb.x = -this.enemy.width * 0.05;
    this.bomb.y = this.enemy.height * 0.25;
  }
}
