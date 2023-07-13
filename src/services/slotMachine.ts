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

  spin(): void {
    const rawResult: RawResultType[][] = [];

    // For each reel get the symbols in play and push it to the rawResult Array
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
    payout.evaluateWinners();
    if (payout.payout > 0) {
      console.log("Payout this spin:", payout.payout);
    } else {
      console.log("No winners, GL next spin!");
    }
  }

  testSpin() {
    const testArray = [
      [9, 2, 9, 2, 9],
      [1, 9, 9, 9, 9],
      [1, 1, 1, 1, 4],
    ];
    console.log("Formatted results:");
    testArray.forEach((row) => {
      console.log(row);
    });
    const payout = new Payout(testArray);
    payout.evaluateWinners();
    console.log("Payout this spin:", payout.payout);
  }
}
