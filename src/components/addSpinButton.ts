import { Application, Sprite } from "pixi.js";

export function addSpinButton(app: Application, symbolSprites: Sprite[], reels: Sprite[]) {
    const spinButton = Sprite.from("spinButton");

    spinButton.anchor.set(0.5);

    spinButton.x = app.screen.width / 2;
    spinButton.y = app.screen.height * (4 / 5);


    spinButton.eventMode = 'static';
    spinButton.on('pointerdown', () => {
        spin(symbolSprites, reels);
    });

    app.stage.addChild(spinButton);
}

function spin(symbolSprites: Sprite[], reels: Sprite[]) {
    console.log(reels);
    symbolSprites[0].texture = reels[1].texture;

    // const randomSymbolIndex = Math.floor(Math.random() * (reels.length - 1));
    // symbolSprites[randomSymbolIndex] = reels[randomSymbolIndex];
}