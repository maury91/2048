import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServerChatMessageParam } from "shared/types";

import { initialState } from "./const";

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    newMessage: {
      reducer(state, action: PayloadAction<ServerChatMessageParam>) {
        state.messages.push(action.payload);
      },
      prepare: (message) => ({ payload: message }),
    },
  },
});

export const { newMessage } = chatSlice.actions;
export default chatSlice.reducer;
