import Phaser from "phaser";
export default class GameScene extends Phaser.Scene {
  player: Phaser.GameObjects.Sprite;
  gridTest: Phaser.GameObjects.Image;
  moveKeys: Phaser.Input.Keyboard.CursorKeys;
  constructor() {
    super({
      key: "GameScene",
    });
  }
  create(): void {
    this.physics.world.setBounds(0, 0, 3200, 1200);
    this.cameras.main.setBounds(0, 0, 3200, 1200);

    this.gridTest = this.add.image(0, 0, "gridTest");
    this.gridTest.setOrigin(0, 0).setDisplaySize(3200, 1200);

    this.player = this.physics.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, "player");
    this.player.setScale(4, 4);
    this.player.setPosition(1600, 600);

    this.player.setCollideWorldBounds(true);

    this.physics.world.enable(this.player);

    this.moveKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.cameras.main.startFollow(this.player);
  }

  update(): void {
    if (this.moveKeys.down.isDown) {
      this.player.y += 20;
    } else if (this.moveKeys.up.isDown) {
      this.player.y -= 20;
    }

    if (this.moveKeys.left.isDown) {
      this.player.x -= 20;
    } else if (this.moveKeys.right.isDown) {
      this.player.x += 20;
    }

    this.player.setPosition(this.player.x, this.player.y);
  }
}
