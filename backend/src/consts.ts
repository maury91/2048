export const GRID_SIZE = 6;
export const WINNING_VALUE = 2048;
export const CHANNEL = "channel";

if (
  Math.ceil(Math.log2(WINNING_VALUE)) !== Math.floor(Math.log2(WINNING_VALUE))
) {
  throw new Error("Winning value must be a power of 2");
  process.exit(1);
}

export const WINNING_POWER = Math.log2(WINNING_VALUE) + 1;
