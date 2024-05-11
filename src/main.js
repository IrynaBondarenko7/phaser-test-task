import { Boot } from "./scenes/Boot";
import { ChooseBody } from "./scenes/ChooseBody";
import { ChooseHair } from "./scenes/ChooseHair";
import { StartGame } from "./scenes/StartGame";
import { Preloader } from "./scenes/Preloader";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#028af8",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Boot, Preloader, StartGame, ChooseBody, ChooseHair],
};

export default new Phaser.Game(config);
