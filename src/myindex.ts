import { Application, Assets, Texture, } from 'pixi.js';
import { addSpinButton } from "./mycomponents/spinButton.ts";
import { startPlay } from "./mycomponents/spinning.ts";
import { addReels, spinReels } from "./mycomponents/reels.ts";
import { addTween } from "./mycomponents/tween.ts";

(async () => {
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({
        background: '#1099bb',
        resizeTo: window,
        height: window.innerHeight,
        width: window.innerWidth,
    });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    // Load the textures
    await Assets.load([
        {alias: "spinButton", src: "./public/assets/spinButton.png",},
        {alias: "SYM3", src: 'https://pixijs.com/assets/eggHead.png'},
        {alias: "SYM4", src: 'https://pixijs.com/assets/flowerTop.png'},
        {alias: "SYM5", src: 'https://pixijs.com/assets/helmlok.png'},
        {alias: "SYM6", src: 'https://pixijs.com/assets/skully.png'},
    ]);

    // Create different slot symbols
    const slotTextures = [
        Texture.from('https://pixijs.com/assets/eggHead.png'),
        Texture.from('https://pixijs.com/assets/flowerTop.png'),
        Texture.from('https://pixijs.com/assets/helmlok.png'),
        Texture.from('https://pixijs.com/assets/skully.png'),
    ];

    const {reels} = addReels(app, slotTextures);
    const tweenTo = addTween(app);
    const spinButton = addSpinButton(app);
    spinButton.addListener('pointerdown', () => {
        startPlay(reels, tweenTo, spinButton);
    });

    spinReels(app, reels, slotTextures);
})();
