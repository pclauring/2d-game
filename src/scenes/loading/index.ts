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
    this.load.image("astronaut", "sprites/astronaut.png");
    this.load.atlas(
      "a-astronaut",
      "spritesheets/a-astronaut.png",
      "spritesheets/a-astronaut.json"
    );
    this.load.image({
      key: "martian-landscape",
      url: "tilemaps/tiles/martian-landscape.png",
    });
    this.load.tilemapTiledJSON(
      "martian-landscape",
      "tilemaps/json/martian-landscape.json"
    );
  }
  create(): void {
    this.scene.start("level-1-scene");
  }
}
