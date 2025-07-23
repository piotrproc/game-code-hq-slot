import { BALANCE_TEXT, DIM_TINT, LEFT_TOP_CORNER, SYMBOL_SIZE, WIN_TEXT } from "../consts.ts";
import { getPayout } from "./getPayout.ts";
import { Application, Graphics } from "pixi.js";
import { balance, betlineGraphics, spinWin } from "../states.ts";

export function checkWin(app: Application, config, reels, winElements) {

    const outcomeReels = reels.map((reel, indexY) => {
        return reel.symbols.filter((symbol) => {
            return Math.round(symbol.x) > -75 && Math.round(symbol.x) < 375;
        }).sort(comparisonFunction)
            .map((symbol, indexX) => {
                symbol.myX = indexX;
                symbol.myY = indexY;
                return symbol;
            });
    })

    checkBetlineWin(app, config, outcomeReels[0][0], outcomeReels[0][1], outcomeReels[0][2], winElements);
    checkBetlineWin(app, config, outcomeReels[1][0], outcomeReels[1][1], outcomeReels[1][2], winElements);
    checkBetlineWin(app, config, outcomeReels[2][0], outcomeReels[2][1], outcomeReels[2][2], winElements);
    checkBetlineWin(app, config, outcomeReels[0][0], outcomeReels[1][1], outcomeReels[2][2], winElements);
    checkBetlineWin(app, config, outcomeReels[0][2], outcomeReels[1][1], outcomeReels[2][0], winElements);
}

function comparisonFunction(a, b) {
    return a.x - b.x;
}

function checkBetlineWin(app, config, sprite1, sprite2, sprite3, winElements) {
    const isWin = sprite1.texture.textureCacheIds[1] === sprite2.texture.textureCacheIds[1]
        && sprite2.texture.textureCacheIds[1] === sprite3.texture.textureCacheIds[1];

    if (isWin) {
        const payout = getPayout(config, sprite1);
        spinWin.value += payout;
        balance.value += payout;

        sprite1.tint = DIM_TINT;
        sprite2.tint = DIM_TINT;
        sprite3.tint = DIM_TINT;
        winElements.spinWinText.text = WIN_TEXT + spinWin.value;
        winElements.balanceText.text = BALANCE_TEXT + balance.value;

        drawBetline(app, sprite1, sprite2, sprite3);
    }
}

function drawBetline(app, sprite1, sprite2, sprite3) {
    const graphics = new Graphics();

    graphics.beginFill();
    graphics.lineStyle(4, 0xffffff);
    graphics.moveTo(LEFT_TOP_CORNER.x + (sprite1.myX * SYMBOL_SIZE), LEFT_TOP_CORNER.y + (sprite1.myY * SYMBOL_SIZE));
    graphics.lineTo(LEFT_TOP_CORNER.x + (sprite2.myX * SYMBOL_SIZE), LEFT_TOP_CORNER.y + (sprite2.myY * SYMBOL_SIZE));
    graphics.lineTo(LEFT_TOP_CORNER.x + (sprite3.myX * SYMBOL_SIZE), LEFT_TOP_CORNER.y + (sprite3.myY * SYMBOL_SIZE));
    graphics.endFill();

    app.stage.addChild(graphics);
    betlineGraphics.value.push(graphics);
}