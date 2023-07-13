import {
  RawResultType,
  SlotMachineConfigType,
} from "../types/SlotMachineTypes";
// import Payout from "./payout";
import Reel from "./reel";
import { calculateSpinPayout, formatReelsResult } from "../lib/utils";
import { evaluateWinners } from "./evaluateWinners";

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
    const formattedResult = formatReelsResult(rawResult);
    formattedResult.forEach((row) => {
      console.log(row);
    });
    const payouts = evaluateWinners(formattedResult);
    const totalPayout = calculateSpinPayout(payouts);

    if (totalPayout > 0) {
      console.log("Payout this spin:", totalPayout);
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
    const payouts = evaluateWinners(testArray);
    const totalPayout = calculateSpinPayout(payouts);
    console.log("Payout this spin:", totalPayout);
  }
}
