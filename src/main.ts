import { Application, Assets, Texture, } from 'pixi.js';
import { addSpinButton } from "./components/ui/spinButton.ts";
import { startPlay } from "./components/animation/spinning.ts";
import { addReels, addReelsSpinningHandler } from "./components/animation/reels.ts";
import { addTween } from "./components/animation/tween.ts";
import { addLimitsToGame } from "./components/ui/limits.ts";
import { addKeyboardHandler, getThemeConfig } from "./components/utils.ts";
import { addWinHolderElements } from "./components/win/winHolder.ts";
import { addChangeThemeButton } from "./components/ui/themeButton.ts";

(async () => {
    const config = getThemeConfig();
    // Create a new application
    const app = new Application({
        background: config.background.color,
        height: 1050,
        width: 1200,
    });

    // Append the application canvas to the document body
    document.body.appendChild(app.view);

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
    const winElements = addWinHolderElements(app);
    const tweenTo = addTween(app);
    const spinButton = addSpinButton(app);
    spinButton.addListener('pointerdown', () => {
        startPlay(config, reels, tweenTo, spinButton, winElements);
    });

    addChangeThemeButton(app);
    addLimitsToGame(app);
    addReelsSpinningHandler(app, reels, slotTextures);
    addKeyboardHandler(() => startPlay(config, reels, tweenTo, spinButton, winElements))
})();
