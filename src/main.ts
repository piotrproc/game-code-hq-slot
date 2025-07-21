import { Application, Assets } from "pixi.js";
import { addSpinButton } from "./components/spinButton.ts";

const app = new Application();

async function setup() {
    await app.init({background: "#1099bb", resizeTo: window});
    document.body.appendChild(app.canvas);
}

async function preload() {
    const assets = [
        {
            alias: "spinButton",
            src: "./public/assets/spinButton.png",
        },
    ];

    await Assets.load(assets);
}

(async () => {
    await setup();
    await preload();

    addSpinButton(app);
})();
