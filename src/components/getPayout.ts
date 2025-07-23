export function getPayout(config, sprite) {
    const symbolName = sprite.texture.textureCacheIds[1];

    return config.symbols.filter(symbol => symbol.alias === symbolName)[0].payout
}