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
    this.getBody().setSize(32, 64, true);
    // ANIMATIONS
    this.initAnimations();
  }
  update(): void {
    this.getBody().setVelocity(0);
    if (!this.body) {
      return;
    }
    if (this.keyW?.isDown) {
      this.body.velocity.y = -110;
      this.anims.play("back-walk", true);
    }
    if (this.keyA?.isDown) {
      this.body.velocity.x = -110;
      //this.getBody().setOffset(48, 15);
      this.anims.play("left-walk", true);
    }
    if (this.keyS?.isDown) {
      this.body.velocity.y = 110;
      this.anims.play("front-walk", true);
    }
    if (this.keyD?.isDown) {
      this.body.velocity.x = 110;
      //dthis.getBody().setOffset(15, 15);
      this.anims.play("right-walk", true);
    }
  }

  private initAnimations(): void {
    this.scene.anims.create({
      key: "front-walk",
      frames: this.scene.anims.generateFrameNames("a-astronaut", {
        prefix: "front-walk-",
        frames: [1, 0, 2, 0],
      }),
      frameRate: 8,
    });
    this.scene.anims.create({
      key: "back-walk",
      frames: this.scene.anims.generateFrameNames("a-astronaut", {
        prefix: "back-walk-",
        frames: [1, 0, 2, 0],
      }),
      frameRate: 8,
    });
    this.scene.anims.create({
      key: "left-walk",
      frames: this.scene.anims.generateFrameNames("a-astronaut", {
        prefix: "left-walk-",
        frames: [1, 0, 2, 0],
      }),
      frameRate: 8,
    });
    this.scene.anims.create({
      key: "right-walk",
      frames: this.scene.anims.generateFrameNames("a-astronaut", {
        prefix: "right-walk-",
        frames: [1, 0, 2, 0],
      }),
      frameRate: 8,
    });
  }
}
