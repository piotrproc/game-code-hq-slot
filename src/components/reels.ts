// Build the reels
import { Application, BlurFilter, Container, ContainerChild, Sprite } from "pixi.js";
import { REEL_WIDTH, SYMBOL_SIZE } from "./consts.ts";

export type ReelProperties = {
    container: Container<ContainerChild>,
    symbols: Sprite[],
    position: number,
    previousPosition: number,
    blur: BlurFilter,
};

export function addReels(app: Application, slotTextures) {
    const reels: ReelProperties[] = [];
    const reelContainer = new Container();

    for (let i = 0; i < 3; i++) {
        const rc = new Container();

        rc.y = i * REEL_WIDTH;
        reelContainer.addChild(rc);

        const reel: ReelProperties = {
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
    reelContainer.x = Math.round((app.screen.width - 2 * SYMBOL_SIZE) / 2);

    return {reels};
}

export function addReelsSpinningHandler(app: Application, reels, slotTextures) {
    // Listen for animate update.
    app.ticker.add(() => {
        // Update the slots.
        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            // Update blur filter y amount based on speed.
            // This would be better if calculated with time in mind also. Now blur depends on frame rate.

            r.blur.blurX = (r.position - r.previousPosition) * 8;
            r.previousPosition = r.position;

            // Update symbol positions on reel.
            for (let j = 0; j < r.symbols.length; j++) {
                const s = r.symbols[j];
                const prevy = s.x;

                s.x = ((r.position + j) % (r.symbols.length)) * SYMBOL_SIZE - SYMBOL_SIZE;

                if (s.x < 0 && prevy > SYMBOL_SIZE) {
                    // Detect going over and swap a texture.
                    // This should in proper product be determined from some logical reel.
                    s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
                    s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height);
                    s.y = Math.round((SYMBOL_SIZE - s.height) / 2);
                }
            }
        }
    });
}
