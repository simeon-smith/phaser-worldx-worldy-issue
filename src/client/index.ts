import Phaser from "phaser";

import "./main.scss";

import InitialLoadingScene from "./scenes/InitialLoadingScene";
import HowToPlayScene from "./scenes/HowToPlayScene";
import MainMenuScene from "./scenes/MainMenuScene";
import GameScene from "./scenes/GameScene";
import colors from "./consts/colors";

const config: GameConfig = {
  title: "CODENAME: Padawan",
  version: "1",
  width: 1600,
  height: 1200,
  zoom: 0.5,
  type: Phaser.AUTO,
  parent: "game-wrapper",
  scene: [InitialLoadingScene, HowToPlayScene, MainMenuScene, GameScene],
  input: {
    keyboard: true,
    touch: true,
    mouse: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  backgroundColor: colors.black.hex,
  render: { pixelArt: true },
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  const game = new Game(config);
});
