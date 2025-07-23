import { checkWin } from "../win/winChecker.ts";
import { BALANCE_TEXT, DEFAULT_TINT, DIM_TINT, SPIN_COST, WIN_TEXT } from "../consts.ts";
import { Application } from "pixi.js";
import { balance, betlineGraphics, isRunning, spinWin } from "../states.ts";

// Function to start playing.
export function startPlay(app: Application, config, reels, tweenTo, spinButton, winElements) {
    if (isRunning.value) {
        return;
    }

    onStartSpin(reels, spinButton, winElements);

    for (let i = 0; i < reels.length; i++) {
        const r = reels[i];
        const extra = Math.floor(Math.random() * 3);
        const target = r.position + 10 + i * 5 + extra;
        const time = 2500 + i * 600 + extra * 600;

        tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? () => reelsComplete(app, config, reels, spinButton, winElements) : null);
    }
}

function onStartSpin(reels, spinButton, winElements) {
    setReelsToDefault(reels);
    isRunning.value = true;
    spinButton.tint = DIM_TINT;
    spinButton.eventMode = "none";
    betlineGraphics.value.forEach(graphic => {
        graphic.destroy();
    })
    betlineGraphics.value = [];

    spinWin.value = 0;
    winElements.spinWinText.text = WIN_TEXT + spinWin.value;

    balance.value -= SPIN_COST;
    winElements.balanceText.text = BALANCE_TEXT + balance.value;
}

// Backout function from tweenjs.
// https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
function backout(amount) {
    return (t) => --t * t * ((amount + 1) * t + amount) + 1;
}

// Reels done handler.
function reelsComplete(app, config, reels, spinButton, winElements) {
    isRunning.value = false;
    spinButton.tint = DEFAULT_TINT;
    spinButton.eventMode = "static";

    checkWin(app, config, reels, winElements);

    if (balance.value < SPIN_COST) {
        disableSpinButton(spinButton);
    }
}

function disableSpinButton(spinButton) {
    spinButton.tint = DIM_TINT;
    spinButton.eventMode = "none";
}

function setReelsToDefault(reels) {
    reels.forEach(reel => {
        reel.symbols.forEach(symbol => {
            symbol.tint = DEFAULT_TINT;
        })
    })
}
