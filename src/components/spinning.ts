export const running = {value: false};

// Function to start playing.
export function startPlay(reels, tweenTo, spinButton) {
    if (running.value) {
        return;
    }
    running.value = true;
    spinButton.tint = 0x808080;
    spinButton.eventMode = "none";

    for (let i = 0; i < reels.length; i++) {
        const r = reels[i];
        const extra = Math.floor(Math.random() * 3);
        const target = r.position + 10 + i * 5 + extra;
        const time = 2500 + i * 600 + extra * 600;

        tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? () => reelsComplete(spinButton) : null);
    }
}

// Reels done handler.
function reelsComplete(spinButton) {
    running.value = false;
    spinButton.tint = 0xFFFFFF;
    spinButton.eventMode = "static";
}

// Backout function from tweenjs.
// https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
function backout(amount) {
    return (t) => --t * t * ((amount + 1) * t + amount) + 1;
}

