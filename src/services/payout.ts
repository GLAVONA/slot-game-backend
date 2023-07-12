import { winningStreaksType } from "@/types/SlotMachineTypes";
import SlotMachineConfig from "../config";

export default class Payout {
  _payout = 0;
  reelResult;
  lines = SlotMachineConfig.lines;
  symbols = SlotMachineConfig.symbols;
  winningStreaks: winningStreaksType[] = [];

  constructor(reelResult: number[][]) {
    this.reelResult = reelResult;
  }

  // Check if there are any winners on one row
  checkRowWinners() {
    for (let i = 0; i < this.reelResult.length; i++) {
      let streakSymbol = this.reelResult[i][0];
      let winner = false;
      let streak = 1;
      let rowWinner: winningStreaksType = {
        streak: 0,
        symbol: 0,
        winning: 0,
        rowIndex: 0,
        startingAtIndex: 0,
        endingAtIndex: 0,
      };
      for (let y = 1; y < this.reelResult[i].length; y++) {
        const currentSymbol = this.reelResult[i][y];
        if (streakSymbol === currentSymbol) {
          streak++;
          if (streak > 2) {
            rowWinner.streak = streak;
            rowWinner.symbol = currentSymbol;
            rowWinner.winning = this.symbols[currentSymbol][streak - 1];
            rowWinner.rowIndex = i;
            rowWinner.endingAtIndex = y;

            winner = true;
          }
        } else {
          if (streak <= 2) {
            rowWinner.startingAtIndex = y;
          }
          streakSymbol = currentSymbol;
          streak = 1;
        }
      }
      if (winner) {
        this.winningStreaks.push(rowWinner);
      }
    }
    console.log(this.winningStreaks);
  }
}
