import { DIM_TINT } from "./consts.ts";

export function checkWin(reels) {

    const outcomeReels = reels.map(reel => {
        return reel.symbols.filter((symbol) => {
            return Math.round(symbol.x) > -75 && Math.round(symbol.x) < 375;
        }).sort(comparisonFunction)
    })

    checkBetlineWin(outcomeReels[0][0], outcomeReels[0][1], outcomeReels[0][2]);
    checkBetlineWin(outcomeReels[1][0], outcomeReels[1][1], outcomeReels[1][2]);
    checkBetlineWin(outcomeReels[2][0], outcomeReels[2][1], outcomeReels[2][2]);
    checkBetlineWin(outcomeReels[0][0], outcomeReels[1][1], outcomeReels[2][2]);
    checkBetlineWin(outcomeReels[0][2], outcomeReels[1][1], outcomeReels[2][0]);
}

function comparisonFunction(a, b) {
    return a.x - b.x;
}

function checkBetlineWin(sprite1, sprite2, sprite3) {
    const isWin = sprite1._texture.label === sprite2._texture.label
        && sprite2._texture.label === sprite3._texture.label;

    if (isWin) {
        sprite1.tint = DIM_TINT;
        sprite2.tint = DIM_TINT;
        sprite3.tint = DIM_TINT;
    }
}