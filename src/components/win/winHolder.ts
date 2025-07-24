import { Application, Text } from "pixi.js";
import { BALANCE_TEXT, DEFAULT_BALANCE, WIN_TEXT } from "../consts.ts";

export type WinElements = {
    spinWinText: Text;
    balanceText: Text
}

export function addWinHolderElements(app: Application): WinElements {
    return {
        spinWinText: addSpinWinHolder(app),
        balanceText: addBalanceHolder(app)
    }
}

function addBalanceHolder(app: Application): Text {
    const balanceText = new Text(BALANCE_TEXT + DEFAULT_BALANCE);

    balanceText.anchor.set(0.5);
    balanceText.x = app.screen.width * (1 / 2) + 75;
    balanceText.y = app.screen.height * (5 / 7) + 25;

    app.stage.addChild(balanceText);
    return balanceText;
}

function addSpinWinHolder(app: Application): Text {
    const spinWinText = new Text(WIN_TEXT + '0');

    spinWinText.anchor.set(0.5);
    spinWinText.x = app.screen.width * (1 / 2) - 75;
    spinWinText.y = app.screen.height * (5 / 7) + 25;

    app.stage.addChild(spinWinText);
    return spinWinText;
}