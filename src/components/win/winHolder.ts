import { Application, Text } from "pixi.js";
import { BALANCE_TEXT, DEFAULT_BALANCE, WIN_TEXT } from "../consts.ts";

export function addWinHolderElements(app: Application) {
    return {
        spinWinText: addWinHolder(app),
        balanceText: addBalance(app)
    }
}

function addBalance(app: Application) {
    const balanceText = new Text(BALANCE_TEXT + DEFAULT_BALANCE);

    balanceText.anchor.set(0.5);
    balanceText.x = app.screen.width * (3 / 5);
    balanceText.y = app.screen.height * (5 / 7);

    app.stage.addChild(balanceText);
    return balanceText;
}

function addWinHolder(app: Application) {
    const spinWinText = new Text(WIN_TEXT + '0');

    spinWinText.anchor.set(0.5);
    spinWinText.x = app.screen.width * (2 / 5);
    spinWinText.y = app.screen.height * (5 / 7);

    app.stage.addChild(spinWinText);
    return spinWinText;
}