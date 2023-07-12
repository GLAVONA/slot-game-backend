export interface SlotMachineConfigType {
  reelsCount: number;
  rowsCount: number;
  symbols: Record<number, number[]>;
  lines: number[][];
  reels: number[][];
}

export interface RawResultType {
  position: number;
  symbol: number;
}

export interface WinningStreaksType {
  type: "row" | "zigzag";
  symbol: number;
  streak: number;
  winning: number;
}

export interface RowWinningStreakType extends WinningStreaksType {
  rowIndex: number;
  startRowIndex: number;
  startingAtIndex: number;
  endingAtIndex: number;
}

export interface ZigzagStreakType extends WinningStreaksType {}
