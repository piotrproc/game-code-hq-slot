import { DIM_TINT } from "./consts.ts";
import { getPayout } from "./getPayout.ts";

export function checkWin(config, reels) {

    const outcomeReels = reels.map(reel => {
        return reel.symbols.filter((symbol) => {
            return Math.round(symbol.x) > -75 && Math.round(symbol.x) < 375;
        }).sort(comparisonFunction)
    })

    checkBetlineWin(config, outcomeReels[0][0], outcomeReels[0][1], outcomeReels[0][2]);
    checkBetlineWin(config, outcomeReels[1][0], outcomeReels[1][1], outcomeReels[1][2]);
    checkBetlineWin(config, outcomeReels[2][0], outcomeReels[2][1], outcomeReels[2][2]);
    checkBetlineWin(config, outcomeReels[0][0], outcomeReels[1][1], outcomeReels[2][2]);
    checkBetlineWin(config, outcomeReels[0][2], outcomeReels[1][1], outcomeReels[2][0]);
}

function comparisonFunction(a, b) {
    return a.x - b.x;
}

function checkBetlineWin(config, sprite1, sprite2, sprite3) {
    const isWin = sprite1._texture.label === sprite2._texture.label
        && sprite2._texture.label === sprite3._texture.label;

    if (isWin) {
        const payout = getPayout(config, sprite1);

        sprite1.tint = DIM_TINT;
        sprite2.tint = DIM_TINT;
        sprite3.tint = DIM_TINT;
        console.log(payout);
    }
}