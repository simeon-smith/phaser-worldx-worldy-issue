import Phaser from "phaser";

import colors from "../consts/colors";
import Character from "./character";

export default class Player extends Character {
  private bullets: Phaser.GameObjects.Group;
  private bulletSpeed: number = 2000;
  private fireRate: number = 200;
  private moveKeys: Phaser.Input.Keyboard.CursorKeys;
  private defaultFrameRate = 4;
  private defaultRepeat = 0;
  private nextFire: number = 0;
  private lookDeadzone: number = 50;
  private animations: { start: number; end: number; key: string; repeat?: number; frameRate?: number }[] = [
    {
      start: 0,
      end: 0,
      key: "Rest",
    },
    {
      start: 0,
      end: 0,
      key: "LookDown",
    },
    {
      start: 3,
      end: 3,
      key: "LookLeft",
    },
    {
      start: 4,
      end: 4,
      key: "LookDownLeft",
    },
    {
      start: 1,
      end: 1,
      key: "LookRight",
    },
    {
      start: 2,
      end: 2,
      key: "LookDownRight",
    },
    {
      start: 5,
      end: 5,
      key: "LookUp",
    },
    {
      start: 5,
      end: 5,
      key: "LookUpRight",
    },
    {
      start: 5,
      end: 5,
      key: "LookUpLeft",
    },
  ];

  constructor({ scene, x, y, key }: { scene: Phaser.Scene; x: number; y: number; key: string }) {
    super({ scene, x, y, key });

    this.initPlayer();
    this.initBullets();
  }

  private initPlayer() {
    this.moveKeys = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.animations.forEach(({ key, start, end, frameRate, repeat }) => {
      this.scene.anims.create({
        key: this.key + key,
        frames: this.scene.anims.generateFrameNames(this.key, { start, end }),
        frameRate: frameRate || this.defaultFrameRate,
        repeat: repeat || this.defaultRepeat,
      });
    });
  }

  private initBullets() {
    this.bullets = this.scene.physics.add.group({
      frameQuantity: 50,
      key: "player32blonde",
      setXY: { x: this.characterSprite.x, y: this.characterSprite.y },
      collideWorldBounds: true,
      active: false,
      visible: false,
    });

    Phaser.Actions.Call(
      this.bullets.getChildren(),
      (bullet) => {
        bullet.body.onWorldBounds = true;
        bullet.bullet = true;
      },
      this.scene,
    );
  }

  private fire() {
    if (this.scene.time.now > this.nextFire) {
      this.nextFire = this.scene.time.now + this.fireRate;

      const bullet = this.bullets.getFirstDead();
      bullet.active = true;
      bullet.visible = true;
      bullet.setPosition(this.characterSprite.x, this.characterSprite.y);

      this.scene.physics.world.on("worldbounds", (body: Phaser.Physics.Arcade.Body) => {
        const object = body.gameObject;

        if (object.bullet) {
          object.visible = false;
          object.active = false;
        }
      });

      this.scene.physics.moveTo(
        bullet,
        this.scene.input.mousePointer.x + (this.characterSprite.x - this.scene.game.canvas.width / 2),
        this.scene.input.mousePointer.y + (this.characterSprite.y - this.scene.game.canvas.height / 2),
        this.bulletSpeed,
      );
    }
  }

  private handleShooting() {
    if (this.scene.input.mousePointer.isDown) {
      this.fire();
    }
  }

  private handleInput() {
    if (this.moveKeys.down.isDown) {
      this.characterSprite.y += this.speed;
    } else if (this.moveKeys.up.isDown) {
      this.characterSprite.y -= this.speed;
    }
    if (this.moveKeys.left.isDown) {
      this.characterSprite.x -= this.speed;
    } else if (this.moveKeys.right.isDown) {
      this.characterSprite.x += this.speed;
    }
    // Setting the x y to the character x y so the x y honors the world bounds. The .setPosition does not honor the world bounds. So you must set the x y of a sprite which checks for the world bounds and use that for the location of this character.
    this.location.x = this.characterSprite.x;
    this.location.y = this.characterSprite.y;
    this.characterSprite.setPosition(this.location.x, this.location.y);
  }

  private handleLook() {
    const xDiff = this.scene.input.mousePointer.worldX - this.characterSprite.x;
    const yDiff = this.scene.input.mousePointer.worldY - this.characterSprite.y;
    let lookDirection = "";

    if (yDiff > this.lookDeadzone) {
      lookDirection += "Down";
    } else if (yDiff < -this.lookDeadzone) {
      lookDirection += "Up";
    }

    if (xDiff > this.lookDeadzone) {
      lookDirection += "Right";
    } else if (xDiff < -this.lookDeadzone) {
      lookDirection += "Left";
    }

    if (lookDirection) {
      this.characterSprite.anims.play(this.key + "Look" + lookDirection);
    } else {
      this.characterSprite.anims.play(this.key + "Rest");
    }
  }

  update(): void {
    this.handleInput();
    this.handleShooting();
    this.handleLook();
  }
}
