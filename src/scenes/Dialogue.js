import { Scene } from "phaser";

export class Dialogue extends Scene {
  constructor() {
    super("Dialogue");
    this.faces = [1, 2];
  }

  preload() {
    this.load.image("eclipse-default", "/assets/eclipces/Default.png");
    this.load.image("eclipse-sad", "/assets/eclipces/Sad.png");
    this.load.image("eclipse-angry", "/assets/eclipces/Angry.png");
    this.load.image("speech-left", "/assets/speech-left.png");
    this.load.image("thought-left", "/assets/thought-left.png");
    this.load.image("home", "/assets/home.png");
    this.load.image("middle-dialogue", "/assets/middle-dialogue.png");
    this.load.json("jsonData", "/assets/mainhero.json");

    this.faces.map((face) => {
      return this.load.image(
        `face-${face}-sad`,
        `/assets/MAINHERO/start/body/${face}/emotions/face_${face}_sad.png`
      );
    });
    this.faces.map((face) => {
      return this.load.image(
        `face-${face}-angry`,
        `/assets/MAINHERO/start/body/${face}/emotions/face_${face}_angry.png`
      );
    });
  }

  create() {
    let characterDataString = localStorage.getItem("characterData");

    let characterData = JSON.parse(characterDataString);

    const data = this.cache.json.get("jsonData");

    this.index = 0;
    this.allBodies = ["body-1", "body-2"];
    this.allFrontHairs = ["hair-front1", "hair-front2"];
    this.allBackHairs = ["hair-back1", "hair-back2"];
    this.allClothes = ["clothes-orange", "clothes-grey"];

    this.allFaces = ["face-1-default", "face-2-default"];
    this.allSadFaces = ["face-1-sad", "face-2-sad"];
    this.allAngryFaces = ["face-1-angry", "face-2-angry"];

    this.add.image(512, 384, "background-bedroom");
    this.home = this.add.image(50, 50, "home").setInteractive();

    this.middleDialogue = this.add
      .image(512, 434, "middle-dialogue")
      .setInteractive()
      .setScale(1.1);

    this.text1 = this.add
      .text(350, 380, `${data[1].text}`, {
        fontFamily: "Nunito Sans",
        fontWeight: 700,
        fontSize: 20,
        color: "#141A3D",
        align: "left",
        letterSpacing: "0.4px",
        padding: {
          top: 10,
          bottom: 10,
        },
        wordWrap: { width: 330 },
        wordWrapWidth: 330,
      })
      .setDepth(2)
      .setAlpha(0);

    this.text2 = this.add
      .text(360, 380, `${data[5].text}`, {
        fontFamily: "Nunito Sans",
        fontWeight: 700,
        fontSize: 20,
        color: "#141A3D",
        align: "left",
        letterSpacing: "0.4px",
        padding: {
          top: 10,
          bottom: 10,
        },
        wordWrap: { width: 330 },
        wordWrapWidth: 330,
      })
      .setDepth(2)
      .setAlpha(0);

    this.textContainer1 = this.add.container(0, 0);

    this.textContainer1.add([this.middleDialogue, this.text1, this.text2]);

    //First Layer
    this.eclipse = this.add
      .image(490, 437, "eclipse-default")
      .setScale(0.4)
      .setDepth(1);

    this.eclipseSad = this.add
      .image(490, 437, "eclipse-sad")
      .setScale(0.4)
      .setDepth(1)
      .setAlpha(0);

    this.eclipseAngry = this.add
      .image(490, 437, "eclipse-angry")
      .setScale(0.4)
      .setDepth(1)
      .setAlpha(0);

    //Second Layer
    if (characterData.hair === 1) {
      this.hairBack = this.add
        .image(512, 534, this.allBackHairs[0])
        .setScale(0.5)
        .setInteractive()
        .setDepth(2);
    }
    if (characterData.hair === 2) {
      this.hairBack = this.add
        .image(512, 534, this.allBackHairs[1])
        .setScale(0.5)
        .setInteractive()
        .setDepth(2);
    }

    //Third Layer:
    if (characterData.body === 1) {
      this.body = this.add
        .image(512, 534, this.allBodies[0])
        .setScale(0.5)
        .setInteractive()
        .setDepth(3);

      let mask = this.make
        .graphics()
        .fillEllipse(512, 344, this.body.width * 0.3, this.body.height * 0.25);
      this.body.setMask(mask.createGeometryMask());
    }
    if (characterData.body === 2) {
      this.body = this.add
        .image(512, 534, this.allBodies[1])
        .setScale(0.5)
        .setInteractive()
        .setDepth(3);

      let mask = this.make
        .graphics()
        .fillEllipse(512, 344, this.body.width * 0.3, this.body.height * 0.25);
      this.body.setMask(mask.createGeometryMask());
    }

    // Fourth Layer
    if (characterData.cloths === 1) {
      this.cloths = this.add
        .image(512, 534, this.allClothes[0])
        .setScale(0.5)
        .setInteractive()
        .setDepth(4);

      let mask = this.make
        .graphics()
        .fillEllipse(
          512,
          344,
          this.cloths.width * 0.4,
          this.cloths.height * 0.25
        );
      this.cloths.setMask(mask.createGeometryMask());
    }

    if (characterData.cloths === 2) {
      this.cloths = this.add
        .image(512, 534, this.allClothes[1])
        .setScale(0.5)
        .setInteractive()
        .setDepth(4);

      let mask = this.make
        .graphics()
        .fillEllipse(
          512,
          344,
          this.cloths.width * 0.4,
          this.cloths.height * 0.25
        );
      this.cloths.setMask(mask.createGeometryMask());
    }

    //Fifth Layer
    if (characterData.body === 1) {
      this.face = this.add
        .image(512, 534, this.allFaces[0])
        .setScale(0.5)
        .setInteractive()
        .setDepth(5);

      this.sadFace = this.add
        .image(512, 534, this.allSadFaces[0])
        .setScale(0.5)
        .setInteractive()
        .setDepth(6)
        .setAlpha(0);

      this.angryFace = this.add
        .image(512, 534, this.allAngryFaces[0])
        .setScale(0.5)
        .setInteractive()
        .setDepth(6)
        .setAlpha(0);
    }

    if (characterData.body === 2) {
      this.face = this.add
        .image(512, 534, this.allFaces[1])
        .setScale(0.5)
        .setInteractive()
        .setDepth(5);

      this.sadFace = this.add
        .image(512, 534, this.allSadFaces[1])
        .setScale(0.5)
        .setInteractive()
        .setDepth(6)
        .setAlpha(0);

      this.angryFace = this.add
        .image(512, 534, this.allAngryFaces[1])
        .setScale(0.5)
        .setInteractive()
        .setDepth(6)
        .setAlpha(0);
    }
    //Sixth Layer

    if (characterData.hair === 1) {
      this.hairFront = this.add
        .image(512, 534, this.allFrontHairs[0])
        .setScale(0.5)
        .setInteractive()
        .setDepth(7);
    }
    if (characterData.hair === 2) {
      this.hairFront = this.add
        .image(512, 534, this.allFrontHairs[1])
        .setScale(0.5)
        .setInteractive()
        .setDepth(7);
    }

    this.speechLeft = this.add.image(525, 567, "speech-left").setDepth(1);
    this.speechLeft.setAlpha(0);

    this.heroName = this.add
      .text(540, 498, "SAMPLE", {
        fontFamily: "Passion One",
        fontWeight: 700,
        fontSize: 20,
        color: "#fff",
        align: "center",
        letterSpacing: "0.4px",
        padding: {
          top: 10,
          bottom: 10,
        },
      })
      .setDepth(2);

    this.heroName.setAlpha(0);

    this.heroText1 = this.add
      .text(400, 520, `${data[2].text}`, {
        fontFamily: "Nunito Sans",
        fontWeight: 700,
        fontSize: 20,
        color: "#141A3D",
        align: "left",
        letterSpacing: "0.4px",
        padding: {
          top: 10,
          bottom: 10,
        },
        wordWrap: { width: 276 },
        wordWrapWidth: 276,
      })
      .setDepth(2);

    this.heroText2 = this.add
      .text(400, 520, `${data[3].text}`, {
        fontFamily: "Nunito Sans",
        fontWeight: 700,
        fontSize: 20,
        color: "#141A3D",
        align: "left",
        letterSpacing: "0.4px",
        padding: {
          top: 10,
          bottom: 10,
        },
        wordWrap: { width: 276 },
        wordWrapWidth: 276,
      })
      .setDepth(2);

    this.heroText3 = this.add
      .text(400, 520, `${data[4].text}`, {
        fontFamily: "Nunito Sans",
        fontWeight: 700,
        fontSize: 20,
        color: "#141A3D",
        align: "left",
        letterSpacing: "0.4px",
        padding: {
          top: 10,
          bottom: 10,
        },
        wordWrap: { width: 276 },
        wordWrapWidth: 276,
      })
      .setDepth(2);

    this.heroText4 = this.add
      .text(400, 520, `${data[6].text}`, {
        fontFamily: "Nunito Sans",
        fontWeight: 700,
        fontSize: 20,
        color: "#141A3D",
        align: "left",
        letterSpacing: "0.4px",
        padding: {
          top: 10,
          bottom: 10,
        },
        wordWrap: { width: 276 },
        wordWrapWidth: 276,
      })
      .setDepth(2);

    this.heroText5 = this.add
      .text(400, 520, `${data[7].text}`, {
        fontFamily: "Nunito Sans",
        fontWeight: 700,
        fontSize: 20,
        color: "#141A3D",
        align: "left",
        letterSpacing: "0.4px",
        padding: {
          top: 10,
          bottom: 10,
        },
        wordWrap: { width: 276 },
        wordWrapWidth: 276,
      })
      .setDepth(2);

    this.heroText1.setAlpha(0);
    this.heroText2.setAlpha(0);
    this.heroText3.setAlpha(0);
    this.heroText4.setAlpha(0);
    this.heroText5.setAlpha(0);

    let container = this.add.container(0, 0);

    container.add([
      this.eclipse,
      this.eclipseSad,
      this.eclipseAngry,
      this.hairBack,
      this.body,
      this.cloths,
      this.face,
      this.sadFace,
      this.angryFace,
      this.hairFront,
      this.speechLeft,
    ]);

    container.setAlpha(0);

    this.home.on("pointerdown", () => {
      this.scene.start("ChooseBody");
    });

    this.tweens.chain({
      tweens: [
        {
          targets: this.text1,
          duration: 1000,
          alpha: 1,
        },
        {
          targets: this.textContainer1,
          x: 100,
          duration: 1000,
          alpha: 0,
          delay: 2000,
        },
        {
          targets: this.text1,
          duration: 1000,
          alpha: 0,
        },
        {
          targets: container,
          duration: 500,
          alpha: 1,
          delay: 1000,
        },
        {
          targets: this.speechLeft,
          duration: 500,
          alpha: 1,
          delay: 100,
        },
        {
          targets: this.heroName,
          duration: 500,
          alpha: 1,
        },
        {
          targets: this.heroText1,
          duration: 500,
          alpha: 1,
        },
        {
          targets: this.heroText1,
          duration: 1000,
          alpha: 0,
          delay: 2000,
        },
        {
          targets: this.heroText2,
          duration: 1000,
          alpha: 1,
          delay: 2000,
        },
        {
          targets: this.eclipseSad,
          duration: 500,
          alpha: 1,
        },
        {
          targets: this.sadFace,
          duration: 500,
          alpha: 1,
        },
        {
          targets: this.heroText2,
          duration: 1000,
          alpha: 0,
          delay: 2000,
        },
        {
          targets: this.sadFace,
          duration: 500,
          alpha: 0,
        },
        {
          targets: this.eclipseSad,
          duration: 500,
          alpha: 0,
        },
        {
          targets: this.heroText3,
          duration: 1000,
          alpha: 1,
          delay: 2000,
        },
        {
          targets: this.eclipseAngry,
          duration: 500,
          alpha: 1,
        },
        {
          targets: this.angryFace,
          duration: 500,
          alpha: 1,
        },
        {
          targets: this.eclipseAngry,
          duration: 500,
          alpha: 0,
          delay: 1000,
        },
        {
          targets: this.heroText3,
          duration: 1000,
          alpha: 0,
        },
        {
          targets: this.angryFace,
          duration: 500,
          alpha: 0,
        },
        {
          targets: this.heroName,
          duration: 500,
          alpha: 0,
        },
        {
          targets: container,
          duration: 100,
          alpha: 0,
        },
        {
          targets: this.textContainer1,
          duration: 1000,
          alpha: 1,
          delay: 1000,
        },
        {
          targets: this.text2,
          duration: 1000,
          alpha: 1,
        },
        {
          targets: this.textContainer1,
          x: 100,
          duration: 1000,
          alpha: 0,
          delay: 2000,
        },
        {
          targets: this.text2,
          duration: 1000,
          alpha: 0,
        },
        {
          targets: container,
          duration: 1000,
          alpha: 1,
          delay: 500,
        },
        {
          targets: this.speechLeft,
          duration: 500,
          alpha: 1,
          delay: 100,
        },
        {
          targets: this.heroName,
          duration: 500,
          alpha: 1,
        },
        {
          targets: this.heroText4,
          duration: 1000,
          alpha: 1,
        },
        {
          targets: this.heroText4,
          duration: 1000,
          alpha: 0,
          delay: 2000,
        },
        {
          targets: this.heroText5,
          duration: 1000,
          alpha: 1,
          delay: 2000,
        },
      ],
    });
  }
}
