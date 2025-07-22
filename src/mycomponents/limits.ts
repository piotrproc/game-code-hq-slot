import { Application, Graphics } from "pixi.js";
import { SYMBOL_SIZE } from "./consts.ts";

export function addLimitsToGame(app: Application) {
    const margin = (app.screen.height - SYMBOL_SIZE * 2) / 2;
    const COLOR = 0x0;

    const left = new Graphics().rect(0, 0, margin, app.screen.width).fill({ color: COLOR });
    const right = new Graphics().rect(app.screen.width - margin, 0, app.screen.width, app.screen.height).fill({ color: COLOR });

    app.stage.addChild(left);
    app.stage.addChild(right);
}