import colors from "../consts/colors";

export default class HowToPlayScene extends Phaser.Scene {
  constructor() {
    super({
      key: "HowToPlayScene",
    });
  }

  preload(): void {}

  create() {
    this.load.pack("preload", "../client/assets/pack.json", "preload");

    this.cameras.main.setBackgroundColor(colors.tan.string);
    this.logo = this.add.image(136, 142, "logo").setOrigin(0, 0);
    this.logo.displayHeight = 92;
    this.logo.displayWidth = 264;
    this.logo.x = this.cameras.main.width - 264 - 40;
    this.logo.y = this.cameras.main.height - 92 - 40;
    this.placeholderText = this.add.text(0, 0, "The How To Play Scene", {
      fontFamily: "Enter Command",
      fontSize: "64px",
      color: colors.blue.string,
    });
  }

  update(): void {
    // setTimeout(() => this.scene.start("GameScene"), 1000);
  }
}
