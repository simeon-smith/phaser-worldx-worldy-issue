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
  private files: { key: string; url: string }[] = [];

  constructor() {
    super({
      key: "HowToPlayScene",
    });
  }

  preload(): void {
    const mainAssets = this.cache.json.get("mainAssets");
    console.log(mainAssets);

    mainAssets.main.files.forEach(
      (file: { type: string; key: string; url: string; frameConfig?: { frameWidth: number; frameHeight: number } }) => {
        if (file.type === "spritesheet") {
          this.load.spritesheet(file.key, file.url, file.frameConfig);
        } else {
          this.load[file.type](file.key, file.url);
        }
      },
    );
    // this.load();
  }

  create() {
    console.log("create");
    this.cameras.main.setBackgroundColor(colors.black.string);

    setTimeout(() => {
      this.logo = this.add.image(136, 142, "logo").setOrigin(0, 0);
      this.logo.displayHeight = 92;
      this.logo.displayWidth = 264;
      this.logo.x = this.cameras.main.width - 264 - 40;
      this.logo.y = this.cameras.main.height - 92 - 40;
      this.placeholderText = this.add.text(0, 0, "The How To Play Scene", {
        fontFamily: "EnterCommand",
        fontSize: "64px",
        color: colors.white.string,
      });
      this.createContinueButton();
    }, 250);
  }

  createContinueButton(): void {
    this.continueButton = this.add.text(200, 200, "Continue", {
      fontFamily: "EnterCommand",
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
}
