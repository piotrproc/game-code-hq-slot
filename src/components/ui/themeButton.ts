import { Application, Text, TextStyle } from "pixi.js";
import { getThemeName } from "../utils.ts";
import { POSSIBLE_THEMES } from "../consts.ts";

export function addChangeThemeButton(app: Application): Text {
    const style = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 60,
        fontWeight: 'bold',
    });

    const themeButton = new Text('⟳', style);
    styleThemeButton(app, themeButton);
    themeButton.addListener('pointerdown', changeTheme);

    app.stage.addChild(themeButton);
    return themeButton;
}

function styleThemeButton(app: Application, themeButton: Text) {
    themeButton.anchor.set(0.5);
    themeButton.x = app.screen.width / 2;
    themeButton.y = app.screen.height * (1 / 7);

    themeButton.eventMode = 'static';
    themeButton.cursor = 'pointer';
}

function changeTheme() {
    const theme = getThemeName();
    const currentThemeIndex = POSSIBLE_THEMES.indexOf(theme);
    const nextThemeIndex = (currentThemeIndex + 1) % POSSIBLE_THEMES.length;

    const nextTheme = POSSIBLE_THEMES[nextThemeIndex];

    window.location.href
        = location.protocol + '//' + location.host + location.pathname + "?theme=" + nextTheme;
}