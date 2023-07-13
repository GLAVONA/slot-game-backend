import {
  RawResultType,
  SlotMachineConfigType,
} from "../types/SlotMachineTypes";
import Reel from "./reel";
import { calculateSpinPayout, formatReelsResult } from "../lib/utils";
import { evaluateWinners } from "./evaluateWinners";

export default class SlotMachine {
  private slotMachine: SlotMachineConfigType;

  constructor(slotMachineConfig: SlotMachineConfigType) {
    this.slotMachine = slotMachineConfig;
  }

  spin(numberOfSpins: number): void {
    let totalWin = 0;
    for (let spin = 1; spin <= numberOfSpins; spin++) {
      console.log("--- NEW SPIN ---");
      console.log("Spin number:", spin);

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

      console.log("Spin formatted:");
      const formattedResult = formatReelsResult(rawResult);
      formattedResult.forEach((row) => {
        console.log(row);
      });
      const payouts = evaluateWinners(formattedResult);
      const spinPayout = calculateSpinPayout(payouts);

      console.log("Spin results:");
      if (spinPayout > 0) {
        console.log(spinPayout);
        totalWin += spinPayout;
      } else {
        console.log("No winners this spin, GL on the next one!");
      }
    }
    console.log("---------------------");
    console.log("END OF SPINS");
    console.log("Total number of bets:", numberOfSpins);
    console.log("Total win from all spins:", totalWin);
    console.log("---------------------");
  }
}
