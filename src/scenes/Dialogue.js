import { Scene } from "phaser";

export class Dialogue extends Scene {
  constructor() {
    super("Dialogue");
  }

  create() {
    this.add.image(512, 384, "background-bedroom");

    this.add
      .text(512, 460, "Dialogue", {
        fontFamily: "Arial Black",
        fontSize: 40,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      //   this.scene.start("ChooseBody");
    });
  }
}
