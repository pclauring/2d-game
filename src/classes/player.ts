import { Actor } from "./actor";
export class Player extends Actor {
  private keyW: Phaser.Input.Keyboard.Key | null | undefined;
  private keyA: Phaser.Input.Keyboard.Key | null | undefined;
  private keyS: Phaser.Input.Keyboard.Key | null | undefined;
  private keyD: Phaser.Input.Keyboard.Key | null | undefined;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "astronaut");
    // KEYS
    this.keyW = this.scene?.input?.keyboard?.addKey("W");
    this.keyA = this.scene?.input?.keyboard?.addKey("A");
    this.keyS = this.scene?.input?.keyboard?.addKey("S");
    this.keyD = this.scene?.input?.keyboard?.addKey("D");
    // PHYSICS
    this.getBody().setSize(32, 32, true);
    //this.setDebug(true, false, 1);
    // ANIMATIONS
    this.initAnimations();
  }
  update(): void {
    this.getBody().setVelocity(0);
    if (!this.body) {
      return;
    }

    if (this.keyW?.isDown && this.keyD?.isDown) {
      this.anims.play("back-right", true);
      this.body.velocity.y = -78;
      this.body.velocity.x = 78;
    }
    if (this.keyW?.isDown && this.keyA?.isDown) {
      this.anims.play("back-left", true);
      this.body.velocity.y = -78;
      this.body.velocity.x = -78;
    }
    if (this.keyW?.isDown && !this.keyA?.isDown && !this.keyD?.isDown) {
      this.anims.play("back-walk", true);
      this.body.velocity.y = -110;
    }
    if (this.keyS?.isDown && this.keyD?.isDown) {
      this.anims.play("front-right", true);
      this.body.velocity.y = 78;
      this.body.velocity.x = 78;
    }
    if (this.keyS?.isDown && this.keyA?.isDown) {
      this.anims.play("front-left", true);
      this.body.velocity.y = 78;
      this.body.velocity.x = -78;
    }
    if (this.keyS?.isDown && !this.keyA?.isDown && !this.keyD?.isDown) {
      this.anims.play("front-walk", true);
      this.body.velocity.y = 110;
    }
    if (this.keyD?.isDown && !this.keyW?.isDown && !this.keyS?.isDown) {
      this.anims.play("right-walk", true);
      this.body.velocity.x = 110;
    }
    if (this.keyA?.isDown && !this.keyW?.isDown && !this.keyS?.isDown) {
      this.anims.play("left-walk", true);
      this.body.velocity.x = -110;
    }
  }

  private initAnimations(): void {
    this.scene.anims.create({
      key: "front-walk",
      frames: this.scene.anims.generateFrameNames("astronaut-atlas", {
        prefix: "astronaut-front-walk-",
        frames: [1, 0, 2, 0],
      }),
      frameRate: 8,
    });
    this.scene.anims.create({
      key: "front-left",
      frames: this.scene.anims.generateFrameNames("astronaut-atlas", {
        prefix: "astronaut-front-left-",
        frames: [1, 0, 2, 0],
      }),
      frameRate: 8,
    });
    this.scene.anims.create({
      key: "front-right",
      frames: this.scene.anims.generateFrameNames("astronaut-atlas", {
        prefix: "astronaut-front-right-",
        frames: [1, 0, 2, 0],
      }),
      frameRate: 8,
    });
    this.scene.anims.create({
      key: "back-right",
      frames: this.scene.anims.generateFrameNames("astronaut-atlas", {
        prefix: "astronaut-back-right-",
        frames: [1, 0, 2, 0],
      }),
      frameRate: 8,
    });
    this.scene.anims.create({
      key: "back-left",
      frames: this.scene.anims.generateFrameNames("astronaut-atlas", {
        prefix: "astronaut-back-left-",
        frames: [1, 0, 2, 0],
      }),
      frameRate: 8,
    });
    this.scene.anims.create({
      key: "back-walk",
      frames: this.scene.anims.generateFrameNames("astronaut-atlas", {
        prefix: "astronaut-back-walk-",
        frames: [1, 0, 2, 0],
      }),
      frameRate: 8,
    });
    this.scene.anims.create({
      key: "left-walk",
      frames: this.scene.anims.generateFrameNames("astronaut-atlas", {
        prefix: "astronaut-left-walk-",
        frames: [1, 0, 2, 0],
      }),
      frameRate: 8,
    });
    this.scene.anims.create({
      key: "right-walk",
      frames: this.scene.anims.generateFrameNames("astronaut-atlas", {
        prefix: "astronaut-right-walk-",
        frames: [1, 0, 2, 0],
      }),
      frameRate: 8,
    });
  }
}
