import  * as PIXI from "pixi.js";

export const game = new PIXI.Application({
    resolution: Math.max(window.devicePixelRatio, 2),
    backgroundColor: 0xffffff,
    resizeTo: window,
});