import { Application, Sprite } from "pixi.js";

export function addReels(app: Application) {
    const symbolNames = ["SYM3", "SYM4", "SYM5", "SYM6", "SYM7"];

    const symbolSprites = symbolNames.map(name => {
        return Sprite.from(name);
    })

    return {
        allSymbols: symbolSprites,
        symbols: showReels(app, symbolNames)
    };
}

function showReels(app: Application, symbolSprites: string[]) {
    const firstSymbol = Sprite.from(symbolSprites[0]);
    const secondSymbol = Sprite.from(symbolSprites[1]);
    const thirdSymbol = Sprite.from(symbolSprites[2]);

    showSymbol(app, firstSymbol, 1)
    showSymbol(app, secondSymbol, 2)
    showSymbol(app, thirdSymbol, 3)

    return [firstSymbol, secondSymbol, thirdSymbol];
}

function showSymbol(app: Application, symbolSprite: Sprite, reelIndex: number) {
    const SCALE = 0.9;

    symbolSprite.anchor.set(0.5);

    symbolSprite.scale = SCALE;

    symbolSprite.x = app.screen.width * (1 / 2);
    symbolSprite.y = ((symbolSprite.height + 10) * SCALE) * reelIndex - 25;

    app.stage.addChild(symbolSprite);
}