import { Application, Sprite } from "pixi.js";

export function addSpinButton(app: Application, symbolSprites: Sprite[]) {
    const spinButton = Sprite.from("spinButton");

    spinButton.anchor.set(0.5);

    spinButton.x = app.screen.width / 2;
    spinButton.y = app.screen.height * (4 / 5);


    spinButton.eventMode = 'static';
    spinButton.on('pointerdown', () => {
        spin(symbolSprites);
    });

    app.stage.addChild(spinButton);
}

function spin (symbolSprites: Sprite[]) {
    console.log(symbolSprites[0]);
}