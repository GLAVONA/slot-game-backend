import { WinningStreaksType } from "@/types/SlotMachineTypes";
import SlotMachineConfig from "../config";

export default class Payout {
  _payout = 0;
  reelResult;
  lines = SlotMachineConfig.lines;
  symbols = SlotMachineConfig.symbols;
  winningStreaks: WinningStreaksType[] = [];

  constructor(reelResult: number[][]) {
    this.reelResult = reelResult;
  }

  // Check if there are any winners on one row
  checkRowWinners(): void {
    for (let i = 0; i < this.reelResult.length; i++) {
      let streakSymbol = this.reelResult[i][0];
      let winner = false;
      let streak = 1;
      let rowWinner: WinningStreaksType = {
        type: "row",
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
            rowWinner.winning = this.symbols[streakSymbol][streak - 1];
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
  }

  checkZigzagWinners(): void {
    for (let i = 0; i < this.reelResult.length - 1; i++) {
      let streakSymbol = this.reelResult[i][0];
      let winner = false;
      let streak = 1;
      let currentRow = i;
      let rowWinner: WinningStreaksType = {
        type: "zigzag",
        streak: 0,
        symbol: 0,
        winning: 0,
        rowIndex: 0,
        startingAtIndex: 0,
        endingAtIndex: 0,
      };

      for (let y = 0; y < this.reelResult[i].length - 1; y++) {
        if (currentRow === i) {
          currentRow = i + 1;
        } else {
          currentRow = i;
        }
        const nextSymbol = this.reelResult[currentRow][y + 1];
        if (streakSymbol === nextSymbol) {
          streak++;
          if (streak > 2) {
            rowWinner.streak = streak;
            rowWinner.symbol = nextSymbol;
            rowWinner.winning = this.symbols[streakSymbol][streak - 1];
            rowWinner.endingAtIndex = y + 1;

            winner = true;
          }
        } else {
          if (streak <= 2) {
            rowWinner.startingAtIndex = y + 1;
          }
          rowWinner.rowIndex = currentRow;

          streak = 1;
          streakSymbol = nextSymbol;
        }
      }
      if (winner) {
        this.winningStreaks.push(rowWinner);
      }
    }
    console.log(this.winningStreaks);
  }

  checkWinners() {
    this.checkRowWinners();
    this.checkZigzagWinners();
  }
}
