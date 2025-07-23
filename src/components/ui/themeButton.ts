import { Application, Text, TextStyle } from "pixi.js";
import { getThemeName } from "../utils.ts";
import { POSSIBLE_THEMES } from "../consts.ts";

export function addChangeThemeButton(app: Application){
    const style = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 60,
        fontWeight: 'bold',
    });

    const winText = new Text('⟳', style);

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
    const currentThemeIndex = POSSIBLE_THEMES.indexOf(theme);
    const nextThemeIndex = (currentThemeIndex + 1) % POSSIBLE_THEMES.length;

    const nextTheme = POSSIBLE_THEMES[nextThemeIndex];

    window.location.href
        = location.protocol + '//' + location.host + location.pathname + "?theme=" + nextTheme;
}