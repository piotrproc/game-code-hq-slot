import { Application, Sprite, Texture } from "pixi.js";

let isSpin = false;

export function addSpinButton(app: Application, symbolSprites: Sprite[], reels: Sprite[]) {
    const spinButton = Sprite.from("spinButton");

    spinButton.anchor.set(0.5);

    spinButton.x = app.screen.width / 2;
    spinButton.y = app.screen.height * (4 / 5);

    spinButton.eventMode = 'static';
    spinButton.cursor = 'pointer';

    const changingSymbols = () => changeSymbol(symbolSprites, reels);

    spinButton.on('pointerdown', () => handleClick(spinButton, app, changingSymbols));

    app.stage.addChild(spinButton);
}

function handleClick(spinButton: Sprite, app: Application, changingSymbols) {
    if (isSpin) {
        stopSpin(app, changingSymbols);
        spinButton.tint = 0xFFFFFF;
    } else {
        spin(app, changingSymbols);
        spinButton.tint = 0x808080;
    }
    isSpin = !isSpin;
}

function spin(app: Application, changingSymbols) {
    app.ticker.add(changingSymbols)
}

function changeSymbol(symbolSprites: Sprite[], reels: Sprite[]) {
    const randomIndexGenerator = () => Math.floor(Math.random() * reels.length)

    const randomIndex = randomIndexGenerator();
    const randomIndex2 = randomIndexGenerator();
    const randomIndex3 = randomIndexGenerator();

    changeSymbolSprite(symbolSprites[0], reels[randomIndex]);
    changeSymbolSprite(symbolSprites[1], reels[randomIndex2]);
    changeSymbolSprite(symbolSprites[2], reels[randomIndex3]);
}

function changeSymbolSprite(symbolSprite: Sprite, newSymbol: Sprite) {
    symbolSprite.texture = new Texture(newSymbol.texture);
}

function stopSpin(app: Application, changingSymbols) {
    app.ticker.remove(changingSymbols);
}