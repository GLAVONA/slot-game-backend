import { RawResultType } from "@/types/SlotMachineTypes";

export default class Result {
  rawResult;
  formattedResult: number[][] = [];

  constructor(rawResult: RawResultType[][]) {
    this.rawResult = rawResult;
  }

  // Transpose the result array to the number of rows
  formatResult() {
    const output = this.rawResult[0].map((_, colIndex) =>
      this.rawResult.map((row) => row[colIndex].symbol)
    );
    this.formattedResult = output;
    return this.formattedResult;
  }
}
