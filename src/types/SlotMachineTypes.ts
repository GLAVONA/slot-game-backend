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

export interface PayoutType {
  symbol: number;
  streak: number;
  winAmount: number;
  line: number[];
  symbolCoordinates: SymbolCoordinates[];
}

export interface SymbolCoordinates {
  row: number;
  index: number;
}
