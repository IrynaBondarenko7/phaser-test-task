import { Scene } from "phaser";

export class ChooseHair extends Scene {
  constructor() {
    super("ChooseHair");
  }

  preload() {
    this.load.image(
      "hair-back2",
      "/assets/MAINHERO/start/hair/back/hair_back2.png"
    );
    this.load.image(
      "hair-front2",
      "/assets/MAINHERO/start/hair/front/hair-front2.png"
    );
  }

  create() {
    let characterDataString = localStorage.getItem("characterData");

    let characterData = JSON.parse(characterDataString);

    this.index = 0;
    this.allBodies = ["body-1", "body-2"];
    this.allFrontHairs = ["hair-front1", "hair-front2"];
    this.allBackHairs = ["hair-back1", "hair-back2"];

    this.allFaces = ["face-1-default", "face-2-default"];

    this.add.image(512, 384, "background-bedroom");

    //Second Layer
    this.hairBack = this.add
      .image(512, 434, this.allBackHairs[this.index])
      .setScale(0.5)
      .setInteractive();

    //Third Layer:
    if (characterData.body === 1) {
      this.body = this.add
        .image(512, 434, this.allBodies[0])
        .setScale(0.5)
        .setInteractive();
    }
    if (characterData.body === 2) {
      this.body = this.add
        .image(512, 434, this.allBodies[1])
        .setScale(0.5)
        .setInteractive();
    }

    // Fourth Layer
    this.add.image(512, 434, "clothes-orange").setScale(0.5);
    //Fifth Layer
    if (characterData.body === 1) {
      this.face = this.add
        .image(512, 434, this.allFaces[0])
        .setScale(0.5)
        .setInteractive();
    }
    if (characterData.body === 2) {
      this.face = this.add
        .image(512, 434, this.allFaces[1])
        .setScale(0.5)
        .setInteractive();
    }
    //Sixth Layer

    this.hairFront = this.add
      .image(512, 434, this.allFrontHairs[this.index])
      .setScale(0.5)
      .setInteractive();

    //points
    this.allPoints = [];

    let startX = 512;
    const distance = 20;

    this.allFrontHairs.forEach((hair, index) => {
      const x = startX + index * distance;
      const y = 564;
      this.allPoints.push(this.add.image(x, y, "point"));
    });

    let backButton = this.add.image(300, 500, "btn-left").setInteractive();
    let forwardButton = this.add.image(700, 500, "btn-right").setInteractive();

    backButton.on("pointerdown", () => {
      this.previousHair();
    });

    forwardButton.on("pointerdown", () => {
      this.nextHair();
    });

    //Form container
    let container = this.add.container(512, 634);

    let form = this.add.image(0, 0, "form");

    let text = this.add
      .text(-80, -15, "Choose your hair", {
        fontFamily: "Nunito Sans",
        fontWeight: 700,
        fontSize: 25,
        color: "#141A3D",
        align: "center",
        padding: {
          top: 10,
          bottom: 10,
        },
      })
      .setAlpha(0);

    this.numberOfChoiseText = this.add.text(
      -35,
      -53,
      `Choise 1/${this.allBodies.length}`,
      {
        fontFamily: "Nunito Sans",
        fontWeight: 700,
        fontSize: 15,
        color: "#fff",
        align: "center",
        padding: {
          top: 10,
          bottom: 10,
        },
      }
    );

    container.add([form, text, this.numberOfChoiseText]);

    //Confirm btn container

    let confirmBtn = this.add.image(0, 0, "confirm-btn");

    this.confirmContainer = this.add.container(512, 720);

    let confirmText = this.add.text(-30, -25, "Confirm", {
      fontFamily: "Nunito Sans",
      fontWeight: 700,
      fontSize: 20,
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

    this.confirmContainer.on("pointerdown", () => {
      this.scene.start("ChooseClothes");

      let character;

      if (this.index === 0) {
        character = {
          ...characterData,
          hair: 1,
        };
        localStorage.setItem("characterData", JSON.stringify(character));
      }
      if (this.index === 1) {
        character = {
          ...characterData,
          hair: 2,
        };
        localStorage.setItem("characterData", JSON.stringify(character));
      }
    });

    this.tweens.add({
      targets: text,
      duration: 1000,
      delay: 500,
      alpha: 1,
    });
  }

  updateNumberOfChoiceText() {
    this.numberOfChoiseText.setText(
      `Choice ${this.index + 1}/${this.allBodies.length}`
    );
  }

  nextHair() {
    this.index =
      this.index >= this.allBackHairs.length - 1 ? 0 : this.index + 1;

    this.hairBack.setTexture(this.allBackHairs[this.index]);
    this.hairFront.setTexture(this.allFrontHairs[this.index]);

    this.allPoints.forEach((point, index) => {
      if (index === this.index) {
        point.setTexture("active-point");
        point.setY(566);
      } else {
        point.setTexture("point");
        point.setY(point.y);
      }
    });

    this.updateNumberOfChoiceText();
  }

  previousHair() {
    this.index = this.index <= 0 ? 1 : this.index - 1;

    this.hairBack.setTexture(this.allBackHairs[this.index]);
    this.hairFront.setTexture(this.allFrontHairs[this.index]);

    this.allPoints.forEach((point, index) => {
      if (index === this.index) {
        point.setTexture("active-point");
        point.setY(566);
      } else {
        point.setTexture("point");
        point.setY(point.y);
      }
    });

    this.updateNumberOfChoiceText();
  }
}
