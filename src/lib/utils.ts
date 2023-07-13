import { PayoutType, RawResultType } from "../types/SlotMachineTypes";

export function formatReelsResult(rawResult: RawResultType[][]): number[][] {
  const formattedResult = rawResult[0].map((_, colIndex) =>
    rawResult.map((row) => row[colIndex].symbol)
  );

  return formattedResult;
}

export const calculateSpinPayout = (payouts: PayoutType[]): number => {
  let totalPayout = 0;
  if (payouts.length > 0) {
    console.log("Winners: ");
    payouts.forEach((payout: PayoutType): void => {
      totalPayout += payout.winAmount;
      console.log(JSON.stringify(payout));
      console.log("-----");
    });
  }
  return totalPayout;
};
