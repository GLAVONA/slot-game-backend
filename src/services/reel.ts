import { RawResultType } from "@/types/SlotMachineTypes";
import SlotMachineConfig from "../config";

export default class Reel {
  reel;
  startingIndex = 0;
  private rowsCount: number = SlotMachineConfig.rowsCount;
  private symbolsInPlay: RawResultType[] = [];

  constructor(reel: number[]) {
    this.reel = reel;
  }

  /* Get a random starting index for a reel,
     depending on the length of the reel array */
  private setRandomStartingIndex(): void {
    const randomIndex = () => {
      const index = Math.floor(Math.random() * this.reel.length);
      return index;
    };
    this.startingIndex = randomIndex();
  }

  // Get the symbols and their indexes in play for the specific reel
  getSymbolsInPlay() {
    this.setRandomStartingIndex();
    const reelInPlay = [...this.reel];

    for (let i = 0; i < this.rowsCount; i++) {
      let pointer = (i + this.startingIndex) % reelInPlay.length;
      this.symbolsInPlay.push({
        position: pointer,
        symbol: this.reel[pointer],
      });
    }
    return this.symbolsInPlay;
  }
}
