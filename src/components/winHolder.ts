import { Application, Text } from "pixi.js";

export const totalWin = {value: 0};

export function addWinHolder(app: Application) {
    const winText = new Text('Total win: 0');

    winText.anchor.set(0.5);
    winText.x = app.screen.width / 2;
    winText.y = app.screen.height * (5 / 7);

    app.stage.addChild(winText);
    return winText;
}