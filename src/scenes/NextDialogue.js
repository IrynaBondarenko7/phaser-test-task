import { Scene } from "phaser";

export class NextDialogue extends Scene {
  constructor() {
    super("NextDialogue");
    this.faces = [1, 2];
  }

  preload() {
    this.load.image(
      "background-hall",
      "/assets/backgrounds/ons-lux-party-hall-6.jpg"
    );

    this.load.image("eclipse-surprised", "/assets/eclipces/Surprised.png");

    this.faces.map((face) => {
      return this.load.image(
        `face-${face}-surprised`,
        `/assets/MAINHERO/start/body/${face}/emotions/face_${face}_surprised.png`
      );
    });

    this.load.image("russell-body", "/assets/Russell/body.png");
    this.load.image("hair-back-russell", "/assets/Russell/hair/hair_back.png");
    this.load.image(
      "hair-front-russell",
      "/assets/Russell/hair/hair_front.png"
    );
    this.load.image("russell-cloths", "/assets/Russell/cloths.png");
    this.load.image(
      "russell-face",
      "/assets/Russell/emotions/face_1_default.png"
    );
    this.load.image("speech-left", "/assets/speech-left.png");
  }

  create() {
    let characterDataString = localStorage.getItem("characterData");

    let characterData = JSON.parse(characterDataString);

    const data = this.cache.json.get("jsonData");

    this.index = 0;
    this.allBodies = ["body-1", "body-2"];
    this.allFrontHairs = ["hair-front1", "hair-front2"];
    this.allBackHairs = ["hair-back1", "hair-back2"];
    this.allClothes = ["clothes-orange", "clothes-grey", "clothes-pink"];

    this.allFaces = ["face-1-default", "face-2-default"];
    this.allSurprisedFaces = ["face-1-surprised", "face-2-surprised"];

    this.add.image(512, 384, "background-hall").setScale(0.5);
    this.home = this.add.image(50, 50, "home").setInteractive().setScale(1.4);

    this.middleDialogue = this.add
      .image(352, 434, "middle-dialogue")
      .setInteractive()
      .setScale(1.1);

    this.text1 = this.add
      .text(200, 380, `${data[16].text}`, {
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
      .text(190, 380, `${data[17].text}`, {
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

    this.text3 = this.add
      .text(190, 380, `${data[20].text}`, {
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

    this.textContainer1.add([
      this.middleDialogue,
      this.text1,
      this.text2,
      this.text3,
    ]);

    //First Layer
    this.eclipse = this.add
      .image(330, 437, "eclipse-default")
      .setScale(0.4)
      .setDepth(1);

    this.eclipseSad = this.add
      .image(330, 437, "eclipse-sad")
      .setScale(0.4)
      .setDepth(1)
      .setAlpha(0);

    this.eclipseAngry = this.add
      .image(330, 437, "eclipse-angry")
      .setScale(0.4)
      .setDepth(1)
      .setAlpha(0);

    this.eclipseShy = this.add
      .image(330, 437, "eclipse-shy")
      .setScale(0.4)
      .setDepth(1)
      .setAlpha(0);

    this.eclipseSurprised = this.add
      .image(330, 437, "eclipse-surprised")
      .setScale(0.4)
      .setDepth(1)
      .setAlpha(0);

    //Second Layer
    if (characterData.hair === 1) {
      this.hairBack = this.add
        .image(352, 534, this.allBackHairs[0])
        .setScale(0.5)
        .setInteractive()
        .setDepth(2);
    }
    if (characterData.hair === 2) {
      this.hairBack = this.add
        .image(352, 534, this.allBackHairs[1])
        .setScale(0.5)
        .setInteractive()
        .setDepth(2);
    }

    //Third Layer:
    if (characterData.body === 1) {
      this.body = this.add
        .image(352, 534, this.allBodies[0])
        .setScale(0.5)
        .setInteractive()
        .setDepth(3);

      let mask = this.make
        .graphics()
        .fillEllipse(352, 344, this.body.width * 0.3, this.body.height * 0.25);
      this.body.setMask(mask.createGeometryMask());
    }
    if (characterData.body === 2) {
      this.body = this.add
        .image(352, 534, this.allBodies[1])
        .setScale(0.5)
        .setInteractive()
        .setDepth(3);

      let mask = this.make
        .graphics()
        .fillEllipse(352, 344, this.body.width * 0.3, this.body.height * 0.25);
      this.body.setMask(mask.createGeometryMask());
    }

    // Fourth Layer
    if (characterData.cloths === 1) {
      this.cloths = this.add
        .image(352, 534, this.allClothes[0])
        .setScale(0.5)
        .setInteractive()
        .setDepth(4);

      let mask = this.make
        .graphics()
        .fillEllipse(
          352,
          344,
          this.cloths.width * 0.4,
          this.cloths.height * 0.25
        );
      this.cloths.setMask(mask.createGeometryMask());
    }

    if (characterData.cloths === 2) {
      this.cloths = this.add
        .image(352, 534, this.allClothes[1])
        .setScale(0.5)
        .setInteractive()
        .setDepth(4);

      let mask = this.make
        .graphics()
        .fillEllipse(
          352,
          344,
          this.cloths.width * 0.4,
          this.cloths.height * 0.25
        );
      this.cloths.setMask(mask.createGeometryMask());
    }

    if (characterData.cloths === 3) {
      this.cloths = this.add
        .image(352, 534, this.allClothes[2])
        .setScale(0.5)
        .setInteractive()
        .setDepth(4);

      let mask = this.make
        .graphics()
        .fillEllipse(
          352,
          344,
          this.cloths.width * 0.4,
          this.cloths.height * 0.25
        );
      this.cloths.setMask(mask.createGeometryMask());
    }

    //Fifth Layer
    if (characterData.body === 1) {
      this.face = this.add
        .image(352, 534, this.allFaces[0])
        .setScale(0.5)
        .setInteractive()
        .setDepth(5);

      this.surprisedFace = this.add
        .image(352, 534, this.allSurprisedFaces[0])
        .setScale(0.5)
        .setInteractive()
        .setDepth(6)
        .setAlpha(0);
    }

    if (characterData.body === 2) {
      this.face = this.add
        .image(352, 534, this.allFaces[1])
        .setScale(0.5)
        .setInteractive()
        .setDepth(5);

      this.surprisedFace = this.add
        .image(352, 534, this.allSurprisedFaces[1])
        .setScale(0.5)
        .setInteractive()
        .setDepth(6)
        .setAlpha(0);
    }
    //Sixth Layer

    if (characterData.hair === 1) {
      this.hairFront = this.add
        .image(352, 534, this.allFrontHairs[0])
        .setScale(0.5)
        .setInteractive()
        .setDepth(7);
    }
    if (characterData.hair === 2) {
      this.hairFront = this.add
        .image(352, 534, this.allFrontHairs[1])
        .setScale(0.5)
        .setInteractive()
        .setDepth(7);
    }

    this.thoughtLeft = this.add.image(365, 567, "thought-left").setDepth(1);
    this.thoughtLeft.setAlpha(0);

    this.heroName = this.add
      .text(380, 510, "SAMPLE", {
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
      .text(240, 535, `${data[18].text}`, {
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

    let container = this.add.container(0, 0);

    container.add([
      this.eclipse,
      this.eclipseSad,
      this.eclipseAngry,
      this.eclipseShy,
      this.eclipseSurprised,
      this.hairBack,
      this.body,
      this.cloths,
      this.face,
      this.surprisedFace,
      this.hairFront,
      this.thoughtLeft,
    ]);

    container.setAlpha(0);

    this.home.on("pointerdown", () => {
      this.scene.start("ChooseBody");
    });

    //////Russell

    //First Layer
    this.eclipseRussell = this.add
      .image(375, 435, "eclipse-default")
      .setScale(0.4)
      .setDepth(1);

    //Second Layer
    this.hairBackRussell = this.add
      .image(382, 534, "hair-back-russell")
      .setScale(0.5)
      .setInteractive()
      .setDepth(2);

    //Third Layer:
    this.bodyRussell = this.add
      .image(382, 534, "russell-body")
      .setScale(0.5)
      .setInteractive()
      .setDepth(3);

    let maskRussell = this.make
      .graphics()
      .fillEllipse(
        340,
        344,
        this.bodyRussell.width * 0.4,
        this.bodyRussell.height * 0.25
      );
    this.bodyRussell.setMask(maskRussell.createGeometryMask());

    // Fourth Layer
    this.clothsRussell = this.add
      .image(382, 534, "russell-cloths")
      .setScale(0.5)
      .setInteractive()
      .setDepth(4);

    let maskClothsRussell = this.make
      .graphics()
      .fillEllipse(
        340,
        344,
        this.clothsRussell.width * 0.4,
        this.clothsRussell.height * 0.25
      );
    this.clothsRussell.setMask(maskClothsRussell.createGeometryMask());

    //Fifth Layer
    this.faceRussell = this.add
      .image(382, 534, "russell-face")
      .setScale(0.5)
      .setInteractive()
      .setDepth(5);

    //Sixth Layer
    this.hairFrontRussell = this.add
      .image(382, 534, "hair-front-russell")
      .setScale(0.5)
      .setInteractive()
      .setDepth(7);

    this.speechLeft = this.add.image(350, 537, "speech-left").setDepth(1);
    //  this.thoughtLeft.setAlpha(0);

    this.russellName = this.add
      .text(255, 468, "RUSSELL", {
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

    this.russellText1 = this.add
      .text(230, 490, `${data[19].text}`, {
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

    this.russellText2 = this.add
      .text(230, 500, `${data[21].text}`, {
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

    this.russellText1.setAlpha(0);
    this.russellText2.setAlpha(0);

    this.russellName.setAlpha(0);

    let endText = this.add
      .text(352, 360, "The End", {
        fontFamily: "Arial Black",
        fontSize: 50,
        color: "#D34578",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setAlpha(0);

    let containerRussell = this.add.container(0, 0);

    containerRussell.add([
      this.eclipseRussell,
      this.hairBackRussell,
      this.bodyRussell,
      this.clothsRussell,
      this.faceRussell,
      this.hairFrontRussell,
      this.speechLeft,
    ]);

    containerRussell.list.forEach((element) => {
      element.setFlipX(true);
    });

    containerRussell.setAlpha(0);

    //Animation to start Dialogue

    let tweens = this.tweens.chain({
      tweens: [
        {
          targets: this.text1,
          duration: 1000,
          alpha: 1,
          delay: 500,
        },
        {
          targets: this.text1,
          duration: 1000,
          alpha: 0,
          delay: 1000,
        },
        {
          targets: this.text2,
          duration: 1000,
          alpha: 1,
          delay: 1000,
        },
        {
          targets: this.textContainer1,
          x: 100,
          duration: 1000,
          alpha: 0,
          delay: 1000,
        },
        {
          targets: this.text2,
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
          targets: this.thoughtLeft,
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
          delay: 1000,
        },
        {
          targets: this.eclipseSurprised,
          duration: 500,
          alpha: 1,
        },
        {
          targets: this.surprisedFace,
          duration: 500,
          alpha: 1,
        },
        {
          targets: this.heroText1,
          duration: 500,
          alpha: 0,
          delay: 2000,
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
          targets: this.thoughtLeft,
          duration: 500,
          alpha: 0,
        },

        {
          targets: containerRussell,
          x: -10,
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
          targets: this.russellName,
          duration: 500,
          alpha: 1,
        },
        {
          targets: this.russellText1,
          duration: 500,
          alpha: 1,
          delay: 1000,
        },
        {
          targets: this.russellText1,
          duration: 500,
          alpha: 0,
          delay: 1000,
        },
        {
          targets: this.russellName,
          duration: 500,
          alpha: 0,
        },
        {
          targets: containerRussell,
          duration: 300,
          alpha: 0,
        },
        {
          targets: this.speechLeft,
          duration: 500,
          alpha: 0,
        },
        {
          targets: this.textContainer1,
          duration: 1000,
          alpha: 1,
          delay: 1000,
        },
        {
          targets: this.text3,
          duration: 1000,
          alpha: 1,
          delay: 1000,
        },
        {
          targets: this.textContainer1,
          x: 100,
          duration: 1000,
          alpha: 0,
          delay: 1000,
        },
        {
          targets: containerRussell,
          x: -10,
          duration: 500,
          alpha: 1,
          delay: 1000,
        },
        {
          targets: this.speechLeft,
          duration: 500,
          alpha: 1,
        },
        {
          targets: this.russellName,
          duration: 500,
          alpha: 1,
        },
        {
          targets: this.russellText2,
          duration: 500,
          alpha: 1,
          delay: 1000,
        },
        {
          targets: this.russellText2,
          duration: 500,
          alpha: 0,
          delay: 1000,
        },
        {
          targets: this.russellName,
          duration: 500,
          alpha: 0,
        },
        {
          targets: containerRussell,
          duration: 200,
          alpha: 0,
        },
        {
          targets: this.speechLeft,
          duration: 500,
          alpha: 0,
        },
        {
          targets: endText,
          duration: 500,
          alpha: 1,
          delay: 500,
        },
      ],
    });
  }
}
