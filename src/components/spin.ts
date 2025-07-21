import { Application, Sprite } from "pixi.js";

let isSpin = false;

export function addSpinButtonClickHandler(app: Application, spinButton: Sprite, symbolSprites: Sprite[], reels: Sprite[]) {
    const changingSymbolsCallback = () => changeSymbol(symbolSprites, reels);

    return () => handleSpinClick(app, spinButton, changingSymbolsCallback);
}

function handleSpinClick(app: Application, spinButton: Sprite, changingSymbolsCallback) {
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