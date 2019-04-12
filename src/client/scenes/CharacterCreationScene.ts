import colors from "../consts/colors";
export default class CharacterCreationScene extends Phaser.Scene {
  logo: Phaser.GameObjects.Image;
  placeholderText: Phaser.GameObjects.Text;
  continueButton: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "CharacterCreationScene",
    });
  }

  state: { [any: string]: any } = {};

  preload(): void {}

  create(): void {
    this.cameras.main.setBackgroundColor(colors.black.string);
    this.logo = this.add.image(136, 142, "logo").setOrigin(0, 0);
    this.logo.displayHeight = 92;
    this.logo.displayWidth = 264;
    this.logo.x = this.cameras.main.width - 264 - 40;
    this.logo.y = this.cameras.main.height - 92 - 40;
    this.placeholderText = this.add.text(0, 0, "The Character Creation Screen", {
      fontFamily: "Enter Command",
      fontSize: "64px",
      color: colors.white.string,
    });

    this.createContinueButton();

    this.load.pack("game-load", "../client/assets/pack.json", "game-load");
  }

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
    this.scene.start("HowToPlayScene");
  }

  update(): void {
    // REMOVE THIS LATER - JUST TO AUTO CLICK THROUGH SCENE
    setTimeout(() => this.continue(), 1000);
  }
}
