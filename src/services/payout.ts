import { PayoutType } from "@/types/SlotMachineTypes";
import SlotMachineConfig from "../config";

export default class Payout {
  _payout = 0;
  reelResult;
  lines = SlotMachineConfig.lines;
  symbols = SlotMachineConfig.symbols;
  payouts: PayoutType[] = [];

  constructor(reelResult: number[][]) {
    this.reelResult = reelResult;
  }

  // Evaluate winners
  evaluateWinners(): void {
    // Loop through lines
    for (let lineIndex = 0; lineIndex < this.lines.length; lineIndex++) {
      let currentSymbol = undefined;
      let currentSymbolIndex = 0;
      const currentLine = this.lines[lineIndex];
      let streak = 1;
      let payout: PayoutType = {
        streak: 0,
        symbol: 0,
        winAmount: 0,
        line: [],
        symbolCoordinates: [],
      };
      const currentSymbolCoordinates = [];
      let winner = false;
      for (
        let symbolIndex = 0;
        symbolIndex < currentLine.length;
        symbolIndex++
      ) {
        let symbolAtIndex =
          this.reelResult[currentLine[symbolIndex]][symbolIndex];

        currentSymbolCoordinates.push({
          row: currentLine[symbolIndex],
          index: symbolIndex,
        });

        if (currentSymbol === symbolAtIndex) {
          streak++;

          if (streak > 2) {
            payout.streak = streak;
            payout.symbol = currentSymbol;
            payout.winAmount = this.symbols[currentSymbol][streak - 1];

            winner = true;
          }
        } else {
          streak = 1;
          currentSymbolIndex = symbolIndex;
          currentSymbol = symbolAtIndex;
        }
      }
      if (winner) {
        payout.symbolCoordinates = currentSymbolCoordinates;
        payout.line = this.lines[lineIndex];
        this.payouts.push(payout);
      }
    }
    if (this.payouts.length > 0) {
      console.log("Winners: ");
      this.payouts.forEach((payout) => {
        console.log(JSON.stringify(payout));
      });
    } else {
      console.log("No winners, GL next spin!");
    }
  }
}
