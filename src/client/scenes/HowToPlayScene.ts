import AnimationHelper from "../helpers/AnimationHelper";
import colors from "../consts/colors";
import filePack from "../assets/main.json";

export default class HowToPlayScene extends Phaser.Scene {
  logo: Phaser.GameObjects.Image;
  placeholderText: Phaser.GameObjects.Text;
  continueButton: Phaser.GameObjects.Text;
  private animationHelperInstance: AnimationHelper;
  private loadingBar: Phaser.GameObjects.Graphics;
  private progressBar: Phaser.GameObjects.Graphics;

  constructor() {
    super({
      key: "HowToPlayScene",
      pack: {
        key: "main",
        file: "../assets/main-pack.json",
      },
    });
  }

  preload(): void {
    this.cameras.main.setBackgroundColor(colors.black.string);
    this.createLoadingbar();
    this.createContinueButton();

    this.logo = this.add.image(136, 142, "logo").setOrigin(0, 0);
    this.logo.displayHeight = 92;
    this.logo.displayWidth = 264;
    this.logo.x = this.cameras.main.width - 264 - 40;
    this.logo.y = this.cameras.main.height - 92 - 40;
    this.placeholderText = this.add.text(0, 0, "The How To Play Scene", {
      fontFamily: "Enter Command",
      fontSize: "64px",
      color: colors.white.string,
    });

    this.load.on(
      "progress",
      function(value: number) {
        console.log(value);
        this.progressBar.clear();
        this.progressBar.fillStyle(colors.blue.hex, 1);
        this.progressBar.fillRect((this.cameras.main.width - 708) / 2, 886, 708 * value, 40);
      },
      this,
    );

    this.load.on(
      "complete",
      function() {
        console.log("complete");
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
      },
      this,
    );
  }

  create() {}

  createContinueButton(): void {
    this.continueButton = this.add.text(200, 200, "Continue", {
      fontFamily: "Enter Command",
      fontSize: "64px",
      color: colors.white.string,
      backgroundColor: colors.blue.string,
      padding: { left: 20, right: 20, top: 20, bottom: 20 },
    });

    this.continueButton.setInteractive();

    this.continueButton
      .on("pointerover", () => {
        this.add.tween({
          targets: this.continueButton,
          props: { alpha: 0.75 },
          duration: 250,
          ease: "Quadratic",
          yoyo: false,
        });
      })
      .on("pointerout", () => {
        this.add.tween({
          targets: this.continueButton,
          props: { alpha: 1 },
          duration: 250,
          ease: "Quadratic",
          yoyo: false,
        });
      })
      .on("pointerdown", () => {
        this.continue();
      });
  }

  continue(): void {
    this.scene.start("GameScene");
  }

  update(): void {
    // REMOVE THIS LATER - JUST TO AUTO CLICK THROUGH SCENE
    // setTimeout(() => this.continue(), 1000);
  }

  private createLoadingbar(): void {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(colors.gray.hex, 1);
    this.loadingBar.fillRect((this.cameras.main.width - 708) / 2, 886, 708, 40);
    this.progressBar = this.add.graphics();
  }
}
