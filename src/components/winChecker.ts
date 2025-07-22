export function checkWin(reels) {

    const outcomeReels = reels.map(reel => {
        return reel.symbols.filter((symbol) => {
            return Math.round(symbol.x) > -50 && Math.round(symbol.x) < 350;
        }).sort(sortFunction)
    })


    const isFirstLineWin = outcomeReels[0][0]._texture.label === outcomeReels[0][1]._texture.label
        && outcomeReels[0][0]._texture.label === outcomeReels[0][2]._texture.label;

    const isSecondLineWin = outcomeReels[1][0]._texture.label === outcomeReels[1][1]._texture.label
        && outcomeReels[1][0]._texture.label === outcomeReels[1][2]._texture.label;

    const isThirdLineWin = outcomeReels[2][0]._texture.label === outcomeReels[2][1]._texture.label
        && outcomeReels[2][0]._texture.label === outcomeReels[2][2]._texture.label;

    const isWin = isFirstLineWin || isSecondLineWin || isThirdLineWin;

    console.log(isWin)
}

function sortFunction(a, b) {
    return a.x - b.x;
}