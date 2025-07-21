import { Application, Assets } from "pixi.js";
import { addSpinButton } from "./components/spinButton.ts";

const app = new Application();

async function setup() {
  // Intialize the application.
  await app.init({ background: "#1099bb", resizeTo: window });

  // Then adding the application's canvas to the DOM body.
  document.body.appendChild(app.canvas);
}

async function preload() {
  // Create an array of asset data to load.
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
