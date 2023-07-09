import { SceneNames } from "../constants/SceneNames.js";
import { GameBoard } from "../views/GameBoard.js";
import { BaseScene } from "./BaseScene.js";

export class GameScene extends BaseScene {
  #gameBoard = null;

  constructor(parent, gameRef) {
    super(SceneNames.game, parent, gameRef);
  }

  finishGame() {
    this.parent.moveTo(SceneNames.intro);
  }

  init() {
    this.#gameBoard = new GameBoard(() => this.finishGame(), this.parent.cache.textures);
    this.view.addChild(this.#gameBoard.view);
  }

  stop() {
    this.view.removeChild(this.#gameBoard.view);
    this.#gameBoard.destroy();
    this.#gameBoard = null;

    super.destroy();
  }

  onUpdate(deltaTime) {
    this.#gameBoard.onUpdate(deltaTime);
  }

  onResize(width, height) {
    this.#gameBoard.onResize(width, height);
  }
}
