import { Application, Sprite } from "pixi.js";
import { running } from "./spinning.ts";

export function addSpinButton(app: Application, clickHandler) {
    const spinButton = Sprite.from("spinButton");

    styleSpinButton(app, spinButton);

    // Set the interactivity.
    spinButton.eventMode = 'static';
    spinButton.cursor = 'pointer';

    spinButton.addListener('pointerdown', () => {
        // spinButton.tint = (!running.value) ? 0x808080 : 0xFFFFFF;
        clickHandler();
    });

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