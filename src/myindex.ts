import { Application, Assets, Texture, } from 'pixi.js';
import { addSpinButton } from "./mycomponents/spinButton.ts";
import { startPlay } from "./mycomponents/spinning.ts";
import { addReels, addReelsSpinningHandler } from "./mycomponents/reels.ts";
import { addTween } from "./mycomponents/tween.ts";
import { addLimitsToGame } from "./mycomponents/limits.ts";
import { getThemeConfig } from "./mycomponents/utils.ts";

(async () => {
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({
        background: '#1099bb',
        height: 1050,
        width: 1200,
    });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    const config = getThemeConfig();

    // Load the textures
    await Assets.load([
        {alias: "spinButton", src: "public/assets/spinButton.png",},
        ...config.symbols,
    ]);

    // // Create different slot symbols
    const slotTextures = config.symbols.map(
        symbol => Texture.from(`${symbol.src}`)
    )

    const {reels} = addReels(app, slotTextures);
    const tweenTo = addTween(app);
    const spinButton = addSpinButton(app);
    spinButton.addListener('pointerdown', () => {
        startPlay(reels, tweenTo, spinButton);
    });

    addLimitsToGame(app);
    addReelsSpinningHandler(app, reels, slotTextures);

    document.addEventListener('keypress', (e: KeyboardEvent) => {
        if (e.key === ' ') {
            startPlay(reels, tweenTo, spinButton);
        }
    });
})();
