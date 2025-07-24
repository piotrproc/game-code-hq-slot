import { Application, Sprite } from "pixi.js";
import { balance } from "../states.ts";
import { DIM_TINT, SPIN_COST } from "../consts.ts";

export function addSpinButton(app: Application): Sprite {
    const spinButton = Sprite.from("spinButton");

    styleSpinButton(app, spinButton);

    // Set the interactivity.
    spinButton.eventMode = 'static';
    spinButton.cursor = 'pointer';

    app.stage.addChild(spinButton);
    return spinButton;
}

function styleSpinButton(app: Application, spinButton: Sprite) {
    spinButton.anchor.set(0.5);

    spinButton.x = app.screen.width / 2;
    spinButton.y = app.screen.height * (5 / 6);

    spinButton.eventMode = 'static';
    spinButton.cursor = 'pointer';
}

export function disableSpinButtonIfNoMoney(spinButton: Sprite) {
    if (balance.value < SPIN_COST) {
        spinButton.tint = DIM_TINT;
        spinButton.eventMode = "none";
    }
}