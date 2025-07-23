import { POSSIBLE_THEMES } from "./consts.ts";

import fruitsConfig from '../data/fruits.json';
import halloweenConfig from '../data/halloween.json';

export function getThemeConfig() {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const themeParam = url.searchParams.get("theme");
    const theme = themeParam && POSSIBLE_THEMES.includes(themeParam) ? themeParam : POSSIBLE_THEMES[0];

    if(theme === "fruits") {
        return fruitsConfig;
    }
    else {
        return halloweenConfig;
    }
}

export function addKeyboardHandler(handler) {
    document.addEventListener('keypress', (e: KeyboardEvent) => {
        if (e.key === ' ') {
            handler();
        }
    });
}