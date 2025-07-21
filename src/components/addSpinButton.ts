import { Application, Sprite } from "pixi.js";
import { addSpinButtonClickHandler } from "./spin.ts";

export function addSpinButton(app: Application, symbolSprites: Sprite[], reels: Sprite[]) {
    const spinButton = Sprite.from("spinButton");

    styleSpinButton(app, spinButton);

    spinButton.on('pointerdown', addSpinButtonClickHandler(app, spinButton, symbolSprites, reels));

    app.stage.addChild(spinButton);
}

function styleSpinButton(app: Application, spinButton: Sprite) {
    spinButton.anchor.set(0.5);

    spinButton.x = app.screen.width / 2;
    spinButton.y = app.screen.height * (5 / 6);

    spinButton.eventMode = 'static';
    spinButton.cursor = 'pointer';
}
