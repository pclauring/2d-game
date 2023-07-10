import { GameObjects, Scene, Tilemaps } from "phaser";
import { Player } from "../../classes/player";
export class Level1 extends Scene {
  private player!: Player;
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset | null;
  private wallsLayer!: Tilemaps.TilemapLayer | null;
  private groundLayer!: Tilemaps.TilemapLayer | null;
  private rocksLayer!: Tilemaps.TilemapLayer | null | undefined;
  constructor() {
    super("level-1-scene");
  }
  create(): void {
    this.initMap();
    this.player = new Player(this, 100, 100);
    this.rocksLayer && this.physics.add.collider(this.player, this.rocksLayer);
  }
  update(): void {
    this.player.update();
  }

  private initMap(): void {
    this.map = this.make.tilemap({
      key: "martian-landscape",
      tileWidth: 16,
      tileHeight: 16,
    });
    this.tileset = this.map.addTilesetImage(
      "martian-landscape",
      "martian-landscape"
    );
    if (!this.tileset) return;
    this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);
    this.wallsLayer = this.map.createLayer("Wall", this.tileset, 0, 0);

    if (!this.wallsLayer) return;
    this.physics.world.setBounds(
      8,
      0,
      this.wallsLayer.width - 16,
      this.wallsLayer.height
    );

    this.rocksLayer = this.map.createLayer("Rocks", this.tileset, 0, 0);
    this.rocksLayer?.setCollisionByProperty({ collides: true });

    //this.showDebugWalls();
  }

  private showDebugWalls(): void {
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    this.rocksLayer &&
      this.rocksLayer.renderDebug(debugGraphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      });
  }
}
