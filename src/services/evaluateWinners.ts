import SlotMachineConfig from "../config";
import { PayoutType } from "../types/SlotMachineTypes";

export const evaluateWinners = (reelResult: number[][]): PayoutType[] => {
  const lines = SlotMachineConfig.lines;
  const symbols = SlotMachineConfig.symbols;
  const payouts = [];
  // Loop through lines
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const currentLine = lines[lineIndex];
    let currentSymbol = reelResult[currentLine[0]][0];
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
        reelResult[currentLine[nextSymbolIndex]][nextSymbolIndex];
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
          payout.winAmount = symbols[currentSymbol][streak - 1];

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
      payout.line = lines[lineIndex];
      payouts.push(payout);
    }
  }
  return payouts;
};
