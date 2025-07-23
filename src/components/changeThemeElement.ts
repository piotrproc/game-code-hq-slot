import { Application, Text } from "pixi.js";
import { getThemeName } from "./utils.ts";
import { POSSIBLE_THEMES } from "./consts.ts";

export function addChangeThemeElement(app: Application){
    const winText = new Text('Change theme');

    winText.anchor.set(0.5);
    winText.x = app.screen.width / 2;
    winText.y = app.screen.height * (1 / 7);

    winText.eventMode = 'static';
    winText.cursor = 'pointer';

    winText.addListener('pointerdown', changeTheme);

    app.stage.addChild(winText);
    return winText;
}

function changeTheme() {
    const theme = getThemeName();
    const oppositeTheme = theme === POSSIBLE_THEMES[0] ? POSSIBLE_THEMES[1] : POSSIBLE_THEMES[0];

    window.location.href
        = location.protocol + '//' + location.host + location.pathname + "?theme=" + oppositeTheme;
}