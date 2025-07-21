import { Application, BlurFilter, Container, ContainerChild, Sprite } from "pixi.js";

type ReelProperties = {
    container: Container<ContainerChild>,
    symbols: Sprite[],
    position: number,
    previousPosition: number,
    blur: BlurFilter,
};

export function buildReels(app: Application) {
    // Build the reels
    const reels: ReelProperties[] = [];
    const reelContainer = new Container();

    const symbolNames = ["SYM3", "SYM4", "SYM5", "SYM6", "SYM7"];

    const REEL_WIDTH = 235;
    const SYMBOL_SIZE = 140;

    for (let i = 0; i < 1; i++) {
        const rc = new Container();

        rc.x = i * REEL_WIDTH;
        reelContainer.addChild(rc);

        const reel: ReelProperties = {
            container: rc,
            symbols: [] as Sprite[],
            position: 0,
            previousPosition: 0,
            blur: new BlurFilter(),
        };

        reel.blur.blurX = 0;
        reel.blur.blurY = 0;
        rc.filters = [reel.blur];

        // Build the symbols
        for (let j = 0; j < 3; j++) {
            // const symbol = new Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
            const symbol = Sprite.from(symbolNames[Math.floor(Math.random() * symbolNames.length)]);
            // Scale the symbol to fit symbol area.

            symbol.anchor.set(0.5);

            symbol.y = j * SYMBOL_SIZE + 100;
            symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
            symbol.x = app.screen.width * (1 / 2);
            reel.symbols.push(symbol);
            rc.addChild(symbol);
        }
        reels.push(reel);
    }
    app.stage.addChild(reelContainer);

    return {reelContainer, reels}
}

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
    const SYMBOL_HEIGHT = symbolSprite.height;

    symbolSprite.anchor.set(0.5);

    symbolSprite.scale = SCALE;

    symbolSprite.x = app.screen.width * (1 / 2);
    symbolSprite.y = ((SYMBOL_HEIGHT + 10) * SCALE) * reelIndex - 35;

    app.stage.addChild(symbolSprite);
}