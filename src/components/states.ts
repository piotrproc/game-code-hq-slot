import { Graphics } from "pixi.js";
import { DEFAULT_BALANCE } from "./consts.ts";

type State = {
    value: "Idle" | "Spin" | "Win";
}

export const betlineGraphics: { value: Graphics[] } = {value: []};
export const gameState: State = {value: "Idle"};
export const spinWin = {value: 0};
export const balance = {value: DEFAULT_BALANCE}