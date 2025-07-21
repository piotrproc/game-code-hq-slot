import { Application, Sprite } from "pixi.js";

export function addSpinButton(app: Application) {
  const spinButton = Sprite.from("spinButton");

  spinButton.anchor.set(0.5);

  spinButton.x = app.screen.width / 2;
  spinButton.y = app.screen.height * (4 / 5);

  app.stage.addChild(spinButton);
}
