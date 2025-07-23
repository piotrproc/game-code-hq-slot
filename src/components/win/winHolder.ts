import { Application, Text } from "pixi.js";
import { TOTAL_WIN_TEXT, WIN_TEXT } from "../consts.ts";

export const totalWin = {value: 0};
export const spinWin = {value: 0};

export function addWinHolderElements(app: Application) {
    return {
        winTotalText: addWinTotalHolder(app),
        winText: addWinHolder(app),
    }
}

function addWinTotalHolder(app: Application) {
    const winTotalText = new Text(TOTAL_WIN_TEXT + '0');

    winTotalText.anchor.set(0.5);
    winTotalText.x = app.screen.width * (3 / 5);
    winTotalText.y = app.screen.height * (5 / 7);

    app.stage.addChild(winTotalText);
    return winTotalText;
}

function addWinHolder(app: Application) {
    const winText = new Text(WIN_TEXT + '0');

    winText.anchor.set(0.5);
    winText.x = app.screen.width * (2 / 5);
    winText.y = app.screen.height * (5 / 7);

    app.stage.addChild(winText);
    return winText;
}