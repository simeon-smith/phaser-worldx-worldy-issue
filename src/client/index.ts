import Phaser from "phaser";
import Loading from "./scenes/Loading";

const config: GameConfig = {
  width: 800,
  height: 600,
  zoom: 1,
  type: Phaser.AUTO,
  parent: "game",
  scene: Loading,
  input: {
    keyboard: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
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
  var game = new Game(config);
});
