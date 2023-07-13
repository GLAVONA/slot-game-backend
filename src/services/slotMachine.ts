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
    payout.evaluateWinners();
  }

  testSpin() {
    const testArray = [
      [5, 4, 5, 5, 3],
      [1, 5, 2, 5, 3],
      [3, 2, 3, 4, 4],
    ];
    console.log("Formatted results:");
    testArray.forEach((row) => {
      console.log(row);
    });
    const payout = new Payout(testArray);
    payout.evaluateWinners();
  }
}

// lines: [
//   [0, 0, 0, 0, 0],
//   [1, 1, 1, 1, 1],
//   [2, 2, 2, 2, 2],
//   [0, 1, 0, 1, 0],
//   [1, 2, 1, 2, 1],
// ],
