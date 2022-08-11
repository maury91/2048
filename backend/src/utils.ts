export const emptyArray = <T>(size: number, defaultValue: T): T[] =>
  Array(size).fill(defaultValue);

export const emptyGrid = <T>(size: number, defaultValue: T): T[][] =>
  emptyArray(size, []).map(() => emptyArray(size, defaultValue));
