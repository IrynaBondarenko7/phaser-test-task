// ChooseClothes;

import { Scene } from "phaser";

export class ChooseClothes extends Scene {
  constructor() {
    super("ChooseClothes");
  }

  preload() {
    this.load.image(
      "clothes-grey",
      "/assets/MAINHERO/start/clothes/cloths_grey.png"
    );
  }

  create() {
    let characterDataString = localStorage.getItem("characterData");

    let characterData = JSON.parse(characterDataString);

    this.index = 0;
    this.allBodies = ["body-1", "body-2"];
    this.allFrontHairs = ["hair-front1", "hair-front2"];
    this.allBackHairs = ["hair-back1", "hair-back2"];
    this.allClothes = ["clothes-orange", "clothes-grey"];

    this.allFaces = ["face-1-default", "face-2-default"];

    this.add.image(512, 384, "background-bedroom");

    //Second Layer

    if (characterData.hair === 1) {
      this.hairBack = this.add
        .image(512, 434, this.allBackHairs[0])
        .setScale(0.5)
        .setInteractive();
    }
    if (characterData.hair === 2) {
      this.hairBack = this.add
        .image(512, 434, this.allBackHairs[1])
        .setScale(0.5)
        .setInteractive();
    }

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
    this.cloths = this.add
      .image(512, 434, this.allClothes[this.index])
      .setScale(0.5)
      .setInteractive();

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

    if (characterData.hair === 1) {
      this.hairFront = this.add
        .image(512, 434, this.allFrontHairs[0])
        .setScale(0.5)
        .setInteractive();
    }
    if (characterData.hair === 2) {
      this.hairFront = this.add
        .image(512, 434, this.allFrontHairs[1])
        .setScale(0.5)
        .setInteractive();
    }

    //points
    this.allPoints = [];

    let startX = 512;
    const distance = 20;

    this.allClothes.forEach((cloths, index) => {
      const x = startX + index * distance;
      const y = 564;
      this.allPoints.push(this.add.image(x, y, "point"));
    });

    let backButton = this.add.image(300, 500, "btn-left").setInteractive();
    let forwardButton = this.add.image(700, 500, "btn-right").setInteractive();

    backButton.on("pointerdown", () => {
      this.previousCloths();
    });

    forwardButton.on("pointerdown", () => {
      this.nextCloths();
    });

    //Form container
    let container = this.add.container(512, 634);

    let form = this.add.image(0, 0, "form");

    let text = this.add.text(-110, -15, "Choose your clothes", {
      fontFamily: "Nunito Sans",
      fontWeight: 700,
      fontSize: 25,
      color: "#141A3D",
      align: "center",
      padding: {
        top: 10,
        bottom: 10,
      },
    });

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

    let confirmText = this.add.text(-70, -25, "Confirm and start", {
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
      this.scene.start("Dialogue");
      let character;

      if (this.index === 0) {
        character = {
          ...characterData,
          cloths: 1,
        };
        localStorage.setItem("characterData", JSON.stringify(character));
      }
      if (this.index === 1) {
        character = {
          ...characterData,
          cloths: 2,
        };
        localStorage.setItem("characterData", JSON.stringify(character));
      }
    });
  }

  updateNumberOfChoiceText() {
    this.numberOfChoiseText.setText(
      `Choice ${this.index + 1}/${this.allBodies.length}`
    );
  }

  nextCloths() {
    this.index = this.index >= this.allClothes.length - 1 ? 0 : this.index + 1;

    this.cloths.setTexture(this.allClothes[this.index]);

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

  previousCloths() {
    this.index = this.index <= 0 ? 1 : this.index - 1;

    this.cloths.setTexture(this.allClothes[this.index]);

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
