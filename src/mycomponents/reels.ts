// Build the reels
import { Application, BlurFilter, Container, Sprite } from "pixi.js";
import { REEL_WIDTH, SYMBOL_SIZE } from "./consts.ts";

export function addReels(app: Application, slotTextures) {
    const reels = [];
    const reelContainer = new Container();

    for (let i = 0; i < 3; i++) {
        const rc = new Container();

        rc.y = i * REEL_WIDTH;
        reelContainer.addChild(rc);

        const reel = {
            container: rc,
            symbols: [],
            position: 0,
            previousPosition: 0,
            blur: new BlurFilter(),
        };

        reel.blur.blurX = 0;
        reel.blur.blurY = 0;
        rc.filters = [reel.blur];

        // Build the symbols
        for (let j = 0; j < 5; j++) {
            const symbol = new Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
            // Scale the symbol to fit symbol area.

            symbol.y = Math.round((SYMBOL_SIZE - symbol.height) / 2);
            symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
            symbol.x = j * SYMBOL_SIZE;
            symbol.anchor = 0.5;
            reel.symbols.push(symbol);
            rc.addChild(symbol);
        }
        reels.push(reel);
    }
    app.stage.addChild(reelContainer);

// Build top & bottom covers and position reelContainer
    reelContainer.y = (app.screen.height - SYMBOL_SIZE * 3) / 2;
    reelContainer.x = Math.round(app.screen.width - SYMBOL_SIZE * 5);

    return { reels };
}

