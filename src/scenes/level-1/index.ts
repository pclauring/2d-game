import { GameObjects, Scene, Tilemaps } from "phaser";
import { Player } from "../../classes/player";
import { gameObjectsToObjectPoints } from "../../helpers/gameObjectToObjectPoints";
export class Level1 extends Scene {
  private player!: Player;
  private capsules!: Phaser.GameObjects.Sprite[];
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
    this.initCapsules();
    this.rocksLayer && this.physics.add.collider(this.player, this.rocksLayer);
  }
  update(): void {
    this.player.update();
  }

  private initCapsules(): void {
    const capsulePoints = gameObjectsToObjectPoints(
      this.map.filterObjects("Capsules", (obj) => obj.name === "CapsulePoint")
    );
    this.capsules = capsulePoints.map((chestPoint) =>
      this.physics.add.sprite(chestPoint.x, chestPoint.y, "tiles_spr", 3)
    );
    this.capsules.forEach((capsule) => {
      this.physics.add.overlap(this.player, capsule, (obj1, obj2) => {
        obj2.destroy();
        this.cameras.main.flash();
      });
    });

    this.anims.create({
      key: "capsule-idle",
      frames: this.anims.generateFrameNames("map-objects", {
        frames: [3, 0, 1, 4, 1, 0],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.play("capsule-idle", this.capsules);
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
