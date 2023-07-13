import { PayoutType } from "@/types/SlotMachineTypes";
import SlotMachineConfig from "../config";

export default class Payout {
  private _payout = 0;
  reelResult;
  lines = SlotMachineConfig.lines;
  symbols = SlotMachineConfig.symbols;
  payouts: PayoutType[] = [];

  constructor(reelResult: number[][]) {
    this.reelResult = reelResult;
  }

  private calculatePayout(payouts: PayoutType[]): void {
    if (this.payouts.length > 0) {
      console.log("Winners: ");
      this.payouts.forEach((payout) => {
        this._payout += payout.winAmount;
        console.log(JSON.stringify(payout));
        console.log("-----");
      });
    } else {
      console.log("No winners, GL next spin!");
    }
  }

  get payout(): number {
    this.calculatePayout(this.payouts);
    return this._payout;
  }

  // Evaluate winners
  evaluateWinners(): void {
    // Loop through lines
    for (let lineIndex = 0; lineIndex < this.lines.length; lineIndex++) {
      const currentLine = this.lines[lineIndex];
      let currentSymbol = this.reelResult[currentLine[0]][0];
      let currentSymbolIndex = 0;
      let streak = 1;
      let payout: PayoutType = {
        streak: 0,
        symbol: 0,
        winAmount: 0,
        line: [],
        symbolCoordinates: [],
      };
      let winner = false;

      // Loop through each symbol and compare it to the previous symbol in the array
      for (
        let nextSymbolIndex = 1;
        nextSymbolIndex < currentLine.length;
        nextSymbolIndex++
      ) {
        let nextSymbol =
          this.reelResult[currentLine[nextSymbolIndex]][nextSymbolIndex];
        if (currentSymbol === nextSymbol) {
          streak++;
          if (nextSymbolIndex - 1 === currentSymbolIndex) {
            payout.symbolCoordinates.push({
              row: currentLine[nextSymbolIndex - 1],
              index: nextSymbolIndex - 1,
            });
          }
          payout.symbolCoordinates.push({
            row: currentLine[nextSymbolIndex],
            index: nextSymbolIndex,
          });

          if (streak > 2) {
            payout.streak = streak;
            payout.symbol = currentSymbol;
            payout.winAmount = this.symbols[currentSymbol][streak - 1];

            winner = true;
          }
        } else {
          if (winner) break;
          payout.symbolCoordinates = [];
          currentSymbol = nextSymbol;
          currentSymbolIndex = nextSymbolIndex;

          streak = 1;
        }
      }
      if (winner) {
        payout.line = this.lines[lineIndex];
        this.payouts.push(payout);
      }
    }
  }
}
