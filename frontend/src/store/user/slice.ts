import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./const";

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    connecting(state) {
      state.connecting = true;
      state.name = null;
      state.error = null;
    },
    connected: {
      reducer(state, action: PayloadAction<string>) {
        state.connecting = false;
        state.name = action.payload;
        state.error = null;
      },
      prepare: (name: string) => ({ payload: name }),
    },
    error: {
      reducer(state, action: PayloadAction<string>) {
        state.connecting = false;
        state.name = null;
        state.error = action.payload;
      },
      prepare: (error: string) => ({ payload: error }),
    },
  },
});

export const {
  connecting,
  connected: userConnected,
  error: userError,
} = userSlice.actions;
export default userSlice.reducer;
