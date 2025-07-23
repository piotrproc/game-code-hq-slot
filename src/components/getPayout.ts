export function getPayout(config, sprite) {
    const texture = sprite.texture.label;
    const filename = texture.replace(/^.*[\\/]/, '');
    const symbolName = filename.split(".")[0];

    return config.symbols.filter(symbol => symbol.alias === symbolName)[0].payout
}