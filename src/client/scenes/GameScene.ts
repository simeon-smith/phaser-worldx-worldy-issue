import Phaser from "phaser";

import Player from "../objects/player";
export default class GameScene extends Phaser.Scene {
  player: Player;
  gridTest: Phaser.GameObjects.Image;
  moveKeys: Phaser.Input.Keyboard.CursorKeys;
  speed: number;
  constructor() {
    super({
      key: "GameScene",
    });

    this.speed = 15;
  }
  create(): void {
    this.physics.world.setBounds(0, 0, 3200, 1200);
    this.cameras.main.setBounds(0, 0, 3200, 1200);
    this.gridTest = this.add.image(0, 0, "gridTest");
    this.gridTest.setOrigin(0, 0).setDisplaySize(3200, 1200);

    this.player = new Player({
      scene: this,
      x: 1600,
      y: 600,
      key: "playerBrown",
    });
  }

  update(): void {
    this.player.update();
  }
}
