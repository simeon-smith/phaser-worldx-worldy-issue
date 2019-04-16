import Phaser from "phaser";

export default class Character {
  public scene: Phaser.Scene;
  public location: { x: number; y: number };
  public speed: number = 15;
  public key: string;
  public characterSprite: Phaser.GameObjects.Sprite;

  constructor({ scene, x, y, key }: { scene: Phaser.Scene; x: number; y: number; key: string }) {
    this.scene = scene;
    this.location = {
      x,
      y,
    };
    this.key = key;

    this.initCharacter();
  }

  private initCharacter() {
    this.characterSprite = this.scene.add.sprite(this.location.x, this.location.y, this.key);
    this.characterSprite.setOrigin(0.5, 0.5);

    this.scene.physics.world.enable(this.characterSprite);
    this.characterSprite.body.setCollideWorldBounds(true);
    this.scene.cameras.main.startFollow(this.characterSprite);
  }

  update(): void {}
}
