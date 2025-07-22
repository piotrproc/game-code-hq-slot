import { Application, Assets, Texture, } from 'pixi.js';
import { addSpinButton } from "./mycomponents/spinButton.ts";
import { startPlay } from "./mycomponents/spinning.ts";
import { addReels, addReelsSpinningHandler } from "./mycomponents/reels.ts";
import { addTween } from "./mycomponents/tween.ts";
import { addLimitsToGame } from "./mycomponents/limits.ts";

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

    const POSSIBLE_THEMES = ["halloween", "fruits"]

    const urlString = window.location.href;
    const url = new URL(urlString);
    const themeParam = url.searchParams.get("theme");
    const theme = themeParam && POSSIBLE_THEMES.includes(themeParam) ? themeParam : "halloween";
    const basicPath = `public/assets/symbols/${theme}`;

    // Load the textures
    await Assets.load([
        {alias: "spinButton", src: "public/assets/spinButton.png",},
        {alias: "SYM3", src: `${basicPath}/SYM3.png`},
        {alias: "SYM4", src: `${basicPath}/SYM4.png`},
        {alias: "SYM5", src: `${basicPath}/SYM5.png`},
        {alias: "SYM6", src: `${basicPath}/SYM6.png`},
    ]);

    // Create different slot symbols
    const slotTextures = [
        Texture.from(`${basicPath}/SYM3.png`),
        Texture.from(`${basicPath}/SYM4.png`),
        Texture.from(`${basicPath}/SYM5.png`),
        Texture.from(`${basicPath}/SYM6.png`),
    ];

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
