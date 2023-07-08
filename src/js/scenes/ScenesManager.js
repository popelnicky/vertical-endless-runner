export class ScenesManager {
  #game = null;
  #scenes = [];
  #current = null;

  constructor(gameRef) {
    this.#game = gameRef;
  }

  register(scene) {
    this.#scenes.push(scene);
  }

  moveTo(sceneName) {
    if (this.#current) {

      this.#current.stop();
    }

    this.#current = this.#scenes.find((scene) => scene.name === sceneName);
    this.#current?.start();
  }
}
