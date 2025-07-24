import { POSSIBLE_THEMES, SYMBOL_SIZE } from "./consts.ts";

import fruitsConfig from '../data/fruits.json';
import halloweenConfig from '../data/halloween.json';
import { Application } from "pixi.js";

export function getThemeConfig() {
    const theme = getThemeName();

    if (theme === "fruits") {
        return fruitsConfig;
    } else {
        return halloweenConfig;
    }
}

export function getThemeName(): string {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const themeParam = url.searchParams.get("theme");
    return themeParam && POSSIBLE_THEMES.includes(themeParam) ? themeParam : POSSIBLE_THEMES[0];
}

export function addKeyboardHandler(handler: () => void) {
    document.addEventListener('keypress', (e: KeyboardEvent) => {
        if (e.key === ' ') {
            handler();
        }
    });
}

export function getLeftTopCornerPos(app: Application) {
    return {
        x: Math.round((app.screen.width - 2 * SYMBOL_SIZE) / 2),
        y: (app.screen.height - SYMBOL_SIZE * 3) / 2,
    };
}