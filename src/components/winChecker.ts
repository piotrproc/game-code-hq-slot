import { DIM_TINT, TOTAL_WIN_TEXT, WIN_TEXT } from "./consts.ts";
import { getPayout } from "./getPayout.ts";
import { spinWin, totalWin } from "./winHolder.ts";

export function checkWin(config, reels, winElements) {

    spinWin.value = 0;

    const outcomeReels = reels.map(reel => {
        return reel.symbols.filter((symbol) => {
            return Math.round(symbol.x) > -75 && Math.round(symbol.x) < 375;
        }).sort(comparisonFunction)
    })

    checkBetlineWin(config, outcomeReels[0][0], outcomeReels[0][1], outcomeReels[0][2], winElements);
    checkBetlineWin(config, outcomeReels[1][0], outcomeReels[1][1], outcomeReels[1][2], winElements);
    checkBetlineWin(config, outcomeReels[2][0], outcomeReels[2][1], outcomeReels[2][2], winElements);
    checkBetlineWin(config, outcomeReels[0][0], outcomeReels[1][1], outcomeReels[2][2], winElements);
    checkBetlineWin(config, outcomeReels[0][2], outcomeReels[1][1], outcomeReels[2][0], winElements);
}

function comparisonFunction(a, b) {
    return a.x - b.x;
}

function checkBetlineWin(config, sprite1, sprite2, sprite3, winElements) {
    const isWin = sprite1.texture.textureCacheIds[1] === sprite2.texture.textureCacheIds[1]
        && sprite2.texture.textureCacheIds[1] === sprite3.texture.textureCacheIds[1];

    if (isWin) {
        const payout = getPayout(config, sprite1);
        totalWin.value += payout;
        spinWin.value += payout

        sprite1.tint = DIM_TINT;
        sprite2.tint = DIM_TINT;
        sprite3.tint = DIM_TINT;
        winElements.winText.text = WIN_TEXT + spinWin.value;
        winElements.winTotalText.text = TOTAL_WIN_TEXT + totalWin.value;
    }
}