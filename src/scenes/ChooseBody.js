import { Scene } from "phaser";

export class ChooseBody extends Scene {
  constructor() {
    super("ChooseBody");
    this.bodiesPath = [
      "/assets/MAINHERO/start/body/1/body1.png",
      "/assets/MAINHERO/start/body/2/body2.png",
    ];
    this.faces = [1, 2];
  }

  preload() {
    this.load.image("btn-left", "/assets/btn-left.png");
    this.load.image("btn-right", "/assets/btn-right.png");

    this.load.image(
      "hair-back1",
      "/assets/MAINHERO/start/hair/back/hair_back1.png"
    );

    this.bodiesPath.map((body, i) => {
      return this.load.image(`body-${i + 1}`, body);
    });

    this.load.image(
      "clothes-orange",
      "/assets/MAINHERO/start/clothes/cloths_orange.png"
    );

    this.faces.map((face) => {
      return this.load.image(
        `face-${face}-default`,
        `/assets/MAINHERO/start/body/${face}/emotions/face_${face}_default.png`
      );
    });

    this.load.image(
      "hair-front1",
      "/assets/MAINHERO/start/hair/front/hair-front1.png"
    );

    this.load.image("form", "/assets/form.png");
    this.load.image("confirm-btn", "/assets/confirm-btn.png");
    this.load.image("point", "/assets/point.png");
    this.load.image("active-point", "/assets/active-point.png");
  }

  create() {
    this.index = 0;
    this.allBodies = ["body-1", "body-2"];
    this.allFaces = ["face-1-default", "face-2-default"];

    this.add.image(512, 384, "background-bedroom").setScale(0.5);

    //Second Layer
    this.add.image(512, 434, "hair-back1").setScale(0.5);
    //Third Layer:
    this.body = this.add
      .image(512, 434, this.allBodies[this.index])
      .setScale(0.5)
      .setInteractive();
    // Fourth Layer
    this.add.image(512, 434, "clothes-orange").setScale(0.5);
    //Fifth Layer
    this.face = this.add
      .image(512, 434, this.allFaces[this.index])
      .setScale(0.5)
      .setInteractive();
    //Sixth Layer
    this.add.image(512, 434, "hair-front1").setScale(0.5);

    //points
    this.allPoints = [];

    let startX = 512;
    const distance = 20;

    this.allBodies.forEach((body, index) => {
      const x = startX + index * distance;
      const y = 564;
      this.allPoints.push(this.add.image(x, y, "point"));
    });

    let backButton = this.add.image(300, 500, "btn-left").setInteractive();
    let forwardButton = this.add.image(700, 500, "btn-right").setInteractive();

    backButton.on("pointerdown", () => {
      this.previousBody();
    });

    forwardButton.on("pointerdown", () => {
      this.nextBody();
    });

    //Form container
    let container = this.add.container(512, 634);

    let form = this.add.image(0, 0, "form");

    let text = this.add.text(-80, -15, "Choose your body", {
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
      this.scene.start("ChooseHair");
      let character;
      if (this.index === 0) {
        character = { body: 1 };
        localStorage.setItem("characterData", JSON.stringify(character));
      }
      if (this.index === 1) {
        character = { body: 2 };
        localStorage.setItem("characterData", JSON.stringify(character));
      }
    });
  }

  updateNumberOfChoiceText() {
    this.numberOfChoiseText.setText(
      `Choice ${this.index + 1}/${this.allBodies.length}`
    );
  }

  nextBody() {
    this.index = this.index >= this.allBodies.length - 1 ? 0 : this.index + 1;

    this.body.setTexture(this.allBodies[this.index]);
    this.face.setTexture(this.allFaces[this.index]);

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

  previousBody() {
    this.index = this.index <= 0 ? 1 : this.index - 1;

    this.body.setTexture(this.allBodies[this.index]);
    this.face.setTexture(this.allFaces[this.index]);

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
