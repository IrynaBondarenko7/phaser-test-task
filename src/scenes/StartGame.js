import { Scene } from "phaser";

export class StartGame extends Scene {
  constructor() {
    super("StartGame");
  }

  preload() {
    this.load.image("confirm-btn", "/assets/confirm-btn.png");
  }

  create() {
    this.add.image(512, 384, "background-bedroom").setScale(0.5);

    this.add
      .text(352, 360, "Click to start the game", {
        fontFamily: "Arial Black",
        fontSize: 50,
        color: "#D34578",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    let confirmBtn = this.add.image(0, 0, "confirm-btn").setScale(1.5);

    this.confirmContainer = this.add.container(352, 520);

    let confirmText = this.add.text(-30, -35, "Start", {
      fontFamily: "Nunito Sans",
      fontWeight: 700,
      fontSize: 30,
      color: "#fff",
      align: "center",
      padding: {
        top: 10,
        bottom: 10,
      },
    });

    const width = 100;
    const height = 100;
    this.confirmContainer.setSize(width, height);

    this.confirmContainer.add([confirmBtn, confirmText]);
    this.confirmContainer.setInteractive();

    this.input.once("pointerdown", () => {
      this.scene.start("ChooseBody");
    });
  }
}
