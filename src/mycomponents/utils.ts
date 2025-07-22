import { POSSIBLE_THEMES } from "./consts.ts";

export function getTheme() {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const themeParam = url.searchParams.get("theme");
    const theme = themeParam && POSSIBLE_THEMES.includes(themeParam) ? themeParam : "halloween";
    return `public/assets/symbols/${theme}`;
}