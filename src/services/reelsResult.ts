import { RawResultType } from "@/types/SlotMachineTypes";

export default class ReelsResult {
  rawReelsResult;
  formattedReelsResult: number[][] = [];
  _linesResult: number[][] = [];

  constructor(rawResult: RawResultType[][]) {
    this.rawReelsResult = rawResult;
    this.formatResult();
  }

  // Transpose the result array to the number of rows
  formatResult() {
    const formattedResult = this.rawReelsResult[0].map((_, colIndex) =>
      this.rawReelsResult.map((row) => row[colIndex].symbol)
    );
    this.formattedReelsResult = formattedResult;
  }
}
