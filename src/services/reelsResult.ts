import { RawResultType } from "@/types/SlotMachineTypes";

export default class ReelsResult {
  rawReelsResult;
  _formattedReelResult: number[][] = [];
  _linesResult: number[][] = [];

  constructor(rawResult: RawResultType[][]) {
    this.rawReelsResult = rawResult;
  }

  get formattedReelsResult(): number[][] {
    this.formatResult();
    return this._formattedReelResult;
  }

  // Transpose the result array to the number of rows
  formatResult() {
    const formattedResult = this.rawReelsResult[0].map((_, colIndex) =>
      this.rawReelsResult.map((row) => row[colIndex].symbol)
    );
    this._formattedReelResult = formattedResult;
  }
}
