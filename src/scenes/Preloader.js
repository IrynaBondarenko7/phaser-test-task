import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(512, 384, "background-bedroom");
  }

  preload() {}

  create() {
    this.scene.start("StartGame");
  }
}
