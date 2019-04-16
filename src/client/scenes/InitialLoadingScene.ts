import Phaser from "phaser";
import AnimationHelper from "../helpers/AnimationHelper";
import colors from "../consts/colors";

export default class InitialLoadingScene extends Phaser.Scene {
  private animationHelperInstance: AnimationHelper;
  private loadingBar: Phaser.GameObjects.Graphics;
  private progressBar: Phaser.GameObjects.Graphics;

  constructor() {
    super({
      key: "InitialLoadingScene",
    });
  }

  preload(): void {
    this.cameras.main.setBackgroundColor(colors.black.string);
    this.createLoadingbar();

    this.load.on(
      "progress",
      function(value: number) {
        this.progressBar.clear();
        this.progressBar.fillStyle(colors.blue.hex, 1);
        this.progressBar.fillRect((this.cameras.main.width - 708) / 2, 886, 708 * value, 40);
      },
      this,
    );

    this.load.on(
      "complete",
      function() {
        this.animationHelperInstance = new AnimationHelper(this, this.cache.json.get("animationJSON"));
        this.add.tween({
          targets: [this.progressBar, this.loadingBar],
          props: { alpha: 0 },
          duration: 250,
          ease: "Quadratic",
          yoyo: false,
          onComplete: () => {
            this.progressBar.destroy();
            this.loadingBar.destroy();
          },
        });

        this.logo = this.add.image(272, 284, "logo").setOrigin(0, 0);

        this.add.tween({
          targets: this.logo,
          props: {
            displayWidth: 264,
            displayHeight: 92,
            x: this.cameras.main.width - 264 - 40,
            y: this.cameras.main.height - 92 - 40,
          },
          duration: 250,
          ease: "Quadratic",
          yoyo: false,
          delay: 250,
        });

        document
          .getElementById("game-wrapper")
          .querySelector("img")
          .classList.add("hide");

        this.scene.start("HowToPlayScene");
      },
      this,
    );

    this.load.pack("initial", "../client/assets/pack.json");
  }

  update(): void {}

  private createLoadingbar(): void {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(colors.gray.hex, 1);
    this.loadingBar.fillRect((this.cameras.main.width - 708) / 2, 886, 708, 40);
    this.progressBar = this.add.graphics();
  }
}
