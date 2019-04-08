import Phaser from "phaser";

import "./main.scss";

import LoadingScene from "./scenes/LoadingScene";
import MainMenuScene from "./scenes/MainMenuScene";
import GameScene from "./scenes/GameScene";

const config: GameConfig = {
  title: "CODENAME: Padawan",
  version: "1",
  width: 800,
  height: 600,
  zoom: 1,
  type: Phaser.AUTO,
  parent: "game",
  scene: [LoadingScene, MainMenuScene, GameScene],
  input: {
    keyboard: true,
  },
  backgroundColor: "#000000",
  render: { pixelArt: true, antialias: true },
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  new Game(config);
});
