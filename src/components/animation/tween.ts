import { Application, Sprite } from "pixi.js";

type TweenConfig = {
    object: Sprite;
    property: string;
    propertyBeginValue: number;
    target: number;
    easing: (t: number) => number;
    time: number;
    change: (number) => void;
    complete: (number) => void;
    start: number
}

export function addTween(app: Application) {
    // Very simple tweening utility function. This should be replaced with a proper tweening library in a real product.
    const tweening:TweenConfig[] = [];

    function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
        const tween: TweenConfig = {
            object,
            property,
            propertyBeginValue: object[property],
            target,
            easing,
            time,
            change: onchange,
            complete: oncomplete,
            start: Date.now(),
        };

        tweening.push(tween);

        return tween;
    }

    // Listen for animate update.
    app.ticker.add(() => {
        const now = Date.now();
        const remove: TweenConfig[] = [];

        for (let i = 0; i < tweening.length; i++) {
            const t: TweenConfig = tweening[i];
            const phase = Math.min(1, (now - t.start) / t.time);

            t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
            if (t.change) t.change(t);
            if (phase === 1) {
                t.object[t.property] = t.target;
                if (t.complete) t.complete(t);
                remove.push(t);
            }
        }
        for (let i = 0; i < remove.length; i++) {
            tweening.splice(tweening.indexOf(remove[i]), 1);
        }
    });

    // Basic lerp funtion.
    function lerp(a1, a2, t) {
        return a1 * (1 - t) + a2 * t;
    }

    return tweenTo;
}

