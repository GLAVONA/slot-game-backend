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

export interface FormattedResultType {}
