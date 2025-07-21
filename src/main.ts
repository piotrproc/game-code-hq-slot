import { Application, Assets } from "pixi.js";
import { addSpinButton } from "./components/spinButton.ts";
import { addReels } from "./components/addReels.ts";

const app = new Application();

async function setup() {
    await app.init({background: "#1099bb", resizeTo: window});
    document.body.appendChild(app.canvas);
}

async function preload() {
    const assets = [
        {alias: "spinButton", src: "./public/assets/spinButton.png",},
        {alias: "SYM3", src: "./public/assets/symbols/SYM3.png",},
        {alias: "SYM4", src: "./public/assets/symbols/SYM4.png",},
        {alias: "SYM5", src: "./public/assets/symbols/SYM5.png",},
        {alias: "SYM6", src: "./public/assets/symbols/SYM6.png",},
        {alias: "SYM7", src: "./public/assets/symbols/SYM7.png",},
    ];

    await Assets.load(assets);
}

(async () => {
    await setup();
    await preload();

    const reels = addReels(app);
    addSpinButton(app, reels.symbols, reels.allSymbols);
})();
