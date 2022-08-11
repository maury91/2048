import { ServerGameStatusParam } from "shared/types";
import { RootState } from "store/types";

export const boardCellSelector =
  (row: number, column: number) =>
  (state: RootState): number =>
    state.game.board[row][column];

export const boardSizeSelector = (state: RootState): number =>
  state.game.boardSize;

export const gameStatusSelector = (
  state: RootState
): ServerGameStatusParam | null => state.game.status;
