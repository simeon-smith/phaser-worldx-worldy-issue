import Phaser from "phaser";

import Player from "../objects/player";
import Desk from "../objects/desk";
export default class GameScene extends Phaser.Scene {
  player: Player;
  desk: Desk;
  gridTest: Phaser.GameObjects.Image;
  moveKeys: Phaser.Input.Keyboard.CursorKeys;
  speed: number;
  constructor() {
    super({
      key: "GameScene",
    });

    this.speed = 15;
  }
  preload(): void {
    this.physics.world.setBounds(-1600, -600, 3200, 1200);
    this.cameras.main.setBounds(-1600, -600, 3200, 1200);
    this.gridTest = this.add.image(0, 0, "gridTest");
    this.gridTest.setOrigin(0.5, 0.5).setDisplaySize(3200, 1200);

    this.player = new Player({
      scene: this,
      x: 0,
      y: 0,
      key: "playerBrown",
    });
    this.desk = new Desk({
      scene: this,
      x: 0,
      y: 525,
      key: "gridTest",
    });

    this.physics.add.collider(this.player.characterSprite, this.desk.deskSprite);
    this.physics.add.collider(this.desk.deskSprite, this.player.bullets, (desk, bullet) => {
      this.player.clearBullet(bullet);
    });
  }
  create(): void {}

  update(): void {
    this.player.update();
  }
}
