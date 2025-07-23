import { Application, Graphics } from "pixi.js";
import { SYMBOL_SIZE } from "../consts.ts";

export function addLimitsToGame(app: Application) {
    const margin = (app.screen.height - SYMBOL_SIZE * 2) / 2;
    const COLOR = 0x0;

    const left = new Graphics().beginFill(COLOR).drawRect(0, 0, margin, app.screen.width).endFill();
    const right = new Graphics().beginFill(COLOR).drawRect(app.screen.width - margin, 0, app.screen.width, app.screen.height).endFill();

    app.stage.addChild(left);
    app.stage.addChild(right);
}