import { Sprite } from "pixi.js";

export function getPayout(config, sprite: Sprite) {
    const symbolName = sprite.texture.textureCacheIds[1];

    return config.symbols.filter(symbol => symbol.alias === symbolName)[0].payout
}