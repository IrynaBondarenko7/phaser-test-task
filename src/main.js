import { Boot } from "./scenes/Boot";
import { ChooseBody } from "./scenes/ChooseBody";
import { ChooseHair } from "./scenes/ChooseHair";
import { StartGame } from "./scenes/StartGame";
import { Preloader } from "./scenes/Preloader";
import { ChooseClothes } from "./scenes/ChooseClothes";
import { Dialogue } from "./scenes/Dialogue";
import { NextDialogue } from "./scenes/NextDialogue";

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#FBD4E5",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [
    Boot,
    Preloader,
    StartGame,
    ChooseBody,
    ChooseHair,
    ChooseClothes,
    Dialogue,
    NextDialogue,
  ],
};

export default new Phaser.Game(config);
