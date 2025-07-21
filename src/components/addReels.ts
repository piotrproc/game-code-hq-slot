import { Application, Sprite } from "pixi.js";

export function addReels(app: Application) {
    const symbolNames = ["SYM3", "SYM4", "SYM5", "SYM6", "SYM7"];

    const symbolSprites = symbolNames.map(name => {
        return Sprite.from(name);
    })

    showReels(app, symbolSprites);
}

function showReels(app: Application, symbolSprites: Sprite[]) {
    const firstSymbol = symbolSprites[0];
    const secondSymbol = symbolSprites[1];
    const thirdSymbol = symbolSprites[2];

    showSymbol(app, firstSymbol, 1)
    showSymbol(app, secondSymbol, 2)
    showSymbol(app, thirdSymbol, 3)
}

function showSymbol(app: Application, symbolSprite: Sprite, reelIndex: number) {
    symbolSprite.anchor.set(0.5);

    symbolSprite.x = app.screen.width * (1 / 2);
    symbolSprite.y = app.screen.height * (reelIndex / 5);

    app.stage.addChild(symbolSprite);
}