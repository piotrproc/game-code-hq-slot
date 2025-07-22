import { Application, Assets, BlurFilter, Container, Sprite, Texture, } from 'pixi.js';
import { addSpinButton } from "./mycomponents/spinButton.ts";
import { startPlay } from "./mycomponents/spinning.ts";
import { addReels } from "./mycomponents/reels.ts";

(async () => {
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({background: '#1099bb', resizeTo: window});

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    // Load the textures
    await Assets.load([
        // '/assets/symbols/SYM3.png',
        // '/assets/symbols/SYM4.png',
        // '/assets/symbols/SYM5.png',
        // '/assets/symbols/SYM6.png',
        // '/assets/symbols/SYM7.png',
        'https://pixijs.com/assets/eggHead.png',
        'https://pixijs.com/assets/flowerTop.png',
        'https://pixijs.com/assets/helmlok.png',
        'https://pixijs.com/assets/skully.png',
    ]);

    const REEL_WIDTH = 160;
    const SYMBOL_SIZE = 150;

    // Create different slot symbols
    const slotTextures = [
        // Texture.from('/assets/symbols/SYM3.png'),
        // Texture.from('/assets/symbols/SYM4.png'),
        // Texture.from('/assets/symbols/SYM5.png'),
        // Texture.from('/assets/symbols/SYM6.png'),
        // Texture.from('/assets/symbols/SYM7.png'),
        Texture.from('https://pixijs.com/assets/eggHead.png'),
        Texture.from('https://pixijs.com/assets/flowerTop.png'),
        Texture.from('https://pixijs.com/assets/helmlok.png'),
        Texture.from('https://pixijs.com/assets/skully.png'),
    ];

    const {reels} = addReels(app, slotTextures);
    addSpinButton(app, () => startPlay(reels, tweenTo));

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

    // Very simple tweening utility function. This should be replaced with a proper tweening library in a real product.
    const tweening = [];

    function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
        const tween = {
            object,
            property,
            propertyBeginValue: object[property],
            target,
            easing,
            time,
            change: onchange,
            complete: oncomplete,
            start: Date.now(),
        };

        tweening.push(tween);

        return tween;
    }

    // Listen for animate update.
    app.ticker.add(() => {
        const now = Date.now();
        const remove = [];

        for (let i = 0; i < tweening.length; i++) {
            const t = tweening[i];
            const phase = Math.min(1, (now - t.start) / t.time);

            t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
            if (t.change) t.change(t);
            if (phase === 1) {
                t.object[t.property] = t.target;
                if (t.complete) t.complete(t);
                remove.push(t);
            }
        }
        for (let i = 0; i < remove.length; i++) {
            tweening.splice(tweening.indexOf(remove[i]), 1);
        }
    });

    // Basic lerp funtion.
    function lerp(a1, a2, t) {
        return a1 * (1 - t) + a2 * t;
    }
})();
