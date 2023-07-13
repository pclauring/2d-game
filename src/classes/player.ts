import { Actor } from "./actor";
export enum PlayerDirection {
  NORTH,
  NORTHEAST,
  EAST,
  SOUTHEAST,
  SOUTH,
  SOUTHWEST,
  WEST,
  NORTHWEST,
}
export class Player extends Actor {
  private keyW: Phaser.Input.Keyboard.Key | null | undefined;
  private keyA: Phaser.Input.Keyboard.Key | null | undefined;
  private keyS: Phaser.Input.Keyboard.Key | null | undefined;
  private keyD: Phaser.Input.Keyboard.Key | null | undefined;
  private keySpace: Phaser.Input.Keyboard.Key | null | undefined;
  private lastDirection: PlayerDirection;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "astronaut");
    // KEYS
    this.keyW = this.scene?.input?.keyboard?.addKey("W");
    this.keyA = this.scene?.input?.keyboard?.addKey("A");
    this.keyS = this.scene?.input?.keyboard?.addKey("S");
    this.keyD = this.scene?.input?.keyboard?.addKey("D");
    this.keySpace = this.scene?.input?.keyboard?.addKey("SPACE");
    this.lastDirection = PlayerDirection.SOUTH;
    // PHYSICS
    this.getBody().setSize(24, 32, true);
    //this.setDebug(true, false, 1);
    // ANIMATIONS
    this.initAnimations();
  }
  update(): void {
    this.getBody().setVelocity(0);
    if (!this.body) {
      return;
    }

    if (this.keySpace?.isDown) {
      switch (this.lastDirection) {
        case PlayerDirection.NORTH:
          this.anims.play("back-attack", true);
          break;
        case PlayerDirection.SOUTH:
          this.anims.play("front-attack", true);
          break;
        case PlayerDirection.WEST:
          this.anims.play("left-attack", true);
          break;

        default:
          break;
      }
    }
    if (this.keyW?.isDown && this.keyD?.isDown) {
      this.getBody().setOffset(-1, 0);
      this.anims.play("back-right", true);
      this.body.velocity.y = -78;
      this.body.velocity.x = 78;
      this.lastDirection = PlayerDirection.NORTHEAST;
    }
    if (this.keyW?.isDown && this.keyA?.isDown) {
      this.getBody().setOffset(-1, 0);
      this.anims.play("back-left", true);
      this.body.velocity.y = -78;
      this.body.velocity.x = -78;
      this.lastDirection = PlayerDirection.NORTHWEST;
    }
    if (this.keyW?.isDown && !this.keyA?.isDown && !this.keyD?.isDown) {
      this.getBody().setOffset(-1, 0);
      this.keySpace?.isDown
        ? this.anims.play("back-attack", true)
        : this.anims.play("back-walk", true);
      this.body.velocity.y = -110;
      this.lastDirection = PlayerDirection.NORTH;
    }
    if (this.keyS?.isDown && this.keyD?.isDown) {
      this.getBody().setOffset(-1, 0);
      this.anims.play("front-right", true);
      this.body.velocity.y = 78;
      this.body.velocity.x = 78;
      this.lastDirection = PlayerDirection.SOUTHEAST;
    }
    if (this.keyS?.isDown && this.keyA?.isDown) {
      this.getBody().setOffset(-1, 0);
      this.anims.play("front-left", true);
      this.body.velocity.y = 78;
      this.body.velocity.x = -78;
      this.lastDirection = PlayerDirection.SOUTHWEST;
    }
    if (this.keyS?.isDown && !this.keyA?.isDown && !this.keyD?.isDown) {
      this.getBody().setOffset(-1, 0);
      this.keySpace?.isDown;
      this.keySpace?.isDown
        ? this.anims.play("front-attack", true)
        : this.anims.play("front-walk", true);
      this.body.velocity.y = 110;
      this.lastDirection = PlayerDirection.SOUTH;
    }
    if (this.keyD?.isDown && !this.keyW?.isDown && !this.keyS?.isDown) {
      this.getBody().setOffset(-1, 0);
      this.anims.play("right-walk", true);
      this.body.velocity.x = 110;
      this.lastDirection = PlayerDirection.EAST;
    }
    if (this.keyA?.isDown && !this.keyW?.isDown && !this.keyS?.isDown) {
      this.getBody().setOffset(-1, 0);
      this.keySpace?.isDown
        ? this.anims.play("left-attack", true)
        : this.anims.play("left-walk", true);
      this.body.velocity.x = -110;
      this.lastDirection = PlayerDirection.WEST;
    }
  }

  private initAnimations(): void {
    this.scene.anims.create({
      key: "front-attack",
      frames: this.scene.anims.generateFrameNames("astronaut-atlas", {
        prefix: "astronaut-front-attack-",
        frames: [0, 2, 3, 4, 5, 6, 1, 0],
      }),
      frameRate: 8,
    });
    this.scene.anims.create({
      key: "back-attack",
      frames: this.scene.anims.generateFrameNames("astronaut-atlas", {
        prefix: "astronaut-back-attack-",
        frames: [0, 2, 3, 4, 5, 6, 1, 0],
      }),
      frameRate: 8,
    });
    this.scene.anims.create({
      key: "left-attack",
      frames: this.scene.anims.generateFrameNames("astronaut-atlas", {
        prefix: "astronaut-left-attack-",
        frames: [1, 2, 3, 4, 5, 6, 0, 0],
      }),
      frameRate: 8,
    });
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
