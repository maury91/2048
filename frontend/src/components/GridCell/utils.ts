import { OBSTACLE_VALUE } from "shared/consts";

export const getCellContent = (power: number): string => {
  if (power === 0 || power === OBSTACLE_VALUE) {
    // Empty cell
    return "";
  }
  return (2 ** (power - 1)).toString();
};
