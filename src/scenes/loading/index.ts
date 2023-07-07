import { Scene, GameObjects } from "phaser";
export class LoadingScene extends Scene {
  private aardvark!: GameObjects.Sprite;

  constructor() {
    super("loading-scene");
  }

  preload(): void {
    this.load.baseURL = "assets/";
    // key: 'aardvark'
    // path from baseURL to file: 'sprites/aardvark.png'
    this.load.image("aardvark", "sprites/aardvark.png");
  }
  create(): void {
    this.scene.start("level-1-scene");
  }
}
