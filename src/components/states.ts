import { Graphics } from "pixi.js";
import { DEFAULT_BALANCE } from "./consts.ts";

export const betlineGraphics: { value: Graphics[] } = {value: []};
export const isRunning = {value: false};
export const spinWin = {value: 0};
export const balance = {value: DEFAULT_BALANCE}