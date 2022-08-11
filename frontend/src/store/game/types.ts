import { ServerGameStatusParam } from "shared/types";

export interface GameState {
  board: number[][];
  boardSize: number;
  status: ServerGameStatusParam | null;
}
