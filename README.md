# Pixi Generic Slot

## Installation

Run following commands:

```
npm install
npm run dev
```

## Architecture

- Pixi.js version 7
- Code split across 3 main regions: animation, UI, win
- Animations are executed by pixi.ticker
- Multiple themes (configs) of the game. Currently: halloween and fruits.
    - Use can change the theme:
        - by clicking the ⟳ button
        - by changing URL e.g. add this to URL to have fruits theme `?theme=fruits`
- Configs of the themes can be found in `/src/data` folder 

## Notes

- Game is deployed by vercel:
    - https://game-code-hq-slot-git-main-piotr-procs-projects.vercel.app/
- Game has a still size - you need to adjust resolution of your browser to play the game
    - Game is not supported on mobile at the time    
