import { RawResultType } from "@/types/SlotMachineTypes";

export default class Result {
  rawReelsResult;
  _formattedReelResult: number[][] = [];

  constructor(rawResult: RawResultType[][]) {
    this.rawReelsResult = rawResult;
  }

  // Transpose the result array to the number of rows
  private formatResult() {
    const formattedResult = this.rawReelsResult[0].map((_, colIndex) =>
      this.rawReelsResult.map((row) => row[colIndex].symbol)
    );
    this._formattedReelResult = formattedResult;
  }

  get formattedResult(): number[][] {
    this.formatResult();
    return this._formattedReelResult;
  }
}
