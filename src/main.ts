import { Application, Assets, Texture, } from 'pixi.js';
import { addSpinButton } from "./components/spinButton.ts";
import { startPlay } from "./components/spinning.ts";
import { addReels, addReelsSpinningHandler } from "./components/reels.ts";
import { addTween } from "./components/tween.ts";
import { addLimitsToGame } from "./components/limits.ts";
import { addKeyboardHandler, getThemeConfig } from "./components/utils.ts";
import { addWinHolder } from "./components/winHolder.ts";
import { addChangeThemeElement } from "./components/changeThemeElement.ts";

(async () => {
    const config = getThemeConfig();
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({
        background: config.background.color,
        height: 1050,
        width: 1200,
    });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    // Load the textures
    await Assets.load([
        {alias: "spinButton", src: config.background.spinButton,},
        ...config.symbols,
    ]);

    // Create different slot symbols
    const slotTextures = config.symbols.map(
        symbol => Texture.from(symbol.src)
    )

    const {reels} = addReels(app, slotTextures);
    const winText = addWinHolder(app);
    const tweenTo = addTween(app);
    const spinButton = addSpinButton(app);
    spinButton.addListener('pointerdown', () => {
        startPlay(config, reels, tweenTo, spinButton, winText);
    });

    addChangeThemeElement(app);
    addLimitsToGame(app);
    addReelsSpinningHandler(app, reels, slotTextures);
    addKeyboardHandler(() => startPlay(config, reels, tweenTo, spinButton, winText))
})();
