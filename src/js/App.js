import { game } from "./game.js";

export class App {
    start() {
        const gameContainer = document.querySelector("#game");

        gameContainer.appendChild(game.view);
    }
}