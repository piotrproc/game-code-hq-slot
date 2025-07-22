let running = false;

// Function to start playing.
export function startPlay(reels, tweenTo) {
    if (running) return;
    running = true;

    for (let i = 0; i < reels.length; i++) {
        const r = reels[i];
        const extra = Math.floor(Math.random() * 3);
        const target = r.position + 10 + i * 5 + extra;
        const time = 2500 + i * 600 + extra * 600;

        tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
    }
}

// Reels done handler.
function reelsComplete() {
    running = false;
}

// Backout function from tweenjs.
// https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
function backout(amount) {
    return (t) => --t * t * ((amount + 1) * t + amount) + 1;
}

//
// function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
//     const tween = {
//         object,
//         property,
//         propertyBeginValue: object[property],
//         target,
//         easing,
//         time,
//         change: onchange,
//         complete: oncomplete,
//         start: Date.now(),
//     };
//
//     tweening.push(tween);
//
//     return tween;
// }
