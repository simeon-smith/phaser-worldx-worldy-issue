import Phaser from "phaser";

const config: GameConfig = {
  width: 800,
  height: 600,
  zoom: 2,
  type: Phaser.AUTO,
  parent: "game",
  scene: MainScene,
  input: {
    keyboard: true
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  }
  backgroundColor: "#000000",
  render: { pixelArt: true, antialias: true }
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  var game = new Game(config);
});