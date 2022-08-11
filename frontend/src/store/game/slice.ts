import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServerGameStatusParam } from "shared/types";

import { initialState } from "./const";

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateBoard: {
      reducer(state, action: PayloadAction<number[][]>) {
        state.boardSize = action.payload.length;
        state.board = action.payload;
      },
      prepare: (board) => ({ payload: board }),
    },
    updateStatus: {
      reducer(state, action: PayloadAction<ServerGameStatusParam>) {
        state.status = action.payload;
      },
      prepare: (status) => ({ payload: status }),
    },
  },
});

export const { updateBoard: updateGameBoard, updateStatus: updateGameStatus } =
  gameSlice.actions;

export default gameSlice.reducer;
