import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./const";

const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    connecting(state) {
      state.connecting = true;
    },
    connected(state) {
      state.connecting = false;
      state.connected = true;
    },
    disconnected: {
      reducer(state, action: PayloadAction<string>) {
        state.connected = false;
        state.connecting = false;
        state.error = action.payload;
      },
      prepare: (reason: string) => ({ payload: reason }),
    },
  },
});

export const { connected, connecting, disconnected } = connectionSlice.actions;
export default connectionSlice.reducer;
