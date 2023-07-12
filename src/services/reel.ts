import { RawResultType } from "@/types/SlotMachineTypes";
import SlotMachineConfig from "../config";

export default class Reel {
  reel;
  startingIndex = 0;
  private rowsCount: number = SlotMachineConfig.rowsCount;
  private _symbolsInPlay: RawResultType[] = [];

  constructor(reel: number[]) {
    this.reel = reel;
  }

  /* Get a random starting index for a reel,
     depending on the length of the reel array */
  private randomizeStartingIndex(): void {
    const randomIndex = () => {
      const index = Math.floor(Math.random() * this.reel.length);
      return index;
    };
    this.startingIndex = randomIndex();
  }

  // Get the symbols and their indexes in play for the specific reel
  get symbolsInPlay() {
    this.randomizeStartingIndex();
    const reelInPlay = [...this.reel];

    for (let i = 0; i < this.rowsCount; i++) {
      let pointer = (i + this.startingIndex) % reelInPlay.length;
      this._symbolsInPlay.push({
        position: pointer,
        symbol: this.reel[pointer],
      });
    }
    return this._symbolsInPlay;
  }
}
