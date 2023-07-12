import {
  SlotMachineConfigType,
  RawResultType,
} from "../types/SlotMachineTypes";
import Payout from "./payout";
import Reel from "./reel";
import ReelsResult from "./reelsResult";

export default class SlotMachine {
  private slotMachine: SlotMachineConfigType;

  constructor(slotMachineConfig: SlotMachineConfigType) {
    this.slotMachine = slotMachineConfig;
  }

  spin() {
    const rawResult: RawResultType[][] = [];

    // For each reel get the symbols in play and return
    for (let i = 0; i < this.slotMachine.reels.length; i++) {
      const currentReel = new Reel(this.slotMachine.reels[i]);
      rawResult.push(currentReel.symbolsInPlay);
    }

    console.log("Reel position and symbols:");
    for (let i = 0; i < rawResult.length; i++) {
      const reelResult: RawResultType[] = rawResult[i];
      console.log(reelResult);
    }

    console.log("Formatted results:");
    const result = new ReelsResult(rawResult);
    const formattedResult = result.formattedReelsResult;
    formattedResult.forEach((row) => {
      console.log(row);
    });

    const payout = new Payout(result.formattedReelsResult);
    payout.checkRowWinners();
  }
}
