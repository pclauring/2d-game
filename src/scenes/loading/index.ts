import { Scene, GameObjects } from "phaser";
export class LoadingScene extends Scene {
  private aardvark!: GameObjects.Sprite;

  constructor() {
    super("loading-scene");
  }

  preload(): void {
    this.load.baseURL = "assets/";
    this.load.image("astronaut", "sprites/astronaut.png");
    this.load.atlas(
      "a-astronaut",
      "spritesheets/a-astronaut.png",
      "spritesheets/a-astronaut.json"
    );
    this.load.atlas(
      "astronaut-atlas",
      "spritesheets/astronaut_atlas.png",
      "spritesheets/astronaut_atlas.json"
    );
    this.load.image({
      key: "martian-landscape",
      url: "tilemaps/tiles/martian-landscape.png",
    });
    this.load.tilemapTiledJSON(
      "martian-landscape",
      "tilemaps/json/martian-landscape.json"
    );
    this.load.spritesheet("map-objects", "tilemaps/tiles/alien-objects.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
  create(): void {
    this.scene.start("level-1-scene");
  }
}
