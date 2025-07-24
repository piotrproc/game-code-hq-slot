import { Howl } from 'howler';

export function playSpinSound(config) {
    const sfx = {
        spinSound: new Howl({
            src: [
                config.music.spinSound,
            ]
        })
    }

    sfx.spinSound.play();
}

export function playWinSound(config) {
    const sfx = {
        winSound: new Howl({
            src: [
                config.music.winSound,
            ]
        })
    }

    sfx.winSound.play();
}
