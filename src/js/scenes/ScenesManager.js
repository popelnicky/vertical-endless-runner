export class ScenesManager {
  #game = null;
  #scenes = [];
  #current = null;
  cache = {};

  constructor(gameRef) {
    this.#game = gameRef;
  }

  register(sceneCtor) {
    this.#scenes.push(new sceneCtor(this, this.#game));
  }

  moveTo(sceneName) {
    this.#current?.stop();
    this.#current = this.#scenes.find((scene) => scene.name === sceneName);
    this.#current?.start();
  }

  onResize(width, height) {
    this.#current?.onResize(width, height);
  }
}
