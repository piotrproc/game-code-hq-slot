import { Application, Sprite } from "pixi.js";

let isSpin = false;

export function addSpinButton(app: Application, symbolSprites: Sprite[], reels: Sprite[]) {
    const spinButton = Sprite.from("spinButton");

    styleSpinButton(app, spinButton);

    const changingSymbolsCallback = () => changeSymbol(symbolSprites, reels);

    spinButton.on('pointerdown', () => handleClick(spinButton, app, changingSymbolsCallback));

    app.stage.addChild(spinButton);
}

function styleSpinButton(app: Application, spinButton: Sprite) {
    spinButton.anchor.set(0.5);

    spinButton.x = app.screen.width / 2;
    spinButton.y = app.screen.height * (5 / 6);

    spinButton.eventMode = 'static';
    spinButton.cursor = 'pointer';
}

function handleClick(spinButton: Sprite, app: Application, changingSymbolsCallback) {
    if (isSpin) {
        stopSpin(app, changingSymbolsCallback);
        spinButton.tint = 0xFFFFFF;
    } else {
        spin(app, changingSymbolsCallback);
        spinButton.tint = 0x808080;
    }
    isSpin = !isSpin;
}

function spin(app: Application, changingSymbolsCallback) {
    app.ticker.add(changingSymbolsCallback)
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
    symbolSprite.texture = newSymbol.texture;
}

function stopSpin(app: Application, changingSymbols) {
    app.ticker.remove(changingSymbols);
}