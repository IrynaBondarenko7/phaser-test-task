import { Scene } from "phaser";

export class StartGame extends Scene {
  constructor() {
    super("StartGame");
  }

  create() {
    this.add.image(512, 384, "background-bedroom");

    // this.add.image(512, 300, "logo");

    this.add
      .text(512, 460, "Start Game", {
        fontFamily: "Arial Black",
        fontSize: 80,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("ChooseBody");
    });
  }
}
