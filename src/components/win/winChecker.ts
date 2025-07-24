import { BALANCE_TEXT, DIM_TINT, LEFT_TOP_CORNER, SYMBOL_SIZE, WIN_TEXT } from "../consts.ts";
import { getPayout } from "./getPayout.ts";
import { Application, Graphics } from "pixi.js";
import { balance, betlineGraphics, spinWin } from "../states.ts";

export function checkWin(app: Application, config, reels, winElements) {

    const outcomeReels = reels.map((reel, indexY) => {
        return reel.symbols.filter((symbol) => {
            return Math.round(symbol.x) > -50 && Math.round(symbol.x) < 350;
        }).sort(comparisonFunction)
            .map((symbol, indexX) => {
                symbol.reelX = indexX;
                symbol.reelY = indexY;
                return symbol;
            });
    })

    checkBetlineWin(app, config, [outcomeReels[0][0], outcomeReels[0][1], outcomeReels[0][2]], winElements);
    checkBetlineWin(app, config, [outcomeReels[1][0], outcomeReels[1][1], outcomeReels[1][2]], winElements);
    checkBetlineWin(app, config, [outcomeReels[2][0], outcomeReels[2][1], outcomeReels[2][2]], winElements);
    checkBetlineWin(app, config, [outcomeReels[0][0], outcomeReels[1][1], outcomeReels[2][2]], winElements);
    checkBetlineWin(app, config, [outcomeReels[0][2], outcomeReels[1][1], outcomeReels[2][0]], winElements);
}

function comparisonFunction(a, b) {
    return a.x - b.x;
}

function checkBetlineWin(app, config, sprites, winElements) {
    const isWin = sprites.every(sprite => sprite.texture.textureCacheIds[1] === sprites[0].texture.textureCacheIds[1])

    if (isWin) {
        const payout = getPayout(config, sprites[0]);
        spinWin.value += payout;
        balance.value += payout;

        sprites.forEach(sprite => sprite.tint = DIM_TINT)

        winElements.spinWinText.text = WIN_TEXT + spinWin.value;
        winElements.balanceText.text = BALANCE_TEXT + balance.value;

        drawBetline(app, sprites);
    }
}

function drawBetline(app, sprites) {
    const graphics = new Graphics();

    graphics.beginFill();
    graphics.lineStyle(4, 0xffffff);
    graphics.moveTo(LEFT_TOP_CORNER.x + (sprites[0].reelX * SYMBOL_SIZE), LEFT_TOP_CORNER.y + (sprites[0].reelY * SYMBOL_SIZE));

    sprites.forEach((sprite, index) => {
        if(index > 0) {
            graphics.lineTo(LEFT_TOP_CORNER.x + (sprite.reelX * SYMBOL_SIZE), LEFT_TOP_CORNER.y + (sprite.reelY * SYMBOL_SIZE));
        }
    })
    graphics.endFill();

    app.stage.addChild(graphics);
    betlineGraphics.value.push(graphics);
}