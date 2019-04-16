import Phaser from "phaser";

import colors from "../consts/colors";

export default class Desk {
  public scene: Phaser.Scene;
  public location: { x: number; y: number };
  private health: number = 0;
  public key: string;
  public deskSprite: Phaser.GameObjects.Sprite;

  constructor({ scene, x, y, key }: { scene: Phaser.Scene; x: number; y: number; key: string }) {
    this.scene = scene;
    this.location = {
      x,
      y,
    };
    this.key = key;

    this.initDesk();
  }

  private initDesk() {
    this.deskSprite = this.scene.add.sprite(this.location.x, this.location.y, this.key);
    this.deskSprite.width = 400;
    this.deskSprite.setScale(0.25, 0.25);
    this.deskSprite.tint = colors.blue.hex;

    this.scene.physics.world.enable(this.deskSprite);
    this.deskSprite.body.immovable = true;
  }
}
