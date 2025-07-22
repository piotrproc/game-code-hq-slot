import { Application, Color, FillGradient, Graphics, TextStyle, Text } from "pixi.js";
import { SYMBOL_SIZE } from "./consts.ts";

export function addSpinButton(app: Application, clickHandler) {
    const margin = (app.screen.height - SYMBOL_SIZE * 3) / 2;

    const top = new Graphics().rect(0, 0, app.screen.width, margin).fill({color: 0x0});
    const bottom = new Graphics().rect(0, SYMBOL_SIZE * 3 + margin, app.screen.width, margin).fill({color: 0x0});

    const fill = new FillGradient(0, 0, 0, 2);

    const colors = [0xffffff, 0x00ff99].map((color) => Color.shared.setValue(color).toNumber());

    colors.forEach((number, index) => {
        const ratio = index / colors.length;

        fill.addColorStop(ratio, number);
    });

    // Add play text
    const style = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: {fill},
        stroke: {color: 0x4a1850, width: 5},
        dropShadow: {
            color: 0x000000,
            angle: Math.PI / 6,
            blur: 4,
            distance: 6,
        },
        wordWrap: true,
        wordWrapWidth: 440,
    });

    const playText = new Text('Spin the wheels!', style);

    playText.x = Math.round((bottom.width - playText.width) / 2);
    playText.y = app.screen.height - margin + Math.round((margin - playText.height) / 2);
    bottom.addChild(playText);

    // Add header text
    const headerText = new Text('PIXI MONSTER SLOTS!', style);

    headerText.x = Math.round((top.width - headerText.width) / 2);
    headerText.y = Math.round((margin - headerText.height) / 2);
    top.addChild(headerText);

    // app.stage.addChild(top);
    app.stage.addChild(bottom);

    // Set the interactivity.
    bottom.eventMode = 'static';
    bottom.cursor = 'pointer';
    bottom.addListener('pointerdown', () => {
        clickHandler();
    });

    return bottom;
}