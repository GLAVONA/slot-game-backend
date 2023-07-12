import SlotMachineConfig from "../config";
import { SlotMachineConfigType } from "../types/SlotMachineConfigType";

export default class SlotMachine {
  private slotMachine: SlotMachineConfigType;

  constructor(slotMachineConfig: SlotMachineConfigType) {
    this.slotMachine = slotMachineConfig;
  }

  spin() {
    const result: number[][] = [];

    // For each reel get the symbols in play and return
    for (let i = 0; i < this.slotMachine.reels.length; i++) {
      const currentReel = new Reel(this.slotMachine.reels[i]);
      result.push(currentReel.getSymbolsInPlay());
    }
    console.log(result);
  }
}

class Reel {
  reelState;
  private rowsCount: number;

  constructor(reel: number[]) {
    this.reelState = reel;
    this.rowsCount = SlotMachineConfig.rowsCount;
  }
  /* Get a random starting index for a reel,
   depending on the length of the reel array */

  private getReelIndexes(reel: number[]): number {
    const randomIndex = () => {
      const index = Math.floor(Math.random() * reel.length) - 1;
      return index;
    };
    const startingIndex = randomIndex();
    return startingIndex;
  }

  // Get the symbols in play for the specific reel
  getSymbolsInPlay() {
    const reelInPlay = [...this.reelState];
    const startingIndex = this.getReelIndexes(reelInPlay);
    const symbolsInPlay: number[] = [];

    for (let i = 0; i < this.rowsCount; i++) {
      let pointer = (i + startingIndex) % reelInPlay.length;
      symbolsInPlay.push(this.reelState[pointer]);
    }
    return symbolsInPlay;
  }
}
