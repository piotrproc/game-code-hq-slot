import { BALANCE_TEXT, BETLINES, DIM_TINT, SYMBOL_SIZE, WIN_TEXT } from "../consts.ts";
import { getPayout } from "./getPayout.ts";
import { Application, Graphics, Sprite } from "pixi.js";
import { balance, betlineGraphics, spinWin } from "../states.ts";
import { ReelProperties } from "../animation/reels.ts";
import { WinElements } from "./winHolder.ts";
import { playWinSound } from "../music.ts";
import { getLeftTopCornerPos } from "../utils.ts";

export function checkWin(app: Application, config, reels, winElements: WinElements) {

    const outcomeReels = reels.map((reel, indexY) => {
        return reel.symbols
            .filter((symbol) => dropExtremeSymbols(reel, symbol))
            .sort(comparisonFunction)
            .map((symbol, indexX) => {
                symbol.reelX = indexX;
                symbol.reelY = indexY;
                return symbol;
            });
    })

    BETLINES.forEach((line) => {
        checkBetlineWin(app, config,
            [
                outcomeReels[line[0].x][line[0].y],
                outcomeReels[line[1].x][line[1].y],
                outcomeReels[line[2].x][line[2].y]
            ], winElements);
    })
}

function dropExtremeSymbols(reel: ReelProperties, symbol: Sprite) {
    let minValue = 0;
    let maxValue = 0;

    reel.symbols.forEach(sym => {
        if (sym.x < minValue) {
            minValue = sym.x;
        }
        if (sym.x > maxValue) {
            maxValue = sym.x;
        }
    })

    return symbol.x > minValue && symbol.x < maxValue;
}

function comparisonFunction(a: Sprite, b: Sprite) {
    return a.x - b.x;
}

function checkBetlineWin(app: Application, config, sprites: Sprite[], winElements: WinElements) {
    const isWin = sprites.every(sprite => sprite && sprite.texture.textureCacheIds[1] === sprites[0].texture.textureCacheIds[1])

    if (isWin) {
        const payout = getPayout(config, sprites[0]);
        spinWin.value += payout;
        balance.value += payout;

        sprites.forEach(sprite => sprite.tint = DIM_TINT)

        winElements.spinWinText.text = WIN_TEXT + spinWin.value;
        winElements.balanceText.text = BALANCE_TEXT + balance.value;

        drawBetline(app, sprites);
        playWinSound(config);
    }
}

function drawBetline(app: Application, sprites) {
    const graphics = new Graphics();

    graphics.beginFill();
    graphics.lineStyle(4, 0xffffff);

    const leftTopCornerPos = getLeftTopCornerPos(app);
    graphics.moveTo(leftTopCornerPos.x + (sprites[0].reelX * SYMBOL_SIZE), leftTopCornerPos.y + (sprites[0].reelY * SYMBOL_SIZE));

    sprites.forEach((sprite, index) => {
        if (index > 0) {
            graphics.lineTo(leftTopCornerPos.x + (sprite.reelX * SYMBOL_SIZE), leftTopCornerPos.y + (sprite.reelY * SYMBOL_SIZE));
        }
    })
    graphics.endFill();

    app.stage.addChild(graphics);
    betlineGraphics.value.push(graphics);
}